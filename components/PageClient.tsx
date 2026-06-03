"use client";
import React, { useState, useEffect, useCallback } from "react";
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
    if (lenis && !showWelcome) {
      AOS.refresh();
    }
  }, [lenis, showWelcome]);

  const handleLoadingComplete = useCallback(() => {
    // Init AOS immediately so it sets hidden-initial states on data-aos elements
    // while WelcomeScreen is still mid-fade (the 500ms exit animation window).
    // By the time WelcomeScreen is fully gone, AOS elements are ready to animate in.
    AOS.init({ once: false, offset: 10, duration: 1000, mirror: false });

    // Keep WelcomeScreen in DOM until its exit animation finishes (500ms + buffer),
    // otherwise React unmounts it before the animation can play.
    setTimeout(() => setShowWelcome(false), 560);
  }, []);

  return (
    <>
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={handleLoadingComplete} />
      )}
      {/* Always mounted — WelcomeScreen's z-index:9999 covers this during loading.
          When WelcomeScreen fades, main is already rendered underneath. */}
      <main className="pt-16 overflow-x-hidden">
        <Hero />
        <About />
        <ExperienceAchievements />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
