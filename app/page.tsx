"use client";
import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import WelcomeScreen from "../components/sections/WelcomeScreen";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { ExperienceAchievements } from "../components/sections/ExperienceAchievements";
import { Portfolio } from "../components/sections/Portfolio";
import { Blog } from "../components/sections/Blog";
import { Contact } from "../components/sections/Contact";

import { useLenis } from "lenis/react";

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
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
      const initAOS = async () => {
        const AOS = (await import("aos")).default;
        AOS.init({
          once: false,
          offset: 10,
          duration: 1000,
          mirror: false,
        });
      };
      const timer = setTimeout(() => {
        initAOS();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  useEffect(() => {
    if (lenis && !showWelcome) {
      import("aos").then((AOS) => {
        AOS.default.refresh();
      });
    }
  }, [lenis, showWelcome]);

  return (
    <>
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
      
      <main className="pt-16">
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
