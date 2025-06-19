import { 
  Layers, MonitorPlay, Video, Mic, 
  School, Users, Medal, GraduationCap,
  Bookmark, Briefcase, Cpu, Code2,
  Film, Music, Palette, Calendar,
  BookOpen, MapPin, Phone, Mail, Clock4
} from 'lucide-react';
import React from 'react';

// Helper type for icon components
type IconComponent = React.FC<{ className?: string }>;

export const programs = [
  {
    title: "Rekayasa Perangkat Lunak",
    description: "Membekali siswa dengan keterampilan pengembangan software",
    icon: React.createElement(Layers, { className: "w-8 h-8 text-blue-500" }),
    href: "/program/rpl"
  },
  {
    title: "Teknik Komputer Jaringan",
    description: "Membentuk ahli jaringan komputer profesional",
    icon: React.createElement(MonitorPlay, { className: "w-8 h-8 text-green-500" }),
    href: "/program/tkj"
  },
  {
    title: "Multimedia",
    description: "Mengembangkan kreativitas di bidang digital kreatif",
    icon: React.createElement(Video, { className: "w-8 h-8 text-purple-500" }),
    href: "/program/multimedia"
  },
  {
    title: "Broadcasting",
    description: "Mencetak profesional di bidang penyiaran",
    icon: React.createElement(Mic, { className: "w-8 h-8 text-red-500" }),
    href: "/program/broadcasting"
  }
];

export const news = [
  {
    title: "SMKN 1 Adiwerna Raih Juara Lomba Kompetensi Siswa Nasional",
    date: "15 Juni 2024",
    excerpt: "Tim kami berhasil meraih medali emas di bidang Web Technologies",
    image: "/news-1.jpg"
  },
  {
    title: "Penerimaan Peserta Didik Baru Tahun 2024/2025",
    date: "1 Juni 2024",
    excerpt: "Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2024",
    image: "/news-2.jpg"
  },
  {
    title: "Workshop Pengembangan Kurikulum Merdeka Belajar",
    date: "25 Mei 2024",
    excerpt: "Guru-guru mengikuti workshop penyusunan kurikulum merdeka",
    image: "/news-3.jpg"
  }
];

export const achievements = [
  {
    title: "Juara 1 LKS Nasional 2023",
    category: "Web Technologies",
    year: "2023"
  },
  {
    title: "Juara 2 Lomba Film Pendek",
    category: "Multimedia",
    year: "2023"
  },
  {
    title: "Juara Harapan 1 Robotik",
    category: "Teknologi",
    year: "2022"
  },
  {
    title: "Sekolah Adiwiyata Tingkat Provinsi",
    category: "Lingkungan",
    year: "2022"
  }
];

export const facilities = [
  {
    name: "Laboratorium Komputer",
    description: "12 ruang lab komputer dengan spesifikasi tinggi",
    icon: React.createElement(MonitorPlay, { className: "w-6 h-6" })
  },
  {
    name: "Perpustakaan Digital",
    description: "Koleksi lengkap buku dan akses digital",
    icon: React.createElement(BookOpen, { className: "w-6 h-6" })
  },
  {
    name: "Studio Broadcasting",
    description: "Studio lengkap untuk praktik penyiaran",
    icon: React.createElement(Mic, { className: "w-6 h-6" })
  },
  {
    name: "Lapangan Olahraga",
    description: "Lapangan basket, voli, dan futsal",
    icon: React.createElement(Medal, { className: "w-6 h-6" })
  },
  {
    name: "Ruang Kelas Nyaman",
    description: "AC, proyektor, dan wifi di setiap kelas",
    icon: React.createElement(School, { className: "w-6 h-6" })
  },
  {
    name: "Laboratorium Bahasa",
    description: "Fasilitas modern untuk pembelajaran bahasa",
    icon: React.createElement(Mic, { className: "w-6 h-6" })
  }
];

export const partners = [
  { name: "Telkom Indonesia", logo: "/partner-telkom.png" },
  { name: "Google", logo: "/partner-google.png" },
  { name: "Microsoft", logo: "/partner-microsoft.png" },
  { name: "Cisco", logo: "/partner-cisco.png" },
  { name: "Adobe", logo: "/partner-adobe.png" },
  { name: "Oracle", logo: "/partner-oracle.png" }
];

export const testimonials = [
  {
    name: "Budi Santoso",
    role: "Software Engineer at Gojek",
    quote: "SMKN 1 Adiwerna memberiku dasar yang kuat untuk karir di bidang IT.",
    image: "/alumni-1.jpg"
  },
  {
    name: "Ani Wijaya",
    role: "Network Specialist at Telkom",
    quote: "Guru-guru yang kompeten dan fasilitas lengkap membantu saya meraih kesuksesan.",
    image: "/alumni-2.jpg"
  },
  {
    name: "Citra Dewi",
    role: "Multimedia Designer at Tokopedia",
    quote: "Pengalaman belajar di SMKN 1 Adiwerna sangat berharga untuk karir kreatif saya.",
    image: "/alumni-3.jpg"
  }
];

