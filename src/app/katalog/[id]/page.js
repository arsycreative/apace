"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const bookDetail = {
  id: 1,
  title: "Manajemen Sumber Daya Manusia Modern",
  subtitle: "Strategi dan Implementasi dalam Era Digital",
  authors: [
    "Dr. Alfiyah Agussalim, S.A.P., M.AP.",
    "Evi Nilawati, S.I.P., M.M.",
    "Mahdi Surya Aprilyansyah, S.H., M.H.",
    "Dr. Juriko Abdussamad, M.Si.",
  ],
  cover:
    "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=800&fit=crop",
  category: "Manajemen",
  year: 2024,
  isbn: "978-623-09-8037-4",
  pages: "v + 213",
  price: "85.000",
  publisher: "PT APACE",
  publishDate: "Januari 2024",
  language: "Bahasa Indonesia",
  format: "Softcover",
  dimensions: "15.5 x 23 cm",
  weight: "350 gram",
  rating: 4.8,
  totalRatings: 127,
  views: 1250,
  downloads: 450,
  isNew: true,
  isBestseller: true,
  description: `Buku ini menghadirkan perspektif terkini tentang manajemen sumber daya manusia dalam konteks transformasi digital yang pesat. Dengan menggabungkan teori-teori klasik dan praktik-praktik inovatif, buku ini memberikan panduan komprehensif bagi para profesional HR, manajer, dan akademisi.

Dalam era disrupsi teknologi, pengelolaan SDM tidak lagi dapat menggunakan pendekatan konvensional. Buku ini membahas bagaimana teknologi mengubah cara kita merekrut, mengembangkan, dan mempertahankan talenta terbaik. Dari penggunaan artificial intelligence dalam seleksi karyawan hingga implementasi sistem manajemen kinerja berbasis data, setiap aspek dibahas dengan detail dan dilengkapi studi kasus nyata.

Para penulis yang merupakan praktisi dan akademisi berpengalaman telah menyusun materi ini berdasarkan riset mendalam dan pengalaman langsung di lapangan. Buku ini tidak hanya menyajikan teori, tetapi juga memberikan tools praktis yang dapat langsung diimplementasikan dalam organisasi.`,

  keyFeatures: [
    "Teori terkini manajemen SDM digital",
    "15+ studi kasus perusahaan Indonesia",
    "Framework praktis implementasi",
    "Tools dan template siap pakai",
    "Panduan penggunaan HR Analytics",
    "Strategi employee engagement modern",
  ],

  reviews: [
    {
      id: 1,
      name: "Dr. Sarah Wijaya, CHRP",
      position: "HR Director, PT Maju Bersama",
      rating: 5,
      date: "15 Februari 2024",
    },
    {
      id: 2,
      name: "Prof. Ahmad Fadli, M.M.",
      position: "Dosen Manajemen, Universitas Indonesia",
      rating: 5,
      date: "8 Februari 2024",
    },
    {
      id: 3,
      name: "Rina Kartika, S.E.",
      position: "HR Business Partner, Startup Tech",
      rating: 4,
      date: "28 Januari 2024",
    },
  ],
};

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
  const [activeTab, setActiveTab] = useState("deskripsi");

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
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
                  src={bookDetail.cover}
                  alt={bookDetail.title}
                  width={800}
                  height={600}
                  className="w-full h-[600px] object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {bookDetail.isNew && (
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      BARU
                    </span>
                  )}
                  {bookDetail.isBestseller && (
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
                          i < Math.floor(bookDetail.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {bookDetail.rating}
                  </span>
                </div>

                {/* Authors */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    Karya:
                  </h3>
                  <ol className="space-y-2">
                    {bookDetail.authors.map((author, index) => (
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
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Penerbit:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.publisher}
                    </span>
                  </div>
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
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Format:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.format}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-slate-600">Dimensi:</span>
                    <span className="font-semibold text-slate-900">
                      {bookDetail.dimensions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Purchase */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-slate-600 text-lg">Harga:</span>
                    <div className="text-3xl font-bold text-purple-600">
                      Rp {bookDetail.price}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">
                      Harga Terjangkau
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                    <PhoneIcon className="w-5 h-5" />
                    <span>Pesan Sekarang</span>
                  </button>
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
                  <div className="text-slate-700 leading-relaxed space-y-6">
                    {bookDetail.description
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>

                  <div className="mt-8 bg-purple-50 p-6 rounded-2xl">
                    <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-purple-600" />
                      Fitur Unggulan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookDetail.keyFeatures.map((feature, index) => (
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
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Tertarik dengan Buku Ini?
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto"
            >
              Hubungi kami untuk konsultasi gratis dan dapatkan penawaran
              terbaik
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Hubungi Kami</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
