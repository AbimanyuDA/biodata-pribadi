"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

// Pre-computed particle positions (no Math.random in render = SSR safe)
const PARTICLES = [
  { left: 5,  top: 18, delay: 0,   duration: 3.5, size: 3 },
  { left: 92, top: 12, delay: 0.8, duration: 4.2, size: 4 },
  { left: 10, top: 72, delay: 1.5, duration: 3.8, size: 3 },
  { left: 88, top: 65, delay: 0.3, duration: 4.5, size: 5 },
  { left: 48, top: 5,  delay: 1.1, duration: 3.2, size: 3 },
  { left: 3,  top: 45, delay: 1.8, duration: 4.0, size: 4 },
  { left: 96, top: 48, delay: 0.5, duration: 3.6, size: 3 },
  { left: 22, top: 90, delay: 1.3, duration: 4.8, size: 4 },
  { left: 75, top: 88, delay: 0.9, duration: 3.9, size: 3 },
  { left: 60, top: 3,  delay: 0.2, duration: 4.3, size: 5 },
];

const LOADING_MESSAGES = [
  "Initializing...",
  "Loading assets...",
  "Setting up...",
  "Almost ready...",
  "Done!",
];

const TypewriterEffect = ({ text, startDelay = 0, speed = 100 }: { text: string; startDelay?: number; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setInterval>;

    const delayTimeout = setTimeout(() => {
      timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timer);
    };
  }, [text, startDelay, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
};

const IconButton = ({ Icon, isLight }: { Icon: React.ComponentType<any>; isLight: boolean }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div
      className="relative p-3 sm:p-4 backdrop-blur-sm rounded-full border"
      style={{
        backgroundColor: isLight ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
        borderColor: isLight ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.1)",
      }}
    >
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" style={{ color: isLight ? "#4f46e5" : "white" }} />
    </div>
  </div>
);

interface WelcomeScreenProps {
  onLoadingComplete: () => void;
}

export default function WelcomeScreen({ onLoadingComplete }: WelcomeScreenProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingMessage = LOADING_MESSAGES[
    Math.min(Math.floor((progress / 100) * (LOADING_MESSAGES.length - 1)), LOADING_MESSAGES.length - 1)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / 34);
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, 3400);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.04,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          style={{ backgroundColor: "var(--bg-primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Floating particles */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-400/50 pointer-events-none"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
              animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Background gradient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], x: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], x: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Centered content */}
          <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 overflow-hidden">
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 sm:gap-10 md:gap-12">

              {/* Icons Row with rotating rings */}
              <div className="relative flex items-center justify-center">
                {/* Outer ring */}
                <motion.div
                  className="absolute rounded-full border border-dashed pointer-events-none"
                  style={{
                    width: 220, height: 220,
                    borderColor: isLight ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.2)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner ring */}
                <motion.div
                  className="absolute rounded-full border border-dashed pointer-events-none"
                  style={{
                    width: 155, height: 155,
                    borderColor: isLight ? "rgba(168,85,247,0.15)" : "rgba(168,85,247,0.18)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                />
                {/* Orbiting dot on outer ring */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-indigo-500/70 pointer-events-none"
                  style={{ top: "50%", left: "50%" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute -top-[110px] left-[-4px] w-2 h-2 rounded-full bg-indigo-400" />
                </motion.div>
                {/* Orbiting dot on inner ring */}
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/70 pointer-events-none"
                  style={{ top: "50%", left: "50%" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute -top-[77.5px] left-[-3px] w-1.5 h-1.5 rounded-full bg-purple-400" />
                </motion.div>

                <motion.div
                  className="flex justify-center gap-4 sm:gap-8 md:gap-12 relative z-10"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {[Code2, User, Github].map((Icon, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <IconButton Icon={Icon} isLight={isLight} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Welcome Text */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <h1 className="font-bold leading-tight">
                  <div className="text-3xl sm:text-5xl md:text-7xl mb-2 sm:mb-3">
                    {["Welcome", "To", "My"].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                        className={`inline-block px-1 sm:px-2 ${isLight ? "" : "bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"}`}
                        style={isLight ? { color: "var(--text-primary)" } : {}}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                  <div className="text-3xl sm:text-5xl md:text-7xl">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                      className="inline-block px-1 sm:px-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                    >
                      Portfolio
                    </motion.span>{' '}
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                      className="inline-block px-1 sm:px-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                    >
                      Website
                    </motion.span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link / Typewriter */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="absolute inset-0 rounded-full border border-indigo-500/30" />
                  <div className="relative flex items-center gap-2 text-base sm:text-2xl md:text-3xl">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 flex-shrink-0" />
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-semibold tracking-wide">
                      <TypewriterEffect text="abimanyudans.com" startDelay={1600} speed={100} />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Loading Progress Bar — enhanced */}
              <motion.div
                className="w-full max-w-xs sm:max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                {/* Status message */}
                <div className="flex items-center justify-between mb-2">
                  <motion.span
                    key={loadingMessage}
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--text-muted)" }}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loadingMessage}
                  </motion.span>
                  <span className="text-xs text-indigo-400 font-mono tabular-nums">
                    {Math.min(Math.round(progress), 100)}%
                  </span>
                </div>

                {/* Bar track */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden relative"
                  style={{ backgroundColor: isLight ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.06)" }}
                >
                  {/* Fill */}
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: "linear-gradient(to right, #6366f1, #a855f7, #6366f1)",
                    }}
                    transition={{ ease: "linear" }}
                  >
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                      }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
                    />
                  </motion.div>

                  {/* Glow dot at tip */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_6px_2px_rgba(168,85,247,0.6)]"
                    style={{ left: `calc(${Math.min(progress, 100)}% - 5px)` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