export const stats = [
  { value: "1000+", label: "Siswa Aktif", icon: React.createElement(Users, { className: "w-8 h-8" }) },
  { value: "50+", label: "Guru Berpengalaman", icon: React.createElement(GraduationCap, { className: "w-8 h-8" }) },
  { value: "90%", label: "Kelulusan", icon: React.createElement(Bookmark, { className: "w-8 h-8" }) },
  { value: "85%", label: "Penempatan Kerja", icon: React.createElement(Briefcase, { className: "w-8 h-8" }) }
];

export const extracurriculars = [
  {
    name: "Robotics Club",
    description: "Belajar merancang dan memprogram robot",
    icon: React.createElement(Cpu, { className: "w-6 h-6 text-blue-500" })
  },
  {
    name: "Programming Club",
    description: "Mengembangkan aplikasi dan website",
    icon: React.createElement(Code2, { className: "w-6 h-6 text-green-500" })
  },
  {
    name: "Film Production",
    description: "Produksi film pendek dan dokumenter",
    icon: React.createElement(Film, { className: "w-6 h-6 text-purple-500" })
  },
  {
    name: "Music Band",
    description: "Latihan musik dan tampil di acara sekolah",
    icon: React.createElement(Music, { className: "w-6 h-6 text-red-500" })
  },
  {
    name: "Art Community",
    description: "Eksplorasi seni digital dan tradisional",
    icon: React.createElement(Palette, { className: "w-6 h-6 text-yellow-500" })
  },
  {
    name: "Debate Club",
    description: "Melatih kemampuan berbicara dan berargumentasi",
    icon: React.createElement(Mic, { className: "w-6 h-6 text-indigo-500" })
  }
];

export const activities = [
  {
    title: "Pekan Budaya Nasional",
    date: "10-15 Agustus 2024",
    description: "Merayakan keragaman budaya Indonesia",
    image: "/activity-1.jpg"
  },
  {
    title: "Tech Expo 2024",
    date: "5 Oktober 2024",
    description: "Pameran inovasi teknologi siswa",
    image: "/activity-2.jpg"
  },
  {
    title: "Career Day",
    date: "20 November 2024",
    description: "Bertemu dengan profesional industri",
    image: "/activity-3.jpg"
  }
];

export const teachers = [
  {
    name: "Dr. Ahmad Fauzi",
    position: "Kepala Sekolah",
    expertise: "Manajemen Pendidikan",
    image: "/teacher-1.jpg"
  },
  {
    name: "Dewi Sartika, M.Kom",
    position: "Guru RPL",
    expertise: "Pemrograman Web",
    image: "/teacher-2.jpg"
  },
  {
    name: "Bambang Setiawan, S.T",
    position: "Guru TKJ",
    expertise: "Jaringan Komputer",
    image: "/teacher-3.jpg"
  },
  {
    name: "Citra Lestari, S.Sn",
    position: "Guru Multimedia",
    expertise: "Desain Grafis",
    image: "/teacher-4.jpg"
  }
];

export const gallery = [
  { image: "/gallery-1.jpg", caption: "Gedung Sekolah" },
  { image: "/gallery-2.jpg", caption: "Laboratorium Komputer" },
  { image: "/gallery-3.jpg", caption: "Kegiatan Belajar" },
  { image: "/gallery-4.jpg", caption: "Upacara Bendera" },
  { image: "/gallery-5.jpg", caption: "Ekstrakurikuler" },
  { image: "/gallery-6.jpg", caption: "Acara Sekolah" }
];

export const faqs = [
  {
    question: "Bagaimana cara mendaftar ke SMKN 1 Adiwerna?",
    answer: "Pendaftaran bisa dilakukan secara online melalui website kami atau datang langsung ke sekolah."
  },
  {
    question: "Apa saja program keahlian yang tersedia?",
    answer: "Kami memiliki 4 program unggulan: RPL, TKJ, Multimedia, dan Broadcasting."
  },
  {
    question: "Apakah ada beasiswa untuk siswa berprestasi?",
    answer: "Ya, kami menyediakan berbagai program beasiswa untuk siswa berprestasi maupun kurang mampu."
  },
  {
    question: "Bagaimana prospek lulusan SMKN 1 Adiwerna?",
    answer: "Lulusan kami banyak yang langsung bekerja di perusahaan ternama atau melanjutkan ke perguruan tinggi."
  }
];