import { motion } from 'framer-motion';
import { stats } from '@/app/(frontend)/components/home/utils/data';

export const StatsSection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
            >
              <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};