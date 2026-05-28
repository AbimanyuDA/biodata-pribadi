import "./globals.css";
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

export const metadata = {
  title: "Abimanyu Danendra — Portfolio",
  description: "AI Engineer, Full-Stack Developer & Data Scientist. Menciptakan solusi digital inovatif dengan AI, analisis data, dan teknologi full-stack.",
  keywords: ["AI Engineer", "Full Stack Developer", "Data Scientist", "Portfolio", "Abimanyu Danendra"],
  authors: [{ name: "Abimanyu Danendra Andarfebano" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
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
