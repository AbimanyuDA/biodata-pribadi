"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { hoverLift, revealOnScroll } from "../../utils/animations";
import { Modal } from "../Modal";

const projects = [
  {
    title: "Vanilla Royal",
    role: "Web Design & Development",
    url: "https://www.vanillaroyal.id/",
    img: "/images/portofolio/vanillaroyal.png",
    desc: "Landing page website perusahaan ekspor vanilla dengan desain premium dan product showcase.",
  },
  {
    title: "KPPM GKJW Karangpilang",
    role: "Full Stack Development",
    url: "https://kppmgkjwkarpil.vercel.app/",
    img: "/images/portofolio/kppmkarpil.png",
    desc: "Website organisasi Gereja dengan landing page, sistem administrasi keuangan, dan pelaporan terintegrasi.",
  },
  {
    title: "Best Coffee Nation",
    role: "Web Design & Development",
    url: "http://bestcoffee.co.id/",
    img: "/images/portofolio/bestcoffee.png",
    desc: "Landing page perusahaan kopi untuk ekspor dengan informasi produk dan brand identity.",
  },
  {
    title: "Conation",
    role: "Full Stack Development",
    url: "https://www.conation.co.id",
    img: "/images/portofolio/conation.png",
    desc: "Website startup kopi dengan sistem pemesanan terintegrasi penuh dan manajemen pesanan otomatis.",
  },
  {
    title: "Ikatan Alumni SMAN 13 Surabaya",
    role: "Web Design & Development",
    url: "https://www.ikasmagalas.vercel.app",
    img: "/images/portofolio/ikasmagalas.png",
    desc: "Landing page website organisasi alumni SMAN 13 Surabaya dengan community features.",
  },
  {
    title: "TAkCEKin",
    role: "AI & Backend Development",
    url: "https://senopati.its.ac.id/TAkCEKin/",
    img: "/images/portofolio/TAkCekIn.png",
    desc: "Website deteksi format Tugas Akhir secara otomatis berbasis AI untuk memvalidasi dokumen akademik.",
  },
];

export function Portfolio() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<(typeof projects)[0] | null>(null);
  return (
    <section id="portfolio" className="section">
      <div className="glass-panel p-8 md:p-10">
        <h2 className="section-title dark:text-white">My Portofolio</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              suppressHydrationWarning
              onClick={() => {
                setCurrent(p);
                setOpen(true);
              }}
              className="text-left rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500 -z-10" />

              {/* Card Background with gradient */}
              <div className="relative bg-gradient-to-br dark:from-slate-800/60 dark:to-slate-900/80 border border-white/10 dark:border-white/5 rounded-2xl backdrop-blur-md overflow-hidden shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-cyan-500/30 transition-all duration-300">
                {/* Image Container */}
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 dark:from-slate-700 dark:to-slate-800 relative">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Overlay gradient with animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg"
                  >
                    Featured
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/95 backdrop-blur-sm border-t border-white/5">
                  <div className="mb-3">
                    <h3 className="font-poppins font-bold text-base md:text-lg dark:text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-xs md:text-sm bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold mt-2">
                      {p.role}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm dark:text-gray-300 leading-relaxed line-clamp-3 group-hover:text-gray-100 transition-colors">
                    {p.desc}
                  </p>

                  {/* Interactive arrow indicator */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>View Details</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={current?.title || "Project Details"}>
        {current && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative overflow-hidden h-96 md:h-full bg-slate-800">
                <img
                  src={current.img}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Content Side - Vibrant Background */}
              <div className="p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 text-xs font-bold mb-5 shadow-lg shadow-cyan-400/50">
                    <span className="text-lg">⭐</span>
                    Featured Project
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins text-4xl md:text-5xl font-black text-white mb-1 leading-tight drop-shadow-lg">
                    {current.title}
                  </h3>

                  {/* Role */}
                  <p className="text-sm md:text-base font-semibold text-cyan-300 mb-4">
                    {current.role}
                  </p>

                  {/* Accent Line */}
                  <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mb-6 shadow-lg shadow-blue-400/70"></div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-100 leading-relaxed mb-8 font-medium">
                    {current.desc}
                  </p>

                  {/* Info Cards - More Vibrant */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 border-2 border-cyan-400/60 hover:from-cyan-500/40 hover:to-cyan-600/30 transition-all">
                      <p className="text-xs font-bold text-cyan-300 mb-2 uppercase tracking-wider">
                        Type
                      </p>
                      <p className="font-bold text-cyan-100 text-lg">
                        Web Project
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-600/20 border-2 border-green-400/60 hover:from-green-500/40 hover:to-emerald-600/30 transition-all">
                      <p className="text-xs font-bold text-green-300 mb-2 uppercase tracking-wider">
                        Status
                      </p>
                      <p className="font-bold text-green-100 text-lg">
                        🚀 Live
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  {current.url && (
                    <motion.a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 40px rgba(34, 197, 255, 0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-4 rounded-xl font-black text-white text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 transition-all shadow-xl"
                    >
                      🌐 Visit Website
                    </motion.a>
                  )}
                  <motion.button
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-4 rounded-xl border-2 border-gray-500 text-gray-100 hover:border-gray-300 hover:bg-white/5 font-bold transition-all"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Modal>
    </section>
  );
}
