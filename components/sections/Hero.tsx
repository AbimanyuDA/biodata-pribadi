"use client";
import { motion } from "framer-motion";
import { staggerChildren, fadeUp, parallaxText } from "../../utils/animations";
import { MagneticButton } from "../MagneticButton";
import {
  ArrowRight,
  Mail,
  Instagram,
  Linkedin,
  Github,
  Code2,
  Zap,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let timer = setInterval(() => {
      start += Math.ceil(end / 20);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-poppins font-bold">
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="section min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Animated floating background elements */}
      <motion.div
        className="absolute -left-6 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 top-24 h-32 w-32 rounded-full bg-emerald-300/30 blur-3xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/2 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full relative z-10">
        <motion.div
          variants={staggerChildren(0.06)}
          initial="initial"
          animate="animate"
          className="glass-panel p-8 md:p-12 relative"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.3em] text-xs text-black/60 dark:text-white/60 mb-4"
          >
            Biodata Pribadi
          </motion.p>
          <motion.h1
            variants={parallaxText(30)}
            className="font-poppins text-5xl md:text-7xl tracking-tight mb-6 bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent"
          >
            Abimanyu Danendra Andarfebano
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mb-8"
          >
            Fullstack Developer | Data, Finance, and Investment
          </motion.p>

          {/* Animated Metrics */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-black/10 dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-cyan-500/20 dark:bg-cyan-500/30">
                <Code2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">
                  <AnimatedCounter value={6} suffix="+" />
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  Projects
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/20 dark:bg-blue-500/30">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">
                  <AnimatedCounter value={2} suffix="+" />
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  Years Exp
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/20 dark:bg-purple-500/30">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">
                  <AnimatedCounter value={5} suffix="+" />
                </div>
                <p className="text-xs text-black/60 dark:text-white/60">
                  Achievements
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href="#portfolio"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50"
            >
              View Portofolio <ArrowRight className="ml-2 h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="mailto:abimanyudans@gmail.com"
              className="bg-black/80 dark:bg-white/20 text-white hover:bg-black/90 dark:hover:bg-white/30 hover:shadow-lg"
            >
              Contact <Mail className="ml-2 h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 mt-8">
            <motion.a
              href="https://www.instagram.com/abimanyudans"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-pink-500/10 dark:bg-pink-500/30 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-orange-500/20 dark:hover:from-pink-500/50 dark:hover:to-orange-500/50 transition-all duration-300 shadow-lg dark:shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/50"
              aria-label="Instagram"
            >
              <Instagram
                className="h-5 w-5 text-pink-600 dark:text-white"
                strokeWidth={1.5}
              />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/abimanyudans/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-blue-500/10 dark:bg-blue-500/30 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 dark:hover:from-blue-500/50 dark:hover:to-cyan-500/50 transition-all duration-300 shadow-lg dark:shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50"
              aria-label="LinkedIn"
            >
              <Linkedin
                className="h-5 w-5 text-blue-600 dark:text-white"
                strokeWidth={1.5}
              />
            </motion.a>
            <motion.a
              href="https://github.com/abimanyuda"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-slate-400/10 dark:bg-slate-700/50 border border-slate-300/30 dark:border-slate-500/50 hover:bg-gradient-to-br hover:from-slate-600/20 hover:to-slate-700/20 dark:hover:from-slate-600/50 dark:hover:to-slate-700/50 transition-all duration-300 shadow-lg dark:shadow-slate-600/40 hover:shadow-xl hover:shadow-slate-600/50"
              aria-label="GitHub"
            >
              <Github
                className="h-5 w-5 text-slate-800 dark:text-white"
                strokeWidth={1.5}
                fill="white"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
