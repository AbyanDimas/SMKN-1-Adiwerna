import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, GraduationCap, Medal, Users } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
      </div>
      <div className="container mx-auto px-14 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            >
              Selamat Datang di <br /> 
              <span className="text-yellow-300">SMKN 1 Adiwerna</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-8"
            >
              Sekolah unggulan berbasis teknologi dengan lingkungan belajar yang inspiratif.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/pendaftaran">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                >
                  Daftar Sekarang <ArrowRight className="ml-2" />
                </motion.button>
              </Link>
              <Link href="/program">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                >
                  Jelajahi Program <ChevronRight className="ml-2" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                src="/hero-school.png"
                alt="SMKN 1 Adiwerna"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-3">
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">1000+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Siswa Aktif</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-3">
                    <Medal className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">50+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Prestasi</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};