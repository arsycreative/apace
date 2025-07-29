"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  Target,
  Eye,
  Users,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Shield,
  DollarSign,
  Zap,
  Heart,
  Globe,
  Award,
  TrendingUp,
  UserCheck,
  Building,
  Mail,
  Phone,
  Briefcase,
  Crown,
  Settings,
  Package,
  Megaphone,
  Sparkles,
  Handshake,
  Rocket,
  Layers,
} from "lucide-react";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const observer = React.useRef();

  React.useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  const companyValues = [
    {
      title: "Integritas",
      description:
        "Menjunjung tinggi kejujuran dan etika dalam setiap aspek bisnis, dari proses editorial hingga transaksi keuangan.",
      icon: Shield,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Keterjangkauan",
      description:
        "Berkomitmen untuk menyediakan layanan berkualitas dengan biaya yang rasional dan transparan.",
      icon: DollarSign,
      gradient: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      title: "Kemudahan",
      description:
        "Menyederhanakan setiap tahapan proses penerbitan agar penulis dapat fokus pada substansi karyanya.",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "Kualitas",
      description:
        "Memastikan setiap karya yang diterbitkan memenuhi standar kualitas editorial dan desain yang tinggi.",
      icon: Star,
      gradient: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Kolaborasi",
      description:
        "Membangun hubungan yang kuat dan saling mendukung dengan penulis, mitra, dan seluruh tim.",
      icon: Handshake,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
    {
      title: "Inovasi",
      description:
        "Terus mencari cara baru dan lebih baik untuk melayani kebutuhan penerbitan di era digital.",
      icon: Lightbulb,
      gradient: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      title: "Pemberdayaan",
      description:
        "Memberikan kesempatan dan dukungan kepada individu untuk merealisasikan potensi kepenulisan mereka.",
      icon: Trophy,
      gradient: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  ];

  const missions = [
    {
      text: "Memberikan layanan penerbitan dan percetakan yang efisien, mudah, dan berkualitas tinggi dengan biaya yang kompetitif.",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      text: "Mendukung pengembangan literasi dan ilmu pengetahuan melalui penyediaan platform yang inklusif bagi berbagai jenis karya tulis.",
      icon: Globe,
      color: "text-emerald-600",
    },
    {
      text: "Membangun komunitas penulis yang saling mendukung dan berkembang bersama.",
      icon: Users,
      color: "text-blue-600",
    },
    {
      text: "Mengintegrasikan teknologi terkini untuk menyederhanakan proses penerbitan.",
      icon: Rocket,
      color: "text-violet-600",
    },
  ];

  const objectives = [
    {
      text: "Meningkatkan jumlah penulis baru dari kalangan dosen, guru, dan mahasiswa yang menerbitkan karyanya setiap tahun.",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      text: "Memperluas jangkauan distribusi buku-buku yang diterbitkan, baik secara fisik maupun digital.",
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      text: "Mengurangi waktu dan biaya proses penerbitan hingga 30% dalam tiga tahun ke depan.",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      text: "Membangun reputasi sebagai penerbit terpercaya dan pilihan utama bagi akademisi dan praktisi pendidikan.",
      icon: Award,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      text: "Mendorong inovasi dalam bentuk dan format publikasi sesuai kebutuhan pembaca dan penulis.",
      icon: Lightbulb,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const strategies = [
    {
      title: "Optimalisasi Proses",
      icon: Settings,
      gradient: "from-blue-500 to-cyan-500",
      items: [
        "Mengembangkan platform daring intuitif untuk pengajuan naskah, proses editorial, dan pemantauan status penerbitan.",
        "Menyediakan paket penerbitan yang fleksibel dengan pilihan layanan mulai dari editing, desain cover, hingga ISBN, disesuaikan dengan anggaran penulis.",
        "Menerapkan teknologi cetak sesuai permintaan (print-on-demand) untuk menekan biaya produksi dan risiko inventaris.",
      ],
    },
    {
      title: "Pendidikan dan Pelatihan",
      icon: BookOpen,
      gradient: "from-emerald-500 to-green-500",
      items: [
        "Menyelenggarakan lokakarya dan konsultasi reguler tentang penulisan akademik, struktur buku, proses penerbitan, dan strategi pemasaran buku.",
        "Menyediakan panduan praktis dan template penulisan untuk berbagai jenis buku.",
      ],
    },
    {
      title: "Kemitraan Strategis",
      icon: Handshake,
      gradient: "from-purple-500 to-violet-500",
      items: [
        "Menjalin kerja sama dengan institusi pendidikan dasar dan menengah, perguruan tinggi, asosiasi profesi serta masyarakat umum untuk menjangkau lebih banyak calon penulis.",
        "Membangun jaringan distributor buku baik daring maupun luring.",
      ],
    },
    {
      title: "Pemasaran dan Promosi",
      icon: Megaphone,
      gradient: "from-pink-500 to-rose-500",
      items: [
        "Membuat kampanye digital yang menargetkan dosen, guru, mahasiswa dan masyarakat melalui media sosial dan platform akademik.",
        "Menampilkan testimoni penulis yang puas di website dan materi promosi.",
        "Mengadakan bedah buku atau diskusi untuk mempromosikan karya-karya yang diterbitkan.",
      ],
    },
  ];

  const organizationStructure = [
    {
      position: "Direktur",
      name: "Febriawan Ardi Nugroho",
      icon: Crown,
      gradient: "from-purple-600 to-violet-600",
      level: 1,
    },
    {
      position: "Manager Operasional",
      name: "Dhani Septiana Wulandari",
      icon: Briefcase,
      gradient: "from-blue-600 to-cyan-600",
      level: 2,
    },
    {
      position: "Koordinator Tim Editor & Desain",
      name: "Ari Wahyu",
      icon: Sparkles,
      gradient: "from-emerald-600 to-green-600",
      level: 3,
    },
    {
      position: "Koordinator Tim Produksi & Logistik",
      name: "Salsabila",
      icon: Package,
      gradient: "from-orange-600 to-amber-600",
      level: 3,
    },
    {
      position: "Koordinator Tim Pemasaran",
      name: "In Progress",
      icon: TrendingUp,
      gradient: "from-pink-600 to-rose-600",
      level: 3,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const Icon = organizationStructure[0].icon;
  const Icon2 = organizationStructure[1].icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Left Content */}
              <motion.div
                className="text-left space-y-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center px-5 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-slate-300 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                  Profil Perusahaan
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <span className="block text-white mb-2">PT Adiwangsa</span>
                  <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Paramatha
                  </span>
                  <span className="block text-white">Cendikia</span>
                </motion.h1>

                {/* Company Code */}
                <motion.div
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-violet-400/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Building className="w-6 h-6 text-violet-400 mr-3" />
                  <span className="text-xl font-bold text-violet-400">
                    PT APACE
                  </span>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  Mitra utama dalam mengaktualisasikan gagasan dan pengetahuan
                  menjadi
                  <span className="text-violet-400 font-semibold">
                    {" "}
                    karya tulis berkualitas
                  </span>
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-8 pt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                >
                  {[
                    { number: "500+", label: "Buku Diterbitkan" },
                    { number: "300+", label: "Penulis Terlayani" },
                    { number: "98%", label: "Tingkat Kepuasan" },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                className="relative lg:block hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <motion.div className="relative" animate={floatAnimation}>
                  {/* Main Card */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Building className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="text-center space-y-4 mb-8">
                      <h3 className="text-2xl font-bold text-white">
                        PT APACE
                      </h3>
                      <p className="text-slate-300">
                        Premium Publishing Solutions
                      </p>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"></div>
                    </div>

                    {/* Values Preview */}
                    <div className="space-y-3">
                      {["Integritas", "Kualitas", "Inovasi", "Kolaborasi"].map(
                        (value, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 1.5 + idx * 0.1,
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                              <span className="text-white text-sm font-medium">
                                {value}
                              </span>
                            </div>
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Star className="w-6 h-6 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-6 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Trophy className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="text-slate-400 text-xs font-medium">
              Scroll Down
            </div>
            <div className="w-6 h-10 border border-slate-600 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-slate-500 rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section
        className="py-32 bg-gradient-to-br from-white to-purple-50/30"
        id="vision"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full text-violet-600 font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visi Perusahaan
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Menjadi{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Mitra Utama
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-slate-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#7c3aed_1px,transparent_1px),linear-gradient(-45deg,#7c3aed_1px,transparent_1px)] bg-[size:30px_30px]"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl mb-6">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                </div>

                <motion.p
                  className="text-xl md:text-2xl text-slate-700 leading-relaxed text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Menjadi mitra utama bagi{" "}
                  <motion.span
                    className="font-bold text-purple-600"
                    initial={{ background: "transparent" }}
                    whileInView={{
                      background: "linear-gradient(to right, #7c3aed, #a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    akademisi, praktisi dan masyarakat umum
                  </motion.span>{" "}
                  di Indonesia dalam{" "}
                  <motion.span
                    className="font-bold text-violet-600"
                    initial={{ background: "transparent" }}
                    whileInView={{
                      background: "linear-gradient(to right, #8b5cf6, #a855f7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                  >
                    mengaktualisasikan gagasan dan pengetahuan menjadi karya
                    tulis berkualitas
                  </motion.span>{" "}
                  yang{" "}
                  <motion.span
                    className="font-bold text-emerald-600"
                    initial={{ background: "transparent" }}
                    whileInView={{
                      background: "linear-gradient(to right, #059669, #10b981)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    mudah diakses dan terjangkau
                  </motion.span>
                  .
                </motion.p>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-violet-200 rounded-lg"
                animate={{ rotate: [0, 45, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-200 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white" id="mission" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Target className="w-4 h-4 mr-2" />
              Misi Perusahaan
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Misi{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Strategis
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full relative overflow-hidden">
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <mission.icon className={`w-6 h-6 ${mission.color}`} />
                      </motion.div>
                      <div className="flex-1">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-4"
                          whileHover={{ scale: 1.1 }}
                        >
                          {index + 1}
                        </motion.div>
                        <p className="text-slate-700 leading-relaxed text-lg group-hover:text-slate-900 transition-colors duration-300">
                          {mission.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section
        className="py-32 bg-gradient-to-br from-slate-50 to-purple-50/30"
        id="objectives"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Target className="w-4 h-4 mr-2" />
              Tujuan Perusahaan
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Target{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Strategis
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${objective.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex items-start space-x-6">
                    <motion.div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${objective.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <objective.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        className="flex items-center mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-4">
                          {index + 1}
                        </div>
                        <div className="h-px bg-gradient-to-r from-slate-300 to-transparent flex-1" />
                      </motion.div>
                      <p className="text-slate-700 leading-relaxed text-lg group-hover:text-slate-900 transition-colors duration-300">
                        {objective.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-32 bg-white" id="strategies" data-animate>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-600 font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Layers className="w-4 h-4 mr-2" />
              Strategi Implementasi
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Pendekatan{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Strategis
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full relative overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center mb-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${strategy.gradient} shadow-lg mr-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <strategy.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                        {strategy.title}
                      </h3>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {strategy.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1 + itemIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-slate-600 rounded-full" />
                        </div>
                        <p className="text-slate-700 leading-relaxed flex-1">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${strategy.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Values Section */}
      <section
        className="py-32 bg-gradient-to-br from-slate-900 to-purple-900"
        id="values"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Nilai-nilai Perusahaan
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Fondasi <span className="text-violet-400">Karakter</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Prinsip-prinsip yang memandu setiap langkah perjalanan kami dalam
              melayani komunitas penulis
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 text-center h-full hover:bg-white/15 transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,currentColor_1px,transparent_1px),linear-gradient(-45deg,currentColor_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <value.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Organization Structure Section */}
      <section
        className="py-32 bg-gradient-to-br from-slate-50 to-purple-50/30"
        id="organization"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users className="w-4 h-4 mr-2" />
              Struktur Organisasi
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              Tim{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                Profesional
              </span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Organization Chart */}
            <motion.div
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Director Level */}
              <motion.div
                className="flex justify-center"
                variants={itemVariants}
              >
                <motion.div
                  className="group max-w-sm"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${organizationStructure[0].gradient} opacity-5`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${organizationStructure[0].gradient} rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {organizationStructure[0].position}
                      </h3>

                      <p className="text-lg font-semibold text-slate-700 mb-4">
                        {organizationStructure[0].name}
                      </p>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Connection Line */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent" />
              </motion.div>

              {/* Manager Level */}
              <motion.div
                className="flex justify-center"
                variants={itemVariants}
              >
                <motion.div
                  className="group max-w-sm"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${organizationStructure[1].gradient} opacity-5`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${organizationStructure[1].gradient} rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon2 className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {organizationStructure[1].position}
                      </h3>

                      <p className="text-base font-semibold text-slate-700">
                        {organizationStructure[1].name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Connection Lines */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  <div className="absolute top-8 left-6 w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
                  <div className="absolute top-8 right-6 w-px h-8 bg-gradient-to-b from-slate-300 to-transparent" />
                </div>
              </motion.div>

              {/* Coordinators Level */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {organizationStructure.slice(2).map((member, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center h-full relative overflow-hidden`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-5`}
                      />

                      <div className="relative z-10">
                        <motion.div
                          className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${member.gradient} rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <member.icon className="w-7 h-7 text-white" />
                        </motion.div>

                        <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                          {member.position}
                        </h3>

                        <p
                          className={`text-sm font-semibold ${
                            member.name === "In Progress"
                              ? "text-slate-400 italic"
                              : "text-slate-700"
                          }`}
                        >
                          {member.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-purple-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bergabunglah dengan <span className="text-violet-400">Visi</span>
              <br />
              <span className="text-violet-400">Kami</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Mari bersama-sama mewujudkan ekosistem penerbitan yang lebih baik
              untuk kemajuan literasi Indonesia
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group px-12 py-6 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Mulai Konsultasi</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Contact Quick Access */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">WhatsApp</h4>
                <p className="text-slate-300 text-lg">+62 812-3456-7890</p>
                <p className="text-sm text-slate-400 mt-2">
                  Respons dalam 5 menit
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">Email</h4>
                <p className="text-slate-300 text-lg">info@apace.co.id</p>
                <p className="text-sm text-slate-400 mt-2">
                  Respons dalam 1 jam
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">Office</h4>
                <p className="text-slate-300 text-lg">Jakarta Selatan</p>
                <p className="text-sm text-slate-400 mt-2">
                  Senin - Jumat, 09:00-17:00
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
