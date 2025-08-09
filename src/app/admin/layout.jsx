// app/(admin)/layout.jsx
"use client";

import React from "react";
import Providers from "../providers";
import Navbar from "./components/NavbarAdmin";
import { AdminMiddleware } from "./components/AdminMiddleware";

export default function AdminLayout({ children }) {
  return (
    <Providers>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Providers>
  );
}

function AdminLayoutContent({ children }) {
  return (
    <AdminMiddleware requireAuth={true}>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="min-h-[calc(100vh-120px)]">{children}</main>
      </div>
    </AdminMiddleware>
  );
}
