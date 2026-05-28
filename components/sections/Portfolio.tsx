"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, Boxes, ExternalLink, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { Modal } from "../Modal";
import { useLanguage } from "../LanguageProvider";
import { useTheme } from "../ThemeProvider";
import { t, tx } from "../../utils/translations";

type BiLang = { id: string; en: string };

interface ProjectItem {
  title: string;
  role: string;
  url: string;
  img: string;
  desc: BiLang;
  fullDesc?: BiLang;
  outputs?: BiLang[];
  tools: string[];
}

const projects: ProjectItem[] = [
  {
    title: "Integrated Logistic Platform (CargoInd)",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/cargoind.webp",
    desc: {
      id: "Platform sistem logistik terintegrasi (CargoInd) yang mencakup modul Customer, DMS, WMS, dan TMS.",
      en: "Integrated logistics platform (CargoInd) covering Customer, DMS, WMS, and TMS modules.",
    },
    fullDesc: {
      id: "Membangun platform logistik terintegrasi (CargoInd) untuk menghubungkan seluruh ekosistem supply chain perusahaan. Sistem ini menghubungkan portal pengguna (Customer) dengan sistem manajemen distribusi (DMS), manajemen gudang (WMS), dan manajemen transportasi (TMS) ke dalam satu platform yang terpusat.",
      en: "Built an integrated logistics platform (CargoInd) to connect the entire company supply chain ecosystem. The system links the customer portal with a Distribution Management System (DMS), Warehouse Management System (WMS), and Transportation Management System (TMS) into a single centralized platform.",
    },
    outputs: [
      { id: "Integrasi Customer Portal Dashboard", en: "Customer Portal Dashboard Integration" },
      { id: "Modul Distribution Management System (DMS)", en: "Distribution Management System (DMS) Module" },
      { id: "Modul Warehouse Management System (WMS)", en: "Warehouse Management System (WMS) Module" },
      { id: "Modul Transportation Management System (TMS)", en: "Transportation Management System (TMS) Module" },
      { id: "Sentralisasi data logistik dan pergerakan barang", en: "Centralized logistics data and goods movement tracking" },
    ],
    tools: ["Next.js", "TypeScript", "Golang", "PostgreSQL"],
  },
  {
    title: "ERP System CV Abion Berkarya",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/erp-abion.webp",
    desc: {
      id: "Sistem ERP UMKM terintegrasi meliputi Logistic, Supply Chain, Keuangan, Karyawan, dan implementasi sistem Penggajian.",
      en: "Integrated SME ERP system covering Logistics, Supply Chain, Finance, HR, and Payroll implementation.",
    },
    fullDesc: {
      id: "Pengembangan Enterprise Resource Planning (ERP) fungsionalitas hulu-ke-hilir (end-to-end) yang menyesuaikan skala bisnis CV Abion Berkarya (UMKM). Sistem mendigitalisasi aliran barang (logistic & supply chain), mengontrol dan merangkum keuangan korporasi (Finance), mengatur sumber daya manusia (HR), serta mengotomasisasi sistem penggajian bulanan (Payroll system) yang terhubung langsung ke modul Finance.",
      en: "Developed an end-to-end ERP system tailored to the scale of CV Abion Berkarya (SME). The system digitalizes goods flow (logistics & supply chain), controls corporate finance, manages human resources (HR), and automates the monthly payroll system directly linked to the Finance module.",
    },
    outputs: [
      { id: "Modul Logistic & Supply Chain", en: "Logistics & Supply Chain Module" },
      { id: "Sistem Finance & pencatatan transaksi terintegrasi", en: "Finance system & integrated transaction recording" },
      { id: "Modul Human Resource (Manajemen data karyawan)", en: "Human Resource Module (Employee data management)" },
      { id: "Sistem Penggajian (Payroll) otomatis", en: "Automated Payroll System" },
      { id: "Dashboard operasional bisnis UMKM end-to-end", en: "End-to-end SME business operations dashboard" },
    ],
    tools: ["Next.js", "Golang", "MySQL", "Tailwind CSS"],
  },
  {
    title: "ERP Koperasi (Customizable)",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/erp-koperasi.webp",
    desc: {
      id: "Sistem ERP Koperasi yang dapat dikustomisasi sesuai kebutuhan organisasi, mencakup manajemen simpan pinjam, keuangan, anggota, dan pelaporan.",
      en: "Customizable Cooperative ERP system covering savings & loans management, finance, member management, and reporting.",
    },
    fullDesc: {
      id: "Membangun platform ERP berbasis web yang dirancang fleksibel dan modular untuk memenuhi kebutuhan koperasi dengan berbagai jenis dan skala. Sistem menyediakan manajemen simpan-pinjam, pembukuan keuangan, pengelolaan data anggota, serta modul yang dapat diaktifkan/nonaktifkan sesuai kebutuhan organisasi koperasi.",
      en: "Built a flexible and modular web-based ERP platform to meet the needs of cooperatives of various types and scales. The system provides savings & loan management, financial bookkeeping, member data management, and modules that can be enabled/disabled based on each cooperative's needs.",
    },
    outputs: [
      { id: "Modul Simpan Pinjam & cicilan anggota", en: "Savings & Loans module with member installments" },
      { id: "Manajemen data anggota & riwayat transaksi", en: "Member data management & transaction history" },
      { id: "Pembukuan keuangan & laporan neraca koperasi", en: "Financial bookkeeping & cooperative balance sheet reporting" },
      { id: "Sistem modul kustomisasi per kebutuhan koperasi", en: "Customizable module system per cooperative needs" },
      { id: "Dashboard laporan keuangan & analitik kinerja", en: "Financial reporting dashboard & performance analytics" },
      { id: "Manajemen Rapat Anggota Tahunan (RAT)", en: "Annual General Meeting (AGM) management" },
    ],
    tools: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Golang"],
  },
  {
    title: "Pelindo Car Rent (P-Car)",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/pcar.webp",
    desc: {
      id: "Aplikasi Pelindo Car Rent, sistem peminjaman kendaraan operasional Pelindo (P-Car).",
      en: "Pelindo Car Rent application — an operational vehicle borrowing system for Pelindo (P-Car).",
    },
    fullDesc: {
      id: "Aplikasi berbasis web untuk manajemen peminjaman kendaraan operasional Pelindo. Sistem ini mempermudah proses peminjaman (booking), pelacakan ketersediaan kendaraan (tracking), serta pencatatan dan pelaporan operasional armada secara digital.",
      en: "A web-based application for managing Pelindo's operational vehicle borrowing. The system simplifies the booking process, tracks vehicle availability, and handles digital recording and fleet operational reporting.",
    },
    outputs: [
      { id: "Sistem reservasi dan booking kendaraan", en: "Vehicle reservation and booking system" },
      { id: "Dashboard ketersediaan armada real-time", en: "Real-time fleet availability dashboard" },
      { id: "Sistem approval peminjaman berjenjang", en: "Multi-level borrowing approval system" },
      { id: "Log penggunaan kendaraan & pelaporan", en: "Vehicle usage log & reporting" },
    ],
    tools: ["React", ".NET", "PostgreSQL"],
  },
  {
    title: "AI-Based Credit Card Fraud Detection System",
    role: "AI Engineer & Full Stack Developer",
    url: "#",
    img: "/images/portofolio/fraud.webp",
    desc: {
      id: "Sistem deteksi fraud kartu kredit berbasis rules engine dan machine learning untuk bank, mengidentifikasi transaksi mencurigakan secara real-time.",
      en: "AI-based credit card fraud detection system using rule engine and machine learning to identify suspicious transactions in real-time for banks.",
    },
    fullDesc: {
      id: "Sistem fraud detection yang menggabungkan rule-based logic dengan artificial intelligence untuk menganalisis transaksi kartu kredit dan mengidentifikasi aktivitas mencurigakan dengan akurasi tinggi. Menggunakan kombinasi rule engine untuk pattern matching dan model machine learning (Random Forest, XGBoost) untuk deteksi anomali, dengan real-time processing capability untuk reject atau approve transaksi dalam hitungan milliseconds.",
      en: "A fraud detection system combining rule-based logic with AI to analyze credit card transactions and identify suspicious activity with high accuracy. Uses a rule engine for pattern matching and machine learning models (Random Forest, XGBoost) for anomaly detection, with real-time processing to reject or approve transactions within milliseconds.",
    },
    outputs: [
      { id: "Rule engine dengan 50+ pattern rules untuk fraud detection", en: "Rule engine with 50+ pattern rules for fraud detection" },
      { id: "Machine learning model dengan 95%+ akurasi", en: "Machine learning model with 95%+ accuracy" },
      { id: "Real-time transaction processing pipeline", en: "Real-time transaction processing pipeline" },
      { id: "Alert dashboard dengan fraud risk scoring", en: "Alert dashboard with fraud risk scoring" },
      { id: "Historical analysis & trend reporting", en: "Historical analysis & trend reporting" },
      { id: "Integration dengan banking system API", en: "Integration with banking system API" },
      { id: "Model explainability untuk compliance & audit", en: "Model explainability for compliance & audit" },
    ],
    tools: ["Python", "TensorFlow", "XGBoost", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    title: "TAkCEKin",
    role: "AI & Backend Development",
    url: "https://senopati.its.ac.id/TAkCEKin/",
    img: "/images/portofolio/TAkCekIn.webp",
    desc: {
      id: "Website deteksi format Tugas Akhir secara otomatis berbasis AI untuk memvalidasi dokumen akademik.",
      en: "AI-based website that automatically detects and validates the format of academic thesis documents.",
    },
    tools: ["Next.js", "Python", "Flask", "Tailwind CSS"],
  },
  {
    title: "Aplikasi Kasir Warung Jeng Fe",
    role: "Full Stack Development",
    url: "#",
    img: "/images/portofolio/kasir-warung.webp",
    desc: {
      id: "Aplikasi kasir digital untuk UMKM Warung Jeng Fe — tersedia versi web & mobile (Flutter), dengan fitur transaksi penjualan, pencatatan pengeluaran, laporan akhir, dan rekap analitik bisnis.",
      en: "Digital cashier app for Warung Jeng Fe SME — available as web & mobile (Flutter), featuring sales transactions, expense tracking, end-of-day reports, and business analytics.",
    },
    fullDesc: {
      id: "Membangun sistem kasir full-stack (web + mobile) untuk kebutuhan operasional UMKM warung makan. Platform web dibangun dengan Next.js untuk pengelolaan dari sisi admin, sementara aplikasi mobile Flutter/Dart digunakan oleh kasir di lapangan. Sistem mencakup transaksi penjualan harian, pencatatan pengeluaran operasional, rekap laporan laba-rugi, dan analisis ringkasan keuangan bisnis secara berkala.",
      en: "Built a full-stack cashier system (web + mobile) for a small restaurant SME's operational needs. The web platform uses Next.js for admin management, while the Flutter/Dart mobile app is used by cashiers in the field. The system covers daily sales transactions, operational expense recording, profit/loss summaries, and periodic business financial analytics.",
    },
    outputs: [
      { id: "Aplikasi mobile kasir (Flutter/Dart) untuk Android", en: "Mobile cashier app (Flutter/Dart) for Android" },
      { id: "Modul kasir & transaksi penjualan real-time", en: "Cashier module & real-time sales transactions" },
      { id: "Pencatatan dan kategorisasi pengeluaran operasional", en: "Operational expense recording and categorization" },
      { id: "Laporan harian, mingguan, dan bulanan otomatis", en: "Automated daily, weekly, and monthly reports" },
      { id: "Rekap laba-rugi & analitik ringkasan keuangan", en: "Profit & loss summary & financial analytics" },
      { id: "Dashboard monitoring performa bisnis UMKM", en: "SME business performance monitoring dashboard" },
    ],
    tools: ["Next.js", "Flutter", "Dart", "Node.js", "MySQL"],
  },
  {
    title: "UMKM Inventory Optimization Analytics",
    role: "Consulting & Data-Driven Strategy",
    url: "#",
    img: "/images/portofolio/analysis2.webp",
    desc: {
      id: "Menganalisis data penjualan & perputaran stok untuk merancang strategi inventory forecasting dan reorder optimization.",
      en: "Analyzing sales data & stock turnover to design inventory forecasting and reorder optimization strategies.",
    },
    fullDesc: {
      id: "UMKM mengalami overstock dan stock-out pada produk tertentu, menyebabkan biaya penyimpanan tinggi dan kehilangan penjualan. Analisis histori penjualan dan pergerakan stok untuk mengidentifikasi pola demand musiman, produk dengan perputaran cepat, serta kategori stok yang memerlukan prioritas restock.",
      en: "The SME was experiencing overstock and stock-out issues on certain products, causing high storage costs and lost sales. Analyzed sales history and stock movement to identify seasonal demand patterns, fast-moving products, and stock categories requiring restocking priority.",
    },
    outputs: [
      { id: "Dashboard interaktif dengan tren penjualan bulanan", en: "Interactive dashboard with monthly sales trends" },
      { id: "ABC classification & safety stock simulation", en: "ABC classification & safety stock simulation" },
      { id: "Reorder point & rekomendasi pengadaan produk", en: "Reorder point & product procurement recommendations" },
      { id: "Efisiensi biaya penyimpanan hingga 10–18%", en: "Storage cost efficiency of up to 10–18%" },
      { id: "Penurunan stock-out hingga 25%", en: "Stock-out reduction of up to 25%" },
    ],
    tools: ["Python", "Excel", "Tableau"],
  },
  {
    title: "Fundraising Strategy Analytics",
    role: "Consulting & Data-Driven Insights",
    url: "#",
    img: "/images/portofolio/analysis1.webp",
    desc: {
      id: "Menganalisis pola donasi dan segmentasi donor untuk merancang strategi fundraising yang lebih efektif bagi organisasi non-profit.",
      en: "Analyzing donation patterns and donor segmentation to design more effective fundraising strategies for non-profit organizations.",
    },
    fullDesc: {
      id: "Menggunakan analisis statistik dan clustering untuk mengidentifikasi segmen donor potensial serta rekomendasi strategi komunikasi berbasis data.",
      en: "Using statistical analysis and clustering to identify potential donor segments and recommend data-driven communication strategies.",
    },
    outputs: [
      { id: "Dashboard interaktif donor segmentation", en: "Interactive donor segmentation dashboard" },
      { id: "Rekomendasi strategi komunikasi & channel", en: "Communication strategy & channel recommendations" },
      { id: "Potensi peningkatan engagement", en: "Potential engagement improvement" },
      { id: "Actionable insights untuk decision-making", en: "Actionable insights for decision-making" },
    ],
    tools: ["Python", "Excel", "Tableau"],
  },
  {
    title: "Conation",
    role: "Full Stack Development",
    url: "https://www.conation.co.id",
    img: "/images/portofolio/conation.webp",
    desc: {
      id: "Website startup kopi dengan sistem pemesanan terintegrasi penuh dan manajemen pesanan otomatis.",
      en: "Coffee startup website with a fully integrated ordering system and automated order management.",
    },
    tools: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    title: "Vanilla Royal",
    role: "Web Design & Development (Full Stack)",
    url: "https://www.vanillaroyal.id/",
    img: "/images/portofolio/vanillaroyal.webp",
    desc: {
      id: "Landing page website perusahaan ekspor vanilla dengan desain premium dan product showcase.",
      en: "Landing page website for a vanilla export company with a premium design and product showcase.",
    },
    tools: ["React", "CSS", "Vite", "Node.js"],
  },
  {
    title: "KPPM GKJW Karangpilang",
    role: "Full Stack Development",
    url: "https://kppmgkjwkarpil.vercel.app/",
    img: "/images/portofolio/kppmkarpil.webp",
    desc: {
      id: "Website organisasi Gereja dengan landing page, sistem administrasi keuangan, dan pelaporan terintegrasi.",
      en: "Church organization website with a landing page, financial administration system, and integrated reporting.",
    },
    tools: ["Next.js", "Tailwind CSS", "Supabase"],
  },
];

interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  skillsVerified: string[];
}

