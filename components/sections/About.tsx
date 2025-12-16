"use client";
import { motion } from "framer-motion";
import { revealOnScroll, scaleIn } from "../../utils/animations";

export function About() {
  return (
    <section id="about" className="section min-h-screen flex items-center">
      <div className="grid md:grid-cols-2 gap-8 items-center glass-panel p-8 md:p-10">
        <motion.div
          variants={scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300" />
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/10 border border-white/20">
            <motion.img
              alt="Profile photo"
              src="/images/about/abimanyu.jpeg"
              className="w-full h-full object-cover"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            />
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
        <motion.div
          variants={revealOnScroll}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="section-title dark:text-white mb-6">
            About / Biodata
          </h2>
          <motion.p
            className="text-black/75 dark:text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Business-Oriented Full-Stack Developer dengan minat kuat pada
            finance, investasi, dan data analytics. Berpengalaman mengembangkan
            solusi digital end-to-end, mengelola dan menganalisis data keuangan,
            serta menghubungkan teknologi dengan strategi bisnis untuk mendukung
            pengambilan keputusan berbasis data.
          </motion.p>
          <motion.ul
            className="grid grid-cols-2 gap-4 text-sm mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.li
              className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-200/30 dark:border-cyan-500/20 hover:border-cyan-400/50 dark:hover:border-cyan-500/50 transition-all"
              whileHover={{
                y: -2,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)",
              }}
            >
              <span className="text-black/50 dark:text-gray-400 text-xs">
                Location
              </span>{" "}
              <span className="block dark:text-cyan-300 font-semibold mt-1">
                Surabaya, Indonesia
              </span>
            </motion.li>
            <motion.li
              className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200/30 dark:border-blue-500/20 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all"
              whileHover={{
                y: -2,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
            >
              <span className="text-black/50 dark:text-gray-400 text-xs">
                Role
              </span>{" "}
              <span className="block dark:text-blue-300 font-semibold mt-1">
                Fullstack Developer & Data
              </span>
            </motion.li>
            <motion.li
              className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/30 dark:border-purple-500/20 hover:border-purple-400/50 dark:hover:border-purple-500/50 transition-all"
              whileHover={{
                y: -2,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
              }}
            >
              <span className="text-black/50 dark:text-gray-400 text-xs">
                Education
              </span>{" "}
              <span className="block dark:text-purple-300 font-semibold mt-1">
                Informatics Eng
              </span>
            </motion.li>
            <motion.li
              className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/30 dark:border-green-500/20 hover:border-green-400/50 dark:hover:border-green-500/50 transition-all"
              whileHover={{
                y: -2,
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
              }}
            >
              <span className="text-black/50 dark:text-gray-400 text-xs">
                Email
              </span>{" "}
              <span className="block dark:text-green-300 font-semibold mt-1 truncate text-xs">
                abimanyudans@gmail.com
              </span>
            </motion.li>
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
