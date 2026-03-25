"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { revealOnScroll, fadeUp, staggerChildren } from "../../utils/animations";
import { blogPosts } from "../../utils/blogData";

export function Blog() {
  return (
    <section id="blog" className="section min-h-screen relative z-10 py-16 md:py-24">
      <div className="container-default">
        <motion.div
          variants={revealOnScroll}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-title dark:text-white">Blog / Sharing</h2>
          <p className="text-black/60 dark:text-cyan-100/60 mt-4 max-w-2xl text-lg">
            Tempat saya berbagi pemikiran, cerita, dan pengalaman hidup saya.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <motion.div
                variants={fadeUp}
                className="glass-panel p-6 rounded-2xl flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors text-slate-900 dark:text-white">{post.title}</h3>
                <p className="text-sm text-black/50 dark:text-gray-400 mb-4">{post.date}</p>
                <p className="text-sm text-black/70 dark:text-gray-300 line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                
                <div className="mt-auto text-cyan-600 dark:text-cyan-400 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read full story <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
