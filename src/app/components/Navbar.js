"use client";
import React, { useState, useEffect } from "react";
import { Home, Users, FileText, Menu, X, Book } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Profil", href: "/profile", icon: Users },
  { name: "Katalog", href: "/katalog", icon: Book },
  { name: "Layanan", href: "/layanan", icon: FileText },
];

export default function Navbar() {
  // Flags for SSR-safe rendering & interactivity
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mark as mounted (client-only)
    setMounted(true);

    // Scroll listener
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize based on current scroll
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 1) Render a static placeholder on the server and first client render
  if (!mounted) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] bg-transparent"
        suppressHydrationWarning
      >
        {/* Reserve the same height so layout doesn’t shift */}
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20" />
      </nav>
    );
  }

  // 2) Real, interactive navbar on the client after hydration
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-colors duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo + Title */}
            <div className="flex flex-col items-center">
              <div className="relative w-8 h-8 lg:w-9 lg:h-9">
                <Image
                  src="/logo.webp"
                  alt="Logo PT APACE"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <span
                className={`text-sm font-extrabold transition-colors duration-300 ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                PT APACE
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    isScrolled
                      ? "text-slate-700 hover:text-purple-600 hover:bg-purple-50"
                      : "text-white hover:text-violet-300 hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen((o) => !o)}
              className={`lg:hidden p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isScrolled ? "bg-white/20" : "bg-white/10"
              }`}
            >
              {isOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-slate-900" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-slate-900" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-[64px] z-[1001] bg-white/95 backdrop-blur-md shadow-lg overflow-hidden"
          >
            <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200 text-slate-900"
                >
                  <item.icon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
