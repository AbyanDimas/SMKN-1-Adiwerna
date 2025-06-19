import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';
import { facilities } from '@/app/(frontend)/components/home/utils/data';

export const FacilitiesSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-14">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Fasilitas <span className="text-blue-600">Modern</span> untuk Pembelajaran Optimal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Kami menyediakan berbagai fasilitas pendukung pembelajaran dengan standar tinggi untuk memastikan pengalaman belajar yang maksimal.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.slice(0, 4).map((facility, index) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    {facility.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{facility.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{facility.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Link href="/fasilitas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold py-2 px-14 rounded-lg border border-blue-600 dark:border-blue-400 transition-all flex items-center"
                >
                  Lihat Semua Fasilitas <ChevronRight className="ml-2" />
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
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/lab-komputer.jpg"
                  alt="Laboratorium Komputer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/perpustakaan.jpg"
                  alt="Perpustakaan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/studio-broadcast.jpg"
                  alt="Studio Broadcasting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/lapangan-olahraga.jpg"
                  alt="Lapangan Olahraga"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};