"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Brain, Database, Cpu, Layers, GitBranch } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const ORBIT_ICONS = [
  { Icon: Code2,     color: '#6366f1' },
  { Icon: Brain,     color: '#a855f7' },
  { Icon: Database,  color: '#06b6d4' },
  { Icon: Cpu,       color: '#f59e0b' },
  { Icon: Layers,    color: '#10b981' },
  { Icon: GitBranch, color: '#ec4899' },
];

const LOADING_STEPS = ['Assets', 'Styles', 'Scripts', 'Ready'];

interface WelcomeScreenProps {
  onLoadingComplete: () => void;
}

export default function WelcomeScreen({ onLoadingComplete }: WelcomeScreenProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  // Particles generated client-side only to avoid SSR/hydration mismatch
  const [particles, setParticles] = useState<{
    id: number; x: number; y: number; size: number;
    dur: number; delay: number; opacity: number;
    driftX: number; driftY: number; color: string;
  }[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      dur: 12 + Math.random() * 10,
      delay: Math.random() * 6,
      opacity: 0.12 + Math.random() * 0.25,
      driftX: (Math.random() - 0.5) * 50,
      driftY: -(20 + Math.random() * 35),
      color: ['#6366f1', '#a855f7', '#06b6d4'][i % 3],
    })));
  }, []);

  // Mouse-following spotlight (desktop only)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = mouseGlowRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!el || !rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.background = `radial-gradient(480px at ${x}% ${y}%, rgba(99,102,241,0.11) 0%, transparent 65%)`;
  }, []);

  // Cycle through orbit icons in the center
  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % ORBIT_ICONS.length);
    }, 600);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 100 / 34;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, 3400);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [onLoadingComplete]);

  const orbitR = 90;
  const orbitDiameter = orbitR * 2;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeInOut' } }}
          onMouseMove={handleMouseMove}
        >
          {/* Mouse spotlight layer */}
          <div
            ref={mouseGlowRef}
            className="absolute inset-0 pointer-events-none transition-all duration-150"
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99,102,241,${isLight ? '0.07' : '0.04'}) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99,102,241,${isLight ? '0.07' : '0.04'}) 1px, transparent 1px)
              `,
              backgroundSize: '44px 44px',
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
              <motion.span
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                }}
                animate={{
                  x: [0, p.driftX, 0],
                  y: [0, p.driftY, 0],
                  opacity: [p.opacity, p.opacity * 2.2, p.opacity],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Corner bracket decorations */}
          {(['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'] as const).map((pos, ci) => (
            <motion.div
              key={ci}
              className={`absolute ${pos} w-7 h-7 sm:w-9 sm:h-9`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.35, scale: 1 }}
              transition={{ delay: 0.05 + ci * 0.06, duration: 0.4 }}
            >
              <div
                className="absolute w-full h-px bg-gradient-to-r from-indigo-500 to-transparent"
                style={{
                  top: ci < 2 ? 0 : 'auto',
                  bottom: ci >= 2 ? 0 : 'auto',
                  transform: ci % 2 === 1 ? 'scaleX(-1)' : undefined,
                }}
              />
              <div
                className="absolute h-full w-px bg-gradient-to-b from-indigo-500 to-transparent"
                style={{
                  left: ci % 2 === 0 ? 0 : 'auto',
                  right: ci % 2 === 1 ? 0 : 'auto',
                  transform: ci >= 2 ? 'scaleY(-1)' : undefined,
                }}
              />
            </motion.div>
          ))}

          {/* ── Main content ── */}
          <div className="relative h-full flex flex-col items-center justify-center gap-5 sm:gap-7 px-4">

            {/* Orbit + Avatar */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: orbitDiameter + 40, height: orbitDiameter + 40 }}
            >
              {/* Dashed orbit track */}
              <div
                className="absolute rounded-full border border-dashed"
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: 'rgba(99,102,241,0.22)',
                }}
              />

              {/* Second faint ring */}
              <div
                className="absolute rounded-full border"
                style={{
                  width: orbitDiameter + 24,
                  height: orbitDiameter + 24,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: 'rgba(168,85,247,0.08)',
                }}
              />

              {/* Rotating icon container */}
              <motion.div
                className="absolute"
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: '50%',
                  left: '50%',
                  marginTop: -orbitR,
                  marginLeft: -orbitR,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {ORBIT_ICONS.map(({ Icon, color }, i) => {
                  const angle = (i / ORBIT_ICONS.length) * Math.PI * 2 - Math.PI / 2;
                  const cx = orbitR + Math.cos(angle) * orbitR - 14;
                  const cy = orbitR + Math.sin(angle) * orbitR - 14;
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: cx, top: cy, width: 28, height: 28 }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center border backdrop-blur-sm"
                        style={{
                          backgroundColor: `${color}18`,
                          borderColor: `${color}45`,
                          boxShadow: `0 0 8px ${color}28`,
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Pulsing glow dot on orbit track */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 6, height: 6,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  top: '50%',
                  left: '50%',
                  boxShadow: '0 0 8px rgba(99,102,241,0.8)',
                }}
                animate={{
                  rotate: [0, 360],
                  x: [0, orbitR, 0, -orbitR, 0],
                  y: [-orbitR, 0, orbitR, 0, -orbitR],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center — cycling icon */}
              <motion.div
                className="relative z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.45, duration: 0.8 }}
              >
                {/* Pulsing glow — colour follows active icon */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ filter: 'blur(14px)' }}
                  animate={{
                    background: ORBIT_ICONS[activeIcon].color,
                    opacity: [0.35, 0.6, 0.35],
                    scale: [1, 1.18, 1],
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                <div
                  className="relative w-16 h-16 sm:w-[80px] sm:h-[80px] rounded-full flex items-center justify-center overflow-hidden select-none"
                  style={{
                    background: 'linear-gradient(145deg, #0f0c29 0%, #1e1b4b 60%, #0f0c29 100%)',
                    border: `2px solid ${ORBIT_ICONS[activeIcon].color}70`,
                    boxShadow: `0 0 28px ${ORBIT_ICONS[activeIcon].color}35, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    transition: 'border-color 0.4s, box-shadow 0.4s',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIcon}
                      initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.4, rotate: 30 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      {React.createElement(ORBIT_ICONS[activeIcon].Icon, {
                        className: 'w-7 h-7 sm:w-8 sm:h-8',
                        style: { color: ORBIT_ICONS[activeIcon].color },
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Title + tags + domain */}
            <div className="text-center space-y-2.5">
              <h1 className="font-bold leading-tight">
                {/* Row 1: Welcome To My */}
                <div className="flex justify-center gap-1.5 sm:gap-2 text-2xl sm:text-4xl md:text-5xl mb-1">
                  {['Welcome', 'To', 'My'].map((word, i) => (
                    <motion.span
                      key={word}
                      className={isLight ? 'inline-block' : 'inline-block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'}
                      style={isLight ? { color: 'var(--text-primary)' } : {}}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.15, duration: 0.45 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                {/* Row 2: Portfolio Website */}
                <div className="flex justify-center gap-2 sm:gap-3 text-2xl sm:text-4xl md:text-5xl">
                  {['Portfolio', 'Website'].map((word, i) => (
                    <motion.span
                      key={word}
                      className="inline-block bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.18, duration: 0.45 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </h1>

              {/* Role chips */}
              <motion.div
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.5 }}
              >
                {['AI Engineer', 'Full-Stack Dev', 'Data Scientist'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium"
                    style={{
                      background: isLight ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.14)',
                      border: '1px solid rgba(99,102,241,0.32)',
                      color: isLight ? '#4f46e5' : '#a5b4fc',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.45 + i * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Domain */}
              <motion.div
                className="flex items-center justify-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.75, duration: 0.5 }}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  abimanyudans.com
                </span>
              </motion.div>
            </div>

            {/* Progress section */}
            <motion.div
              className="w-full max-w-[260px] sm:max-w-[300px] space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {/* Label row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="block w-1.5 h-1.5 rounded-full bg-indigo-500"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                  <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                    Initializing
                  </span>
                </div>
                <motion.span
                  className="text-xs font-mono text-indigo-400 tabular-nums"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  {Math.min(Math.round(progress), 100)}%
                </motion.span>
              </div>

              {/* Bar */}
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: isLight ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, #4f46e5, #a855f7, #4f46e5)', backgroundSize: '200% 100%' }}
                  />
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', backgroundSize: '60px 100%' }}
                    animate={{ backgroundPosition: ['-60px 0', '300px 0'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>

              {/* Step labels */}
              <div className="flex justify-between">
                {LOADING_STEPS.map((step, i) => (
                  <span
                    key={step}
                    className="text-[9px] sm:text-[10px] font-mono transition-colors duration-500"
                    style={{ color: progress >= (i + 1) * 25 ? '#818cf8' : 'var(--text-muted)' }}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
