import type { Lang } from "../components/LanguageProvider";

export const t = {
  nav: {
    home: { id: "Beranda", en: "Home" },
    about: { id: "Tentang", en: "About" },
    experience: { id: "Pengalaman", en: "Experience" },
    portfolio: { id: "Portofolio", en: "Portfolio" },
    blog: { id: "Blog", en: "Blog" },
    contact: { id: "Kontak", en: "Contact" },
  },

  hero: {
    badge: { id: "Siap Berinovasi", en: "Ready to Innovate" },
    title1: { id: "AI & Software", en: "AI & Software" },
    title2: { id: "Engineer", en: "Engineer" },
    words: {
      id: ["AI Engineer", "Fullstack Developer", "Data Scientist", "Finance & Investment"],
      en: ["AI Engineer", "Fullstack Developer", "Data Scientist", "Finance & Investment"],
    },
    bio: {
      id: "Halo, Saya",
      en: "Hi, I'm",
    },
    bioText: {
      id: "Menciptakan solusi digital yang inovatif, cerdas, dan efisien dengan mengintegrasikan rekayasa AI, analisis data finansial, serta teknologi full-stack.",
      en: "Building innovative, smart, and efficient digital solutions by integrating AI engineering, financial data analysis, and full-stack technology.",
    },
    projects: { id: "Proyek", en: "Projects" },
    expYrs: { id: "Thn Pengalaman", en: "Exp Yrs" },
    awards: { id: "Penghargaan", en: "Awards" },
    ctaProjects: { id: "Proyek", en: "Projects" },
    ctaContact: { id: "Kontak", en: "Contact" },
    ctaViewCV: { id: "Lihat CV", en: "View CV" },
  },

  about: {
    title: { id: "Tentang Saya", en: "About Me" },
    subtitle: { id: "Mengubah ide menjadi pengalaman digital", en: "Transforming ideas into digital experiences" },
    greeting: { id: "Halo, Saya", en: "Hello, I'm" },
    bio: {
      id: "Saya adalah AI Engineer, Full-Stack Developer & Data Scientist dengan minat kuat pada bidang finansial dan investasi. Berpengalaman dalam merancang dan mengembangkan solusi digital end-to-end, mengimplementasikan kecerdasan buatan (AI), menganalisis data bisnis dan perputaran keuangan, serta menghubungkan kapabilitas teknologi dengan strategi bisnis.",
      en: "I am an AI Engineer, Full-Stack Developer & Data Scientist with a strong interest in finance and investment. Experienced in designing end-to-end digital solutions, implementing artificial intelligence, analyzing business and financial data, and bridging technology capabilities with business strategy.",
    },
    quote: {
      id: "Memanfaatkan AI sebagai alat profesional, bukan pengganti.",
      en: "Leveraging AI as a professional tool, not a replacement.",
    },
    cta1: { id: "Hubungi Saya", en: "Get In Touch" },
    cta2: { id: "Lihat Proyek", en: "View Projects" },
    stat1Label: { id: "Proyek Selesai", en: "Projects Done" },
    stat2Label: { id: "Tahun Pengalaman", en: "Years Experience" },
    stat3Label: { id: "Sertifikasi", en: "Certifications" },
  },

  experience: {
    title: { id: "Pengalaman & Prestasi", en: "Experience & Achievements" },
    subtitle: {
      id: "Riwayat profesional, pencapaian akademik, dan perjalanan wirausaha saya.",
      en: "My professional history, academic milestones, and entrepreneurial journeys.",
    },
    items: [
      {
        year: "2025",
        title: {
          id: "Awardee Pelindo Prestasi Scholarship",
          en: "Awardee Pelindo Prestasi Scholarship",
        },
        category: { id: "Beasiswa", en: "Scholarship" },
        detail: {
          id: "Program beasiswa dan pengembangan diri yang diselenggarakan oleh PT Pelabuhan Indonesia (Persero) untuk mencetak talenta muda unggul, menawarkan bantuan biaya pendidikan, dana skripsi, pelatihan pengembangan diri, serta kesempatan networking dengan Pelindo dan sesama penerima beasiswa.",
          en: "A scholarship and self-development program organized by PT Pelabuhan Indonesia (Persero) to cultivate top young talent, offering educational funding, thesis grants, soft skills training, financial literacy, IT skills, and networking opportunities.",
        },
        highlight: { id: "Beasiswa Bergengsi", en: "Prestigious Scholarship" },
      },
      {
        year: "2025",
        title: {
          id: "Awardee Higher Education for Technology and Innovation Student Youngpreneurship",
          en: "Awardee Higher Education for Technology and Innovation Student Youngpreneurship",
        },
        category: { id: "Wirausaha", en: "Entrepreneurship" },
        detail: {
          id: "Program inkubasi dan pendanaan dari Institut Teknologi Sepuluh Nopember (ITS) untuk mahasiswa yang memiliki startup inovatif berbasis teknologi, memberikan modal, mentoring intensif dari pakar industri, serta jejaring bisnis untuk mempercepat pengembangan bisnis mereka.",
          en: "An incubation and funding program from Institut Teknologi Sepuluh Nopember (ITS) for students with innovative tech-based startups, providing capital, intensive mentoring from industry experts, and business networks.",
        },
        highlight: { id: "Pendanaan Startup", en: "Startup Funding" },
      },
      {
        year: "2024",
        title: {
          id: "Awardee ITS Youth Technopreneurship",
          en: "Awardee ITS Youth Technopreneurship",
        },
        category: { id: "Wirausaha", en: "Entrepreneurship" },
        detail: {
          id: "Program tahunan dari Institut Teknologi Sepuluh Nopember (ITS) yang bertujuan melahirkan wirausahawan muda berbasis teknologi dengan memberikan pendanaan, pendampingan mentor profesional, dan fasilitas untuk mewujudkan ide startup teknologi inovatif menjadi bisnis nyata.",
          en: "An annual program from Institut Teknologi Sepuluh Nopember (ITS) aimed at nurturing tech-based young entrepreneurs by providing funding, professional mentoring, and facilities to turn innovative tech startup ideas into real businesses.",
        },
        highlight: { id: "Program Akselerator", en: "Accelerator Program" },
      },
      {
        year: "2024",
        title: {
          id: "Chief Operational Officer Flexoo",
          en: "Chief Operational Officer Flexoo",
        },
        category: { id: "Kepemimpinan", en: "Leadership" },
        detail: {
          id: "Menjabat sebagai COO di Flexoo, startup berbasis teknologi di bawah naungan Teknik Informatika ITS, berfokus pada penyediaan jasa dan solusi teknologi digital: pengembangan website, machine learning, pengembangan game, komputer dan jaringan.",
          en: "Serving as COO at Flexoo, an ITS Informatics-backed tech startup focused on digital solutions: website development, machine learning, game development, computer networking, and other custom tech services.",
        },
        highlight: { id: "Solusi Teknologi", en: "Tech Solutions" },
      },
      {
        year: "2024",
        title: {
          id: "Chief Finance Officer CV Abion Berkarya",
          en: "Chief Finance Officer CV Abion Berkarya",
        },
        category: { id: "Kepemimpinan", en: "Leadership" },
        detail: {
          id: "Menjabat sebagai CFO dan Tech Officer di CV Abion Berkarya, perusahaan cargo dan logistik. Bertanggung jawab atas pengelolaan keuangan dan pengembangan sistem terintegrasi untuk meningkatkan efisiensi operasional, penyusunan laporan keuangan, dan kesiapan data untuk pelaporan pajak.",
          en: "Serving as CFO and Tech Officer at CV Abion Berkarya, a cargo and logistics company. Responsible for financial management, integrated system development, financial reporting, bookkeeping, and tax reporting readiness.",
        },
        highlight: { id: "Keuangan & Teknologi", en: "Finance & Tech" },
      },
    ],
  },

  blog: {
    title: { id: "Blog / Berbagi", en: "Blog / Sharing" },
    subtitle: {
      id: "Tempat berbagi pemikiran, cerita, dan pengalaman hidup saya.",
      en: "A place where I share my thoughts, stories, and life experiences.",
    },
    readMore: { id: "Baca selengkapnya", en: "Read full story" },
  },

  contact: {
    title: { id: "Hubungi Saya", en: "Get In Touch" },
    subtitle: {
      id: "Punya pertanyaan atau ingin berkolaborasi? Kirimkan pesan sekarang.",
      en: "Have a question or want to collaborate? Send a message now.",
    },
    formTitle: { id: "Hubungi Saya", en: "Contact Me" },
    formSubtitle: {
      id: "Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara tentang proyek Anda.",
      en: "Want to discuss something? Send me a message and let's talk about your project.",
    },
    namePlaceholder: { id: "Nama Anda", en: "Your Name" },
    emailPlaceholder: { id: "Email Anda", en: "Your Email" },
    subjectPlaceholder: { id: "Subjek Pesan", en: "Message Subject" },
    messagePlaceholder: { id: "Pesan Anda...", en: "Your message..." },
    sendBtn: { id: "Kirim Pesan", en: "Send Message" },
    sending: { id: "Mengirim...", en: "Sending..." },
    successMsg: { id: "Pesan berhasil dikirim!", en: "Message sent successfully!" },
    errorMsg: { id: "Terjadi kesalahan. Coba lagi.", en: "Something went wrong. Please try again." },
  },

  portfolio: {
    title: { id: "Portofolio", en: "Portfolio" },
    showcaseTitle: { id: "Portofolio Saya", en: "Portfolio Showcase" },
    showcaseSubtitle: {
      id: "Jelajahi perjalanan saya melalui proyek, sertifikasi, dan keahlian teknis. Setiap bagian mewakili pencapaian dalam perjalanan belajar saya.",
      en: "Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.",
    },
    tabProjects: { id: "Proyek", en: "Projects" },
    tabCertificates: { id: "Sertifikat", en: "Certificates" },
    tabTech: { id: "Tech Stack", en: "Tech Stack" },
    subtitle: {
      id: "Jelajahi proyek-proyek yang mencerminkan keahlian dan kreativitas saya.",
      en: "Explore projects that reflect my skills and creativity.",
    },
    all: { id: "Semua", en: "All" },
    viewProject: { id: "Lihat Proyek", en: "View Project" },
    viewCode: { id: "Lihat Kode", en: "View Code" },
    deliverables: { id: "Hasil", en: "Deliverables" },
    visitWebsite: { id: "Kunjungi Website", en: "Visit Website" },
    close: { id: "Tutup", en: "Close" },
    closeView: { id: "Tutup Tampilan", en: "Close Verification View" },
    skillsVerified: { id: "Keahlian Terverifikasi", en: "Skills Verified" },
    issuedIn: { id: "Diterbitkan pada", en: "Issued in" },
  },
} as const;

/** Helper: pick correct language string */
export function tx(entry: { id: string; en: string }, lang: Lang): string {
  return entry[lang];
}
