"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const TypewriterEffect = ({ text, startDelay = 0 }: { text: string; startDelay?: number }) => {
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
      }, 100);
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timer);
    };
  }, [text, startDelay]);

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

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / 34); // reach 100 in ~3.4s
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 900);
    }, 3400);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: "blur(10px)",
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      }
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
          {/* Background gradient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl" />
          </div>

          {/* Centered content */}
          <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 sm:gap-10 md:gap-12">

              {/* Icons Row */}
              <motion.div
                className="flex justify-center gap-5 sm:gap-8 md:gap-12"
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

              {/* Welcome Text */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <h1 className="font-bold leading-tight">
                  <div className="text-4xl sm:text-5xl md:text-7xl mb-2 sm:mb-3">
                    {["Welcome", "To", "My"].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                        className={`inline-block px-2 ${isLight ? "" : "bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"}`}
                        style={isLight ? { color: "var(--text-primary)" } : {}}
                      >
                        {word}
                      </motion.span>
                    ))}{' '}
                  </div>
                  <div className="text-4xl sm:text-5xl md:text-7xl">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                      className="inline-block px-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                    >
                      Portfolio
                    </motion.span>{' '}
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                      className="inline-block px-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
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
                  <div className="relative flex items-center gap-2 text-xl sm:text-2xl md:text-3xl">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 flex-shrink-0" />
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-semibold tracking-wide">
                      <TypewriterEffect text="abimanyudans.com" startDelay={1600} />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Loading Progress Bar */}
              <motion.div
                className="w-full max-w-xs sm:max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Loading</span>
                  <span className="text-xs text-indigo-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: isLight ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
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
