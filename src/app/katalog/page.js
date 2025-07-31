"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  Grid,
  List,
  ArrowRight,
  Star,
  Eye,
  Heart,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import Image from "next/image";

// Dummy data untuk buku-buku
const booksData = [
  {
    id: 1,
    title: "Manajemen Sumber Daya Manusia Modern",
    author: [
      "Dr. Alfiyah Agussalim, S.A.P., M.AP.",
      "Evi Nilawati, S.I.P., M.M.",
    ],
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    category: "Manajemen",
    year: 2024,
    isbn: "978-623-09-8037-4",
    pages: "v + 213",
    price: "85.000",
    rating: 4.8,
    views: 1250,
    isNew: true,
    isBestseller: true,
  },

  {
    id: 3,
    title: "Psikologi Pendidikan dan Pembelajaran",
    author: ["Prof. Dr. Sarah Kusuma, M.Psi.", "Dr. Ahmad Fauzi, M.Ed."],
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    category: "Pendidikan",
    year: 2023,
    isbn: "978-623-09-7932-8",
    pages: "vi + 287",
    price: "78.000",
    rating: 4.7,
    views: 1450,
    isBestseller: true,
  },
  {
    id: 4,
    title: "Ekonomi Digital dan Transformasi Bisnis",
    author: ["Dr. Bambang Hermanto, S.E., M.M.", "Linda Sari, S.E., M.Ak."],
    cover:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=400&h=600&fit=crop",
    category: "Ekonomi",
    year: 2024,
    isbn: "978-623-09-8112-8",
    pages: "x + 456",
    price: "125.000",
    rating: 4.6,
    views: 876,
    isNew: true,
  },
  {
    id: 5,
    title: "Metodologi Penelitian Kualitatif",
    author: ["Prof. Dr. Maya Sari, M.A.", "Dr. Rudi Hartono, M.Pd."],
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    category: "Penelitian",
    year: 2023,
    isbn: "978-623-09-7854-3",
    pages: "xii + 389",
    price: "89.000",
    rating: 4.8,
    views: 1123,
  },
  {
    id: 6,
    title: "Teknologi Informasi dalam Pendidikan",
    author: ["Dr. Andi Wijaya, S.Kom., M.T.", "Siti Nurhaliza, S.Pd., M.Pd."],
    cover:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    category: "Teknologi",
    year: 2024,
    isbn: "978-623-09-8203-3",
    pages: "viii + 298",
    price: "92.000",
    rating: 4.5,
    views: 743,
    isNew: true,
  },
  {
    id: 7,
    title: "Komunikasi Massa di Era Digital",
    author: [
      "Dr. Fitri Ramadhani, S.Sos., M.I.Kom.",
      "Agus Setiawan, S.I.Kom., M.Si.",
    ],
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    category: "Komunikasi",
    year: 2023,
    isbn: "978-623-09-7756-0",
    pages: "vi + 234",
    price: "75.000",
    rating: 4.4,
    views: 658,
  },
  {
    id: 8,
    title: "Akuntansi Manajemen Strategis",
    author: [
      "Prof. Dr. Hendra Gunawan, S.E., M.Si., Ak.",
      "Dewi Kartika, S.E., M.Ak.",
    ],
    cover:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop",
    category: "Akuntansi",
    year: 2024,
    isbn: "978-623-09-8167-8",
    pages: "xiv + 478",
    price: "135.000",
    rating: 4.9,
    views: 892,
    isBestseller: true,
  },
  {
    id: 9,
    title: "Sosiologi Kontemporer Indonesia",
    author: ["Dr. Ratna Sari, S.Sos., M.A.", "Prof. Dr. Budi Santoso, M.Si."],
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    category: "Sosiologi",
    year: 2023,
    isbn: "978-623-09-7698-3",
    pages: "x + 356",
    price: "88.000",
    rating: 4.6,
    views: 567,
  },
];

const categories = [
  "Semua",
  "Manajemen",
  "Hukum",
  "Pendidikan",
  "Ekonomi",
  "Penelitian",
  "Teknologi",
  "Komunikasi",
  "Akuntansi",
  "Sosiologi",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function KatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  useEffect(() => {
    let filtered = booksData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.some((author) =>
            author.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Sort books
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const BookCard = ({ book, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden relative">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {book.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BARU
            </span>
          )}
          {book.isBestseller && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Book Cover */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Book Info */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {book.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
            {book.title}
          </h3>

          <div className="text-sm text-slate-600 mb-3">
            <p className="line-clamp-2">{book.author.join(" • ")}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">Harga</span>
              <p className="text-xl font-bold text-purple-600">
                Rp {book.price}
              </p>
            </div>
            <a
              href={`/katalog/${book.id}`}
              className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <span>Lihat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-6">
          <div className="max-w-7xl mx-auto w-full text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white font-medium mb-6"
                variants={fadeInUp}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Katalog Buku
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                variants={fadeInUp}
              >
                Jelajahi{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Koleksi
                </span>{" "}
                Buku
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Temukan ribuan buku berkualitas dari berbagai bidang ilmu yang
                diterbitkan oleh PT APACE
              </motion.p>

              <motion.div className="flex justify-center" variants={fadeInUp}>
                <div className="relative max-w-2xl w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari judul buku, penulis, atau kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters and Controls */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                        : "bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <motion.div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-24 h-24 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-600 mb-4">
                Tidak ada buku ditemukan
              </h3>
              <p className="text-slate-500 mb-6">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Semua");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                number: "500+",
                label: "Total Buku",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: User,
                number: "200+",
                label: "Penulis",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Award,
                number: "50+",
                label: "Best Seller",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: TrendingUp,
                number: "98%",
                label: "Kepuasan",
                color: "from-purple-500 to-violet-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg mb-4`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <p className="text-slate-300 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
