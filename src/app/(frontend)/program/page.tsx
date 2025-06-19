'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Code, Network, MonitorPlay, Video, 
  Mic, Paintbrush, Database, Cpu,
  Smartphone, Server, Camera, BookOpen,
  ChevronRight, ArrowRight, GraduationCap, Briefcase
} from 'lucide-react';

const programs = [
  {
    id: 'rpl',
    title: "Rekayasa Perangkat Lunak",
    shortDesc: "Membentuk developer profesional",
    description: "Program keahlian ini membekali siswa dengan keterampilan pengembangan software modern termasuk web development, mobile apps, dan sistem enterprise.",
    icon: <Code className="w-8 h-8 text-blue-500" />,
    image: "/program-rpl.jpg",
    stats: [
      { label: "Siswa", value: "320+" },
      { label: "Guru", value: "8" },
      { label: "Kelulusan", value: "98%" }
    ],
    career: ["Software Engineer", "Web Developer", "Mobile Developer", "UI/UX Designer"],
    color: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    id: 'tkj',
    title: "Teknik Komputer & Jaringan",
    shortDesc: "Mencetak ahli jaringan bersertifikasi",
    description: "Siswa dibekali kemampuan merancang, mengimplementasi, dan memelihara infrastruktur jaringan komputer skala kecil hingga enterprise.",
    icon: <Network className="w-8 h-8 text-green-500" />,
    image: "/program-tkj.jpg",
    stats: [
      { label: "Siswa", value: "280+" },
      { label: "Guru", value: "7" },
      { label: "Kelulusan", value: "96%" }
    ],
    career: ["Network Engineer", "System Administrator", "Cyber Security", "IT Support"],
    color: "bg-green-100 dark:bg-green-900/30"
  },
  {
    id: 'multimedia',
    title: "Multimedia",
    shortDesc: "Mengasah kreativitas digital",
    description: "Program ini fokus pada pengembangan konten digital kreatif termasuk desain grafis, animasi, video production, dan pengembangan game.",
    icon: <Paintbrush className="w-8 h-8 text-purple-500" />,
    image: "/program-multimedia.jpg",
    stats: [
      { label: "Siswa", value: "250+" },
      { label: "Guru", value: "6" },
      { label: "Kelulusan", value: "95%" }
    ],
    career: ["Graphic Designer", "Animator", "Video Editor", "Game Developer"],
    color: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    id: 'broadcasting',
    title: "Broadcasting",
    shortDesc: "Mencetak profesional media",
    description: "Membekali siswa dengan keterampilan produksi konten media termasuk penyiaran radio/TV, podcasting, dan jurnalisme multimedia.",
    icon: <Mic className="w-8 h-8 text-red-500" />,
    image: "/program-broadcasting.jpg",
    stats: [
      { label: "Siswa", value: "180+" },
      { label: "Guru", value: "5" },
      { label: "Kelulusan", value: "94%" }
    ],
    career: ["Broadcast Journalist", "Content Creator", "Sound Engineer", "Video Producer"],
    color: "bg-red-100 dark:bg-red-900/30"
  },
  {
    id: 'iot',
    title: "Internet of Things",
    shortDesc: "Inovasi teknologi terkini",
    description: "Program baru yang fokus pada pengembangan sistem IoT, embedded system, dan otomasi industri berbasis teknologi terkini.",
    icon: <Cpu className="w-8 h-8 text-yellow-500" />,
    image: "/program-iot.jpg",
    stats: [
      { label: "Siswa", value: "120+" },
      { label: "Guru", value: "4" },
      { label: "Kelulusan", value: "92%" }
    ],
    career: ["IoT Developer", "Embedded System Engineer", "Automation Engineer", "Robotics Engineer"],
    color: "bg-yellow-100 dark:bg-yellow-900/30"
  },
  {
    id: 'dkv',
    title: "Desain Komunikasi Visual",
    shortDesc: "Kreasi visual profesional",
    description: "Mengembangkan kemampuan desain komunikasi visual untuk media cetak dan digital dengan pendekatan kreatif dan solutif.",
    icon: <Camera className="w-8 h-8 text-indigo-500" />,
    image: "/program-dkv.jpg",
    stats: [
      { label: "Siswa", value: "200+" },
      { label: "Guru", value: "5" },
      { label: "Kelulusan", value: "97%" }
    ],
    career: ["Visual Designer", "Art Director", "Illustrator", "Brand Designer"],
    color: "bg-indigo-100 dark:bg-indigo-900/30"
  }
];

export default function ProgramKeahlian() {
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
                Program <span className="text-yellow-300">Keahlian</span> Kami
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 max-w-2xl"
              >
                Pilih program yang sesuai dengan minat dan bakat Anda untuk mempersiapkan karir di era digital.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
                  src="/program-hero.png"
                  alt="Program Keahlian"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Program List - Grid View */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            Jelajahi <span className="text-blue-600">Program Unggulan</span> Kami
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${program.color}`}
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-full mr-4">
                        {program.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{program.title}</h3>
                        <p className="text-gray-300">{program.shortDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                  
                  <div className="flex justify-between mb-6">
                    {program.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                      Prospek Karir:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.career.map((job, i) => (
                        <span key={i} className="text-xs bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/program/${program.id}`}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="w-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center"
                    >
                      Pelajari Lebih Lanjut <ChevronRight className="ml-2 w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center"
          >
            <span className="text-blue-600">Perbandingan</span> Program
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-bold">Program</th>
                  <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-bold">Durasi</th>
                  <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-bold">Sertifikasi</th>
                  <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-bold">Peluang Kerja</th>
                  <th className="px-6 py-4 text-left text-gray-800 dark:text-white font-bold">Fasilitas</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <motion.tr 
                    key={program.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {program.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-800 dark:text-white">{program.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{program.shortDesc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800 dark:text-white">3 Tahun</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          Nasional & Internasional
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800 dark:text-white">85%+</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800 dark:text-white">Lab Modern, Studio</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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
                  Masih Bingung Memilih Program?
                </h2>
                <p className="text-lg mb-6 max-w-2xl">
                  Konsultasikan dengan konselor kami untuk menemukan program yang paling sesuai dengan minat dan bakat Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/konsultasi">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                    >
                      Jadwalkan Konsultasi <ArrowRight className="ml-2" />
                    </motion.button>
                  </Link>
                  <Link href="/kontak">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all flex items-center"
                    >
                      Hubungi Kami <ChevronRight className="ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <Image
                  src="/program-cta.png"
                  alt="Konsultasi Program"
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