"use client";
import { motion } from "framer-motion";

export function BackgroundArt() {
  const blobs = [
    {
      size: 420,
      color: "rgba(37, 99, 235, 0.12)",
      x: "10%",
      y: "8%",
      duration: 18,
    },
    {
      size: 360,
      color: "rgba(16, 185, 129, 0.12)",
      x: "78%",
      y: "14%",
      duration: 22,
    },
    {
      size: 480,
      color: "rgba(124, 58, 237, 0.10)",
      x: "50%",
      y: "70%",
      duration: 26,
    },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            top: b.y,
            left: b.x,
          }}
          animate={{
            x: ["0%", "4%", "-3%", "2%", "0%"],
            y: ["0%", "-3%", "3%", "-2%", "0%"],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
