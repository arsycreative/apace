// katalog/[id]/page.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  User,
  FileText,
  Check,
  Award,
  Tag,
  Phone,
  PhoneIcon,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
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

export default function DetailKatalogPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [bookDetail, setBookDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookDetail = async (bookId) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", bookId)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Buku tidak ditemukan");
      }

      // Update views count
      await supabase
        .from("books")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", bookId);

      setBookDetail(data);
    } catch (error) {
      console.error("Error fetching book detail:", error);
      setError(error.message || "Gagal memuat detail buku");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchBookDetail(params.id);
    }
  }, [params.id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Memuat detail buku...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !bookDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Buku Tidak Ditemukan
          </h2>
          <p className="text-slate-600 mb-6">
            {error || "Buku yang Anda cari tidak dapat ditemukan"}
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-purple-600">
              Beranda
            </Link>
            <span className="text-slate-400">/</span>
            <Link
              href="/katalog"
              className="text-slate-500 hover:text-purple-600"
            >
              Katalog
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium truncate">
              {bookDetail.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Book Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={bookDetail.cover_url || "/placeholder-book.jpg"}
                  alt={bookDetail.title}
                  width={800}
                  height={600}
                  className="w-full h-[600px] object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {bookDetail.is_new && (
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      BARU
                    </span>
                  )}
                  {bookDetail.is_bestseller && (
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      BESTSELLER
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Book Details */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="space-y-8"
            >
              {/* Title and Basic Info */}
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                  <Tag className="w-4 h-4 mr-1" />
                  {bookDetail.category}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  {bookDetail.title}
                </h1>

                {bookDetail.subtitle && (
                  <h2 className="text-xl text-slate-600 mb-6">
                    {bookDetail.subtitle}
                  </h2>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(bookDetail.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {bookDetail.rating || 0}
                  </span>
                  {/* <span className="text-sm text-slate-500">
                    ({bookDetail.total_ratings || 0} ulasan)
                  </span> */}
                </div>

                {/* Views */}
                {/* <div className="mb-6 text-sm text-slate-500">
                  Dilihat {bookDetail.views || 0} kali
                </div> */}

                {/* Authors */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    Karya:
                  </h3>
                  <ol className="space-y-2">
                    {bookDetail.authors?.map((author, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-slate-700 font-medium">
                          {author}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Book Specifications */}
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Spesifikasi Buku
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">ISBN:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.isbn}
                    </span>
                  </div>
                  {bookDetail.publisher && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Penerbit:</span>
                      <span className="font-semibold text-slate-900">
                        {bookDetail.publisher}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Halaman:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.pages}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Tahun:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.year}
                    </span>
                  </div>
                  {bookDetail.format && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Format:</span>
                      <span className="font-semibold text-slate-900">
                        {bookDetail.format}
                      </span>
                    </div>
                  )}
                  {bookDetail.dimensions && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Dimensi:</span>
                      <span className="font-semibold text-slate-900">
                        {bookDetail.dimensions}
                      </span>
                    </div>
                  )}
                  {bookDetail.language && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Bahasa:</span>
                      <span className="font-semibold text-slate-900">
                        {bookDetail.language}
                      </span>
                    </div>
                  )}
                  {bookDetail.weight && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Berat:</span>
                      <span className="font-semibold text-slate-900">
                        {bookDetail.weight}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Purchase */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-slate-600 text-lg">Harga:</span>
                    <div className="text-3xl font-bold text-purple-600">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(Number(bookDetail.price))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">
                      Harga Terjangkau
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/6281335424229"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                      <PhoneIcon className="w-5 h-5" />
                      <span>Pesan Sekarang</span>
                    </button>
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Garansi Kualitas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Pengiriman Cepat</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>ISBN Resmi</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-16"
          >
            <div className="border-b border-slate-200 mb-8">
              <div className="flex space-x-8 overflow-x-auto">
                {[{ id: "deskripsi", label: "Deskripsi", icon: FileText }].map(
                  (tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 pb-4 px-2 border-b-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-purple-600 text-purple-600"
                          : "border-transparent text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white">
              {activeTab === "deskripsi" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="prose prose-lg max-w-none"
                >
                  {bookDetail.description && (
                    <div className="text-slate-700 leading-relaxed space-y-6">
                      {bookDetail.description
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  )}

                  {bookDetail.key_features &&
                    bookDetail.key_features.length > 0 && (
                      <div className="mt-8 bg-purple-50 p-6 rounded-2xl">
                        <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                          <Award className="w-6 h-6 mr-2 text-purple-600" />
                          Fitur Unggulan
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {bookDetail.key_features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                              <span className="text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Default content if no description */}
                  {!bookDetail.description && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">
                        Deskripsi belum tersedia untuk buku ini.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Catalog Button */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/katalog"
            className="inline-flex items-center px-6 py-3 bg-white text-slate-600 rounded-lg font-medium hover:bg-slate-100 transition-colors duration-300 border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    </div>
  );
}
