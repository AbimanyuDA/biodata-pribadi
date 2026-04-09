"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hoverLift, revealOnScroll } from "../../utils/animations";
import { Modal } from "../Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Vanilla Royal",
    role: "Web Design & Development (Full Stack)",
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
    role: "Web Design & Development (Ful Stack)",
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
  {
    title: "Fundraising Strategy Analytics",
    role: "Consulting & Data-Driven Insights",
    url: "#",
    img: "/images/portofolio/analysis1.png",
    desc: "Menganalisis pola donasi dan segmentasi donor untuk merancang strategi fundraising yang lebih efektif bagi organisasi non-profit.",
    fullDesc:
      "Menggunakan analisis statistik dan clustering untuk mengidentifikasi segmen donor potensial serta rekomendasi strategi komunikasi berbasis data.",
    outputs: [
      "Dashboard interaktif donor segmentation",
      "Rekomendasi strategi komunikasi & channel",
      "Potensi peningkatan engagement",
      "Actionable insights untuk decision-making",
    ],
    tools: ["Python", "Excel", "Tableau"],
  },
  {
    title: "UMKM Inventory Optimization Analytics",
    role: "Consulting & Data-Driven Strategy",
    url: "#",
    img: "/images/portofolio/analysis2.png",
    desc: "Menganalisis data penjualan & perputaran stok untuk merancang strategi inventory forecasting dan reorder optimization.",
    fullDesc:
      "UMKM mengalami overstock dan stock-out pada produk tertentu, menyebabkan biaya penyimpanan tinggi dan kehilangan penjualan. Analisis histori penjualan dan pergerakan stok untuk mengidentifikasi pola demand musiman, produk dengan perputaran cepat, serta kategori stok yang memerlukan prioritas restock.",
    outputs: [
      "Dashboard interaktif dengan tren penjualan bulanan",
      "ABC classification & safety stock simulation",
      "Reorder point & rekomendasi pengadaan produk",
      "Efisiensi biaya penyimpanan hingga 10–18%",
      "Penurunan stock-out hingga 25%",
    ],
    tools: ["Python", "Excel", "Tableau"],
  },
  {
    title: "Endless Car",
    role: "Game Development & C# Programming",
    url: "#",
    img: "/images/portofolio/endlesscar.png",
    desc: "Infinite endless runner game dengan mekanik dinamis, obstacle avoidance, dan progressive difficulty scaling.",
    fullDesc:
      "Game arcade-style yang dirancang dengan gameplay mechanics yang addictive. Pemain mengendalikan mobil untuk menghindari obstacle sambil mengumpulkan poin. Logika permainan dibangun menggunakan C# dengan sistem scoring dinamis, level progression, dan visual effects yang smooth.",
    outputs: [
      "Smooth vehicle control & responsive input handling",
      "Dynamic obstacle generation & difficulty scaling",
      "Scoring system dengan combo mechanics",
      "Visual & audio feedback untuk enhanced UX",
      "High score tracking & game state management",
    ],
    tools: ["Unity", "C#"],
  },
  // {
  //   title: "Schematics 2025 Website",
  //   role: "Project Manager",
  //   url: "https://www.schematics-its.com/",
  //   img: "/images/portofolio/schematics.png",
  //   desc: "Project Manager & Lead Developer untuk pembuatan website Schematics 2025, event mahasiswa Teknik Informatika ITS dengan kompetisi pemrograman dan logika nasional.",
  //   fullDesc:
  //     "Schematics adalah event karya mahasiswa Teknik Informatika Institut Teknologi Sepuluh Nopember yang berfokus pada kompetisi pemrograman dan logika serta memperkenalkan teknologi kepada masyarakat luas. Event ini mencakup: National Programming Competition (NPC), National Logic Competition (NLC), dan Bootcamp, Seminar, Technology (BST). Sebagai Project Manager dan Full Stack Developer, mengkoordinasikan tim development dalam membangun website yang menampilkan informasi kompetisi, pendaftaran peserta, leaderboard real-time, dan integrasi dengan sistem penjurian otomatis.",
  //   outputs: [
  //     "Website responsif dengan user experience premium",
  //     "Sistem registrasi peserta untuk NPC, NLC, dan BST",
  //     "Leaderboard real-time untuk kompetisi",
  //     "Integrasi payment gateway untuk pendaftaran",
  //     "Admin dashboard untuk manajemen event & scoreboard",
  //     "Sistem notifikasi real-time untuk update kompetisi",
  //     "Merchandise & ticketing integration",
  //   ],
  //   tools: ["Next.js", "React", "TypeScript", "Node.js"],
  // },
  {
    title: "AI-Based Credit Card Fraud Detection System",
    role: "AI Engineer & Full Stack Developer",
    url: "#",
    img: "/images/portofolio/fraud.png",
    desc: "Sistem deteksi fraud kartu kredit berbasis rules engine dan machine learning untuk bank, mengidentifikasi transaksi mencurigakan secara real-time.",
    fullDesc:
      "Sistem fraud detection yang menggabungkan rule-based logic dengan artificial intelligence untuk menganalisis transaksi kartu kredit dan mengidentifikasi aktivitas mencurigakan dengan akurasi tinggi. Menggunakan kombinasi rule engine untuk pattern matching dan model machine learning (Random Forest, XGBoost) untuk deteksi anomali, dengan real-time processing capability untuk reject atau approve transaksi dalam hitungan milliseconds.",
    outputs: [
      "Rule engine dengan 50+ pattern rules untuk fraud detection",
      "Machine learning model dengan 95%+ akurasi",
      "Real-time transaction processing pipeline",
      "Alert dashboard dengan fraud risk scoring",
      "Historical analysis & trend reporting",
      "Integration dengan banking system API",
      "Model explainability untuk compliance & audit",
    ],
    tools: [
      "Python",
      "TensorFlow",
      "XGBoost",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
  },
  {
    title: "Pelindo Car Rent (P-Car)",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/pcar.png",
    desc: "Aplikasi Pelindo Car Rent, sistem peminjaman kendaraan operasional Pelindo (P-Car).",
    fullDesc:
      "Aplikasi berbasis web untuk manajemen peminjaman kendaraan operasional Pelindo. Sistem ini mempermudah proses peminjaman (booking), pelacakan ketersediaan kendaraan (tracking), serta pencatatan dan pelaporan operasional armada secara digital.",
    outputs: [
      "Sistem reservasi dan booking kendaraan",
      "Dashboard ketersediaan armada real-time",
      "Sistem approval peminjaman berjenjang",
      "Log penggunaan kendaraan & pelaporan",
    ],
    tools: ["React", ".NET", "PostgreSQL"],
  },
  {
    title: "Integrated Logistic Platform (CargoInd)",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/cargoind.png",
    desc: "Platform sistem logistik terintegrasi (CargoInd) yang mencakup modul Customer, DMS, WMS, dan TMS.",
    fullDesc:
      "Membangun platform logistik terintegrasi (CargoInd) untuk menghubungkan seluruh ekosistem supply chain perusahaan. Sistem ini menghubungkan portal pengguna (Customer) dengan sistem manajemen distribusi (DMS), manajemen gudang (WMS), dan manajemen transportasi (TMS) ke dalam satu platform yang terpusat.",
    outputs: [
      "Integrasi Customer Portal Dashboard",
      "Modul Distribution Management System (DMS)",
      "Modul Warehouse Management System (WMS)",
      "Modul Transportation Management System (TMS)",
      "Sentralisasi data logistik dan pergerakan barang",
    ],
    tools: ["Next.js", "TypeScript", "Golang", "PostgreSQL"],
  },
  {
    title: "ERP System CV Abion Berkarya",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/erp-abion.png",
    desc: "Sistem ERP UMKM terintegrasi meliputi Logistic, Supply Chain, Keuangan, Karyawan, dan implementasi sistem Penggajian.",
    fullDesc:
      "Pengembangan Enterprise Resource Planning (ERP) fungsionalitas hulu-ke-hilir (end-to-end) yang menyesuaikan skala bisnis CV Abion Berkarya (UMKM). Sistem mendigitalisasi aliran barang (logistic & supply chain), mengontrol dan merangkum keuangan korporasi (Finance), mengatur sumber daya manusia (HR), serta mengotomasisasi sistem penggajian bulanan (Payroll system) yang terhubung langsung ke modul Finance.",
    outputs: [
      "Modul Logistic & Supply Chain",
      "Sistem Finance & pencatatan transaksi terintegrasi",
      "Modul Human Resource (Manajemen data karyawan)",
      "Sistem Penggajian (Payroll) otomatis",
      "Dashboard operasional bisnis UMKM end-to-end",
    ],
    tools: ["Next.js", "Golang", "MySQL", "Tailwind CSS"],
  },
  {
    title: "Aplikasi Kasir Warung Jeng Fe",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/kasir-warung.png",
    desc: "Aplikasi kasir digital untuk UMKM Warung Jeng Fe — tersedia versi web & mobile (Flutter), dengan fitur transaksi penjualan, pencatatan pengeluaran, laporan akhir, dan rekap analitik bisnis.",
    fullDesc:
      "Membangun sistem kasir full-stack (web + mobile) untuk kebutuhan operasional UMKM warung makan. Platform web dibangun dengan Next.js untuk pengelolaan dari sisi admin, sementara aplikasi mobile Flutter/Dart digunakan oleh kasir di lapangan. Sistem mencakup transaksi penjualan harian, pencatatan pengeluaran operasional, rekap laporan laba-rugi, dan analisis ringkasan keuangan bisnis secara berkala.",
    outputs: [
      "Aplikasi mobile kasir (Flutter/Dart) untuk Android",
      "Modul kasir & transaksi penjualan real-time",
      "Pencatatan dan kategorisasi pengeluaran operasional",
      "Laporan harian, mingguan, dan bulanan otomatis",
      "Rekap laba-rugi & analitik ringkasan keuangan",
      "Dashboard monitoring performa bisnis UMKM",
    ],
    tools: ["Next.js", "Flutter", "Dart", "Node.js", "MySQL"],
  },
];

