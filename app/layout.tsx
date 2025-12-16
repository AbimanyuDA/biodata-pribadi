import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { LenisProvider } from "../components/LenisProvider";
import { Navbar } from "../components/Navbar";
import { BackgroundArt } from "../components/BackgroundArt";
import { ThemeProvider } from "../components/ThemeProvider";
import { ScrollProgress } from "../components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Biodata Pribadi — Portfolio",
  description: "A modern digital CV crafted as an interactive art piece.",
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
          <div className="bg-grain" />
          <BackgroundArt />
          <ScrollProgress />
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
