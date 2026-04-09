"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Lock body scroll saat modal terbuka (fix PC scroll-through bug) ──
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ── Isolasi mouse-wheel agar tidak bocor ke halaman di belakang modal ──
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = contentRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop === 0 && e.deltaY < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
    if (!atTop && !atBottom) {
      e.stopPropagation();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden"
          >
            {/* Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/20 rounded-2xl blur-2xl -z-10"
            />

            {/* Main Card */}
            <div className="relative bg-slate-950/95 dark:bg-black/95 border border-slate-700/50 dark:border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col max-h-[90vh]">
              {/* Top accent line */}
              <motion.div
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 left-1/2 h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-x-1/2 origin-center"
              />

              {/* Header — fixed, tidak ikut scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative px-8 py-5 flex items-center justify-between border-b border-slate-700/30 shrink-0"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-bold text-white tracking-tight line-clamp-2 pr-4"
                >
                  {title}
                </motion.h2>

                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                  whileHover={{ scale: 1.12, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                  whileTap={{ scale: 0.92 }}
                  className="flex-shrink-0 p-2.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" strokeWidth={2.5} />
                </motion.button>
              </motion.div>

              {/* Content — scroll terisolasi HANYA di sini */}
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onWheel={handleWheel}
                className="relative p-8 md:p-10 overflow-y-auto flex-1"
                style={{ overscrollBehavior: "contain" }}
              >
                <div className="relative z-10 text-slate-200 space-y-4">
                  {children}
                </div>
              </motion.div>

              {/* Bottom accent line */}
              <motion.div
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-0 left-1/2 h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-x-1/2 origin-center"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