export function Portfolio() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<(typeof projects)[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) setScreenSize("mobile");
        else if (width < 1024) setScreenSize("tablet");
        else setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine items per slide based on screen size
  const itemsPerSlide = screenSize === "mobile" ? 1 : screenSize === "tablet" ? 2 : 3;
  const totalSlides = Math.ceil(projects.length / itemsPerSlide);

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const visibleProjects = projects.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 6000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 6000);
  };
  return (
    <section id="portfolio" className="section">
      <div className="glass-panel p-8 md:p-10">
        <h2 className="section-title dark:text-white mb-2">My Portofolio</h2>
        <p className="text-black/60 dark:text-white/60 mb-8 text-sm">
          Swipe or use arrows to explore {projects.length} projects
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className={`grid gap-6 ${screenSize === "mobile"
                ? "grid-cols-1"
                : screenSize === "tablet"
                  ? "grid-cols-2"
                  : "grid-cols-3"
                }`}
              initial={false}
              animate={{
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              key={currentIndex}
            >
              {visibleProjects.map((p, idx) => (
                <motion.div
                  key={`${p.title}-${currentIndex}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <motion.button
                    suppressHydrationWarning
                    onClick={() => {
                      setCurrent(p);
                      setOpen(true);
                    }}
                    whileHover={{ y: -12, transition: { duration: 0.3 } }}
                    className="text-left rounded-2xl overflow-hidden cursor-pointer group relative h-full"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500 -z-10" />

                    {/* Card Background with gradient */}
                    <div className="relative bg-gradient-to-br dark:from-slate-800/60 dark:to-slate-900/80 border border-white/10 dark:border-white/5 rounded-2xl backdrop-blur-md overflow-hidden shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-cyan-500/30 transition-all duration-300 h-full flex flex-col">
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
                      <div className="p-6 bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/95 backdrop-blur-sm border-t border-white/5 flex-grow flex flex-col">
                        <div className="mb-3">
                          <h3 className="font-poppins font-bold text-base md:text-lg dark:text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                            {p.title}
                          </h3>
                          <p className="text-xs md:text-sm bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold mt-2">
                            {p.role}
                          </p>
                        </div>
                        <p className="text-xs md:text-sm dark:text-gray-300 leading-relaxed line-clamp-3 group-hover:text-gray-100 transition-colors flex-grow">
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
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 hover:border-cyan-400 dark:hover:border-cyan-300 transition-all shadow-lg hover:shadow-cyan-500/50"
              suppressHydrationWarning
            >
              <ChevronLeft className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex gap-2 justify-center flex-wrap max-w-xs">
              {Array.from({ length: totalSlides }).map(
                (_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setAutoPlay(false);
                      setTimeout(() => setAutoPlay(true), 6000);
                    }}
                    className={`h-2 rounded-full transition-all ${idx === currentIndex
                      ? "w-6 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "w-2 bg-gray-400/50 dark:bg-white/20 hover:bg-gray-400"
                      }`}
                    whileHover={{ scale: 1.2 }}
                    suppressHydrationWarning
                  />
                )
              )}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 hover:border-cyan-400 dark:hover:border-cyan-300 transition-all shadow-lg hover:shadow-cyan-500/50"
              suppressHydrationWarning
            >
              <ChevronRight className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6">
            <p className="text-sm text-black/60 dark:text-white/60">
              Slide {currentIndex + 1} of {totalSlides} •{" "}
              {currentIndex * itemsPerSlide + 1}-
              {Math.min((currentIndex + 1) * itemsPerSlide, projects.length)} of{" "}
              {projects.length} projects
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={current?.title || "Project Details"}
      >
        {current && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-0"
          >
            {/* ── Image Banner ── */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-800 shrink-0">
              <img
                src={current.img}
                alt={current.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/800x450/1e293b/94a3b8?text=No+Preview";
                }}
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              {/* Role badge floating over image bottom-left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold shadow-lg">
                  {current.role}
                </span>
                {current.url && current.url !== "#" && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-bold shadow-lg">
                    🚀 Live
                  </span>
                )}
              </div>
            </div>

            {/* ── Content Body ── */}
            <div className="pt-6 pb-2 flex flex-col gap-5">

              {/* Descriptions */}
              <div>
                <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                  {current.desc}
                </p>
                {(current as any).fullDesc && (
                  <p className="text-gray-400 leading-relaxed text-sm mt-3 italic border-l-2 border-cyan-500/50 pl-3">
                    {(current as any).fullDesc}
                  </p>
                )}
              </div>

              {/* Deliverables */}
              {(current as any).outputs && (
                <div>
                  <p className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="inline-block w-4 h-0.5 bg-cyan-400 rounded-full" />
                    Deliverables
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(current as any).outputs.map(
                      (output: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-200 bg-white/5 rounded-lg px-3 py-2.5 border border-white/5"
                        >
                          <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                          <span>{output}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Info cards for projects without outputs */}
              {!(current as any).outputs && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/40">
                    <p className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">Type</p>
                    <p className="font-bold text-white">Web Project</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-400/40">
                    <p className="text-xs font-bold text-green-400 mb-1 uppercase tracking-wider">Status</p>
                    <p className="font-bold text-white">🚀 Live</p>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {(current as any).tools && (
                <div>
                  <p className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="inline-block w-4 h-0.5 bg-cyan-400 rounded-full" />
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(current as any).tools.map(
                      (tool: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 text-sm font-semibold text-blue-200 hover:border-blue-400/70 transition-colors"
                        >
                          {tool}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                {current.url && current.url !== "#" && (
                  <motion.a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(34,197,255,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 text-center px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg text-sm md:text-base"
                  >
                    🌐 Visit Website
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl border border-slate-600 text-gray-300 hover:border-slate-400 hover:text-white hover:bg-white/5 font-semibold transition-all text-sm md:text-base"
                >
                  Tutup
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </Modal>
    </section>
  );
}
