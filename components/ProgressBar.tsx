"use client";
import { motion } from "framer-motion";

export function ProgressBar({
  value,
  label,
  isOther,
}: {
  value: number;
  label: string;
  isOther?: boolean;
}) {
  if (isOther) {
    return (
      <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
        <span className="text-sm text-black/60 dark:text-white/60 italic">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
