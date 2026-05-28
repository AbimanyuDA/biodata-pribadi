"use client";
import { useLanguage } from "../LanguageProvider";
import { useTheme } from "../ThemeProvider";
import { t, tx } from "../../utils/translations";

const categoryColors: Record<string, string> = {
  // ID categories
  Beasiswa: "from-yellow-400/20 to-amber-500/20 border-yellow-400/30 text-yellow-300",
  Wirausaha: "from-emerald-400/20 to-green-500/20 border-emerald-400/30 text-emerald-300",
  Kepemimpinan: "from-blue-400/20 to-indigo-500/20 border-blue-400/30 text-blue-300",
  // EN categories
  Scholarship: "from-yellow-400/20 to-amber-500/20 border-yellow-400/30 text-yellow-300",
  Entrepreneurship: "from-emerald-400/20 to-green-500/20 border-emerald-400/30 text-emerald-300",
  Leadership: "from-blue-400/20 to-indigo-500/20 border-blue-400/30 text-blue-300",
};

export function ExperienceAchievements() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const items = t.experience.items;

  return (
    <section
      id="experience"
      className="section text-white"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="text-3xl md:text-5xl font-bold pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            {tx(t.experience.title, lang)}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mt-2">
            {tx(t.experience.subtitle, lang)}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6366f1] via-[#a855f7] to-[#6366f1] opacity-30" />

          <div className="space-y-8 sm:space-y-10">
            {items.map((it, idx) => {
              const category = tx(it.category, lang);
              return (
                <div
                  key={idx}
                  className="relative pl-14 sm:pl-16"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={idx * 80}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[14px] sm:left-[18px] top-5 w-4 h-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] border-2 shadow-[0_0_12px_rgba(99,102,241,0.6)] z-10" style={{ borderColor: "var(--bg-primary)" }} />

                  {/* Card */}
                  <div
                    className="group relative rounded-2xl border p-5 sm:p-6 backdrop-blur-lg transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6366f1]/15 text-indigo-300 border border-[#6366f1]/30">
                        {it.year}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-gradient-to-r ${
                          categoryColors[category] ?? "from-gray-400/20 to-gray-500/20 border-gray-400/30 text-gray-300"
                        }`}
                      >
                        {category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-base sm:text-lg md:text-xl mb-2 leading-tight group-hover:text-indigo-300 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {tx(it.title, lang)}
                    </h3>

                    {/* Detail */}
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {tx(it.detail, lang)}
                    </p>

                    {/* Bottom bar */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">
                        {tx(it.highlight, lang)}
                      </span>
                      <div className="w-8 h-[2px] bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
