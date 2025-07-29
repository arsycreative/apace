"use client";

import {
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { mainServices, statistics, testimonials } from "./constant";
import Image from "next/image";
import CTASection from "./components/CTASection";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function HomePage() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-violet-950 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5" />

          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-32 right-16 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="text-left"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-8"
                variants={childVariant}
              >
                <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                Penerbit Terpercaya di Indonesia
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9]"
                variants={childVariant}
              >
                <div className="block">Wujudkan</div>
                <div className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Masterpiece
                </div>
                <div className="block">Anda</div>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed"
                variants={childVariant}
              >
                Transformasi gagasan brilian menjadi karya publikasi berkelas
                dunia.
                <span className="text-violet-400 font-semibold">
                  {" "}
                  Dari konsep hingga distribusi global.
                </span>
              </motion.p>

              <motion.div className="mb-16" variants={childVariant}>
                <motion.button
                  className="group px-10 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 text-white rounded-2xl font-bold text-xl shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Konsultasi Eksklusif</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-8 text-slate-400"
                variants={staggerContainer}
              >
                {["ISBN Resmi", "Distribusi Global", "Garansi Kualitas"].map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2"
                      variants={childVariant}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-13 h-13 lg:w-17 lg:h-17">
                        <Image
                          src="/logo.webp"
                          alt="Logo PT APACE"
                          fill
                          className="object-cover rounded-full"
                          priority
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      PT APACE
                    </h3>

                    <p className="text-slate-300 mb-6">
                      Premium Publishing Solutions
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-violet-400">
                          500+
                        </div>
                        <div className="text-xs text-slate-400">
                          Books Published
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-violet-400">
                          98%
                        </div>
                        <div className="text-xs text-slate-400">
                          Satisfaction
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-400">
                      Rated by 300+ Authors
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-2xl"
                  animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-6 bg-gradient-to-br from-emerald-400 to-emerald-500 p-4 rounded-2xl shadow-2xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="text-white/60 text-sm font-medium">Scroll Down</div>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <ServicesSection />

      <StatisticsSection />

      <AboutSection />

      <TestimonialsSection />

      <CTASection />
    </div>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-white" id="services" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Layanan{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              Terbaik
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Solusi lengkap untuk semua kebutuhan penerbitan Anda, dari akademisi
            hingga praktisi profesional
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              variants={childVariant}
            >
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center h-full"
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl shadow-lg mb-6`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href="/layanan"
                  className="flex items-center justify-center text-purple-600 font-semibold"
                >
                  <span className="mr-2">Pelajari Lebih Lanjut</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      className="py-24 bg-gradient-to-br from-slate-900 to-purple-900"
      id="stats"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pencapaian <span className="text-violet-400">Kami</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Angka-angka yang menunjukkan dedikasi kami dalam melayani komunitas
            penulis Indonesia
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={childVariant}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-400 rounded-xl shadow-lg mb-6">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-slate-300 font-medium text-lg">
                  {stat.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const MotionLink = motion(Link);

function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl md:max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Mengapa Memilih{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                PT APACE?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed">
              Sebagai mitra utama bagi akademisi, praktisi, dan masyarakat umum
              di Indonesia, kami berkomitmen mengaktualisasikan gagasan dan
              pengetahuan menjadi karya tulis berkualitas yang mudah diakses dan
              terjangkau.
            </p>

            <motion.ul
              className="space-y-3 mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {[
                "Tim profesional berpengalaman puluhan tahun",
                "Proses transparan dengan update berkala",
                "Harga kompetitif dengan kualitas premium",
                "Support komprehensif dari konsep hingga distribusi",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center space-x-2"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700 text-base sm:text-lg">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-lg font-semibold text-base sm:text-lg shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Pelajari Lebih Lanjut
              </motion.button>

              <MotionLink
                href="/layanan"
                className="inline-block px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-base sm:text-lg text-center hover:bg-purple-600 hover:text-white transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Lihat Semua Layanan
              </MotionLink>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=800&fit=crop"
                alt="Team Working"
                className="w-full max-w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent rounded-2xl" />

              <motion.div
                className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-2xl hidden sm:flex items-center space-x-2"
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Trophy className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Trusted Publisher
                  </p>
                  <p className="text-xs text-slate-600">
                    Quality You Can Rely On
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-2xl hidden sm:flex items-center space-x-2"
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Star className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    100% Satisfaction
                  </p>
                  <p className="text-xs text-slate-600">
                    Based on Customer Feedback
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-white" id="testimonials" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              Mereka?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Testimoni dari para penulis yang telah mempercayakan karya mereka
            kepada kami
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={childVariant}>
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative h-full"
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-12 h-12 text-purple-200 mb-6" />

                <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-purple-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
