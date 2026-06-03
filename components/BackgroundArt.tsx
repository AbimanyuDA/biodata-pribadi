"use client";
import React, { useEffect, useRef } from "react";

export function BackgroundArt() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialPositions = [
    { x: -20, y: 0 },
    { x: -20, y: 0 },
    { x: 100, y: -40 },
    { x: 100, y: -40 },
  ];

  useEffect(() => {
    // Disable scroll-driven blob animation on mobile/touch devices to save GPU
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ticking = false;

    const updatePosition = () => {
      const newScroll = window.pageYOffset;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initialPos = initialPositions[index] || { x: 0, y: 0 };

        const xOffset = Math.sin(newScroll / 150 + index * 0.5) * 180;
        const yOffset = Math.cos(newScroll / 150 + index * 0.5) * 30;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.4s ease-out";
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      <div className="absolute inset-0">
        {/* Top-Left Purple Blob — no mix-blend-multiply (too expensive on mobile GPU) */}
        <div
          ref={(ref) => { blobRefs.current[0] = ref; }}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-600 rounded-full filter blur-[120px] opacity-15 md:opacity-[0.12]"
        />
        {/* Top-Right Cyan Blob */}
        <div
          ref={(ref) => { blobRefs.current[1] = ref; }}
          className="absolute top-0 right-10 w-96 h-96 bg-cyan-600 rounded-full filter blur-[120px] opacity-15 md:opacity-[0.12] hidden sm:block"
        />
        {/* Bottom-Left Blue Blob */}
        <div
          ref={(ref) => { blobRefs.current[2] = ref; }}
          className="absolute bottom-20 left-[-20%] md:left-10 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-15 md:opacity-[0.12]"
        />
        {/* Bottom-Right Indigo Blob */}
        <div
          ref={(ref) => { blobRefs.current[3] = ref; }}
          className="absolute -bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full filter blur-[120px] opacity-10 md:opacity-[0.08] hidden sm:block"
        />
      </div>
      {/* Cosmic grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f09_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f09_1px,transparent_1px)] bg-[size:30px_30px]" />
    </div>
  );
}
