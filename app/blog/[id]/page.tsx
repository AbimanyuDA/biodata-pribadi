"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { blogPosts } from "../../../utils/blogData";
import { fadeUp, staggerChildren } from "../../../utils/animations";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Post Not Found</h1>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerChildren()}
          initial="initial"
          animate="animate"
          className="glass-panel p-8 md:p-12 lg:p-16 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl relative"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <div className="inline-flex gap-2 mb-6 justify-center flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs md:text-sm px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-semibold tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-base text-black/50 dark:text-gray-400 font-medium">
              A story by Abimanyu Danendra Andarfebano • {post.date}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full text-slate-800 dark:text-slate-200 [&_strong]:text-slate-900 [&_strong]:dark:text-white">
            {/* Force Tailwind to generate classes from blogData.tsx */}
            <div className="hidden text-slate-900 dark:text-white text-slate-800 dark:text-slate-200 dark:text-slate-100 bg-cyan-500/10 dark:bg-cyan-900/20 border-cyan-500/20 dark:border-cyan-500/30"></div>
            {post.content}
          </motion.div>
          
          <motion.div variants={fadeUp} className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex justify-center">
            <button 
              onClick={() => router.push("/#blog")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg hover:shadow-cyan-500/25 rounded-full font-bold transition-all transform hover:-translate-y-1"
            >
              ← Back to All Stories
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
