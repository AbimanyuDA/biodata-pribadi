"use client";
import { ProgressBar } from "../ProgressBar";

const skills = [
  { label: "Python", value: 90 },
  { label: "React / Next.js", value: 82 },
  { label: "TypeScript", value: 82 },
  { label: "SQL", value: 85 },
  { label: "Framer Motion", value: 78 },
  { label: "Tailwind CSS", value: 80 },
  { label: "and others", value: 0, isOther: true },
];

export function SkillsCertificates() {
  return (
    <section id="skills" className="section">
      <div className="glass-panel p-8 md:p-10">
        <h2 className="section-title">Skills</h2>
        <div>
          {skills.map((s) => (
            <ProgressBar
              key={s.label}
              label={s.label}
              value={s.value}
              isOther={s.isOther}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
