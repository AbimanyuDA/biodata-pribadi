"use client";
import React, { memo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageProvider";
import { t, tx } from "../../utils/translations";

const Header = memo(({ lang }: { lang: string }) => (
  <div className="text-center mb-8 px-4">
    <h2
      className="text-3xl md:text-5xl font-bold pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      {tx(t.about.title, lang as any)}
    </h2>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-4 h-4 text-purple-400" />
      {tx(t.about.subtitle, lang as any)}
      <Sparkles className="w-4 h-4 text-purple-400" />
    </p>
  </div>
));
Header.displayName = "Header";


const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center py-4 lg:py-0">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds - disabled on mobile, active on desktop */}
      <div className="absolute -inset-6 opacity-20 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
      </div>

      <div className="relative">
        <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-[0_0_30px_rgba(120,119,198,0.25)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          
          <img
            src="/images/about/abimanyu2.jpg"
            alt="Abimanyu Danendra"
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "https://placehold.co/400x400/1e293b/94a3b8?text=Abimanyu";
            }}
          />
        </div>
      </div>
    </div>
  </div>
));
ProfileImage.displayName = "ProfileImage";

interface StatCardProps {
  icon: React.ComponentType<any>;
  color: string;
  value: string | number;
  label: string;
  description: string;
  animation: string;
}

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }: StatCardProps) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group h-full">
    <div
      className="relative z-10 backdrop-blur-lg rounded-2xl p-5 border overflow-hidden transition-all duration-300 hover:scale-105 hover:border-indigo-500/40 flex flex-col justify-between h-full"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

      <div className="flex items-center justify-between mb-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-6"
          style={{ backgroundColor: "var(--glow-primary)" }}
        >
          <Icon className="w-6 h-6" style={{ color: "#6366f1" }} />
        </div>
        <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          {value}
        </span>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-secondary)" }}>
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
          <ArrowUpRight className="w-3.5 h-3.5 transition-colors" style={{ color: "var(--text-muted)" }} />
        </div>
      </div>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

export function About() {
  const { lang } = useLanguage();

  const statsData = [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: 12,
      label: tx(t.about.stat1Label, lang),
      description: "Innovative digital solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: 5,
      label: "Awards",
      description: "Competitions and entrepreneurship",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: "2+",
      label: tx(t.about.stat2Label, lang),
      description: "AI, fullstack dev & analytics",
      animation: "fade-left",
    },
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Header lang={lang} />

      <div className="w-full mx-auto pt-4 md:pt-8 relative">
        {/* Stack: photo first on mobile, then text. Side-by-side on lg */}
        <div className="flex flex-col lg:grid lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">

          {/* Profile Photo — shows first on mobile (order-1), right on desktop */}
          <div className="order-1 lg:order-2 w-full flex justify-center">
            <ProfileImage />
          </div>

          {/* Biography — shows second on mobile (order-2), left on desktop */}
          <div className="order-2 lg:order-1 space-y-5 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {tx(t.about.greeting, lang)}
              </span>
              <span
                className="block mt-1 text-2xl sm:text-3xl font-extrabold"
                style={{ color: "var(--text-primary)" }}
                data-aos="fade-up"
                data-aos-duration="1300"
              >
                Abimanyu Danendra Andarfebano
              </span>
            </h3>

            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              {tx(t.about.bio, lang)}
            </p>

            {/* Quote Bubble */}
            <div
              className="relative rounded-2xl p-4 backdrop-blur-md overflow-hidden border"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent, rgba(168,85,247,0.08))",
                borderColor: "rgba(99,102,241,0.35)",
              }}
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              <div className="absolute top-2 right-4 w-10 h-10 bg-[#6366f1]/10 rounded-full blur-xl"></div>
              <div className="absolute top-3 left-3 text-[#6366f1] opacity-40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <blockquote className="italic font-medium text-xs sm:text-sm pl-6 relative z-10" style={{ color: "var(--text-secondary)" }}>
                "{tx(t.about.quote, lang)}"
              </blockquote>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center lg:justify-start">
              <a
                href="mailto:abimanyudans@gmail.com"
                className="w-full sm:w-auto"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20 text-sm">
                  <FileText className="w-4 h-4" /> {tx(t.about.cta1, lang)}
                </button>
              </a>
              <a
                href="#portfolio"
                className="w-full sm:w-auto"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#a855f7]/40 text-[#c084fc] font-semibold transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 hover:bg-[#a855f7]/10 text-sm">
                  <Code className="w-4 h-4" /> {tx(t.about.cta2, lang)}
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <a href="#portfolio" className="block mt-10 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}
