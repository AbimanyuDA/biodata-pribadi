import { PageClient } from "../components/PageClient";

// Static SEO content — rendered in initial HTML so search engines can index it.
// Hidden visually; the interactive components below render the real UI.
function SEOContent() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: "0",
      }}
    >
      <h1>Abimanyu Danendra Andarfebano</h1>
      <p>
        AI Engineer, Full-Stack Developer, dan Data Scientist dari Institut
        Teknologi Sepuluh Nopember (ITS) Surabaya. Spesialis integrasi AI,
        analisis data finansial, dan pengembangan solusi digital end-to-end.
      </p>

      <h2>Pengalaman &amp; Prestasi</h2>
      <ul>
        <li>
          <strong>Awardee Pelindo Prestasi Scholarship (2025)</strong> — Program
          beasiswa dan pengembangan diri dari PT Pelabuhan Indonesia (Persero)
          untuk mencetak talenta muda unggul.
        </li>
        <li>
          <strong>
            Awardee Higher Education for Technology and Innovation Student
            Youngpreneurship (2025)
          </strong>{" "}
          — Program inkubasi dan pendanaan dari ITS untuk mahasiswa startup
          inovatif berbasis teknologi.
        </li>
        <li>
          <strong>Awardee ITS Youth Technopreneurship (2024)</strong> — Program
          tahunan ITS untuk wirausahawan muda berbasis teknologi.
        </li>
        <li>
          <strong>Chief Operational Officer Flexoo (2024)</strong> — Startup
          teknologi di bawah naungan Teknik Informatika ITS, berfokus pada
          solusi digital: website, machine learning, game, jaringan.
        </li>
        <li>
          <strong>Chief Finance Officer CV Abion Berkarya (2024)</strong> —
          Perusahaan cargo dan logistik; bertanggung jawab atas keuangan dan
          sistem terintegrasi.
        </li>
      </ul>

      <h2>Keahlian Teknis</h2>
      <p>
        AI Engineering, Machine Learning, Full-Stack Web Development (React,
        Next.js), Data Science, Python, Financial Data Analysis, Cloud
        Infrastructure.
      </p>

      <h2>Kontak</h2>
      <p>
        LinkedIn:{" "}
        <a href="https://www.linkedin.com/in/abimanyudans/">
          linkedin.com/in/abimanyudans
        </a>{" "}
        | GitHub:{" "}
        <a href="https://github.com/abimanyuda">github.com/abimanyuda</a>
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <SEOContent />
      <PageClient />
    </>
  );
}
