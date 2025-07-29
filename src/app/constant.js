import {
  Award,
  BarChart3,
  BookOpen,
  DollarSign,
  Eye,
  FileCheck,
  FileText,
  Lightbulb,
  MessageCircle,
  Palette,
  PenTool,
  Rocket,
  Shield,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export const mainServices = [
  {
    title: "Penerbitan Buku ISBN",
    description:
      "Layanan penerbitan profesional dengan ISBN resmi untuk buku cetak maupun digital.",
    icon: BookOpen,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Konversi Karya Tulis Ilmiah",
    description:
      "Transformasi thesis, disertasi, atau paper penelitian menjadi buku siap terbit.",
    icon: FileText,
    gradient: "from-violet-500 to-violet-600",
  },
  {
    title: "Kolaborasi Penulisan Buku",
    description:
      "Kolaborasi dengan tim penulis profesional untuk menghasilkan karya berkualitas tinggi.",
    icon: Users,
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Pendampingan Penulisan",
    description:
      "Bimbingan personal intensif dari konsep hingga naskah siap terbit.",
    icon: PenTool,
    gradient: "from-fuchsia-500 to-fuchsia-600",
  },
];

export const statistics = [
  { number: "500+", label: "Buku Diterbitkan", icon: BookOpen },
  { number: "300+", label: "Penulis Terlayani", icon: Users },
  { number: "98%", label: "Tingkat Kepuasan", icon: Trophy },
  { number: "5+", label: "Tahun Pengalaman", icon: BarChart3 },
];

export const testimonials = [
  {
    name: "Dr. Ahmad Wijaya",
    role: "Dosen Universitas Indonesia",
    content:
      "Proses penerbitan buku saya berjalan sangat lancar. Tim PT APACE sangat profesional dan responsif. Hasil akhirnya melebihi ekspektasi saya.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Prof. Sarah Mutia",
    role: "Peneliti Senior",
    content:
      "Sangat puas dengan layanan konversi thesis ke buku. Tim editor sangat membantu dalam memperbaiki struktur dan bahasa. Recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "M. Rizki Pratama",
    role: "Mahasiswa Pascasarjana",
    content:
      "Pelayanan yang excellent! Dari konsultasi awal hingga buku jadi, semuanya berjalan sesuai timeline. Harga juga sangat reasonable.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  },
];

// Layanan
export const mainServicesLayanan = [
  {
    id: "isbn",
    title: "Penerbitan Buku ISBN",
    subtitle: "Buku Cetak & Digital",
    description:
      "Layanan penerbitan profesional dengan ISBN resmi untuk buku cetak maupun digital. Proses lengkap dari editing hingga distribusi global.",
    icon: BookOpen,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    features: [
      "ISBN resmi terdaftar",
      "Editing profesional mendalam",
      "Desain cover premium",
      "Layout interior elegan",
      "Cetak berkualitas tinggi",
      "Distribusi online & offline",
      "Format digital (PDF, ePub)",
      "Marketing support lengkap",
    ],
    price: "Mulai dari Rp 2.500.000",
    duration: "4-6 minggu",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    highlights: [
      "Bestseller Guarantee",
      "Global Distribution",
      "Premium Quality",
    ],
  },
  {
    id: "konversi",
    title: "Konversi Karya Tulis Ilmiah",
    subtitle: "Thesis ke Buku Komersial",
    description:
      "Transformasi thesis, disertasi, atau paper penelitian menjadi buku yang siap terbit dengan standar penerbitan profesional internasional.",
    icon: FileText,
    gradient: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    features: [
      "Analisis kelayakan mendalam",
      "Restrukturisasi konten ahli",
      "Copy editing berkualitas",
      "Penyesuaian gaya bahasa",
      "Penambahan elemen visual",
      "Format akademik ke populer",
      "Proofreading premium",
      "Konsultasi penulis intensif",
    ],
    price: "Mulai dari Rp 1.800.000",
    duration: "3-5 minggu",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",
    highlights: ["Academic Excellence", "Expert Review", "Fast Processing"],
  },
  {
    id: "kolaborasi",
    title: "Kolaborasi Penulisan Buku",
    subtitle: "Tim Penulis Profesional",
    description:
      "Kolaborasi dengan tim penulis berpengalaman untuk menghasilkan karya berkualitas tinggi sesuai bidang keahlian dan visi Anda.",
    icon: Users,
    gradient: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    features: [
      "Tim penulis berpengalaman",
      "Riset mendalam & akurat",
      "Outline terstruktur rapi",
      "Penulisan kolaboratif",
      "Review berkala intensif",
      "Sinkronisasi gaya penulisan",
      "Quality assurance ketat",
      "Project management profesional",
    ],
    price: "Mulai dari Rp 5.000.000",
    duration: "8-12 minggu",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    highlights: ["Expert Team", "Custom Content", "Premium Results"],
  },
  {
    id: "pendampingan",
    title: "Pendampingan Penulisan",
    subtitle: "Personal Writing Coach",
    description:
      "Bimbingan personal intensif dari konsep hingga naskah siap terbit. Mentoring eksklusif untuk penulis pemula hingga berpengalaman.",
    icon: PenTool,
    gradient: "from-fuchsia-500 to-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    borderColor: "border-fuchsia-200",
    textColor: "text-fuchsia-600",
    features: [
      "Konsultasi personal 1-on-1",
      "Pembuatan outline strategis",
      "Coaching writing technique",
      "Review progress mingguan",
      "Feedback konstruktif detail",
      "Motivasi & mental support",
      "Writing tools & template",
      "Publishing guidance lengkap",
    ],
    price: "Mulai dari Rp 3.200.000",
    duration: "6-10 minggu",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    highlights: ["Personal Mentor", "Skill Development", "Success Guaranteed"],
  },
];

export const whyChooseUs = [
  {
    title: "Kualitas Terjamin",
    description:
      "Tim editor dan desainer profesional dengan pengalaman puluhan tahun di industri penerbitan internasional.",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    title: "Proses Lightning Fast",
    description:
      "Sistem kerja yang efisien dengan teknologi terdepan memungkinkan penyelesaian proyek dalam waktu record.",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Harga Transparan",
    description:
      "Paket layanan fleksibel dengan harga yang jelas dan kompetitif tanpa biaya tersembunyi.",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    title: "Reputasi Terpercaya",
    description:
      "Telah melayani ribuan penulis dengan tingkat kepuasan 98% dan testimoni positif dari seluruh Indonesia.",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Inovasi Berkelanjutan",
    description:
      "Mengintegrasikan AI dan teknologi terkini untuk memberikan pengalaman penerbitan yang revolusioner.",
    icon: Lightbulb,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    title: "Support Premium 24/7",
    description:
      "Tim customer success yang responsif dan berpengalaman siap membantu Anda kapan saja diperlukan.",
    icon: MessageCircle,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

export const publishingProcess = [
  {
    step: 1,
    title: "Konsultasi & Analisis",
    description:
      "Diskusi mendalam tentang visi Anda, analisis kelayakan naskah, dan penentuan strategi penerbitan terbaik.",
    duration: "1-2 hari",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    title: "Perencanaan Strategis",
    description:
      "Pembuatan roadmap detail, assignment tim ahli, dan finalisasi kontrak dengan timeline yang jelas.",
    duration: "2-3 hari",
    icon: Target,
    color: "from-purple-500 to-violet-500",
  },
  {
    step: 3,
    title: "Proses Editorial Premium",
    description:
      "Copy editing mendalam, substantive editing, dan penyempurnaan struktur dengan standar internasional.",
    duration: "1-2 minggu",
    icon: FileCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    step: 4,
    title: "Desain & Visualisasi",
    description:
      "Pembuatan cover design yang eye-catching, layout interior premium, dan formatting sesuai standar global.",
    duration: "1 minggu",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
  },
  {
    step: 5,
    title: "Quality Review",
    description:
      "Preview hasil kerja, sesi feedback dengan penulis, dan proses revisi hingga mencapai kesempurnaan.",
    duration: "3-5 hari",
    icon: Eye,
    color: "from-amber-500 to-orange-500",
  },
  {
    step: 6,
    title: "Launch & Distribution",
    description:
      "Finalisasi file, proses ISBN resmi, dan peluncuran ke berbagai platform distribusi domestik dan internasional.",
    duration: "1 minggu",
    icon: Rocket,
    color: "from-indigo-500 to-blue-500",
  },
];

export const achievements = [
  { number: "500+", label: "Buku Diterbitkan", icon: BookOpen },
  { number: "300+", label: "Penulis Terlayani", icon: Users },
  { number: "98%", label: "Tingkat Kepuasan", icon: Trophy },
  { number: "50+", label: "Penghargaan", icon: Award },
];
