import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "PT APACE - Penerbit Profesional",
  description:
    "PT Adiwangsa Paramatha Cendikia - Mitra utama akademisi dan praktisi dalam penerbitan karya tulis berkualitas",
  keywords: "penerbit, penerbitan buku, ISBN, akademisi, karya tulis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
