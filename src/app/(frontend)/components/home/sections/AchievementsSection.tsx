import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Medal } from 'lucide-react';
import { achievements } from '@/app/(frontend)/components/home/utils/data';

export const AchievementsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white">
      <div className="container mx-auto px-14">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-yellow-300">Prestasi</span> yang Membanggakan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg max-w-3xl mx-auto"
          >
            Berbagai penghargaan dan prestasi yang telah diraih oleh siswa-siswi SMKN 1 Adiwerna.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all"
            >
              <div className="bg-yellow-400/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Medal className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <div className="flex justify-between text-sm text-white/80">
                <span>{achievement.category}</span>
                <span>{achievement.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/prestasi">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center mx-auto"
            >
              Lihat Semua Prestasi <ChevronRight className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};