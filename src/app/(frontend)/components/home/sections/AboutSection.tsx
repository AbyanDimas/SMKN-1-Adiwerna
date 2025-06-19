import { motion } from 'framer-motion';
import { School, Users, Layers, Medal } from 'lucide-react';

export const AboutSection = () => {
    return (
              <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-14">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Mengapa Memilih <span className="text-blue-600">SMKN 1 Adiwerna?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Kami memberikan pendidikan berbasis kompetensi dengan fasilitas modern dan lingkungan belajar yang mendukung pengembangan potensi siswa.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <School className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Kurikulum Modern</h3>
              <p className="text-gray-600 dark:text-gray-300">Kurikulum berbasis kompetensi yang terus diperbarui sesuai kebutuhan industri</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 dark:bg-green-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Guru Berpengalaman</h3>
              <p className="text-gray-600 dark:text-gray-300">Tenaga pengajar profesional dengan sertifikasi kompetensi</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fasilitas Lengkap</h3>
              <p className="text-gray-600 dark:text-gray-300">Laboratorium dan peralatan praktik dengan standar industri</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-yellow-100 dark:bg-yellow-900 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Medal className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Linkungan Kondusif</h3>
              <p className="text-gray-600 dark:text-gray-300">Lingkungan belajar yang nyaman dan mendukung kreativitas</p>
            </motion.div>
          </div>
        </div>
      </section>
    )
}
