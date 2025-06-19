'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, Grid, List, HelpCircle,
  BookOpen, User, School, ClipboardList,
  ArrowRight
} from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "Bagaimana cara mendaftar ke SMKN 1 Adiwerna?",
    answer: "Pendaftaran bisa dilakukan secara online melalui website kami atau datang langsung ke sekolah. Untuk pendaftaran online, kunjungi halaman PPDB dan ikuti langkah-langkahnya.",
    category: "Pendaftaran",
    icon: <ClipboardList className="w-6 h-6 text-blue-500" />,
    relatedLink: "/ppdb"
  },
  {
    id: 2,
    question: "Apa saja program keahlian yang tersedia?",
    answer: "Kami memiliki 4 program unggulan: Rekayasa Perangkat Lunak (RPL), Teknik Komputer Jaringan (TKJ), Multimedia, dan Broadcasting. Setiap program memiliki keunggulan dan spesialisasi berbeda.",
    category: "Program",
    icon: <BookOpen className="w-6 h-6 text-green-500" />,
    relatedLink: "/program"
  },
  {
    id: 3,
    question: "Apakah ada beasiswa untuk siswa berprestasi?",
    answer: "Ya, kami menyediakan berbagai program beasiswa untuk siswa berprestasi maupun kurang mampu. Beberapa beasiswa berasal dari pemerintah, yayasan, dan perusahaan mitra kami.",
    category: "Beasiswa",
    icon: <School className="w-6 h-6 text-yellow-500" />,
    relatedLink: "/beasiswa"
  },
  {
    id: 4,
    question: "Bagaimana prospek lulusan SMKN 1 Adiwerna?",
    answer: "Lulusan kami banyak yang langsung bekerja di perusahaan ternama atau melanjutkan ke perguruan tinggi. Kami memiliki jaringan industri yang kuat dengan tingkat penempatan kerja 85%.",
    category: "Karir",
    icon: <User className="w-6 h-6 text-purple-500" />,
    relatedLink: "/karir"
  },
  {
    id: 5,
    question: "Apa saja fasilitas yang tersedia di sekolah?",
    answer: "Kami memiliki laboratorium komputer modern, studio broadcasting, perpustakaan digital, lapangan olahraga, dan berbagai fasilitas pendukung pembelajaran lainnya.",
    category: "Fasilitas",
    icon: <School className="w-6 h-6 text-red-500" />,
    relatedLink: "/fasilitas"
  },
  {
    id: 6,
    question: "Apakah ada program ekstrakurikuler?",
    answer: "Ya, kami menyediakan berbagai ekstrakurikuler seperti robotics club, programming, film production, music band, dan banyak lagi untuk mengembangkan bakat siswa.",
    category: "Kegiatan",
    icon: <HelpCircle className="w-6 h-6 text-indigo-500" />,
    relatedLink: "/ekstrakurikuler"
  }
];

const categories = [
  { id: 'all', name: 'Semua Kategori' },
  { id: 'Pendaftaran', name: 'Pendaftaran' },
  { id: 'Program', name: 'Program' },
  { id: 'Beasiswa', name: 'Beasiswa' },
  { id: 'Fasilitas', name: 'Fasilitas' }
];

export const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleCardExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-14">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          >
            <span className="text-blue-600">Pertanyaan</span> yang Sering Diajukan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Temukan jawaban untuk pertanyaan umum tentang SMKN 1 Adiwerna
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FAQ Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all ${
                  expandedCard === faq.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                }`}
              >
                <div 
                  className="cursor-pointer p-6"
                  onClick={() => toggleCardExpand(faq.id)}
                >
                  <div className="flex items-start mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mr-4">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-2">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {expandedCard === faq.id ? 'Tutup' : 'Baca jawaban'}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedCard === faq.id ? 180 : 0 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCard === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {faq.answer}
                        </p>
                        {faq.relatedLink && (
                          <Link
                            href={faq.relatedLink}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            Pelajari lebih lanjut <ArrowRight className="ml-1 w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all ${
                  expandedCard === faq.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                }`}
              >
                <div 
                  className="cursor-pointer p-6"
                  onClick={() => toggleCardExpand(faq.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mr-4">
                        {faq.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {faq.question}
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mt-2 inline-block">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === faq.id ? 180 : 0 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCard === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {faq.answer}
                        </p>
                        {faq.relatedLink && (
                          <Link
                            href={faq.relatedLink}
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            Pelajari lebih lanjut <ArrowRight className="ml-1 w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-300 mr-2" />
            <span className="text-blue-600 dark:text-blue-300 font-medium">Masih ada pertanyaan?</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/kontak">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all inline-flex items-center"
              >
                Hubungi Kami <ChevronRight className="ml-2" />
              </motion.button>
            </Link>
            <Link href="/faq-lengkap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all inline-flex items-center border border-gray-200 dark:border-gray-700"
              >
                Lihat FAQ Lengkap <ChevronRight className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};