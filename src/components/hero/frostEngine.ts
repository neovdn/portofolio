// src/components/hero/frostEngine.ts

export const CONFIG = {
    /** Lebar usapan pointer asli dalam CSS px */
    BRUSH_RADIUS: 28,
    /** Lebar garis tulisan intro dalam CSS px (disiapkan untuk Fase 2) */
    INTRO_BRUSH_RADIUS: 12,
    /** Kelembutan tepi kuas (0 = sangat lembut, 1 = keras) */
    BRUSH_HARDNESS: 0.35,
    /** Konstanta waktu pemulihan embun dalam detik (pulih penuh ~3-5 detik) */
    REGEN_TAU: 1.6,
    /** Faktor downscale untuk efek blur murah lintas browser */
    BLUR_DOWNSCALE: 10,
    /** Tint putih keabuan di atas hasil blur scene */
    TINT: "rgba(235,235,232,0.72)",
    /** Opasitas maksimal butiran noise pada tekstur embun */
    NOISE_OPACITY: 0.06,
    /** Jarak antar garis grid pada scene dalam CSS px */
    GRID_SIZE: 24,
    /** Jeda sebelum animasi intro berjalan dalam ms (disiapkan untuk Fase 2) */
    INTRO_DELAY: 700,
    /** Batas maksimal device pixel ratio */
    DPR_CAP: 2,
} as const;

export interface FrostEngineOptions {
    sceneCanvas: HTMLCanvasElement;   // canvas bawah
    frostCanvas: HTMLCanvasElement;   // canvas atas
    name: string;                     // personalInfo.name
    title: string;                    // personalInfo.title
    reducedMotion: boolean;
    onFirstWipe?: () => void;         // untuk menyembunyikan petunjuk
}

export interface FrostEngine {
    resize(cssWidth: number, cssHeight: number, dpr: number): void;
    pointerMove(x: number, y: number): void;   // koordinat CSS px relatif ke canvas
    pointerLeave(): void;                       // reset posisi terakhir agar tidak ada garis sambung
    playIntro(): void;
    setVisible(visible: boolean): void;         // jeda atau lanjut loop
    destroy(): void;                            // batalkan rAF, lepas referensi canvas
}

