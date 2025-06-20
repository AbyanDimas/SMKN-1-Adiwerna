'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, Clock, Newspaper, BookOpen,
  ChevronRight, ArrowRight, Video, Mic,
  GraduationCap, Trophy, Users, School
} from 'lucide-react';
import useSWR from 'swr';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState } from 'react';

// Type definitions for Payload CMS news data
type Media = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Author = {
  nama?: string;
} | string;

type NewsItem = {
  id: string;
  judul: string;
  slug: string;
  ringkasan?: string;
  konten?: any;
  gambarUtama?: Media;
  kategori: 'academic' | 'event' | 'achievement' | 'announcement' | 'general';
  tanggalPublikasi: string;
  fitur?: boolean;
  penulis?: Author;
  status: 'draft' | 'published' | 'archived';
};

type NewsResponse = {
  docs: NewsItem[];
  totalPages: number;
};

// Fetch function for SWR
const fetcher = async (url: string): Promise<NewsResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const categories = [
  { name: "Semua", value: "all", icon: <Newspaper className="w-4 h-4" /> },
  { name: "Prestasi", value: "achievement", icon: <Trophy className="w-4 h-4" /> },
  { name: "Pengumuman", value: "announcement", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Acara", value: "event", icon: <Users className="w-4 h-4" /> },
  { name: "Akademik", value: "academic", icon: <GraduationCap className="w-4 h-4" /> },
  { name: "Umum", value: "general", icon: <School className="w-4 h-4" /> }
];

const DEFAULT_IMAGE = '/default-news.jpg';

export default function Berita() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [page, setPage] = useState(1);
  const limit = 8;

  // Fetch news data from Payload CMS
  const { data: newsData, error, isLoading } = useSWR<NewsResponse>(
    `/api/berita?page=${page}&limit=${limit}&category=${selectedCategory !== 'all' ? selectedCategory : ''}`,
    fetcher
  );

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy', { locale: id });
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };

  // Format time helper
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'HH:mm');
    } catch {
      return '--:--';
    }
  };

  // Get author name
  const getAuthorName = (author?: Author): string => {
    if (!author) return 'Admin';
    if (typeof author === 'object' && author !== null) {
      return author.nama || 'Admin';
    }
    return author || 'Admin';
  };

  // Get image URL with fallback
  const getImageUrl = (media?: Media): string => {
    return media?.url || DEFAULT_IMAGE;
  };

  // Get image alt text
  const getImageAlt = (media?: Media, fallback?: string): string => {
    return media?.alt || fallback || 'Gambar berita';
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when changing category
  };

  // Handle load more
  const handleLoadMore = () => {
    if (newsData && page < newsData.totalPages) {
      setPage(prev => prev + 1);
    }
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
                  priority
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
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.value)}
                className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full mr-3 transition-colors ${
                  selectedCategory === category.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
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

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              Gagal memuat data berita. Silakan coba lagi.
            </div>
          ) : (
            <>
              {/* Featured News */}
              {newsData?.docs.filter(item => item.fitur).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                  {newsData.docs.filter(item => item.fitur).map((item) => (
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
                            src={getImageUrl(item.gambarUtama)}
                            alt={getImageAlt(item.gambarUtama, item.judul)}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Unggulan
                          </div>
                        </div>
                        <div className="lg:w-1/3 p-8">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {formatDate(item.tanggalPublikasi)} • {formatTime(item.tanggalPublikasi)} WIB
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{item.judul}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">{item.ringkasan || 'Tidak ada ringkasan tersedia'}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Oleh: {getAuthorName(item.penulis)}
                            </span>
                            <Link href={`/berita/${item.slug}`}>
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
              )}

              {/* Normal News Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData?.docs
                  .filter(item => !item.fitur)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={getImageUrl(item.gambarUtama)}
                          alt={getImageAlt(item.gambarUtama, item.judul)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                          {categories.find(cat => cat.value === item.kategori)?.name || 'Umum'}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(item.tanggalPublikasi)}</span>
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          <span>{formatTime(item.tanggalPublikasi)} WIB</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.judul}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {item.ringkasan || 'Tidak ada ringkasan tersedia'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Oleh: {getAuthorName(item.penulis)}
                          </span>
                          <Link href={`/berita/${item.slug}`}>
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
              {newsData && page < newsData.totalPages && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mt-16"
                >
                  <button 
                    onClick={handleLoadMore}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center mx-auto border border-gray-200 dark:border-gray-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Memuat...' : 'Muat Lebih Banyak'}
                  </button>
                </motion.div>
              )}
            </>
          )}
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