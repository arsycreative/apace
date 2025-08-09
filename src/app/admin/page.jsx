"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Search,
  Star,
  Eye,
  Calendar,
  Filter,
  ArrowUpDown,
  Upload,
  Image as ImageIcon,
  ZoomIn,
  AlertCircle,
} from "lucide-react";

const categories = [
  "Manajemen",
  "Hukum",
  "Pendidikan",
  "Ekonomi",
  "Penelitian",
  "Teknologi",
  "Komunikasi",
  "Akuntansi",
  "Sosiologi",
];

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    authors: [""],
    category: "",
    year: new Date().getFullYear(),
    isbn: "",
    pages: "",
    price: "",
    rating: 0,
    views: 0,
    is_new: false,
    is_bestseller: false,
    cover_file: null,
    subtitle: "",
    publisher: "",
    publishDate: "",
    language: "",
    format: "",
    dimensions: "",
    weight: "",
    description: "",
    keyFeatures: [""],
  });

  // Fetch books from Supabase
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Gagal memuat data buku. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `book-covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from("book-covers")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("book-covers").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Gagal mengunggah gambar");
    }
  };

  // Delete image from Supabase Storage
  const deleteImage = async (imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `book-covers/${fileName}`;

      await supabase.storage.from("book-covers").remove([filePath]);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    let filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some((author) =>
          author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        !selectedCategory || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort books
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || "";
      let bValue = b[sortBy] || "";

      if (sortBy === "title" || sortBy === "category") {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi tipe
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    try {
      // Opsi kompresi: maksimal 1MB, lebar/tinggi maksimal 1024px
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      // Kompres file
      const compressedFile = await imageCompression(file, options);

      // Jika setelah kompres ukurannya masih > 5MB, tolak
      if (compressedFile.size > 5 * 1024 * 1024) {
        setError("Ukuran file terlalu besar setelah kompresi. Maksimal 5 MB.");
        return;
      }

      // Generate preview URL
      const compressedUrl = URL.createObjectURL(compressedFile);

      // Simpan ke state
      setFormData((prev) => ({
        ...prev,
        cover_file: compressedFile,
        cover_url: compressedUrl,
      }));
      setError(null);
    } catch (err) {
      console.error("Compression error:", err);
      setError("Gagal memproses gambar. Silakan coba gambar lain.");
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      setError(null);
      if (!formData.title.trim()) throw new Error("Judul buku harus diisi");
      if (!formData.category) throw new Error("Kategori harus dipilih");
      if (!formData.isbn.trim()) throw new Error("ISBN harus diisi");
      if (formData.authors.filter((a) => a.trim()).length === 0)
        throw new Error("Minimal satu penulis harus diisi");

      let coverUrl = editingBook?.cover_url || null;
      if (formData.cover_file) {
        if (editingBook?.cover_url) await deleteImage(editingBook.cover_url);
        coverUrl = await uploadImage(formData.cover_file);
      }

      const bookData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        authors: formData.authors.filter((a) => a.trim()),
        cover_url: coverUrl,
        category: formData.category,
        year: parseInt(formData.year) || new Date().getFullYear(),
        isbn: formData.isbn.trim(),
        pages: formData.pages.trim(),
        price: formData.price.trim(),
        publisher: formData.publisher.trim(),
        publish_date: formData.publishDate,
        language: formData.language,
        format: formData.format.trim(),
        dimensions: formData.dimensions.trim(),
        weight: formData.weight.trim(),
        description: formData.description.trim(),
        key_features: formData.keyFeatures.filter((k) => k.trim()),
        rating: parseFloat(formData.rating) || 0,
        views: parseInt(formData.views) || 0,
        is_new: formData.is_new,
        is_bestseller: formData.is_bestseller,
        updated_at: new Date().toISOString(),
      };

      if (editingBook) {
        const { data, error } = await supabase
          .from("books")
          .update(bookData)
          .eq("id", editingBook.id)
          .select()
          .single();
        if (error) throw error;
        setBooks((prev) =>
          prev.map((b) => (b.id === editingBook.id ? data : b))
        );
      } else {
        const { data, error } = await supabase
          .from("books")
          .insert([bookData])
          .select()
          .single();
        if (error) throw error;
        setBooks((prev) => [data, ...prev]);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message || "Gagal menyimpan buku.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (book) => {
    if (!confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      return;
    }

    try {
      setError(null);

      // Delete from database
      const { error } = await supabase.from("books").delete().eq("id", book.id);

      if (error) {
        throw error;
      }

      // Delete cover image if exists
      if (book.cover_url) {
        await deleteImage(book.cover_url);
      }

      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Gagal menghapus buku. Silakan coba lagi.");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || "",
      subtitle: book.subtitle || "",
      authors: book.authors || [""],
      category: book.category || "",
      year: book.year || new Date().getFullYear(),
      isbn: book.isbn || "",
      pages: book.pages || "",
      price: book.price || "",
      publisher: book.publisher || "",
      publishDate: book.publishDate || "",
      language: book.language || "",
      format: book.format || "",
      dimensions: book.dimensions || "",
      weight: book.weight || "",
      description: book.description || "",
      keyFeatures: book.key_features || [""],
      rating: book.rating || 0,
      views: book.views || 0,
      is_new: book.is_new || false,
      is_bestseller: book.is_bestseller || false,
      cover_file: null,
      cover_url: book.cover_url || null,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
    setError(null);
    setFormData({
      title: "",
      authors: [""],
      category: "",
      year: new Date().getFullYear(),
      isbn: "",
      pages: "",
      price: "",
      rating: 0,
      views: 0,
      is_new: false,
      is_bestseller: false,
      cover_file: null,
      cover_url: null,
    });
  };

  const handleImagePreview = (imageUrl, title) => {
    setPreviewImage({ url: imageUrl, title });
    setShowImagePreview(true);
  };

  const addAuthorField = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, ""],
    }));
  };

  const removeAuthorField = (index) => {
    if (formData.authors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index),
      }));
    }
  };

  const updateAuthor = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => (i === index ? value : author)),
    }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const removeFeatureField = (i) =>
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, idx) => idx !== i),
    }));

  const addFeatureField = () =>
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...(prev.keyFeatures || []), ""],
    }));

  const updateFeature = (i, val) => {
    const arr = [...formData.keyFeatures];
    arr[i] = val;
    setFormData((prev) => ({ ...prev, keyFeatures: arr }));
  };

  const formatPrice = (price) => {
    if (!price) return "-";
    const numericPrice = price.toString().replace(/[^\d]/g, "");
    if (!numericPrice) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseInt(numericPrice));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Error Alert */}
      {error && (
        <div className="fixed top-24 lg:top-28 right-4 z-[60] max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium mt-1"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Enhanced Header - Fixed spacing from navbar */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50 pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            {/* Left: Icon + Title */}
            <div className="flex items-start md:items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight">
                  Manajemen Buku
                </h1>
                <p className="text-slate-600 text-sm sm:text-base mt-1 font-medium">
                  Kelola koleksi buku PT APACE dengan mudah
                </p>
              </div>
            </div>

            {/* Right: Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="w-full md:w-auto flex justify-center items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Tambah Buku Baru</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {books.length}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  Total Buku
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {books.filter((book) => book.is_bestseller).length}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  Terlaris
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {books.filter((book) => book.is_new).length}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  Rilis Baru
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari buku atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="created_at-desc">Terbaru</option>
                <option value="created_at-asc">Terlama</option>
                <option value="title-asc">Judul A-Z</option>
                <option value="title-desc">Judul Z-A</option>
                <option value="category-asc">Kategori A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Books Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">
                Memuat buku dari database...
              </p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {searchTerm || selectedCategory
                  ? "Tidak ada buku ditemukan"
                  : "Belum ada buku"}
              </h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                {searchTerm || selectedCategory
                  ? "Coba sesuaikan kriteria pencarian atau filter Anda"
                  : "Mulai bangun perpustakaan Anda dengan menambahkan buku pertama"}
              </p>
              {!searchTerm && !selectedCategory && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Buku Pertama
                </motion.button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Detail Buku
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Performa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-slate-200/50">
                  <AnimatePresence>
                    {filteredBooks.map((book, index) => (
                      <motion.tr
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-white/80 transition-all duration-200"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-4">
                            <div
                              className="h-16 w-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex-shrink-0 overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                              onClick={() =>
                                book.cover_url &&
                                handleImagePreview(book.cover_url, book.title)
                              }
                            >
                              {book.cover_url ? (
                                <div className="relative h-full w-full group">
                                  <Image
                                    src={book.cover_url}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <BookOpen className="w-6 h-6 text-slate-500" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-slate-900 mb-1 truncate">
                                {book.title}
                              </div>
                              <div className="text-sm text-slate-600 mb-2">
                                {book.authors?.join(", ")}
                              </div>
                              <div className="flex gap-2">
                                {book.is_new && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200">
                                    Baru
                                  </span>
                                )}
                                {book.is_bestseller && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200">
                                    ⭐ Terlaris
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-900">
                            {formatPrice(book.price)}
                          </div>
                          <div className="text-xs text-slate-500">
                            {book.pages} halaman
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center text-amber-600">
                              <Star className="w-4 h-4 mr-1 fill-current" />
                              <span className="font-medium">{book.rating}</span>
                            </div>

                            <div className="flex items-center text-slate-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{book.year}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(book)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                              title="Edit buku"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(book)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Hapus buku"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {showImagePreview && previewImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowImagePreview(false)}
                  className="p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 pr-16">
                  {previewImage.title}
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-2xl h-[70vh]">
                    <Image
                      src={previewImage.url}
                      alt={previewImage.title}
                      fill
                      className="object-contain rounded-lg shadow-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] mt-5 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
                    </h2>
                    <p className="text-slate-600 mt-1">
                      {editingBook
                        ? "Perbarui informasi buku"
                        : "Tambahkan buku baru ke koleksi Anda"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseModal}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Error display in modal */}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Judul Buku *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="Masukkan judul buku"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subtitle: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Masukkan subtitle buku"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Kategori *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Penerbit
                      </label>
                      <input
                        type="text"
                        value={formData.publisher}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            publisher: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Masukkan nama penerbit"
                      />
                    </div>

                    {/* ISBN */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        ISBN *
                      </label>
                      <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isbn: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="978-623-09-8037-4"
                      />
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Tahun Terbit
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            year: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        min="1900"
                        max="2030"
                      />
                    </div>

                    {/* Pages */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Jumlah Halaman
                      </label>
                      <input
                        type="text"
                        value={formData.pages}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            pages: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="contoh: xviii + 592"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Harga (Rp)
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="85000"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            rating: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="4.5"
                      />
                    </div>

                    {/* Views */}
                    {/* <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Jumlah Dilihat
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.views}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            views: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-slate-50/50"
                        placeholder="1250"
                      />
                    </div> */}
                  </div>

                  {/* Authors Section */}
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Penulis *
                    </label>
                    <div className="space-y-3">
                      {formData.authors.map((author, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={author}
                            onChange={(e) =>
                              updateAuthor(index, e.target.value)
                            }
                            className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                            placeholder={`Nama penulis ${index + 1}`}
                          />
                          {formData.authors.length > 1 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeAuthorField(index)}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addAuthorField}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2 px-3 py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Penulis Lain
                      </motion.button>
                    </div>
                  </div>

                  {/* Cover Image Section */}
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Sampul Buku
                    </label>
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Upload className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Format yang didukung: JPG, PNG, WebP (Maks 2MB)
                        </p>
                      </div>
                      {(formData.cover_url || editingBook?.cover_url) && (
                        <div className="flex-shrink-0">
                          <div
                            className="relative h-24 w-18 bg-slate-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            onClick={() =>
                              handleImagePreview(
                                formData.cover_url || editingBook.cover_url,
                                formData.title || editingBook?.title
                              )
                            }
                          >
                            <Image
                              src={formData.cover_url || editingBook.cover_url}
                              alt="Sampul saat ini"
                              fill
                              className="object-cover"
                              sizes="72px"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2 text-center">
                            {formData.cover_file ? "Preview" : "Saat ini"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book Status */}
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Status Buku
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center p-4 bg-white rounded-lg border border-slate-200">
                        <input
                          type="checkbox"
                          id="is_new"
                          checked={formData.is_new}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              is_new: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                        />
                        <label
                          htmlFor="is_new"
                          className="ml-3 text-sm font-medium text-slate-700 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          Rilis Baru
                        </label>
                      </div>
                      <div className="flex items-center p-4 bg-white rounded-lg border border-slate-200">
                        <input
                          type="checkbox"
                          id="is_bestseller"
                          checked={formData.is_bestseller}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              is_bestseller: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                        />
                        <label
                          htmlFor="is_bestseller"
                          className="ml-3 text-sm font-medium text-slate-700 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          Terlaris
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subtitle */}

                    {/* Publisher */}

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Bahasa
                      </label>
                      <input
                        type="text"
                        value={formData.language}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contoh: Bahasa Indonesia"
                      />
                    </div>

                    {/* Format */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Format
                      </label>
                      <input
                        type="text"
                        value={formData.format}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            format: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contoh: Paperback"
                      />
                    </div>

                    {/* Dimensions */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Dimensi
                      </label>
                      <input
                        type="text"
                        value={formData.dimensions}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dimensions: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contoh: 15 x 23 cm"
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Berat
                      </label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            weight: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Contoh: 500 gr"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Tulis deskripsi singkat buku"
                    />
                  </div>

                  {/* Key Features */}
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Fitur Utama
                    </label>
                    <div className="space-y-3">
                      {formData.keyFeatures?.map((feat, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => updateFeature(idx, e.target.value)}
                            className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            placeholder={`Fitur ${idx + 1}`}
                          />
                          {formData.keyFeatures.length > 1 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFeatureField(idx)}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addFeatureField}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2 px-3 py-2 hover:bg-indigo-50 rounded-lg"
                      >
                        <Plus className="w-4 h-4" /> Tambah Fitur
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                      disabled={uploading}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Batal
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={uploading}
                      className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                          {editingBook ? "Memperbarui..." : "Menyimpan..."}
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {editingBook ? "Perbarui Buku" : "Tambah Buku"}
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
