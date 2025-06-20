'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDown, ChevronRight, ArrowRight, 
  HelpCircle, BookOpen, User, School,
  Mail, Phone, MapPin, Clock, 
  MessageSquare, Calendar, FileText
} from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'umum',
    name: 'Informasi Umum',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'pendaftaran',
    name: 'Pendaftaran & PPDB',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 'akademik',
    name: 'Akademik',
    icon: <School className="w-5 h-5" />
  },
  {
    id: 'siswa',
    name: 'Kehidupan Siswa',
    icon: <User className="w-5 h-5" />
  }
];

const faqItems = {
  umum: [
    {
      question: "Apa saja program keahlian yang tersedia di SMKN 1 Adiwerna?",
      answer: "SMKN 1 Adiwerna menyediakan 6 program keahlian: Rekayasa Perangkat Lunak, Teknik Komputer dan Jaringan, Multimedia, Broadcasting, Internet of Things, dan Desain Komunikasi Visual."
    },
    {
      question: "Apa alamat lengkap SMKN 1 Adiwerna?",
      answer: "SMKN 1 Adiwerna berlokasi di Jl. Pendidikan No. 123, Adiwerna, Kabupaten Tegal, Jawa Tengah, Kode Pos 52194."
    },
    {
      question: "Apa saja fasilitas yang tersedia di SMKN 1 Adiwerna?",
      answer: "Kami memiliki fasilitas lengkap termasuk laboratorium komputer, studio broadcasting, workshop, perpustakaan digital, lapangan olahraga, ruang serbaguna, dan kantin sehat."
    },
    {
      question: "Bagaimana sistem pembelajaran di SMKN 1 Adiwerna?",
      answer: "Kami menggunakan sistem pembelajaran berbasis kompetensi dengan pendekatan Teaching Factory (TEFA) dan Project Based Learning (PBL) yang terintegrasi dengan kebutuhan industri."
    }
  ],
  pendaftaran: [
    {
      question: "Kapan pendaftaran PPDB dibuka?",
      answer: "Pendaftaran PPDB biasanya dibuka pada bulan Mei setiap tahunnya. Untuk tanggal pasti, silakan pantau website resmi kami atau media sosial sekolah."
    },
    {
      question: "Apa persyaratan pendaftaran PPDB?",
      answer: "Persyaratan meliputi: Fotokopi ijazah SMP/sederajat, fotokopi SKHUN, fotokopi KK dan akta kelahiran, pas foto, serta mengisi formulir pendaftaran online."
    },
    {
      question: "Apakah ada tes masuk untuk pendaftaran?",
      answer: "Ya, terdapat tes seleksi berupa tes akademik dasar dan wawancara untuk beberapa program keahlian tertentu."
    },
    {
      question: "Bagaimana sistem seleksi penerimaan siswa baru?",
      answer: "Seleksi dilakukan berdasarkan: (1) Nilai rapor SMP, (2) Nilai UN/SKHUN, (3) Tes seleksi, (4) Prestasi non-akademik (jika ada)."
    }
  ],
  akademik: [
    {
      question: "Apa saja ekstrakurikuler yang tersedia?",
      answer: "Kami menyediakan berbagai ekstrakurikuler seperti Pramuka, PMR, Paskibra, KIR, Robotik, Desain Grafis, Fotografi, Basket, Futsal, dan banyak lagi."
    },
    {
      question: "Apakah ada program magang untuk siswa?",
      answer: "Ya, semua siswa kelas XI akan mengikuti program Praktik Kerja Lapangan (PKL) selama 3-6 bulan di perusahaan mitra sekolah."
    },
    {
      question: "Bagaimana sistem penilaian di SMKN 1 Adiwerna?",
      answer: "Penilaian meliputi aspek pengetahuan, keterampilan, dan sikap dengan pembobotan sesuai kurikulum yang berlaku."
    },
    {
      question: "Apakah lulusan SMKN 1 Adiwerna bisa melanjutkan ke perguruan tinggi?",
      answer: "Tentu bisa. Banyak lulusan kami yang melanjutkan ke perguruan tinggi negeri maupun swasta. Kami juga menyediakan bimbingan khusus untuk siswa yang ingin melanjutkan studi."
    }
  ],
  siswa: [
    {
      question: "Apa saja aturan seragam di SMKN 1 Adiwerna?",
      answer: "Kami memiliki 3 jenis seragam: (1) Seragam putih-abu hari Senin-Selasa, (2) Seragam program keahlian hari Rabu-Kamis, (3) Seragam pramuka/batik hari Jumat."
    },
    {
      question: "Apakah ada asrama untuk siswa?",
      answer: "Saat ini kami belum menyediakan asrama, namun kami memiliki daftar kos/kontrakan yang direkomendasikan untuk siswa dari luar daerah."
    },
    {
      question: "Bagaimana sistem pembayaran uang sekolah?",
      answer: "Pembayaran bisa dilakukan melalui bank mitra atau langsung di bendahara sekolah setiap bulan. Kami juga menyediakan beasiswa untuk siswa berprestasi atau kurang mampu."
    },
    {
      question: "Apakah ada program beasiswa?",
      answer: "Ya, kami menyediakan berbagai beasiswa seperti Beasiswa Prestasi, Beasiswa KIP, dan Beasiswa Yayasan untuk siswa yang memenuhi syarat."
    }
  ]
};

