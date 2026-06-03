"use client";
import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import WelcomeScreen from "./sections/WelcomeScreen";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { ExperienceAchievements } from "./sections/ExperienceAchievements";
import { Portfolio } from "./sections/Portfolio";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { useLenis } from "lenis/react";

export function PageClient() {
  const [showWelcome, setShowWelcome] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  useEffect(() => {
    if (!showWelcome) {
      AOS.init({
        once: false,
        offset: 10,
        duration: 1000,
        mirror: false,
      });
    }
  }, [showWelcome]);

  useEffect(() => {
    if (lenis && !showWelcome) {
      AOS.refresh();
    }
  }, [lenis, showWelcome]);

  return (
    <>
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
      {!showWelcome && (
        <main className="pt-16 overflow-x-hidden">
          <Hero />
          <About />
          <ExperienceAchievements />
          <Portfolio />
          <Blog />
          <Contact />
        </main>
      )}
    </>
  );
}
