"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ExternalLink, Sparkles, Award, Code2, Zap, Instagram, FileText, X, Download } from "lucide-react";
import { useLanguage } from "../LanguageProvider";
import { useTheme } from "../ThemeProvider";
import { t, tx } from "../../utils/translations";

const StatusBadge = memo(({ lang }: { lang: string }) => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
      <div className="relative px-4 py-1.5 rounded-full backdrop-blur-xl border border-[#6366f1]/30" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text text-xs sm:text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
          {tx(t.hero.badge, lang as any)}
        </span>
      </div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(({ isLight }: { isLight: boolean }) => (
  <div className="space-y-1" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span
          className={`relative ${isLight ? "" : "bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"}`}
          style={isLight ? { color: "var(--text-primary)" } : {}}
        >
          AI &amp; Software
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Engineer
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = "MainTitle";

const CTAButton = memo(({ href, text, icon: Icon, isLight }: { href: string; text: string; icon: React.ComponentType<any>; isLight: boolean }) => (
  <a href={href} className="group relative flex-1 sm:flex-none sm:w-[140px]">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur-md group-hover:opacity-100 transition-all duration-700"></div>
    <div
      className="relative h-11 rounded-lg flex items-center justify-center gap-2 overflow-hidden border transition-all duration-300"
      style={{
        background: isLight ? "linear-gradient(to right, #4f52c9, #8644c5)" : "#030014",
        borderColor: isLight ? "transparent" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-white/10"></div>
      <span style={{ color: "white" }} className="relative flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300">
        {text}
        <Icon style={{ color: "white" }} className={`w-4 h-4 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300`} />
      </span>
    </div>
  </a>
));
CTAButton.displayName = "CTAButton";

const CVButton = memo(({ text, isLight, onClick }: { text: string; isLight: boolean; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="group relative flex-1 sm:flex-none sm:w-[140px]">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur-md group-hover:opacity-100 transition-all duration-700"></div>
    <div
      className="relative h-11 rounded-lg flex items-center justify-center gap-2 overflow-hidden border transition-all duration-300"
      style={{
        background: isLight ? "#ffffff" : "#030014",
        borderColor: isLight ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#6366f1]/10"></div>
      <span
        className="relative flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300"
        style={{ color: isLight ? "#4f52c9" : "var(--text-primary)" }}
      >
        {text}
        <FileText className="w-4 h-4 group-hover:scale-110 transform transition-all duration-300" />
      </span>
    </div>
  </button>
));
CVButton.displayName = "CVButton";

const CVModal = memo(({ open, onClose, title, downloadLabel, closeLabel }: { open: boolean; onClose: () => void; title: string; downloadLabel: string; closeLabel: string }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-3xl h-[85vh] rounded-2xl border overflow-hidden flex flex-col shadow-2xl"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-sm sm:text-base font-semibold truncate" style={{ color: "var(--text-primary)" }}>{title}</h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/CV.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              <Download className="w-4 h-4" />
              {downloadLabel}
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="p-1.5 rounded-lg border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <iframe src="/CV.pdf" title={title} className="flex-1 w-full" style={{ border: "none" }} />
      </div>
    </div>
  );
});
CVModal.displayName = "CVModal";

const SocialLink = memo(({ icon: Icon, link, label, isLight }: { icon: React.ComponentType<any>; link: string; label: string; isLight: boolean }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className="group relative p-2.5">
    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
    <div
      className="relative rounded-xl backdrop-blur-xl p-2.5 flex items-center justify-center border transition-all duration-300"
      style={{
        backgroundColor: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)",
        borderColor: isLight ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.1)",
      }}
    >
      <Icon
        className="w-5 h-5 transition-colors"
        style={{ color: isLight ? "#6366f1" : "#9ca3af" }}
      />
    </div>
  </a>
));
SocialLink.displayName = "SocialLink";

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const timer = setInterval(() => {
      start += Math.ceil(end / 10);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bold" style={{ color: "var(--text-primary)" }}>
      {count}{suffix}
    </span>
  );
}

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 1800;
const WORDS = ["AI Engineer", "Fullstack Developer", "Data Scientist", "Finance & Investment"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/abimanyuda", label: "GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/abimanyudans/", label: "LinkedIn Profile" },
  { icon: Instagram, link: "https://www.instagram.com/abimanyudans", label: "Instagram Profile" }
];

export function Hero() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  const WORDS = t.hero.words[lang];

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none animate-pulse-slow"></div>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-24 relative z-10">
        {/* Mobile: Column, Desktop: 2-column row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Left Column (Content) */}
          <div className="w-full lg:w-[52%] space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000">
            <div className="flex justify-center lg:justify-start">
              <StatusBadge lang={lang} />
            </div>
            <div className="flex justify-center lg:justify-start">
              <MainTitle isLight={isLight} />
            </div>

            {/* Typed Tagline */}
            <div className="h-8 flex items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="800">
              <span
                className="text-lg sm:text-xl md:text-2xl font-light tracking-wide"
                style={{ color: "var(--text-secondary)" }}
              >
                {text}
              </span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink flex-shrink-0"></span>
            </div>

            {/* Bio/Name text */}
            <p
              className="text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light mx-auto lg:mx-0"
              style={{ color: "var(--text-secondary)" }}
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              {tx(t.hero.bio, lang)} <strong style={{ color: "var(--text-primary)" }} className="font-semibold">Abimanyu Danendra Andarfebano</strong>. {tx(t.hero.bioText, lang)}
            </p>

            {/* Metrics Row */}
            <div
              className="grid grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-5 border-y max-w-lg mx-auto lg:mx-0"
              style={{ borderColor: "var(--border)" }}
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 text-center lg:text-left">
                <div className="p-2 rounded-lg bg-cyan-500/15 flex-shrink-0">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-base sm:text-lg md:text-xl font-bold leading-none">
                    <AnimatedCounter value={10} suffix="+" />
                  </div>
                  <p className="text-[9px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>{tx(t.hero.projects, lang)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 text-center lg:text-left">
                <div className="p-2 rounded-lg bg-blue-500/15 flex-shrink-0">
                  <Zap className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-base sm:text-lg md:text-xl font-bold leading-none">
                    <AnimatedCounter value={2} suffix="+" />
                  </div>
                  <p className="text-[9px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>{tx(t.hero.expYrs, lang)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 text-center lg:text-left">
                <div className="p-2 rounded-lg bg-purple-500/15 flex-shrink-0">
                  <Award className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-base sm:text-lg md:text-xl font-bold leading-none">
                    <AnimatedCounter value={5} suffix="+" />
                  </div>
                  <p className="text-[9px] sm:text-xs uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>{tx(t.hero.awards, lang)}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 w-full justify-center lg:justify-start max-w-lg mx-auto lg:mx-0" data-aos="fade-up" data-aos-delay="1400">
              <CTAButton href="#portfolio" text={tx(t.hero.ctaProjects, lang)} icon={ExternalLink} isLight={isLight} />
              <CTAButton href="#contact" text={tx(t.hero.ctaContact, lang)} icon={Mail} isLight={isLight} />
              <CVButton text={tx(t.hero.ctaViewCV, lang)} isLight={isLight} onClick={() => setIsCVOpen(true)} />
            </div>

            {/* Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start pt-1" data-aos="fade-up" data-aos-delay="1600">
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} isLight={isLight} />
              ))}
            </div>
          </div>

          {/* Right Column (Visual Animation GIF) */}
          <div
            className="w-full lg:w-[48%] flex items-center justify-center relative order-1 lg:order-2"
            data-aos="fade-left"
            data-aos-delay="600"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-[260px] sm:w-[360px] md:w-[420px] lg:w-full lg:max-w-[480px] opacity-95">
              {/* Glowing behind element */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${isHovering ? "opacity-60 scale-105" : "opacity-30 scale-100"
                }`} />

              <div className={`relative z-10 w-full transform transition-transform duration-500 ${isHovering ? "scale-105 rotate-1" : "scale-100"
                }`}>
                <Image
                  src="/Animation1.webp"
                  alt="Developer Animation"
                  width={480}
                  height={480}
                  priority
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <CVModal
        open={isCVOpen}
        onClose={() => setIsCVOpen(false)}
        title={tx(t.hero.ctaViewCV, lang)}
        downloadLabel={lang === "id" ? "Unduh" : "Download"}
        closeLabel={lang === "id" ? "Tutup" : "Close"}
      />
    </section>
  );
}