const certificates: CertificateItem[] = [
  {
    title: "Pelindo Prestasi Scholarship Awardee",
    issuer: "PT Pelabuhan Indonesia (Persero)",
    date: "2025",
    skillsVerified: ["Leadership", "Project Management", "IT Literacy"],
  },
  {
    title: "ITS Youth Technopreneurship Startup Incubation",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
    date: "2025",
    skillsVerified: ["Startup Strategy", "Product Design", "Financial Projection"],
  },
  {
    title: "Google IT Automation with Python Professional Certificate",
    issuer: "Google via Coursera",
    date: "2024",
    skillsVerified: ["Python", "Git & GitHub", "Debugging", "Configuration Management"],
  },
  {
    title: "Dicoding Backend Developer Learning Path",
    issuer: "Dicoding Indonesia",
    date: "2023",
    skillsVerified: ["Node.js", "Web APIs", "AWS Cloud Practitioner"],
  },
  {
    title: "Kaggle Machine Learning Competency",
    issuer: "Kaggle",
    date: "2023",
    skillsVerified: ["Machine Learning", "Data Visualization", "Pandas", "Scikit-Learn"],
  },
];

interface TechItem {
  name: string;
  category: string;
  level: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "Python", category: "Language / AI", level: "Advanced", color: "from-[#306998] to-[#FFD43B]" },
  { name: "Golang", category: "Backend", level: "Intermediate", color: "from-[#00ADD8] to-[#5DC9E2]" },
  { name: "TypeScript", category: "Language", level: "Advanced", color: "from-[#3178C6] to-[#00273f]" },
  { name: "Next.js / React", category: "Frontend", level: "Advanced", color: "from-[#61DAFB] to-[#00 ADD8]" },
  { name: "Node.js", category: "Backend", level: "Advanced", color: "from-[#339933] to-[#215721]" },
  { name: ".NET / C#", category: "Backend", level: "Intermediate", color: "from-[#512BD4] to-[#381E9C]" },
  { name: "PostgreSQL", category: "Database", level: "Advanced", color: "from-[#336791] to-[#244966]" },
  { name: "MySQL", category: "Database", level: "Advanced", color: "from-[#4479A1] to-[#2B506C]" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced", color: "from-[#38BDF8] to-[#0EA5E9]" },
  { name: "Framer Motion", category: "Animation", level: "Advanced", color: "from-[#F43F5E] to-[#E11D48]" },
];

export function Portfolio() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "tech">("projects");
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const goPrev = () => {
    if (openProjectIdx !== null) {
      setOpenProjectIdx((prev) => (prev! - 1 + projects.length) % projects.length);
    }
  };

  const goNext = () => {
    if (openProjectIdx !== null) {
      setOpenProjectIdx((prev) => (prev! + 1) % projects.length);
    }
  };

  useEffect(() => {
    if (openProjectIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") setOpenProjectIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProjectIdx]);

  return (
    <section id="portfolio" className="section" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header section */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          {tx(t.portfolio.showcaseTitle, lang)}
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base mt-2" style={{ color: "var(--text-secondary)" }}>
          {tx(t.portfolio.showcaseSubtitle, lang)}
        </p>
      </div>

      {/* Tabs Control */}
      <div className="w-full flex justify-center mb-10" data-aos="fade-up" data-aos-duration="1000">
        <div
          className="flex p-1.5 rounded-2xl max-w-md w-full relative border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {(["projects", "certificates", "tech"] as const).map((tab) => {
            const label = tab === "projects" ? tx(t.portfolio.tabProjects, lang)
              : tab === "certificates" ? tx(t.portfolio.tabCertificates, lang)
              : tx(t.portfolio.tabTech, lang);
            const Icon = tab === "projects" ? Code : tab === "certificates" ? Award : Boxes;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-3 text-[11px] sm:text-sm font-semibold rounded-xl transition-all duration-300 relative z-10"
                style={{ color: activeTab === tab ? "#6366f1" : "var(--text-muted)" }}
              >
                <Icon className="w-4 h-4 hidden sm:block" />
                {label}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-500/30 rounded-xl -z-10"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setOpenProjectIdx(index)}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  className="group relative w-full cursor-pointer rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-40 group-hover:opacity-70 rounded-2xl transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4 border" style={{ borderColor: "var(--border)" }}>
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/800x450/1e293b/94a3b8?text=Project";
                          }}
                        />
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold mb-3 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        {project.role}
                      </p>
                      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                        {project.desc[lang]}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-1 rounded border"
                          style={{ backgroundColor: "var(--glow-primary)", color: "var(--text-secondary)", borderColor: "var(--border-accent)" }}
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-[10px] px-2 py-1 rounded border" style={{ backgroundColor: "var(--glow-primary)", color: "var(--text-secondary)", borderColor: "var(--border-accent)" }}>
                          +{project.tools.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certs-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCertificate(cert)}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  className="group relative cursor-pointer rounded-2xl p-6 hover:border-indigo-500/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between border"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-40 group-hover:opacity-70 rounded-2xl transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/15 mb-4 text-indigo-500 group-hover:bg-indigo-500/25 group-hover:scale-105 transition-all duration-300">
                      <Award className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors mb-2 leading-tight" style={{ color: "var(--text-primary)" }}>
                      {cert.title}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{cert.issuer}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{cert.date}</p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-1.5 mt-6">
                    {cert.skillsVerified.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              key="tech-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
            >
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  className="group relative rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:scale-105 hover:border-indigo-500/40 transition-all duration-300 ease-in-out cursor-pointer border"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-40 group-hover:opacity-70 rounded-2xl transition-opacity duration-300" />

                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full transition-transform group-hover:rotate-6" style={{ backgroundColor: "var(--glow-primary)" }}>
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="block text-sm font-bold group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {tech.name}
                    </span>
                    <span className="block text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                      {tech.category}
                    </span>
                    <span className="inline-block text-[9px] mt-2 px-2 py-0.5 rounded-full border" style={{ backgroundColor: "var(--glow-primary)", borderColor: "var(--border-accent)", color: "var(--text-secondary)" }}>
                      {tech.level}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Projects Details Modal */}
      {openProjectIdx !== null && (
        <Modal
          isOpen={openProjectIdx !== null}
          onClose={() => setOpenProjectIdx(null)}
          title={`${openProjectIdx + 1} / ${projects.length} — Project Details`}
        >
          <div className="flex flex-col gap-0">
            {/* Image Banner */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/5">
              <img
                src={projects[openProjectIdx].img}
                alt={projects[openProjectIdx].title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x450/1e293b/94a3b8?text=Project";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Prev / Next controls */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-indigo-500/70 transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-indigo-500/70 transition-all backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Role badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold shadow-lg">
                  {projects[openProjectIdx].role}
                </span>
                {projects[openProjectIdx].url && projects[openProjectIdx].url !== "#" && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-bold shadow-lg">
                    Live
                  </span>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="pt-6 pb-2 space-y-5">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {projects[openProjectIdx].title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {projects[openProjectIdx].desc[lang]}
                </p>
                {projects[openProjectIdx].fullDesc && (
                  <p className="text-gray-400 leading-relaxed text-sm mt-3 italic border-l-2 border-indigo-500/50 pl-3">
                    {projects[openProjectIdx].fullDesc[lang]}
                  </p>
                )}
              </div>

              {/* Outputs / Deliverables */}
              {projects[openProjectIdx].outputs && (
                <div>
                  <p className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="inline-block w-4 h-0.5 bg-indigo-400 rounded-full" />
                    {tx(t.portfolio.deliverables, lang)}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {projects[openProjectIdx].outputs?.map((output, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-200 bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                      >
                        <span className="text-indigo-400 font-bold mt-0.5">✓</span>
                        <span>{output[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <p className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                  <span className="inline-block w-4 h-0.5 bg-indigo-400 rounded-full" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[openProjectIdx].tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 text-xs font-semibold text-blue-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                {projects[openProjectIdx].url && projects[openProjectIdx].url !== "#" && (
                  <a
                    href={projects[openProjectIdx].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
                  >
                    🌐 {tx(t.portfolio.visitWebsite, lang)}
                  </a>
                )}
                <button
                  onClick={() => setOpenProjectIdx(null)}
                  className="px-6 py-2.5 rounded-xl border border-slate-700 text-gray-300 hover:text-white hover:bg-white/5 font-semibold transition-all text-sm"
                >
                  {tx(t.portfolio.close, lang)}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-500/15 mb-4 text-indigo-400">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                {selectedCertificate.issuer}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 leading-tight max-w-sm">
                {selectedCertificate.title}
              </h3>
              
              <p className="text-sm text-gray-400 mt-2">
                {tx(t.portfolio.issuedIn, lang)} {selectedCertificate.date}
              </p>

              {/* Skills Verified Badge List */}
              <div className="w-full mt-6">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {tx(t.portfolio.skillsVerified, lang)}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedCertificate.skillsVerified.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded bg-white/5 text-gray-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCertificate(null)}
                className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:scale-[1.01] transition-transform"
              >
                {tx(t.portfolio.closeView, lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
