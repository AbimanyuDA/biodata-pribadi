"use client";
import { motion } from "framer-motion";
import {
  fadeUp,
  scaleIn,
  staggerChildren,
  revealOnScroll,
} from "../utils/animations";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { ExperienceAchievements } from "../components/sections/ExperienceAchievements";
import { Portfolio } from "../components/sections/Portfolio";
import { SkillsCertificates } from "../components/sections/SkillsCertificates";
import { Contact } from "../components/sections/Contact";

export default function Page() {
  return (
    <main className="pt-14">
      <Hero />
      <About />
      <ExperienceAchievements />
      <Portfolio />
      <SkillsCertificates />
      <Contact />
    </main>
  );
}
