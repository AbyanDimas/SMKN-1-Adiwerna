'use client';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  tag?: { namaTag: string }[];
  beritaTerkait?: NewsItem[];
};

export default function DetailBerita({ params }: { params: { slug: string } }) {
  const [berita, setBerita] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/berita/${params.slug}`);
        if (!response.ok) {
          throw new Error('Berita tidak ditemukan');
        }
        const data = await response.json();
        setBerita(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !berita) {
    return notFound();
  }

  // Format tanggal
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE, d MMMM yyyy', { locale: id });
    } catch {
      return 'Tanggal tidak tersedia';
    }
  };

  // Format waktu
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

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/berita" className="flex items-center text-blue-600 dark:text-blue-400">
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2 font-medium">Kembali ke Berita</span>
            </Link>
            <div className="flex space-x-4">
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Category and Date */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
              {berita.kategori === 'achievement' ? 'Prestasi' : 
               berita.kategori === 'announcement' ? 'Pengumuman' :
               berita.kategori === 'event' ? 'Acara' :
               berita.kategori === 'academic' ? 'Akademik' : 'Umum'}
            </span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(berita.tanggalPublikasi)}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTime(berita.tanggalPublikasi)} WIB</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {berita.judul}
          </h1>

          {/* Author */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
              {getAuthorName(berita.penulis).charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {getAuthorName(berita.penulis)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dipublikasikan pada {formatDate(berita.tanggalPublikasi)}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          {berita.gambarUtama && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={berita.gambarUtama.url}
                alt={berita.gambarUtama.alt || berita.judul}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
              {berita.gambarUtama.alt && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {berita.gambarUtama.alt}
                </p>
              )}
            </div>
          )}

          {/* Summary */}
          {berita.ringkasan && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-8">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {berita.ringkasan}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            {/* Ini akan menampilkan konten rich text dari Payload CMS */}
            {/* Anda perlu menambahkan parser untuk rich text sesuai kebutuhan */}
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Konten berita akan ditampilkan di sini. Jika Anda menggunakan rich text editor di Payload CMS,
              Anda perlu menambahkan komponen untuk merender konten tersebut dengan aman.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus 
              hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut 
              eleifend nibh porttitor.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. 
              Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.
            </p>
          </div>

          {/* Tags */}
          {berita.tag && berita.tag.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">TAG:</h3>
              <div className="flex flex-wrap gap-2">
                {berita.tag.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{tag.namaTag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related News */}
          {berita.beritaTerkait && berita.beritaTerkait.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Berita Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {berita.beritaTerkait.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="group block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-3 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.tanggalPublikasi)} • {formatTime(item.tanggalPublikasi)} WIB
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to News */}
          <div className="text-center mt-12">
            <Link 
              href="/berita"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Kembali ke Daftar Berita
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SMKN 1 Adiwerna. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}