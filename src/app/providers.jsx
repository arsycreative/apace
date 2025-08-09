// app/providers.jsx
"use client";

import React from "react";
import { AuthProvider } from "@/app/admin/context/AuthContext";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
