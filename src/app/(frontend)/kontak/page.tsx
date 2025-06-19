'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Youtube, 
  Linkedin, Send, User, MessageSquare,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                Hubungi <span className="text-yellow-300">Kami</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Kami siap membantu Anda. Silakan hubungi kami melalui berbagai channel yang tersedia atau kirim pesan langsung melalui form kontak.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="#lokasi">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Lihat Lokasi <MapPin className="ml-2" />
                  </motion.button>
                </Link>
                <Link href="#kontak-form">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Kirim Pesan <Send className="ml-2" />
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
                  src="/contact-hero.jpg"
                  alt="Hubungi Kami"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            <span className="text-blue-600">Informasi</span> Kontak
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Alamat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Alamat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jl. Pendidikan No. 123, Adiwerna<br />
                Kabupaten Tegal, Jawa Tengah<br />
                Kode Pos 52194
              </p>
            </motion.div>

            {/* Telepon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 dark:bg-green-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Telepon</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                (0283) 1234567
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                +62 812 3456 7890 (WhatsApp)
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                info@smkn1adiwerna.sch.id
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                humas@smkn1adiwerna.sch.id
              </p>
            </motion.div>

            {/* Jam Operasional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-yellow-100 dark:bg-yellow-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Jam Operasional</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Senin - Jumat:</span> 07.00 - 16.00 WIB<br />
                <span className="font-medium">Sabtu:</span> 08.00 - 12.00 WIB<br />
                <span className="font-medium">Minggu:</span> Tutup
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section id="lokasi" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              >
                <span className="text-blue-600">Lokasi</span> Kami
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              >
                SMKN 1 Adiwerna berlokasi di pusat kota dengan akses yang mudah dari berbagai transportasi umum.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Akses Transportasi</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      - 5 menit dari Terminal Adiwerna<br />
                      - 10 menit dari Stasiun Adiwerna<br />
                      - Ada halte bus tepat di depan sekolah
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Parkir</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      - Area parkir luas untuk mobil dan motor<br />
                      - Gratis untuk pengunjung<br />
                      - Tersedia tempat parkir khusus difabel
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link href="https://maps.google.com" target="_blank">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Buka di Google Maps <ArrowRight className="ml-2" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="h-96 w-full rounded-xl overflow-hidden shadow-xl"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789012!2d109.12345678901234!3d-6.987654321012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTknMTUuNiJTIDEwOcKwMDcnMjEuNiJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="kontak-form" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
              >
                <span className="text-blue-600">Kirim</span> Pesan
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              >
                Punya pertanyaan atau ingin mengetahui informasi lebih lanjut? Silakan isi form berikut dan tim kami akan segera menghubungi Anda.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Respon cepat via telepon</p>
                    <p className="font-bold text-gray-800 dark:text-white">(0283) 1234567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Respon dalam 24 jam</p>
                    <p className="font-bold text-gray-800 dark:text-white">info@smkn1adiwerna.sch.id</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg"
              >
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg block w-full pl-10 p-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nama Anda"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg block w-full pl-10 p-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="email@contoh.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                      Subjek
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Subjek pesan"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
                      Pesan
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg block w-full pl-10 p-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tulis pesan Anda..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan <Send className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Quick Links */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            Terhubung <span className="text-blue-600">Dengan Kami</span>
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-0"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center md:text-left">Media Sosial</h3>
              <div className="flex space-x-4">
                <Link href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tautan Cepat</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                <Link href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center md:justify-end">
                  <ChevronRight className="w-4 h-4 mr-1" /> FAQ
                </Link>
                <Link href="/ppdb" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center md:justify-end">
                  <ChevronRight className="w-4 h-4 mr-1" /> PPDB Online
                </Link>
                <Link href="/alumni" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center md:justify-end">
                  <ChevronRight className="w-4 h-4 mr-1" /> Portal Alumni
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 md:p-12 border border-red-200 dark:border-red-800">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Kontak Darurat
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                  Untuk situasi darurat di luar jam operasional, silakan hubungi nomor berikut:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                        <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">24 Jam</p>
                        <p className="font-bold text-gray-800 dark:text-white">0812 3456 7890</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                        <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Satpam Sekolah</p>
                        <p className="font-bold text-gray-800 dark:text-white">0813 4567 8901</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <Image
                  src="/emergency-contact.png"
                  alt="Kontak Darurat"
                  width={250}
                  height={250}
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