const contactMethods = [
  {
    name: "Email",
    value: "info@smkn1adiwerna.sch.id",
    icon: <Mail className="w-6 h-6" />,
    link: "mailto:info@smkn1adiwerna.sch.id"
  },
  {
    name: "Telepon",
    value: "(0283) 1234567",
    icon: <Phone className="w-6 h-6" />,
    link: "tel:+622831234567"
  },
  {
    name: "Alamat",
    value: "Jl. Pendidikan No. 123, Adiwerna, Tegal",
    icon: <MapPin className="w-6 h-6" />,
    link: "https://maps.google.com?q=SMKN+1+Adiwerna"
  },
  {
    name: "Jam Operasional",
    value: "Senin-Jumat: 07.00-16.00 WIB",
    icon: <Clock className="w-6 h-6" />,
    link: null
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('umum');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
                <span className="text-yellow-300">FAQ</span> & Bantuan
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Temukan jawaban atas pertanyaan umum seputar SMKN 1 Adiwerna. Jika tidak menemukan yang Anda cari, silakan hubungi kami.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="#faq-content">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Lihat FAQ <ArrowRight className="ml-2" />
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
                <img
                  src="/faq-hero.jpg"
                  alt="FAQ SMKN 1 Adiwerna"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      Kami Siap Membantu Anda
                    </h2>
                    <div className="flex items-center text-gray-300 mt-2">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span className="text-sm">100+ pertanyaan terjawab</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section id="faq-content" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Pertanyaan <span className="text-blue-600">Yang Sering Diajukan</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
              Berikut adalah kumpulan pertanyaan yang sering diajukan oleh calon siswa, orang tua, dan masyarakat umum.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide"
          >
            <div className="flex space-x-2">
              {faqCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center whitespace-nowrap px-5 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqItems[activeCategory as keyof typeof faqItems].map((item, index) => {
              const itemKey = `${activeCategory}-${index}`;
              const isExpanded = expandedItems[itemKey] || false;

              return (
                <motion.div
                  key={itemKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(activeCategory, index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white pr-4">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            <span className="text-blue-600">Informasi</span> Tambahan
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kalender Akademik",
                description: "Jadwal lengkap kegiatan akademik selama tahun pelajaran",
                icon: <Calendar className="w-8 h-8 text-blue-500" />,
                link: "/kalender"
              },
              {
                title: "Panduan PPDB",
                description: "Download buku panduan penerimaan peserta didik baru",
                icon: <FileText className="w-8 h-8 text-green-500" />,
                link: "/ppdb/panduan"
              },
              {
                title: "Profil Sekolah",
                description: "Selengkapnya tentang sejarah dan prestasi sekolah",
                icon: <School className="w-8 h-8 text-purple-500" />,
                link: "/tentang"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                <Link href={item.link} className="text-blue-600 dark:text-blue-400 font-medium flex items-center">
                  Lihat selengkapnya <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
                >
                  Masih <span className="text-blue-600">Punya Pertanyaan?</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                >
                  Tim kami siap membantu menjawab pertanyaan Anda melalui berbagai saluran yang tersedia.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mr-4 shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{method.name}</p>
                        {method.link ? (
                          <Link href={method.link} className="font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {method.value}
                          </Link>
                        ) : (
                          <p className="font-bold text-gray-800 dark:text-white">{method.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Kirim Pesan</h3>
                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                        Subjek
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Subjek pesan"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Tulis pesan Anda..."
                      ></textarea>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-all"
                    >
                      Kirim Pesan
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}