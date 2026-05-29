import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { LenisProvider } from "../components/LenisProvider";
import { Navbar } from "../components/Navbar";
import { BackgroundArt } from "../components/BackgroundArt";
import { ThemeProvider } from "../components/ThemeProvider";
import { ScrollProgress } from "../components/ScrollProgress";
import { LanguageProvider } from "../components/LanguageProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

// UPDATE: ganti dengan domain Anda yang sebenarnya
const siteUrl = "https://abimanyudans.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abimanyu Danendra Andarfebano | AI Engineer & Software Developer",
    template: "%s | Abimanyu Danendra",
  },
  description:
    "Abimanyu Danendra Andarfebano — AI Engineer, Full-Stack Developer & Data Scientist dari Institut Teknologi Sepuluh Nopember (ITS) Surabaya. Penerima Beasiswa Pelindo Prestasi 2025, Awardee ITS Youth Technopreneurship, COO Flexoo. Spesialis integrasi AI, analisis data finansial, dan pengembangan solusi digital end-to-end.",
  keywords: [
    "Abimanyu Danendra",
    "Abimanyu Danendra Andarfebano",
    "Abimanyu ITS",
    "AI Engineer Indonesia",
    "Full Stack Developer Surabaya",
    "Data Scientist ITS",
    "Software Engineer",
    "Machine Learning Engineer",
    "Pelindo Scholarship Awardee",
    "Pelindo Prestasi",
    "ITS Youth Technopreneurship",
    "ITS Youngpreneurship",
    "Flexoo COO",
    "CV Abion Berkarya CFO",
    "Portfolio Developer Indonesia",
    "Finance Technology",
    "Informatics ITS",
  ],
  authors: [{ name: "Abimanyu Danendra Andarfebano", url: siteUrl }],
  creator: "Abimanyu Danendra Andarfebano",
  publisher: "Abimanyu Danendra Andarfebano",
  openGraph: {
    type: "profile",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Abimanyu Danendra | Portfolio",
    title: "Abimanyu Danendra Andarfebano | AI Engineer & Software Developer",
    description:
      "AI Engineer, Full-Stack Developer & Data Scientist dari ITS Surabaya. Penerima Beasiswa Pelindo Prestasi, Awardee ITS Youth Technopreneurship, COO Flexoo.",
    images: [
      {
        url: "/images/about/abimanyu.webp",
        width: 800,
        height: 800,
        alt: "Abimanyu Danendra Andarfebano — AI Engineer & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abimanyu Danendra Andarfebano | AI Engineer & Software Developer",
    description:
      "AI Engineer, Full-Stack Developer & Data Scientist dari ITS Surabaya. Penerima Beasiswa Pelindo Prestasi, Awardee ITS Youth Technopreneurship.",
    images: ["/images/about/abimanyu.webp"],
    creator: "@abimanyudans",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abimanyu Danendra Andarfebano",
  alternateName: "Abimanyu Danendra",
  url: siteUrl,
  image: `${siteUrl}/images/about/abimanyu.webp`,
  jobTitle: ["AI Engineer", "Full-Stack Developer", "Data Scientist"],
  description:
    "AI Engineer, Full-Stack Developer & Data Scientist dari Institut Teknologi Sepuluh Nopember (ITS) Surabaya. Penerima Beasiswa Pelindo Prestasi, Awardee ITS Youth Technopreneurship, COO Flexoo.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institut Teknologi Sepuluh Nopember",
    alternateName: "ITS Surabaya",
    url: "https://www.its.ac.id",
  },
  sameAs: [
    "https://www.linkedin.com/in/abimanyudans/",
    "https://github.com/abimanyuda",
    "https://www.instagram.com/abimanyudans",
  ],
  award: [
    "Awardee Pelindo Prestasi Scholarship 2025",
    "Awardee Higher Education for Technology and Innovation Student Youngpreneurship 2025",
    "Awardee ITS Youth Technopreneurship 2024",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Web Development",
    "Data Science",
    "Financial Data Analysis",
    "React",
    "Next.js",
    "Python",
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "Flexoo",
      description: "Startup teknologi berbasis ITS Informatika",
    },
    {
      "@type": "Organization",
      name: "CV Abion Berkarya",
      description: "Perusahaan cargo dan logistik",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="">
        <ThemeProvider>
          <LanguageProvider>
            <div className="bg-grain" />
            <BackgroundArt />
            <ScrollProgress />
            <LenisProvider>
              <Navbar />
              {children}
            </LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