export function createFrostEngine(options: FrostEngineOptions): FrostEngine {
    const { sceneCanvas, frostCanvas, name, title } = options;

    const sceneCtx = sceneCanvas.getContext("2d");
    const frostCtx = frostCanvas.getContext("2d");

    // Buffer offscreen untuk menyimpan tekstur embun yang opaque penuh (dibuat sekali per resize)
    const frostBuffer = document.createElement("canvas");
    const frostBufferCtx = frostBuffer.getContext("2d");

    // Canvas kecil untuk proses downscale-upscale blur
    const blurCanvas = document.createElement("canvas");
    const blurCtx = blurCanvas.getContext("2d");

    // Tile noise 256x256 dibuat sekali per instance engine
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const noiseCtx = noiseCanvas.getContext("2d");

    // Sprite kuas radial dibuat sekali untuk menghindari pembuatan gradient di tiap stamp
    const brushCanvas = document.createElement("canvas");
    const brushCtx = brushCanvas.getContext("2d");

    let width = 0;
    let height = 0;
    let currentDpr = 1;

    let lastX: number | null = null;
    let lastY: number | null = null;
    let hasWipedOnce = false;

    // State siklus render hemat daya (FR-4 & FR-6)
    let dirty = false;
    let visible = true;
    let destroyed = false;
    let rafId: number | null = null;
    let lastStampTime = 0;
    let lastFrameTime = 0;
    let accumDt = 0;

    function initNoiseTile(): void {
        if (!noiseCtx) return;
        const imgData = noiseCtx.createImageData(256, 256);
        const data = imgData.data;
        const maxAlpha = Math.round(CONFIG.NOISE_OPACITY * 255);

        for (let i = 0; i < data.length; i += 4) {
            const shade = Math.random() > 0.5 ? 255 : 115;
            data[i] = shade;
            data[i + 1] = shade;
            data[i + 2] = shade;
            data[i + 3] = Math.floor(Math.random() * maxAlpha);
        }
        noiseCtx.putImageData(imgData, 0, 0);
    }

    function initBrushSprite(radiusPx: number): void {
        if (!brushCtx) return;
        const diameter = Math.max(2, Math.ceil(radiusPx * 2));
        brushCanvas.width = diameter;
        brushCanvas.height = diameter;

        const center = diameter / 2;
        const grad = brushCtx.createRadialGradient(
            center,
            center,
            center * CONFIG.BRUSH_HARDNESS,
            center,
            center,
            center
        );
        grad.addColorStop(0, "rgba(0, 0, 0, 1)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        brushCtx.clearRect(0, 0, diameter, diameter);
        brushCtx.fillStyle = grad;
        brushCtx.fillRect(0, 0, diameter, diameter);
    }

    /** FR-1: Gambar scene blueprint gelap di canvas bawah */
    function renderScene(): void {
        if (!sceneCtx || width <= 0 || height <= 0) return;

        sceneCtx.save();
        sceneCtx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);

        // 1. Latar gelap #111111
        sceneCtx.fillStyle = "#111111";
        sceneCtx.fillRect(0, 0, width, height);

        // 2. Grid tipis 24 px dengan garis putih opasitas 6%
        sceneCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        sceneCtx.lineWidth = 1;
        const step = CONFIG.GRID_SIZE;

        sceneCtx.beginPath();
        for (let x = step; x < width; x += step) {
            const alignedX = Math.floor(x) + 0.5;
            sceneCtx.moveTo(alignedX, 0);
            sceneCtx.lineTo(alignedX, height);
        }
        for (let y = step; y < height; y += step) {
            const alignedY = Math.floor(y) + 0.5;
            sceneCtx.moveTo(0, alignedY);
            sceneCtx.lineTo(width, alignedY);
        }
        sceneCtx.stroke();

        // 3. Tanda registrasi (registration marks) 10 px di empat sudut
        const inset = 16;
        const arm = 10;
        sceneCtx.strokeStyle = "rgba(245, 245, 243, 0.35)";
        sceneCtx.lineWidth = 1;
        sceneCtx.beginPath();

        // Kiri atas
        sceneCtx.moveTo(inset, inset + arm);
        sceneCtx.lineTo(inset, inset);
        sceneCtx.lineTo(inset + arm, inset);

        // Kanan atas
        sceneCtx.moveTo(width - inset - arm, inset);
        sceneCtx.lineTo(width - inset, inset);
        sceneCtx.lineTo(width - inset, inset + arm);

        // Kiri bawah
        sceneCtx.moveTo(inset, height - inset - arm);
        sceneCtx.lineTo(inset, height - inset);
        sceneCtx.lineTo(inset + arm, height - inset);

        // Kanan bawah
        sceneCtx.moveTo(width - inset - arm, height - inset);
        sceneCtx.lineTo(width - inset, height - inset);
        sceneCtx.lineTo(width - inset, height - inset - arm);

        sceneCtx.stroke();

        // 4. Blok teks mono identitas di bagian bawah
        const textX = 24;
        const titleY = height - 28;
        const nameY = titleY - 18;

        sceneCtx.textBaseline = "alphabetic";
        sceneCtx.fillStyle = "#F5F5F3";
        sceneCtx.font = "600 13px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        sceneCtx.fillText(name.toUpperCase(), textX, nameY);

        sceneCtx.fillStyle = "#737373";
        sceneCtx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        sceneCtx.fillText(title.toUpperCase(), textX, titleY);

        sceneCtx.restore();
    }

    /** FR-2: Bangun tekstur embun opaque penuh di buffer offscreen */
    function buildFrostTexture(): void {
        if (!frostBufferCtx || !blurCtx || width <= 0 || height <= 0) return;

        const pixelW = frostBuffer.width;
        const pixelH = frostBuffer.height;

        const smallW = Math.max(1, Math.round(pixelW / CONFIG.BLUR_DOWNSCALE));
        const smallH = Math.max(1, Math.round(pixelH / CONFIG.BLUR_DOWNSCALE));
        blurCanvas.width = smallW;
        blurCanvas.height = smallH;

        // 1. Downscale scene ke canvas kecil lalu upscale kembali dengan smoothing high
        blurCtx.imageSmoothingEnabled = true;
        blurCtx.imageSmoothingQuality = "high";
        blurCtx.clearRect(0, 0, smallW, smallH);
        blurCtx.drawImage(sceneCanvas, 0, 0, smallW, smallH);

        frostBufferCtx.save();
        frostBufferCtx.setTransform(1, 0, 0, 1, 0, 0);
        frostBufferCtx.globalCompositeOperation = "source-over";
        frostBufferCtx.globalAlpha = 1;

        // Pastikan dasar buffer opaque penuh agar tidak ada kebocoran piksel
        frostBufferCtx.fillStyle = "#EBEBE8";
        frostBufferCtx.fillRect(0, 0, pixelW, pixelH);

        frostBufferCtx.imageSmoothingEnabled = true;
        frostBufferCtx.imageSmoothingQuality = "high";
        frostBufferCtx.drawImage(blurCanvas, 0, 0, smallW, smallH, 0, 0, pixelW, pixelH);

        // 2. Timpa dengan tint terang monokrom
        frostBufferCtx.fillStyle = CONFIG.TINT;
        frostBufferCtx.fillRect(0, 0, pixelW, pixelH);

        // 3. Tambahkan pattern noise halus
        const pattern = frostBufferCtx.createPattern(noiseCanvas, "repeat");
        if (pattern) {
            frostBufferCtx.fillStyle = pattern;
            frostBufferCtx.fillRect(0, 0, pixelW, pixelH);
        }

        // 4. Highlight tipis di tepi atas dan kiri (opasitas ~40%) untuk kesan ketebalan kaca
        const edgeThickness = Math.max(2, Math.round(3 * currentDpr));

        const topGrad = frostBufferCtx.createLinearGradient(0, 0, 0, edgeThickness);
        topGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        topGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        frostBufferCtx.fillStyle = topGrad;
        frostBufferCtx.fillRect(0, 0, pixelW, edgeThickness);

        const leftGrad = frostBufferCtx.createLinearGradient(0, 0, edgeThickness, 0);
        leftGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        leftGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        frostBufferCtx.fillStyle = leftGrad;
        frostBufferCtx.fillRect(0, 0, edgeThickness, pixelH);

        frostBufferCtx.restore();
    }

    /** Salin tekstur embun secara penuh ke canvas embun (reset / penyelesaian regen) */
    function fillFrostFull(): void {
        if (!frostCtx || frostBuffer.width === 0 || frostBuffer.height === 0) return;
        frostCtx.save();
        frostCtx.setTransform(1, 0, 0, 1, 0, 0);
        frostCtx.globalCompositeOperation = "source-over";
        frostCtx.globalAlpha = 1;
        frostCtx.drawImage(frostBuffer, 0, 0);
        frostCtx.restore();
    }

    /** Stamp kuas tunggal pada koordinat CSS px (x, y) */
    function stampAt(x: number, y: number, radiusCss: number): void {
        if (!frostCtx) return;
        frostCtx.save();
        frostCtx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);
        frostCtx.globalCompositeOperation = "destination-out";
        frostCtx.globalAlpha = 1;
        frostCtx.drawImage(
            brushCanvas,
            x - radiusCss,
            y - radiusCss,
            radiusCss * 2,
            radiusCss * 2
        );
        frostCtx.restore();
    }

    /** FR-3: Stamp garis terinterpolasi antara titik sebelumnya dan sekarang */
    function eraseSegment(x0: number, y0: number, x1: number, y1: number, radiusCss: number): void {
        const dist = Math.hypot(x1 - x0, y1 - y0);
        const step = Math.max(1, radiusCss / 3);
        const steps = Math.max(1, Math.ceil(dist / step));

        for (let i = 0; i <= steps; i++) {
            const t = steps === 0 ? 1 : i / steps;
            const ix = x0 + (x1 - x0) * t;
            const iy = y0 + (y1 - y0) * t;
            stampAt(ix, iy, radiusCss);
        }

        lastStampTime = performance.now();
        dirty = true;
        ensureLoop();
    }

    /** FR-4 & FR-6: Loop pemulihan embun berbasis waktu dan berhenti otomatis saat pulih */
    function tick(now: number): void {
        rafId = null;
        if (destroyed || !dirty || !visible || !frostCtx) return;

        const dt = Math.max(0, (now - lastFrameTime) / 1000);
        lastFrameTime = now;
        accumDt += dt;

        const elapsedSinceStamp = (now - lastStampTime) / 1000;

        // Hentikan loop ketika sudah melewati 4 * tau dan timpa penuh sekali untuk membersihkan residu 8-bit
        if (elapsedSinceStamp >= 4 * CONFIG.REGEN_TAU) {
            fillFrostFull();
            dirty = false;
            accumDt = 0;
            return;
        }

        // Akumulasikan dt jika alpha per frame masih di bawah 0.004 agar tidak hilang akibat pembulatan 8-bit
        const alpha = 1 - Math.exp(-accumDt / CONFIG.REGEN_TAU);
        if (alpha >= 0.004) {
            frostCtx.save();
            frostCtx.setTransform(1, 0, 0, 1, 0, 0);
            frostCtx.globalCompositeOperation = "source-over";
            frostCtx.globalAlpha = alpha;
            frostCtx.drawImage(frostBuffer, 0, 0);
            frostCtx.restore();
            accumDt = 0;
        }

        ensureLoop();
    }

    function ensureLoop(): void {
        if (destroyed || !dirty || !visible || rafId !== null) return;
        lastFrameTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
    }

    // Inisialisasi tile noise sekali saat engine dibuat
    initNoiseTile();

    return {
        resize(cssWidth: number, cssHeight: number, dpr: number): void {
            if (destroyed || cssWidth <= 0 || cssHeight <= 0) return;

            width = cssWidth;
            height = cssHeight;
            currentDpr = Math.min(Math.max(1, dpr), CONFIG.DPR_CAP);

            const pixelW = Math.max(1, Math.round(cssWidth * currentDpr));
            const pixelH = Math.max(1, Math.round(cssHeight * currentDpr));

            sceneCanvas.width = pixelW;
            sceneCanvas.height = pixelH;
            frostCanvas.width = pixelW;
            frostCanvas.height = pixelH;
            frostBuffer.width = pixelW;
            frostBuffer.height = pixelH;

            initBrushSprite(CONFIG.BRUSH_RADIUS * currentDpr);
            renderScene();
            buildFrostTexture();
            fillFrostFull();

            // Reset state interaksi saat resize
            lastX = null;
            lastY = null;
            dirty = false;
            accumDt = 0;
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
        },

        pointerMove(x: number, y: number): void {
            if (destroyed || width <= 0 || height <= 0) return;

            if (!hasWipedOnce) {
                hasWipedOnce = true;
                options.onFirstWipe?.();
            }

            const prevX = lastX ?? x;
            const prevY = lastY ?? y;
            lastX = x;
            lastY = y;

            eraseSegment(prevX, prevY, x, y, CONFIG.BRUSH_RADIUS);
        },

        pointerLeave(): void {
            lastX = null;
            lastY = null;
        },

        playIntro(): void {
            // Akan diimplementasikan pada Fase 2 (Intro NV otomatis)
        },

        setVisible(nextVisible: boolean): void {
            visible = nextVisible;
            if (!visible && rafId !== null) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            } else if (visible && dirty) {
                ensureLoop();
            }
        },

        destroy(): void {
            destroyed = true;
            dirty = false;
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
        },
    };
}