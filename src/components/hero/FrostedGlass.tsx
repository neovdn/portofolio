// src/components/hero/FrostedGlass.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { personalInfo } from "@/data/portfolioData";
import { createFrostEngine, type FrostEngine } from "./frostEngine";

export function FrostedGlass() {
    const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const frostCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<FrostEngine | null>(null);

    useEffect(() => {
        const sceneCanvas = sceneCanvasRef.current;
        const frostCanvas = frostCanvasRef.current;
        if (!sceneCanvas || !frostCanvas) return;

        const engine = createFrostEngine({
            sceneCanvas,
            frostCanvas,
            name: personalInfo.name,
            title: personalInfo.title,
            reducedMotion: false,
        });
        engineRef.current = engine;

        const updateSize = () => {
            const rect = frostCanvas.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                engine.resize(rect.width, rect.height, window.devicePixelRatio || 1);
            }
        };

        updateSize();

        let resizeTimer: ReturnType<typeof setTimeout> | null = null;
        const resizeObserver = new ResizeObserver(() => {
            if (resizeTimer !== null) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(() => {
                updateSize();
            }, 150);
        });

        resizeObserver.observe(frostCanvas);

        return () => {
            if (resizeTimer !== null) {
                clearTimeout(resizeTimer);
            }
            resizeObserver.disconnect();
            engine.destroy();
            engineRef.current = null;
        };
    }, []);

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const engine = engineRef.current;
        if (!engine) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        engine.pointerMove(x, y);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const engine = engineRef.current;
        if (!engine) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        engine.pointerMove(x, y);
    };

    const handlePointerLeave = () => {
        engineRef.current?.pointerLeave();
    };

    return (
        <div
            role="img"
            aria-label="Decorative frosted glass panel. Move your cursor over it to wipe it clear."
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-xl overflow-hidden border border-[#D9D9D9] shadow-xl bg-[#EBEBE8] select-none"
        >
            {/* Lapisan 1: Canvas Scene (bawah) */}
            <canvas
                ref={sceneCanvasRef}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full block pointer-events-none"
            />

            {/* Lapisan 2: Canvas Embun (atas - menerima event pointer) */}
            <canvas
                ref={frostCanvasRef}
                aria-hidden="true"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerCancel={handlePointerLeave}
                className="absolute inset-0 w-full h-full block cursor-crosshair"
            />

            {/* Lapisan 3: Overlay DOM */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#111111]" />
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#111111] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                        NV // GLASS
                    </span>
                </div>
            </div>
        </div>
    );
}