// app/(admin)/hooks/useAdminGuard.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/admin/context/AuthContext";

// Hook untuk proteksi route dengan opsi kustomisasi
export function useAdminGuard(options = {}) {
  const {
    requireAuth = true,
    redirectTo = "/admin/login",
    redirectDelay = 1000,
    onUnauthorized,
    onRedirect,
  } = options;

  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState("checking"); // checking, authorized, unauthorized, redirecting

  useEffect(() => {
    if (loading) {
      setStatus("checking");
      return;
    }

    const isAuthenticated = !!user;
    const publicRoutes = ["/admin/login", "/admin/login"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (requireAuth && !isAuthenticated && !isPublicRoute) {
      setStatus("unauthorized");

      // Panggil callback jika ada
      if (onUnauthorized) {
        onUnauthorized();
      }

      // Redirect dengan delay
      const timer = setTimeout(() => {
        setStatus("redirecting");
        if (onRedirect) onRedirect(redirectTo);
        router.replace(redirectTo);
      }, redirectDelay);

      return () => clearTimeout(timer);
    } else if (isAuthenticated && isPublicRoute) {
      setStatus("redirecting");

      // User sudah login tapi masih di halaman auth
      const timer = setTimeout(() => {
        if (onRedirect) onRedirect("/admin");
        router.replace("/admin");
      }, redirectDelay);

      return () => clearTimeout(timer);
    } else {
      setStatus("authorized");
    }
  }, [
    user,
    loading,
    pathname,
    requireAuth,
    redirectTo,
    redirectDelay,
    onUnauthorized,
    onRedirect,
    router,
  ]);

  return {
    user,
    loading,
    status,
    isAuthenticated: !!user,
    canAccess: status === "authorized",
    isRedirecting: status === "redirecting",
    isChecking: status === "checking",
    isUnauthorized: status === "unauthorized",
  };
}

// Hook untuk mendapatkan informasi user admin
export function useAdminUser() {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    isLoggedIn: !!user,
    email: user?.email,
    userId: user?.id,
    userMetadata: user?.user_metadata,
    lastSignIn: user?.last_sign_in_at,
  };
}

// Hook untuk navigasi admin dengan proteksi
export function useAdminNavigation() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const navigateTo = (path, options = {}) => {
    const { requireAuth = true, replace = false } = options;

    if (requireAuth && !user && !loading) {
      // Jika memerlukan auth tapi belum login, redirect ke register
      router.replace("/admin/login");
      return false;
    }

    if (replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
    return true;
  };

  const goToAdmin = () => navigateTo("/admin");
  const goToLogin = () => navigateTo("/admin/login", { requireAuth: false });
  const goToRegister = () => navigateTo("/admin/login", { requireAuth: false });

  return {
    navigateTo,
    goToAdmin,
    goToLogin,
    goToRegister,
    canNavigate: !loading,
  };
}

// Hook untuk logout dengan konfirmasi
export function useAdminLogout() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async (options = {}) => {
    const {
      confirmMessage = "Apakah Anda yakin ingin keluar?",
      showConfirm = true,
      redirectTo = "/admin/login",
      onSuccess,
      onError,
    } = options;

    if (showConfirm && !window.confirm(confirmMessage)) {
      return { success: false, canceled: true };
    }

    setIsLoggingOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        if (onError) onError(error);
        return { success: false, error };
      }

      if (onSuccess) onSuccess();

      // Redirect setelah logout berhasil
      setTimeout(() => {
        router.replace(redirectTo);
      }, 500);

      return { success: true };
    } catch (err) {
      if (onError) onError(err);
      return { success: false, error: err };
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
}

export default {
  useAdminGuard,
  useAdminUser,
  useAdminNavigation,
  useAdminLogout,
};
