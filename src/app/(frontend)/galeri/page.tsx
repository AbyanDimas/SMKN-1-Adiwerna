'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Camera, Image as ImageIcon, Video, Album, 
  ChevronRight, ArrowRight, Search, Filter,
  Download, Share2, Heart, Maximize, X
} from 'lucide-react';
import { useState } from 'react';

type GalleryItem = {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  category: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  tags?: string[];
};

const categories = [
  { name: "Semua", value: "all", icon: <Album className="w-4 h-4" /> },
  { name: "Kegiatan Sekolah", value: "school", icon: <Camera className="w-4 h-4" /> },
  { name: "Prestasi", value: "achievement", icon: <Heart className="w-4 h-4" /> },
  { name: "Acara", value: "event", icon: <Video className="w-4 h-4" /> },
  { name: "Fasilitas", value: "facility", icon: <ImageIcon className="w-4 h-4" /> }
];

const tags = [
  "Workshop", "Lomba", "Peringatan", "Hari Besar", "Ekstrakurikuler",
  "Praktikum", "Kunjungan", "OSIS", "Pramuka", "PMR"
];

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: "Peringatan Hari Kemerdekaan RI",
    type: 'image',
    url: "/gallery/kemerdekaan.jpg",
    category: "event",
    date: "2023-08-17",
    likes: 124,
    tags: ["Peringatan", "Hari Besar"]
  },
  {
    id: '2',
    title: "Workshop IoT untuk Siswa",
    type: 'image',
    url: "/gallery/workshop.jpg",
    category: "school",
    date: "2023-09-05",
    likes: 89,
    tags: ["Workshop", "Praktikum"]
  },
  {
    id: '3',
    title: "Juara Lomba Robotik Nasional",
    type: 'image',
    url: "/gallery/robotik.jpg",
    category: "achievement",
    date: "2023-07-22",
    likes: 215,
    isLiked: true,
    tags: ["Lomba", "Prestasi"]
  },
  {
    id: '4',
    title: "Kegiatan Pramuka Gudep 123",
    type: 'video',
    url: "/gallery/pramuka.mp4",
    thumbnail: "/gallery/pramuka-thumb.jpg",
    category: "school",
    date: "2023-08-30",
    likes: 76,
    tags: ["Ekstrakurikuler", "Pramuka"]
  },
  {
    id: '5',
    title: "Laboratorium Komputer Terbaru",
    type: 'image',
    url: "/gallery/lab.jpg",
    category: "facility",
    date: "2023-09-12",
    likes: 142,
    tags: ["Fasilitas"]
  },
  {
    id: '6',
    title: "Kunjungan Industri ke PT Maju Jaya",
    type: 'image',
    url: "/gallery/kunjungan.jpg",
    category: "school",
    date: "2023-07-15",
    likes: 67,
    tags: ["Kunjungan"]
  },
  {
    id: '7',
    title: "Pelantikan Pengurus OSIS Baru",
    type: 'image',
    url: "/gallery/osis.jpg",
    category: "school",
    date: "2023-08-10",
    likes: 98,
    tags: ["OSIS"]
  },
  {
    id: '8',
    title: "Kegiatan PMR Bulan Kesehatan",
    type: 'video',
    url: "/gallery/pmr.mp4",
    thumbnail: "/gallery/pmr-thumb.jpg",
    category: "school",
    date: "2023-09-01",
    likes: 113,
    tags: ["PMR", "Ekstrakurikuler"]
  },
  {
    id: '9',
    title: "Praktikum Siswa Multimedia",
    type: 'image',
    url: "/gallery/multimedia.jpg",
    category: "school",
    date: "2023-08-25",
    likes: 84,
    tags: ["Praktikum"]
  },
  {
    id: '10',
    title: "Penghargaan Sekolah Adiwiyata",
    type: 'image',
    url: "/gallery/adiwiyata.jpg",
    category: "achievement",
    date: "2023-07-30",
    likes: 156,
    tags: ["Prestasi"]
  },
  {
    id: '11',
    title: "Perkemahan Jumat-Sabtu",
    type: 'image',
    url: "/gallery/perjus.jpg",
    category: "school",
    date: "2023-08-18",
    likes: 132,
    tags: ["Pramuka"]
  },
  {
    id: '12',
    title: "Lomba Desain Grafis Tingkat Kabupaten",
    type: 'image',
    url: "/gallery/lomba-desain.jpg",
    category: "achievement",
    date: "2023-09-08",
    likes: 178,
    tags: ["Lomba", "Prestasi"]
  }
];

