import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, Facebook, Instagram, 
  Twitter, Youtube, Linkedin, 
  MapPin, Phone, Mail, Clock4 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 relative mr-3">
                  <Image 
                    src="/logo-smk.png"
                    alt="Logo SMK Negeri 1 Adiwerna"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold">SMKN 1 Adiwerna</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Sekolah unggulan berbasis teknologi dengan lingkungan belajar yang inspiratif.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" /> Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/program" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" /> Program
                  </Link>
                </li>
                <li>
                  <Link href="/fasilitas" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" /> Fasilitas
                  </Link>
                </li>
                <li>
                  <Link href="/berita" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" /> Berita
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" /> Kontak
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Kontak Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-blue-400" />
                  <span className="text-gray-400">Jl. Pendidikan No. 123, Adiwerna, Tegal</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-400">(0283) 1234567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-400">info@smkn1adiwerna.sch.id</span>
                </li>
                <li className="flex items-center">
                  <Clock4 className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-gray-400">Senin-Jumat: 07.00 - 16.00</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Peta Lokasi</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789012!2d109.12345678901234!3d-6.987654321012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMTUuNiJTIDEwOcKwMDcnMjEuNiJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SMK Negeri 1 Adiwerna. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

