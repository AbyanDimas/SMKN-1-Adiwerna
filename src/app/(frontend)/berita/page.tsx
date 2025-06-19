'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, Clock, Newspaper, BookOpen,
  ChevronRight, ArrowRight, Video, Mic,
  GraduationCap, Trophy, Users, School
} from 'lucide-react';

const news = [
  {
    id: 1,
    title: "SMKN 1 Adiwerna Raih Juara Lomba Kompetensi Siswa Nasional 2024",
    excerpt: "Tim kami berhasil meraih medali emas di bidang Web Technologies dan perak di bidang Network Administration",
    date: "15 Juni 2024",
    time: "10:00 WIB",
    category: "Prestasi",
    image: "/news-competition.jpg",
    type: "featured",
    author: "Tim Humas SMKN 1"
  },
  {
    id: 2,
    title: "Penerimaan Peserta Didik Baru Tahun 2024/2025 Dibuka",
    excerpt: "Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2024. Kuota terbatas untuk 4 program keahlian unggulan.",
    date: "1 Juni 2024",
    time: "08:00 WIB",
    category: "Pengumuman",
    image: "/news-ppdb.jpg",
    type: "normal",
    author: "Panitia PPDB"
  },
  {
    id: 3,
    title: "Workshop Pengembangan Kurikulum Merdeka Belajar",
    excerpt: "Guru-guru mengikuti workshop penyusunan kurikulum merdeka selama 3 hari bersama pakar pendidikan.",
    date: "25 Mei 2024",
    time: "13:30 WIB",
    category: "Kegiatan",
    image: "/news-workshop.jpg",
    type: "normal",
    author: "Tim Kurikulum"
  },
  {
    id: 4,
    title: "Kolaborasi dengan Google Indonesia untuk Program Digital Talent",
    excerpt: "SMKN 1 Adiwerna terpilih sebagai sekolah mitra program Digital Talent Scholarship 2024",
    date: "18 Mei 2024",
    time: "09:15 WIB",
    category: "Kerjasama",
    image: "/news-google.jpg",
    type: "highlight",
    author: "Tim Kerjasama"
  },
  {
    id: 5,
    title: "Peluncuran Laboratorium IoT Terbaru",
    excerpt: "Laboratorium Internet of Things dengan perangkat mutakhir resmi dibuka untuk praktik siswa",
    date: "10 Mei 2024",
    time: "14:00 WIB",
    category: "Fasilitas",
    image: "/news-lab.jpg",
    type: "normal",
    author: "Tim Sarpras"
  },
  {
    id: 6,
    title: "Kunjungan Industri ke Startup Lokal",
    excerpt: "Siswa jurusan RPL dan Multimedia melakukan kunjungan ke beberapa startup teknologi di Jakarta",
    date: "5 Mei 2024",
    time: "11:45 WIB",
    category: "Kegiatan",
    image: "/news-visit.jpg",
    type: "video",
    author: "Tim Hubin"
  },
  {
    id: 7,
    title: "Webinar Karir di Era Digital bersama Alumni Sukses",
    excerpt: "Tiga alumni sukses berbagi pengalaman bekerja di perusahaan teknologi ternama",
    date: "28 April 2024",
    time: "13:00 WIB",
    category: "Alumni",
    image: "/news-webinar.jpg",
    type: "normal",
    author: "Ikatan Alumni"
  },
  {
    id: 8,
    title: "Pembukaan Ekstrakurikuler Baru: Robotics Club",
    excerpt: "Sekolah membuka ekstrakurikuler robotics untuk menampung minat siswa di bidang otomasi",
    date: "20 April 2024",
    time: "10:30 WIB",
    category: "Ekstrakurikuler",
    image: "/news-robot.jpg",
    type: "normal",
    author: "OSIS"
  }
];

const categories = [
  { name: "Semua", icon: <Newspaper className="w-4 h-4" /> },
  { name: "Prestasi", icon: <Trophy className="w-4 h-4" /> },
  { name: "Pengumuman", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Kegiatan", icon: <Users className="w-4 h-4" /> },
  { name: "Alumni", icon: <GraduationCap className="w-4 h-4" /> },
  { name: "Fasilitas", icon: <School className="w-4 h-4" /> }
];

export default function Berita() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                <span className="text-yellow-300">Berita</span> Terkini
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Informasi terbaru seputar kegiatan, prestasi, dan perkembangan SMKN 1 Adiwerna.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="#berita-terbaru">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Jelajahi Berita <ArrowRight className="ml-2" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/news-hero.jpg"
                  alt="Berita SMKN 1 Adiwerna"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      Headline
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      SMKN 1 Adiwerna Terima Penghargaan Sekolah Berprestasi Tingkat Nasional
                    </h2>
                    <div className="flex items-center text-gray-300 mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">28 Mei 2024</span>
                      <Clock className="w-4 h-4 ml-3 mr-1" />
                      <span className="text-sm">09:00 WIB</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full mr-3 transition-colors ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section id="berita-terbaru" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12"
          >
            <span className="text-blue-600">Berita</span> Terbaru
          </motion.h2>

          {/* Featured News */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {news.filter(item => item.type === 'featured').map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/3 h-96 lg:h-auto relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                  <div className="lg:w-1/3 p-8">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{item.date} • {item.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Oleh: {item.author}</span>
                      <Link href={`/berita/${item.id}`}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-blue-600 dark:text-blue-400 font-medium flex items-center"
                        >
                          Baca Selengkapnya <ChevronRight className="ml-1 w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Normal News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.filter(item => item.type === 'normal').map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${index % 4 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{item.date}</span>
                    <Clock className="w-3 h-3 ml-3 mr-1" />
                    <span>{item.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Oleh: {item.author}</span>
                    <Link href={`/berita/${item.id}`}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-blue-600 dark:text-blue-400 font-medium flex items-center text-sm"
                      >
                        Baca <ChevronRight className="ml-1 w-3 h-3" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center mx-auto border border-gray-200 dark:border-gray-700">
              Muat Lebih Banyak
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Dapatkan Update Berita Terbaru
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
                  Berlangganan newsletter kami untuk mendapatkan informasi terbaru seputar kegiatan dan prestasi SMKN 1 Adiwerna langsung ke email Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Alamat email Anda" 
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-all">
                    Berlangganan
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <Image
                  src="/newsletter.png"
                  alt="Newsletter"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}