// components/Navbar.jsx
"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/admin/context/AuthContext";

export default function AdminLogoutFab() {
  const pathname = usePathname() ?? "/";
  const isAdminRoute = pathname.startsWith("/admin"); // tampil untuk /admin dan semua subpath
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // hanya render kalau berada di route admin
  if (!isAdminRoute) return null;

  // opsional: hanya tampil kalau ada user (hapus baris ini jika mau selalu tampil)
  if (!user) return null;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const { error } = await signOut();
      if (!error) {
        router.push("/admin/login");
      } else {
        console.error("Logout error:", error);
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="fixed right-6 top-6 z-50">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        title="Keluar"
        aria-label="Logout"
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-2xl border border-slate-200/50 bg-white/95 hover:scale-105 transform transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-300"
      >
        {isLoggingOut ? (
          <span className="animate-spin inline-block w-5 h-5 border-2 border-t-emerald-600 border-slate-200 rounded-full" />
        ) : (
          <LogOut className="w-5 h-5 text-rose-600" />
        )}
        <span className="font-medium text-rose-600">Logout</span>
      </button>
    </div>
  );
}
