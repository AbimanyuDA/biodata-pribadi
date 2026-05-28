"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { t, tx } from "../utils/translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lenis = useLenis();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();

  const navItems = [
    { href: "#hero",       label: tx(t.nav.home, lang) },
    { href: "#about",      label: tx(t.nav.about, lang) },
    { href: "#experience", label: tx(t.nav.experience, lang) },
    { href: "#portfolio",  label: tx(t.nav.portfolio, lang) },
    { href: "#blog",       label: tx(t.nav.blog, lang) },
    { href: "#contact",    label: tx(t.nav.contact, lang) },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          return {
            id: item.href.replace("#", ""),
            offset: (el as HTMLElement).offsetTop - 200,
            height: (el as HTMLElement).offsetHeight,
          };
        }
        return null;
      }).filter((s): s is NonNullable<typeof s> => s !== null);

      const currentPosition = window.scrollY;
      const active = sections.find(
        (s) => currentPosition >= s.offset && currentPosition < s.offset + s.height
      );
      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang]); // re-run when lang changes so labels update

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflowY = "";
      if (lenis) lenis.start();
    }
  }, [isOpen, lenis]);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = (section as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const isLight = theme === "light";

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? isLight ? "bg-[#f3f2ff]" : "bg-[#030014]"
          : scrolled
          ? isLight
            ? "bg-[#f3f2ff]/80 backdrop-blur-xl border-b border-indigo-100/60 shadow-sm"
            : "bg-[#030014]/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="text-lg font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent hover:scale-105 transform transition-transform"
            >
              @abimanyudans
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="group relative px-1 py-2 text-sm font-semibold transition-colors duration-300"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold"
                      : isLight
                        ? "text-gray-600 group-hover:text-indigo-600"
                        : "text-[#e2d3fd] group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}

            {/* Controls: Theme + Language */}
            <div className="flex items-center gap-2 ml-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                title={lang === "id" ? "Switch to English" : "Ganti ke Indonesia"}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                  isLight
                    ? "border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50"
                    : "border-white/15 bg-white/5 text-[#e2d3fd] hover:bg-white/10"
                }`}
              >
                <span className={lang === "id" ? "text-indigo-500 font-extrabold" : "opacity-50"}>ID</span>
                <span className="opacity-30 mx-0.5">/</span>
                <span className={lang === "en" ? "text-indigo-500 font-extrabold" : "opacity-50"}>EN</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  isLight
                    ? "border-indigo-200 bg-white text-amber-500 hover:bg-amber-50"
                    : "border-white/15 bg-white/5 text-[#e2d3fd] hover:bg-white/10"
                }`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile: controls + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Toggle (mobile) */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all duration-300 ${
                isLight
                  ? "border-indigo-200 bg-white text-indigo-600"
                  : "border-white/15 bg-white/5 text-[#e2d3fd]"
              }`}
            >
              <span className={lang === "id" ? "text-indigo-400 font-extrabold" : "opacity-50"}>ID</span>
              <span className="opacity-30">/</span>
              <span className={lang === "en" ? "text-indigo-400 font-extrabold" : "opacity-50"}>EN</span>
            </button>

            {/* Theme Toggle (mobile) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isLight
                  ? "border-indigo-200 bg-white text-amber-500"
                  : "border-white/15 bg-white/5 text-[#e2d3fd]"
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 transition-transform duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              } ${isLight ? "text-gray-700" : "text-[#e2d3fd]"}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden absolute w-full left-0 border-b transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 overflow-hidden"
        } ${isLight ? "bg-[#f3f2ff] border-indigo-100" : "bg-[#030014] border-white/10"}`}
      >
        <div className="px-6 space-y-2">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease ${
                activeSection === item.href.substring(1)
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                  : isLight
                    ? "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    : "text-[#e2d3fd] hover:text-white hover:bg-white/5"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
