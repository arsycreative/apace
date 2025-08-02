// katalog/page.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  ArrowRight,
  User,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("data", data);

      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Gagal memuat data buku. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authors.some((author) =>
            author.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Sort books
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
          {book.is_new && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BARU
            </span>
          )}
          {book.is_bestseller && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              BESTSELLER
            </span>
          )}
        </div>

        <div className="relative h-80 overflow-hidden">
          <Image
            src={book.cover_url || "/placeholder-book.jpg"}
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
            <p className="line-clamp-2">{book.authors?.join(" • ")}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">Harga</span>
              <p className="text-xl font-bold text-purple-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(book.price))}
              </p>
            </div>
            <Link
              href={`/katalog/${book.id}`}
              className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <span>Lihat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
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

      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
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
          {loading && (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">
                Memuat buku dari database...
              </p>
            </div>
          )}

          {!loading && filteredBooks.length === 0 && (
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
          {!loading && filteredBooks.length > 0 && (
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
          )}
        </div>
      </section>

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
