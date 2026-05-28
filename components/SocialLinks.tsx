"use client";
import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface SocialLinkItem {
  name: string;
  displayName: string;
  subText: string;
  icon: React.ComponentType<any>;
  url: string;
  color: string;
  gradient: string;
  isPrimary?: boolean;
}

const socialLinks: SocialLinkItem[] = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/abimanyudans/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@abimanyuda",
    icon: Github,
    url: "https://github.com/abimanyuda",
    color: "#6366f1",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@abimanyudans",
    icon: Instagram,
    url: "https://www.instagram.com/abimanyudans",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "Email",
    displayName: "Email Me",
    subText: "abimanyudans@gmail.com",
    icon: Mail,
    url: "mailto:abimanyudans@gmail.com",
    color: "#10B981",
    gradient: "from-[#10B981] to-[#059669]",
  },
];

export default function SocialLinks() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const linkedIn = socialLinks.find((link) => link.isPrimary)!;
  const otherLinks = socialLinks.filter((link) => !link.isPrimary);

  const cardStyle = {
    backgroundColor: isLight ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.05)",
    borderColor: isLight ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.1)",
  };

  return (
    <div
      className="w-full rounded-2xl p-6 py-8 backdrop-blur-xl border"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg overflow-hidden transition-all duration-500 border"
          style={cardStyle}
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${linkedIn.gradient}`}
          />

          <div className="relative flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                style={{ backgroundColor: linkedIn.color }}
              />
              <div className="relative p-2 rounded-md">
                <Linkedin
                  className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
                  style={{ color: linkedIn.color }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                Let's Connect
              </span>
            </div>
          </div>

          <ExternalLink
            className="relative w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1"
            style={{ color: "var(--text-muted)" }}
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </a>

        {/* Second Row - Other Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group relative flex items-center gap-3 p-4 rounded-xl overflow-hidden transition-all duration-500 border"
                style={cardStyle}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
                />

                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                    style={{ backgroundColor: link.color }}
                  />
                  <div className="relative p-2 rounded-lg">
                    <Icon
                      className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                      style={{ color: link.color }}
                    />
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                    {link.name}
                  </span>
                </div>

                <ExternalLink
                  className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2"
                  style={{ color: "var(--text-muted)" }}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
