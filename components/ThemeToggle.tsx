"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      onClick={toggle}
      suppressHydrationWarning
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
        isDark
          ? "bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 border-2 border-cyan-400/50 text-white shadow-lg shadow-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/50"
          : "bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300/50 text-amber-900 shadow-lg shadow-amber-300/30 hover:shadow-xl hover:shadow-amber-300/50"
      }`}
    >
      <motion.div
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </motion.div>
      <span className="hidden sm:inline font-semibold">
        {isDark ? "Light" : "Dark"}
      </span>
    </motion.button>
  );
}