export default function Galeri() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter gallery items
  const filteredItems = galleryItems.filter(item => {
    // Category filter
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    
    // Tag filter
    const tagMatch = selectedTags.length === 0 || 
      (item.tags && item.tags.some(tag => selectedTags.includes(tag)));
    
    // Search filter
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return categoryMatch && tagMatch && searchMatch;
  });

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Toggle like status
  const toggleLike = (id: string) => {
    const item = galleryItems.find(item => item.id === id);
    if (item) {
      item.isLiked = !item.isLiked;
      item.likes += item.isLiked ? 1 : -1;
    }
  };

  // Open lightbox
  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  // Download image
  const downloadImage = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `smkn1adiwerna-${title.replace(/\s+/g, '-').toLowerCase()}.${url.split('.').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share item
  const shareItem = async (item: GalleryItem) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: `Lihat ${item.title} dari SMKN 1 Adiwerna`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `${window.location.origin}/galeri?item=${item.id}`;
        await navigator.clipboard.writeText(shareUrl);
        alert('Link berhasil disalin ke clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
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
                <span className="text-yellow-300">Galeri</span> Sekolah
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Kumpulan momen berharga dan dokumentasi kegiatan di SMKN 1 Adiwerna.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="#galeri-grid">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Jelajahi Galeri <ArrowRight className="ml-2" />
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
                  src="/gallery-hero.jpg"
                  alt="Galeri SMKN 1 Adiwerna"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      Terbaru
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      Dokumentasi Kegiatan MPLS 2023/2024
                    </h2>
                    <div className="flex items-center text-gray-300 mt-2">
                      <span className="text-sm">120+ Foto & Video</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari foto atau video..."
                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg block w-full pl-10 p-3 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.value)}
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

            {/* Filter Button (Mobile) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden bg-blue-600 text-white p-3 rounded-lg flex items-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </motion.button>
          </div>
        </div>
      </section>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsFilterOpen(false)}
        >
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Filter Galeri</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Kategori</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.value 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Tag</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedCategory('all');
                  setIsFilterOpen(false);
                }}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition-all"
              >
                Reset Filter
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Desktop Tag Filter */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900 hidden md:block">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="galeri-grid" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12"
          >
            <span className="text-blue-600">Koleksi</span> Terbaru
          </motion.h2>

          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <Image
                src="/empty-gallery.png"
                alt="Galeri kosong"
                width={300}
                height={300}
                className="mx-auto mb-6"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Coba gunakan filter atau kata kunci pencarian yang berbeda.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTags([]);
                  setSearchQuery('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-all"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Item Thumbnail */}
                  <div 
                    className="aspect-square relative cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <Image
                      src={item.type === 'video' ? (item.thumbnail || '/video-thumb.jpg') : item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Video Indicator */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white/80 p-3 rounded-full">
                          <Video className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
                        <h3 className="text-white font-bold line-clamp-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {categories.find(cat => cat.value === item.category)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Item Footer */}
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(item.id);
                          }}
                          className="flex items-center text-sm"
                        >
                          <Heart 
                            className={`w-4 h-4 mr-1 ${item.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}`} 
                          />
                          <span className={item.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}>
                            {item.likes}
                          </span>
                        </button>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            shareItem(item);
                          }}
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-30 flex items-center justify-center p-4"
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="relative flex-grow bg-black rounded-t-xl overflow-hidden">
              {selectedItem.type === 'image' ? (
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <video 
                  src={selectedItem.url} 
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-b-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {selectedItem.title}
                  </h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span>
                      {categories.find(cat => cat.value === selectedItem.category)?.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(selectedItem.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleLike(selectedItem.id)}
                    className="flex items-center text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 mr-1 ${selectedItem.isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    <span>{selectedItem.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => downloadImage(selectedItem.url, selectedItem.title)}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 mr-1" />
                    <span>Unduh</span>
                  </button>
                  
                  <button 
                    onClick={() => shareItem(selectedItem)}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <Share2 className="w-5 h-5 mr-1" />
                    <span>Bagikan</span>
                  </button>
                  
                  <button 
                    onClick={() => window.open(selectedItem.url, '_blank')}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <Maximize className="w-5 h-5 mr-1" />
                    <span>Buka</span>
                  </button>
                </div>
              </div>
              
              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ingin Dokumentasi Kegiatan Anda Tampil di Galeri?
                </h2>
                <p className="text-lg mb-6 max-w-2xl">
                  Kirim foto atau video kegiatan sekolah Anda untuk ditampilkan di galeri resmi SMKN 1 Adiwerna.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/kontak">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                    >
                      Hubungi Kami <ArrowRight className="ml-2" />
                    </motion.button>
                  </Link>
                  <Link href="/upload">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                    >
                      Unggah Sekarang <ChevronRight className="ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <Image
                  src="/gallery-cta.png"
                  alt="Kirim Dokumentasi"
                  width={300}
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