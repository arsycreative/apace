"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  FileText,
  PenTool,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Palette,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  achievements,
  mainServicesLayanan,
  publishingProcess,
  whyChooseUs,
} from "../constant";
import CTASection from "../components/CTASection";
import Image from "next/image";

// Subtle animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animated section wrapper with intersection observer
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10%",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function LayananPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:100px_100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 md:w-80 md:h-80 bg-purple-600/8 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              {/* Left Content */}
              <motion.div
                className="text-center lg:text-left space-y-6 lg:space-y-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {/* Main Heading */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  variants={staggerContainer}
                >
                  <motion.span
                    className="block text-white mb-1 md:mb-2"
                    variants={fadeInUp}
                  >
                    Layanan
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2"
                    variants={fadeInUp}
                  >
                    Publishing
                  </motion.span>
                  <motion.span className="block text-white" variants={fadeInUp}>
                    Terdepan
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0"
                  variants={fadeInUp}
                >
                  Wujudkan ide brilian Anda menjadi karya berkualitas tinggi
                  dengan
                  <span className="text-violet-400 font-semibold">
                    {" "}
                    standar internasional
                  </span>
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4 px-4 lg:px-0"
                  variants={fadeInUp}
                >
                  <motion.button
                    className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl flex items-center justify-center space-x-2 w-full sm:w-auto"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Konsultasi Gratis</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 px-4 lg:px-0"
                  variants={staggerContainer}
                >
                  {achievements.slice(0, 3).map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="text-center lg:text-left"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Visual - Hidden on mobile, shown on lg+ */}
              <motion.div
                className="relative hidden lg:block"
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 lg:mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-white">
                            Publishing Suite
                          </h3>
                          <p className="text-xs lg:text-sm text-slate-400">
                            Professional Tools
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 lg:space-y-4">
                      {[
                        {
                          icon: FileText,
                          label: "ISBN Registration",
                          status: "Complete",
                        },
                        {
                          icon: PenTool,
                          label: "Professional Editing",
                          status: "In Progress",
                        },
                        {
                          icon: Palette,
                          label: "Cover Design",
                          status: "Pending",
                        },
                        {
                          icon: Globe,
                          label: "Global Distribution",
                          status: "Ready",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                            <span className="text-white text-xs lg:text-sm font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.status === "Complete"
                                ? "bg-green-500/20 text-green-400"
                                : item.status === "In Progress"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : item.status === "Ready"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-slate-500/20 text-slate-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtle Accent Elements */}
                  <div className="absolute -top-4 -right-4 w-6 h-6 lg:w-8 lg:h-8 bg-violet-500/20 rounded-lg"></div>
                  <div className="absolute -bottom-4 -left-4 w-4 h-4 lg:w-6 lg:h-6 bg-purple-500/20 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="text-slate-400 text-xs font-medium">Scroll</div>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-slate-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Services Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 lg:mb-6">
              Layanan{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Unggulan
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Pilihan layanan premium yang disesuaikan dengan kebutuhan dan visi
              publikasi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {mainServicesLayanan && mainServicesLayanan.length > 0 ? (
              mainServicesLayanan.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden">
                    {/* Service Image */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <Image
                        src={service.image || "/api/placeholder/400/300"}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          service.gradient || "from-purple-600 to-violet-600"
                        } opacity-80`}
                      ></div>

                      {/* Floating Icon */}
                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center">
                          {service.icon ? (
                            <service.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                          ) : (
                            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                          <div className="flex items-center space-x-1.5 sm:space-x-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                            <span className="text-xs sm:text-sm font-semibold text-slate-800">
                              {service.duration || "4-6 Minggu"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {service.highlights &&
                          service.highlights.length > 0 ? (
                            service.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30"
                              >
                                {highlight}
                              </span>
                            ))
                          ) : (
                            <>
                              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                                Professional
                              </span>
                              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                                Quality
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                          {service.title || "Premium Publishing Service"}
                        </h3>
                        <p
                          className={`text-sm font-semibold ${
                            service.textColor || "text-purple-600"
                          } mb-3 sm:mb-4`}
                        >
                          {service.subtitle ||
                            "Professional Publishing Solution"}
                        </p>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                          {service.description ||
                            "Layanan penerbitan profesional dengan kualitas terbaik dan dukungan penuh dari tim ahli kami."}
                        </p>
                      </div>

                      {/* Features Grid */}
                      <div className="mb-6 sm:mb-8">
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mr-2" />
                          Yang Anda Dapatkan:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {service.features && service.features.length > 0 ? (
                            service.features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-slate-700">
                                  {feature}
                                </span>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-slate-700">
                                  Professional Editing
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-slate-700">
                                  Cover Design
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-slate-700">
                                  ISBN Registration
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-slate-700">
                                  Global Distribution
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      {/* <div className="flex justify-center sm:justify-end">
                        <motion.button
                          className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r ${
                            service.gradient || "from-purple-600 to-violet-600"
                          } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>Pilih Paket</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback content jika data tidak tersedia
              <div className="col-span-full text-center py-12">
                <div className="text-slate-500 text-lg">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <p>Layanan sedang dimuat...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {/* Why Choose Us Section - FIXED for mobile visibility */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Title Section - Always visible */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 lg:mb-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Mengapa Memilih{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                PT APACE?
              </span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Keunggulan yang membuat kami menjadi pilihan utama para penulis,
              akademisi, dan profesional
            </motion.p>
          </div>

          {/* Cards Grid - Individual animations for better mobile performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                  amount: 0.1,
                }}
                whileHover={{ y: -8 }}
              >
                <div
                  className={`${item.bgColor} p-6 sm:p-8 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${item.borderColor} text-center h-full relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,currentColor_1px,transparent_1px),linear-gradient(-45deg,currentColor_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 sm:mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4">
                        <item.icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`}
                        />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <AnimatedSection className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6 px-4"
              variants={fadeInUp}
            >
              Pencapaian <span className="text-violet-400">Terbaru</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
              variants={fadeInUp}
            >
              Angka-angka yang menunjukkan dedikasi kami dalam melayani
              komunitas penulis Indonesia dengan excellence
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0"
            variants={staggerContainer}
          >
            {achievements.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                  }}
                >
                  {/* Animated Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500 to-violet-400 rounded-xl lg:rounded-2xl shadow-xl mb-3 sm:mb-4 lg:mb-6"
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                        boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.4)",
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </motion.div>

                    <motion.div
                      className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 lg:mb-3 group-hover:text-violet-400 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.2 + 0.5,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.div>

                    <motion.p
                      className="text-slate-300 font-medium text-xs sm:text-sm lg:text-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.7 }}
                    >
                      {stat.label}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Achievements */}
          <motion.div
            className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Distribusi ke 25+ negara",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                title: "Growth Rate",
                description: "150% pertumbuhan tahun ini",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Award,
                title: "Awards",
                description: "Best Publisher 2024",
                color: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{
                    boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <motion.h4
                    className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p
                    className="text-slate-300 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Publishing Process Section */}
      <section
        className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-purple-50/20"
        id="process"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 lg:mb-6 px-4">
              Proses{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Penerbitan
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Langkah demi langkah yang sistematis dan transparan untuk
              mewujudkan buku impian Anda menjadi kenyataan
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Animated Timeline Line - Hidden on mobile */}
            <motion.div
              className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-200 via-violet-300 to-fuchsia-200 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
              style={{ top: "4rem", bottom: "4rem" }}
            />

            {/* Timeline Progress Dots - Hidden on mobile */}
            {publishingProcess.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-400 rounded-full z-10"
                style={{ top: `${4 + index * 420}px` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 300,
                }}
                viewport={{ once: true }}
              />
            ))}

            {/* Process Steps */}
            {publishingProcess.map((process, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative mb-12 sm:mb-16 lg:mb-24 lg:flex lg:items-center ${
                    isEven ? "lg:justify-start" : "lg:justify-end"
                  }`}
                  initial={
                    isDesktop ? { opacity: 0, x: isEven ? -100 : 100 } : false
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: isDesktop ? 0.8 : 0,
                    delay: isDesktop ? index * 0.1 : 0,
                    type: isDesktop ? "spring" : "tween",
                    stiffness: isDesktop ? 100 : undefined,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div
                    className={`lg:w-5/12 ${isEven ? "lg:pr-16" : "lg:pl-16"}`}
                  >
                    <motion.div
                      className="relative bg-white p-6 sm:p-8 rounded-2xl lg:rounded-3xl shadow-xl border border-slate-100 group mx-4 sm:mx-0"
                      // Remove hover animations on mobile
                      whileHover={{
                        y:
                          typeof window !== "undefined" &&
                          window.innerWidth >= 1024
                            ? -8
                            : 0,
                        boxShadow:
                          typeof window !== "undefined" &&
                          window.innerWidth >= 1024
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            : undefined,
                      }}
                      transition={{
                        duration:
                          typeof window !== "undefined" &&
                          window.innerWidth >= 1024
                            ? 0.3
                            : 0,
                      }}
                      style={{ overflow: "visible" }}
                    >
                      {/* Floating Step Number */}
                      <motion.div
                        className={`absolute ${
                          isEven ? "lg:-right-8" : "lg:-left-8"
                        } -top-6 sm:-top-8 left-4 lg:left-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${
                          process.color
                        } rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl z-50`}
                        style={{ zIndex: 50 }}
                        whileHover={{
                          scale:
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                              ? 1.15
                              : 1,
                          rotate:
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                              ? 360
                              : 0,
                        }}
                        transition={{
                          duration:
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                              ? 0.6
                              : 0,
                          type:
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                              ? "spring"
                              : "tween",
                          stiffness: 300,
                        }}
                      >
                        {process.step}
                      </motion.div>

                      {/* Content Container */}
                      <div className="pt-6 sm:pt-4">
                        {/* Icon */}
                        <motion.div
                          className="mb-4 sm:mb-6"
                          whileHover={{
                            scale:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 1.1
                                : 1,
                            rotate:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 5
                                : 0,
                          }}
                          transition={{
                            duration:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 0.3
                                : 0,
                          }}
                        >
                          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl lg:rounded-2xl shadow-lg">
                            <process.icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600" />
                          </div>
                        </motion.div>

                        {/* Title with Gradient Animation */}
                        <motion.h3
                          className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 relative"
                          whileHover={
                            typeof window !== "undefined" &&
                            window.innerWidth >= 1024
                              ? {
                                  background:
                                    "linear-gradient(to right, #7c3aed, #a855f7)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                              : {}
                          }
                          transition={{
                            duration:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 0.3
                                : 0,
                          }}
                        >
                          {process.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {process.description}
                        </p>

                        {/* Duration Badge */}
                        <motion.div
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-violet-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-purple-200"
                          whileHover={{
                            scale:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 1.05
                                : 1,
                          }}
                          transition={{
                            duration:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 1024
                                ? 0.2
                                : 0,
                          }}
                        >
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                          <span className="text-xs sm:text-sm font-semibold text-purple-700">
                            Estimasi: {process.duration}
                          </span>
                        </motion.div>
                      </div>

                      {/* Floating Particles Effect - Only on desktop */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl lg:rounded-3xl pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="hidden lg:block absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-300/40 rounded-full"
                            animate={{
                              x: [0, 50, -50, 0],
                              y: [0, -30, 30, 0],
                              opacity: [0.5, 1, 0.5, 0.5],
                            }}
                            transition={{
                              duration: 4 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${30 + i * 10}%`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Connection Arrow for larger screens */}
                  <motion.div
                    className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 ${
                      isEven ? "right-1/2 mr-4" : "left-1/2 ml-4"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.5,
                    }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={`w-8 h-8 bg-white border-2 border-purple-300 rounded-full flex items-center justify-center shadow-lg ${
                        isEven ? "transform rotate-180" : ""
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 text-purple-500" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-12 sm:mt-16 lg:mt-20 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl lg:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
              whileHover={{
                scale:
                  typeof window !== "undefined" && window.innerWidth >= 1024
                    ? 1.05
                    : 1,
                y:
                  typeof window !== "undefined" && window.innerWidth >= 1024
                    ? -2
                    : 0,
              }}
              whileTap={{
                scale:
                  typeof window !== "undefined" && window.innerWidth >= 1024
                    ? 0.98
                    : 1,
              }}
            >
              <span>Konsultasi Proses Publishing</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
