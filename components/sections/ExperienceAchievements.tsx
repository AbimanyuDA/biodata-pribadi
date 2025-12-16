"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

const items = [
  {
    year: "2025",
    title: "Awardee Pelindo Prestasi Scholarship",
    category: "Scholarship",
    detail:
      "Program beasiswa dan pengembangan diri yang diselenggarakan oleh PT Pelabuhan Indonesia (Persero) untuk mencetak talenta muda unggul, menawarkan bantuan biaya pendidikan, dana skripsi, pelatihan pengembangan diri (soft skills, bahasa Inggris, literasi keuangan, keahlian IT), serta kesempatan networking dengan Pelindo dan sesama penerima beasiswa.",
    highlight: "Beasiswa Bergengsi",
  },
  {
    year: "2025",
    title:
      "Awardee Higher Education for Technology and Innovation Student Youngpreneurship",
    category: "Entrepreneurship",
    detail:
      "Program inkubasi dan pendanaan dari Institut Teknologi Sepuluh Nopember (ITS) untuk mahasiswa yang memiliki startup inovatif berbasis teknologi, memberikan modal, mentoring intensif dari pakar industri, serta jejaring bisnis untuk mempercepat pengembangan bisnis mereka menuju kesuksesan wirausaha muda.",
    highlight: "Startup Funding",
  },
  {
    year: "2024",
    title: "Awardee ITS Youth Technopreneurship",
    category: "Entrepreneurship",
    detail:
      "Program tahunan dari Institut Teknologi Sepuluh Nopember (ITS) yang bertujuan melahirkan wirausahawan muda berbasis teknologi (technopreneur) dengan memberikan pendanaan, pendampingan mentor profesional, dan fasilitas untuk mewujudkan ide startup teknologi inovatif menjadi bisnis nyata, lengkap dengan konversi SKS bagi mahasiswa yang berpartisipasi. ",
    highlight: "Accelerator Program",
  },
  {
    year: "2024",
    title: "Chief Operational Officer Flexoo",
    category: "Leadership",
    detail:
      "Menjabat sebagai COO di Flexoo, startup berbasis teknologi yang berada di bawah naungan Teknik Informatika ITS, berfokus pada penyediaan jasa dan solusi teknologi digital. Flexoo melayani pengembangan website, machine learning, pengembangan game, komputer dan jaringan, serta berbagai layanan teknologi lainnya yang disesuaikan dengan kebutuhan klien.",
    highlight: "Tech Solutions",
  },
  {
    year: "2024",
    title: "Chief Finance Officer CV Abion Berkarya",
    category: "Leadership",
    detail:
      "Menjabat sebagai CFO dan juga Tech officer di CV Abion Berkarya, perusahaan yang bergerak di bidang cargo dan logistik. Bertanggung jawab atas pengelolaan keuangan dan pengembangan sistem terintegrasi untuk meningkatkan efisiensi operasional, penyusunan laporan keuangan, pembukuan yang rapi, serta kesiapan data untuk pelaporan pajak (SPT).",
    highlight: "Finance & Tech",
  },
];

export function ExperienceAchievements() {
  return (
    <section id="experience" className="section min-h-screen flex items-center">
      <div className="glass-panel p-8 md:p-10 w-full">
        <h2 className="section-title dark:text-white">
          Experience & Achievements
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full" />

          <div className="grid gap-8 md:gap-12">
            {items.map((it, idx) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-stretch`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-4 border-slate-900 dark:border-slate-900 top-2 md:top-1/2 md:-translate-y-1/2 z-10 shadow-lg shadow-cyan-400/50" />

                {/* Left Content Card */}
                <div
                  className={`md:col-start-${
                    (idx % 2) + 1
                  } p-6 md:p-8 rounded-xl border-2 dark:border-cyan-400/30 bg-gradient-to-br dark:from-slate-800/60 dark:to-slate-900/60 hover:dark:from-slate-800 hover:dark:to-slate-900 transition-all hover:shadow-xl hover:shadow-cyan-400/20 ml-6 md:ml-0`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500/30 to-blue-500/30 dark:text-cyan-300 border dark:border-cyan-400/50">
                      {it.year}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-lg md:text-xl dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {it.title}
                  </h3>

                  <p className="text-sm md:text-base dark:text-gray-300 leading-relaxed">
                    {it.detail}
                  </p>

                  {/* Accent bar */}
                  <div className="mt-4 pt-4 border-t dark:border-cyan-400/20">
                    <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  </div>
                </div>

                {/* Right Info Card */}
                <div
                  className={`hidden md:flex md:col-start-${
                    idx % 2 === 0 ? 2 : 1
                  } flex-col gap-4`}
                >
                  {/* Category Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl border-2 dark:border-purple-400/30 bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/20 hover:dark:from-purple-900/50 hover:dark:to-pink-900/30 transition-all"
                  >
                    <p className="text-xs font-bold dark:text-purple-300 uppercase tracking-wider mb-2">
                      Category
                    </p>
                    <p className="text-lg font-bold dark:text-white">
                      {it.category}
                    </p>
                    <div className="mt-3 h-1 w-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                  </motion.div>

                  {/* Highlight Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl border-2 dark:border-green-400/30 bg-gradient-to-br dark:from-green-900/30 dark:to-emerald-900/20 hover:dark:from-green-900/50 hover:dark:to-emerald-900/30 transition-all flex-1 flex flex-col justify-center"
                  >
                    <p className="text-xs font-bold dark:text-green-300 uppercase tracking-wider mb-2">
                      Highlight
                    </p>
                    <p className="text-lg font-bold dark:text-white">
                      {it.highlight}
                    </p>
                    <div className="mt-3 h-1 w-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
