"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const items = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl supports-backdrop-blur:bg-white/70 dark:supports-backdrop-blur:bg-gradient-to-r dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90",
        scrolled
          ? "border-b dark:border-cyan-400/30 border-black/10 shadow-lg dark:shadow-cyan-500/10"
          : "dark:border-cyan-400/20 border-b dark:border-b border-black/5"
      )}
    >
      <div className="container-default h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className="font-poppins font-bold text-sm md:text-base whitespace-nowrap bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-110 transition-transform"
        >
          @abimanyudans
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-sm font-semibold group relative dark:text-cyan-100 text-black/70 hover:dark:text-cyan-300 hover:text-black transition-colors"
              aria-label={`Jump to ${i.label}`}
            >
              {i.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Right side - Theme toggle + Mobile menu */}
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg dark:hover:bg-white/10 hover:bg-black/5 transition-all"
            aria-label="Toggle mobile menu"
            style={{ color: "inherit" }}
          >
            {mobileOpen ? (
              <X
                className="w-5 h-5"
                style={{ stroke: "white", color: "white" }}
              />
            ) : (
              <Menu
                className="w-5 h-5"
                style={{ stroke: "white", color: "white" }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t dark:border-cyan-400/30 border-black/10 bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 backdrop-blur-xl">
          <div className="container-default py-5 flex flex-col gap-2">
            {items.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold dark:text-cyan-100 dark:hover:text-cyan-300 dark:hover:bg-cyan-400/15 transition-all text-black/70 hover:text-black hover:bg-black/5"
                aria-label={`Jump to ${i.label}`}
              >
                {i.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
