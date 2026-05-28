"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { blogPosts } from "../../utils/blogData";
import { useLanguage } from "../LanguageProvider";
import { t, tx } from "../../utils/translations";

export function Blog() {
  const { lang } = useLanguage();
  return (
    <section id="blog" className="section py-16 md:py-24" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="container-default">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            {tx(t.blog.title, lang)}
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base mt-2 flex items-center justify-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            {tx(t.blog.subtitle, lang)}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div
                data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                className="relative h-full rounded-2xl p-6 hover:border-indigo-500/40 hover:scale-[1.01] hover:shadow-xl transition-all duration-300 flex flex-col justify-between border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-40 group-hover:opacity-70 rounded-2xl transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/25 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {post.title[lang]}
                  </h3>
                  <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{post.date}</p>
                  <p className="text-sm line-clamp-3 leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {post.excerpt[lang]}
                  </p>
                </div>

                <div className="relative z-10 mt-auto text-indigo-500 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  {tx(t.blog.readMore, lang)} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
