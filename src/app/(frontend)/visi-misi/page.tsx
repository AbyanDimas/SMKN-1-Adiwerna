'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Target, Goal, BarChart2, Users, 
  Award, CheckCircle, Lightbulb, BookOpen,
  ChevronRight, ArrowRight, School, GraduationCap
} from 'lucide-react';

const goals = [
  {
    title: "Visi",
    icon: <Target className="w-8 h-8 text-blue-600" />,
    content: "Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan siap bersaing di era global dengan berlandaskan nilai-nilai keimanan dan ketakwaan.",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "Misi",
    icon: <Goal className="w-8 h-8 text-green-600" />,
    content: [
      "Menyelenggarakan pendidikan kejuruan yang berkualitas dengan kurikulum berbasis kompetensi",
      "Mengembangkan potensi peserta didik secara holistik melalui pembelajaran yang berpusat pada siswa",
      "Menumbuhkan karakter peserta didik yang berakhlak mulia, disiplin, dan bertanggung jawab",
      "Membangun kerjasama dengan dunia industri dan dunia kerja untuk meningkatkan relevansi pendidikan",
      "Mengembangkan budaya literasi, kreativitas, dan inovasi dalam pembelajaran",
      "Menerapkan manajemen sekolah yang transparan, akuntabel, dan berorientasi pada mutu"
    ],
    bgColor: "bg-green-50 dark:bg-green-900/20"
  }
];

const values = [
  {
    name: "Integritas",
    description: "Selalu menjunjung tinggi kejujuran dan konsistensi dalam bertindak",
    icon: <Award className="w-6 h-6 text-yellow-500" />
  },
  {
    name: "Disiplin",
    description: "Patuh pada peraturan dan tata tertib yang berlaku",
    icon: <CheckCircle className="w-6 h-6 text-blue-500" />
  },
  {
    name: "Kreatif",
    description: "Mengembangkan inovasi dalam pembelajaran dan pemecahan masalah",
    icon: <Lightbulb className="w-6 h-6 text-purple-500" />
  },
  {
    name: "Kolaboratif",
    description: "Bekerja sama dalam mencapai tujuan bersama",
    icon: <Users className="w-6 h-6 text-green-500" />
  },
  {
    name: "Berprestasi",
    description: "Berusaha mencapai hasil terbaik dalam segala bidang",
    icon: <BarChart2 className="w-6 h-6 text-red-500" />
  }
];

const achievements = [
  {
    year: "2023",
    items: [
      "Sekolah Berintegritas Tingkat Nasional",
      "Akreditasi A (Unggul) dari BAN-SM",
      "Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi"
    ]
  },
  {
    year: "2022",
    items: [
      "Sekolah Adiwiyata Tingkat Nasional",
      "Penghargaan Sekolah Digital dari Kemendikbud",
      "Juara 2 Robotik Nasional"
    ]
  },
  {
    year: "2021",
    items: [
      "Sekolah Penggerak Angkatan Pertama",
      "Penghargaan Sekolah Ramah Anak",
      "Juara 1 Desain Grafis Tingkat Nasional"
    ]
  }
];

export default function VisiMisi() {
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
                <span className="text-yellow-300">Visi & Misi</span> Sekolah
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Pedoman dan arah pengembangan SMKN 1 Adiwerna dalam mencetak lulusan yang kompeten dan berkarakter.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="#visi-misi">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                  >
                    Pelajari Lebih Lanjut <ArrowRight className="ml-2" />
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
                  src="/vision-hero.jpg"
                  alt="Visi Misi SMKN 1 Adiwerna"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      Membangun Generasi Unggul untuk Masa Depan Gemilang
                    </h2>
                    <div className="flex items-center text-gray-300 mt-2">
                      <School className="w-4 h-4 mr-1" />
                      <span className="text-sm">SMKN 1 Adiwerna</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section id="visi-misi" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            <span className="text-blue-600">Visi & Misi</span> SMKN 1 Adiwerna
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${goal.bgColor} p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-full mr-4 shadow">
                    {goal.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{goal.title}</h3>
                </div>
                
                {Array.isArray(goal.content) ? (
                  <ul className="space-y-3">
                    {goal.content.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-gray-600 dark:text-gray-300 text-lg"
                  >
                    {goal.content}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Nilai-nilai */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Nilai-nilai <span className="text-blue-600">Inti</span> Sekolah
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{value.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tujuan Sekolah */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="text-blue-600">Tujuan</span> Pendidikan
            </h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 rounded-2xl p-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-decimal list-inside">
                {[
                  "Meningkatkan keimanan dan ketakwaan peserta didik melalui pembiasaan nilai-nilai agama",
                  "Mengembangkan potensi peserta didik secara optimal melalui pembelajaran yang bermutu",
                  "Membentuk peserta didik yang memiliki kompetensi keahlian sesuai bidangnya",
                  "Menumbuhkan jiwa wirausaha dan kreativitas peserta didik",
                  "Mempersiapkan peserta didik untuk melanjutkan ke perguruan tinggi atau memasuki dunia kerja",
                  "Mengembangkan budaya literasi, penelitian, dan inovasi teknologi",
                  "Meningkatkan kerjasama dengan dunia industri dan dunia kerja"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pencapaian */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="text-blue-600">Pencapaian</span> Sekolah
            </h3>
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row border-b border-gray-200 dark:border-gray-700 pb-8"
                >
                  <div className="md:w-1/6 mb-4 md:mb-0">
                    <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
                      {achievement.year}
                    </div>
                  </div>
                  <div className="md:w-5/6">
                    <ul className="space-y-3">
                      {achievement.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <Award className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategi Implementasi */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            <span className="text-blue-600">Strategi</span> Implementasi
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Penguatan Kurikulum",
                description: "Pengembangan kurikulum berbasis kompetensi dan kebutuhan industri",
                icon: <BookOpen className="w-8 h-8 text-blue-500" />
              },
              {
                title: "Peningkatan SDM",
                description: "Pelatihan dan pengembangan guru serta tenaga kependidikan",
                icon: <Users className="w-8 h-8 text-green-500" />
              },
              {
                title: "Pembelajaran Inovatif",
                description: "Penerapan model pembelajaran berbasis proyek dan digital",
                icon: <Lightbulb className="w-8 h-8 text-yellow-500" />
              },
              {
                title: "Link & Match Industri",
                description: "Kerjasama dengan dunia usaha dan industri dalam pembelajaran",
                icon: <GraduationCap className="w-8 h-8 text-purple-500" />
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ingin Tahu Lebih Banyak Tentang Sekolah Kami?
                </h2>
                <p className="text-lg mb-6 max-w-2xl">
                  Kunjungi sekolah kami atau hubungi tim informasi untuk mendapatkan penjelasan lebih detail tentang program dan kegiatan di SMKN 1 Adiwerna.
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
                  <Link href="/program">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                    >
                      Lihat Program <ChevronRight className="ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <Image
                  src="/vision-cta.png"
                  alt="Kunjungan Sekolah"
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