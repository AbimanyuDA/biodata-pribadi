"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            style={{ position: "fixed" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 overflow-y-auto"
            style={{ position: "fixed" }}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 bg-white dark:bg-slate-900">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-black dark:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-black dark:text-white">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
