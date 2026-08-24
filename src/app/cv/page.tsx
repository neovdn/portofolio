"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { ContactFooter } from "@/components/contact/ContactFooter";
import { ArrowLeft, Download, ExternalLink, Printer, FileText } from "lucide-react";

export default function CVPage() {
  const cvPath = "/documents/cv.pdf";

  const handlePrint = () => {
    const printWindow = window.open(cvPath, "_blank");
    if (printWindow) {
      printWindow.focus();
      // Most modern browsers will allow print on PDF viewer tab
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col justify-between selection:bg-[#111111] selection:text-[#F5F5F3]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto w-full">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9D9D9] pb-6 mb-8 print:hidden">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#737373] hover:text-[#111111] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>BACK TO HOME</span>
            </Link>

            <span className="text-[#D9D9D9]">/</span>

            <div className="flex items-center gap-2 font-mono text-xs text-[#111111]">
              <FileText className="w-3.5 h-3.5 text-[#737373]" />
              <span className="font-semibold">CURRICULUM VITAE</span>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Download Button */}
            <a
              href={cvPath}
              download="CV_Bernhardth_Neo_Videan.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] text-[#F5F5F3] font-mono text-xs uppercase tracking-wider hover:bg-[#262626] transition-colors rounded-sm shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD CV (PDF)</span>
            </a>

            {/* Open in New Tab Button */}
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FFFFFF] text-[#111111] border border-[#D9D9D9] font-mono text-xs uppercase tracking-wider hover:bg-[#EBEBE8] transition-colors rounded-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>OPEN</span>
            </a>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FFFFFF] text-[#737373] border border-[#D9D9D9] font-mono text-xs uppercase tracking-wider hover:text-[#111111] hover:bg-[#EBEBE8] transition-colors rounded-sm"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
          </div>
        </div>

        {/* Mobile quick-action info banner */}
        <div className="sm:hidden mb-6 p-4 bg-[#FFFFFF] border border-[#D9D9D9] rounded-lg flex items-center justify-between gap-3">
          <div className="text-xs font-mono">
            <p className="font-semibold text-[#111111]">CV Bernhardth Neo Videan</p>
            <p className="text-[#737373]">Format Dokumen: PDF</p>
          </div>
          <a
            href={cvPath}
            download="CV_Bernhardth_Neo_Videan.pdf"
            className="px-3 py-1.5 bg-[#111111] text-[#F5F5F3] font-mono text-[11px] uppercase tracking-wider rounded"
          >
            Unduh
          </a>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="relative w-full bg-[#FFFFFF] border border-[#D9D9D9] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={`${cvPath}#view=FitH`}
            className="w-full h-[750px] sm:h-[900px] lg:h-[1100px] border-none"
            title="Curriculum Vitae - Bernhardth Neo Videan"
          >
            {/* Fallback if browser iframe doesn't render PDF */}
            <div className="p-12 text-center space-y-4">
              <FileText className="w-12 h-12 text-[#737373] mx-auto" />
              <h3 className="font-sans text-lg font-bold text-[#111111]">
                Lihat Curriculum Vitae
              </h3>
              <p className="font-sans text-sm text-[#737373] max-w-md mx-auto">
                Browser Anda tidak mendukung pratinjau PDF langsung di halaman ini. Silakan unduh atau buka di tab baru.
              </p>
              <div className="pt-2">
                <a
                  href={cvPath}
                  download="CV_Bernhardth_Neo_Videan.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-[#F5F5F3] font-mono text-xs uppercase tracking-wider rounded-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PDF</span>
                </a>
              </div>
            </div>
          </iframe>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}
