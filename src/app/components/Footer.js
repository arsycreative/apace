"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Shared nav items to mirror Navbar
const navItems = [
  { name: "Beranda", href: "/", icon: BookOpen },
  { name: "Profil", href: "/profile", icon: BookOpen },
  { name: "Katalog", href: "/katalog", icon: BookOpen },
  { name: "Layanan", href: "/layanan", icon: BookOpen },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  const pathname = usePathname();

  // ambil segmen pertama; akan bernilai "admin" untuk /admin dan /admin/...
  const firstSegment = pathname?.split("/")[1];

  // jika route berada di bawah /admin => sembunyikan navbar
  if (firstSegment === "admin") return null;
  return (
    <motion.footer
      className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white"
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-white.jpg"
                  alt="Logo PT Bintang Creative Nusantara"
                  width={48}
                  height={48}
                  className="rounded-xl object-cover"
                  priority
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">PT APACE</h3>
                <p className="text-slate-400">
                  PT Adiwangsa Paramatha Cendikia
                </p>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
              Mitra utama bagi akademisi, praktisi dan masyarakat umum di
              Indonesia dalam mengaktualisasikan gagasan dan pengetahuan menjadi
              karya tulis berkualitas yang mudah diakses dan terjangkau.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-5 h-5 text-violet-400" />
                <span suppressHydrationWarning>
                  adiwangsaparamarthacendikia@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-5 h-5 text-violet-400" />
                <span>+62 813 3542 4229</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="w-5 h-5 text-violet-400" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tautan Cepat</h4>
            <motion.ul
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {navItems.map((link, idx) => (
                <motion.li
                  key={idx}
                  className=""
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-violet-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-violet-400 rounded-full" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Layanan Kami</h4>
            <motion.ul
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                "Penerbitan Buku ISBN",
                "Konversi Karya Tulis Ilmiah",
                "Kolaborasi Penulisan",
                "Pendampingan Penulisan",
                "Editing & Proofreading",
                "Desain Cover Profesional",
              ].map((service, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-slate-300 text-sm leading-relaxed"
                >
                  {service}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            © 2024 PT Adiwangsa Paramatha Cendikia. All rights reserved.
          </p>

          {/* Social Links */}
          {/* <div className="flex items-center space-x-4">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-violet-500 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </motion.a>
            ))}
          </div> */}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
