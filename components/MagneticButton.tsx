"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  as?: "button" | "a";
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

export function MagneticButton({
  children,
  className,
  disabled = false,
  as = "button",
  onMouseMove: externalOnMove,
  onMouseLeave: externalOnLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  
  const onMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const my = (e.clientY - rect.top - rect.height / 2) * 0.2;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
    externalOnMove?.(e);
  };
  
  const onLeave = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
    externalOnLeave?.(e);
  };

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave as any}
      suppressHydrationWarning
      disabled={disabled && as === "button"}
      className={`button-magnetic relative inline-flex items-center justify-center rounded-full px-6 py-3 bg-accent text-white shadow-soft transition-transform ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className ?? ""}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...(props as any)}
    >
      <span className="magnet" />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
