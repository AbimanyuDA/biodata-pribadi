"use client";
import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { X, Download } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface CVModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  downloadLabel: string;
  closeLabel: string;
}

export default function CVModal({ open, onClose, title, downloadLabel, closeLabel }: CVModalProps) {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  useEffect(() => {
    if (!open) return;
    const container = pageContainerRef.current;
    if (!container) return;

    const updateWidth = () => setPageWidth(container.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center sm:p-8 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full h-full sm:h-[85vh] sm:max-w-3xl sm:rounded-2xl border-0 sm:border overflow-hidden flex flex-col shadow-2xl"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm sm:text-base font-semibold truncate" style={{ color: "var(--text-primary)" }}>{title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/CV.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              <Download className="w-4 h-4" />
              {downloadLabel}
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="p-1.5 rounded-lg border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={pageContainerRef} data-lenis-prevent className="flex-1 w-full overflow-y-auto overflow-x-hidden" style={{ backgroundColor: "#525659" }}>
          {pageWidth > 0 && (
            <Document file="/CV.pdf" onLoadSuccess={({ numPages: total }) => setNumPages(total)} loading={null}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  width={pageWidth}
                  className="border-b"
                  renderAnnotationLayer={false}
                  loading={null}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
