'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  Send, 
  User, 
  Bot, 
  Trash2, 
  Sparkles, 
  BookOpen,
  School,
  Info,
  Calendar,
  ClipboardList
} from 'lucide-react';
import { motion } from 'framer-motion';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const AIPage = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pertanyaan contoh yang bisa dipilih
  const exampleQuestions = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      question: "Apa saja program keahlian di SMKN 1 Adiwerna?"
    },
    {
      icon: <School className="w-5 h-5" />,
      question: "Bagaimana prosedur pendaftaran PPDB?"
    },
    {
      icon: <Info className="w-5 h-5" />,
      question: "Apa visi misi SMKN 1 Adiwerna?"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      question: "Kapan jadwal ujian semester genap?"
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      question: "Apa persyaratan untuk praktek kerja industri?"
    }
  ];

  // Scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle pengiriman pesan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsNewChat(false);

    try {
      // Simulasi respon AI (dalam implementasi nyata, ganti dengan API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateAIResponse(input);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menghasilkan respon AI (simulasi)
  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('program keahlian') || lowerQuestion.includes('jurusan')) {
      return `SMKN 1 Adiwerna memiliki 4 program keahlian:
1. Teknik Komputer dan Jaringan (TKJ)
2. Rekayasa Perangkat Lunak (RPL)
3. Multimedia
4. Teknik Kendaraan Ringan (TKR)

Setiap program dilengkapi dengan fasilitas laboratorium modern dan guru yang berpengalaman.`;
    } else if (lowerQuestion.includes('visi misi')) {
      return `Visi SMKN 1 Adiwerna:
"Menjadi SMK unggulan yang menghasilkan lulusan kompeten, berkarakter, dan siap bersaing di era global"

Misi:
1. Menyelenggarakan pendidikan berbasis kompetensi
2. Mengembangkan potensi siswa secara holistik
3. Membangun kerjasama dengan dunia industri
4. Menciptakan lingkungan belajar yang kondusif`;
    } else if (lowerQuestion.includes('ppdb') || lowerQuestion.includes('pendaftaran')) {
      return `Prosedur Pendaftaran PPDB SMKN 1 Adiwerna:
1. Daftar online melalui website ppdb.jatengprov.go.id
2. Upload berkas (SKHUN, Akta Kelahiran, KK)
3. Pemilihan jurusan
4. Pengumuman seleksi
5. Daftar ulang

Persyaratan:
- Lulusan SMP/MTs
- Usia maksimal 21 tahun
- Membawa berkas asli saat daftar ulang`;
    } else if (lowerQuestion.includes('ujian') || lowerQuestion.includes('semester')) {
      return `Jadwal Ujian Semester Genap 2023/2024:
- Ujian Praktik: 27 Mei - 1 Juni 2024
- Ujian Teori: 3 Juni - 8 Juni 2024
- Pengumuman Kelulusan: 15 Juni 2024

Silakan periksa website sekolah untuk informasi terupdate.`;
    } else if (lowerQuestion.includes('praktek kerja industri') || lowerQuestion.includes('prakerin')) {
      return `Persyaratan Praktik Kerja Industri (Prakerin):
1. Surat pengantar dari sekolah
2. CV dan surat lamaran
3. Fotokopi raport
4. Surat izin orang tua
5. Pakai seragam praktek

Durasi: 3 bulan
Penempatan: Perusahaan mitra sekolah`;
    } else {
      return `Saya adalah asisten virtual SMKN 1 Adiwerna. Saya bisa membantu menjawab pertanyaan tentang:
- Program keahlian
- Pendaftaran siswa baru
- Jadwal akademik
- Kegiatan sekolah
- Dan informasi lainnya

Silakan ajukan pertanyaan yang lebih spesifik untuk mendapatkan jawaban yang tepat.`;
    }
  };

  // Reset percakapan
  const handleNewChat = () => {
    setMessages([]);
    setIsNewChat(true);
  };

  return (
    <div className={` ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Riwayat Pertanyaan */}
          <div className="lg:w-1/4">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Riwayat Tanya</h2>
                <button 
                  onClick={handleNewChat}
                  className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Chat Baru
                </button>
              </div>
              
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messages
                    .filter(msg => msg.role === 'user')
                    .map(msg => (
                      <button
                        key={msg.id}
                        className={`w-full text-left p-3 rounded-lg text-sm truncate ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setMessages([]);
                          setInput(msg.content);
                        }}
                      >
                        {msg.content}
                      </button>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Belum ada riwayat percakapan
                </p>
              )}
            </div>

            {/* Pertanyaan Contoh */}
            <div className={`mt-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contoh Pertanyaan</h3>
              <div className="space-y-3">
                {exampleQuestions.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    onClick={() => setInput(item.question)}
                    className={`flex items-center w-full p-3 rounded-lg text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <span className="mr-2 text-blue-500">{item.icon}</span>
                    {item.question}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Area Chat Utama */}
          <div className="lg:w-3/4">
            <div className={`h-[78vh] flex flex-col rounded-xl overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Header Chat */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <Bot className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isLoading ? 'Mengetik...' : 'Online'}
                    </p>
                  </div>
                  {messages.length > 0 && (
                    <button 
                      onClick={handleNewChat}
                      className="ml-auto flex items-center text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus
                    </button>
                  )}
                </div>
              </div>

              {/* Isi Percakapan */}
              <div className="flex-1 overflow-y-auto p-4">
                {isNewChat ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className={`p-4 rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                      <Bot className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      AI Assistant SMKN 1 Adiwerna
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                      Saya siap membantu menjawab pertanyaan seputar SMKN 1 Adiwerna. Silakan ajukan pertanyaan Anda.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                      {exampleQuestions.slice(0, 4).map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setInput(item.question)}
                          className={`p-3 rounded-lg text-sm text-left ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {item.question}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-3xl rounded-xl p-4 ${message.role === 'user' 
                            ? theme === 'dark' 
                              ? 'bg-blue-900 text-white' 
                              : 'bg-blue-600 text-white'
                            : theme === 'dark' 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-start">
                            {message.role === 'user' ? (
                              <User className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2" />
                            ) : (
                              <Bot className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2" />
                            )}
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          </div>
                          <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className={`max-w-3xl rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Pesan */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pertanyaan Anda..."
                    className={`flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 focus:ring-blue-500 text-white' 
                      : 'bg-white border-gray-300 focus:ring-blue-500 text-gray-800'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-lg flex items-center justify-center ${!input.trim() || isLoading
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                      : theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  AI Assistant mungkin menghasilkan informasi yang tidak akurat. Harap verifikasi data penting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIPage;