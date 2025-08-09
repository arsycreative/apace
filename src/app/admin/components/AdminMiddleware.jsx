// app/(admin)/components/AdminMiddleware.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Loader2, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "@/app/admin/context/AuthContext";

// Komponen Loading dengan animasi yang lebih menarik
function AdminLoadingScreen({ message = "Memuat..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-8"
        >
          <BookOpen className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
          <p className="text-xl font-semibold text-slate-700">{message}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-500"
        >
          Memeriksa status autentikasi
        </motion.p>

        {/* Progress bar animasi */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
          className="mt-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto max-w-xs"
        />
      </motion.div>
    </div>
  );
}

// Komponen untuk halaman tidak diotorisasi
function UnauthorizedScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg mb-6"
        >
          <Shield className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Akses Ditolak
        </h1>

        <p className="text-slate-600 mb-8">
          Anda harus login terlebih dahulu untuk mengakses halaman admin.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/admin/login")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Login Sekarang
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/admin/login")}
            className="w-full bg-white text-indigo-600 py-3 px-6 rounded-xl font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
          >
            Daftar Akun Baru
          </motion.button> */}
        </div>
      </motion.div>
    </div>
  );
}

// Middleware utama untuk proteksi route admin
export function AdminMiddleware({ children, requireAuth = true }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  // Daftar halaman yang tidak memerlukan autentikasi
  const publicRoutes = ["/admin/login", "/admin/sya"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Tunggu hingga loading selesai
    if (loading) return;

    const handleRedirection = async () => {
      setRedirecting(true);

      if (!user && requireAuth && !isPublicRoute) {
        // User belum login dan mencoba akses halaman yang memerlukan auth
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay untuk UX
        router.replace("/admin/login");
      } else if (user && isPublicRoute) {
        // User sudah login tapi masih di halaman login/register
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay untuk UX
        router.replace("/admin");
      } else {
        setRedirecting(false);
      }
    };

    handleRedirection();
  }, [user, loading, pathname, router, requireAuth, isPublicRoute]);

  // Tampilkan loading screen saat sedang memuat auth
  if (loading) {
    return <AdminLoadingScreen message="Memeriksa autentikasi..." />;
  }

  // Tampilkan loading saat redirecting
  if (redirecting) {
    const message = user
      ? "Mengalihkan ke dashboard..."
      : "Mengalihkan ke halaman login...";
    return <AdminLoadingScreen message={message} />;
  }

  // Jika memerlukan auth tapi user belum login dan bukan di public route
  if (requireAuth && !user && !isPublicRoute) {
    return <UnauthorizedScreen />;
  }

  // Jika user sudah login tapi masih di public route
  if (user && isPublicRoute) {
    return <AdminLoadingScreen message="Mengalihkan ke dashboard..." />;
  }

  // Render children jika semua kondisi terpenuhi
  return children;
}

// Hook untuk mengecek status auth dengan mudah
export function useAdminAuth() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const isAuthenticated = !!user;
  const isPublicRoute = ["/admin/login", "/admin/sya"].includes(pathname);
  const canAccessRoute = isAuthenticated || isPublicRoute;

  return {
    user,
    loading,
    isAuthenticated,
    isPublicRoute,
    canAccessRoute,
  };
}

export default AdminMiddleware;
