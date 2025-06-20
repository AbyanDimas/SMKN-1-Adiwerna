'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  List, Grid, Square, Clock, Sun, Moon, ChevronsLeft, 
  ChevronsRight, ChevronUp, ChevronDown, Plus, Bell, 
  Download, Share2, Printer, Settings, School, BookOpen, 
  Trophy, Flag, Users, Bookmark, AlertCircle, Info
} from 'lucide-react';

type Event = {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
  location?: string;
  participants?: string[];
  color: string;
  category: 'academic' | 'holiday' | 'exam' | 'event' | 'extracurricular';
  important?: boolean;
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const calendarRef = useRef<HTMLDivElement>(null);

  // Generate comprehensive sample events for SMKN 1 Adiwerna
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        title: 'Penerimaan Peserta Didik Baru',
        date: new Date(2024, 6, 1),
        endDate: new Date(2024, 6, 15),
        description: 'Pendaftaran siswa baru tahun ajaran 2024/2025 untuk semua jurusan: TKJ, MM, AKL, OTKP, dan BDP',
        location: 'Aula SMKN 1 Adiwerna',
        participants: ['Panitia PPDB', 'Bendahara', 'Waka Kesiswaan'],
        color: 'bg-indigo-600',
        category: 'academic',
        important: true
      },
      {
        id: '2',
        title: 'Ujian Tengah Semester Ganjil',
        date: new Date(2024, 6, 20),
        endDate: new Date(2024, 6, 25),
        description: 'UTS untuk semua jurusan. Jadwal akan dibagikan masing-masing wali kelas',
        color: 'bg-red-600',
        category: 'exam'
      },
      {
        id: '3',
        title: 'Upacara Hari Kemerdekaan RI',
        date: new Date(2024, 7, 17),
        description: 'Upacara bendera dan berbagai lomba 17-an antar kelas',
        location: 'Lapangan SMKN 1 Adiwerna',
        color: 'bg-yellow-500',
        category: 'holiday',
        important: true
      },
      {
        id: '4',
        title: 'Praktek Kerja Industri Kelas XI',
        date: new Date(2024, 7, 1),
        endDate: new Date(2024, 9, 30),
        description: 'Pelaksanaan Prakerin untuk semua siswa kelas XI selama 3 bulan',
        color: 'bg-emerald-600',
        category: 'academic'
      },
      {
        id: '5',
        title: 'Rapat Orang Tua/Wali Murid',
        date: new Date(2024, 6, 10, 9, 0),
        endDate: new Date(2024, 6, 10, 12, 0),
        description: 'Pembagian rapor semester genap dan pembahasan program sekolah untuk tahun ajaran baru',
        location: 'Masing-masing ruang kelas',
        participants: ['Seluruh wali kelas', 'Kepala Sekolah', 'Wakil Kepala Sekolah'],
        color: 'bg-purple-600',
        category: 'event'
      },
      {
        id: '6',
        title: 'Lomba Kompetensi Siswa (LKS) Tingkat Kabupaten',
        date: new Date(2024, 6, 5),
        endDate: new Date(2024, 6, 7),
        description: 'Perwakilan SMKN 1 Adiwerna mengikuti LKS di 5 bidang lomba',
        location: 'SMKN 1 Slawi',
        participants: ['Siswa terpilih', 'Guru pembimbing'],
        color: 'bg-amber-500',
        category: 'extracurricular',
        important: true
      },
      {
        id: '7',
        title: 'Pembagian Raport Semester Ganjil',
        date: new Date(2024, 11, 20),
        description: 'Pembagian rapor untuk seluruh siswa',
        location: 'Masing-masing ruang kelas',
        color: 'bg-blue-600',
        category: 'academic'
      },
      {
        id: '8',
        title: 'Porseni Antar Kelas',
        date: new Date(2024, 8, 10),
        endDate: new Date(2024, 8, 15),
        description: 'Pekan Olahraga dan Seni antar kelas dengan berbagai cabang lomba',
        location: 'Lapangan dan Aula SMKN 1 Adiwerna',
        color: 'bg-pink-500',
        category: 'extracurricular'
      },
      {
        id: '9',
        title: 'Workshop Kewirausahaan',
        date: new Date(2024, 7, 22, 8, 0),
        endDate: new Date(2024, 7, 22, 15, 0),
        description: 'Pelatihan kewirausahaan untuk siswa kelas XII dengan narasumber dari dunia industri',
        location: 'Aula SMKN 1 Adiwerna',
        participants: ['Seluruh siswa kelas XII', 'Guru BDP'],
        color: 'bg-cyan-500',
        category: 'event'
      },
      {
        id: '10',
        title: 'Libur Awal Puasa',
        date: new Date(2025, 2, 1),
        endDate: new Date(2025, 2, 3),
        description: 'Libur awal bulan Ramadhan 1446 H',
        color: 'bg-orange-500',
        category: 'holiday'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);
    
    if (direction === 'today') {
      setCurrentDate(new Date());
      return;
    }
    
    const amount = direction === 'prev' ? -1 : 1;
    
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + amount);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (amount * 7));
    } else {
      newDate.setDate(newDate.getDate() + amount);
    }
    
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const weeks: Date[][] = [];
    let currentWeek: Date[] = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);

      if (currentWeek.length === 7 || day === daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
          <div key={day} className="p-3 text-center font-semibold bg-blue-700 text-white">
            {day}
          </div>
        ))}
        
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="contents">
            {week.map((date, dayIndex) => {
              const dayEvents = date ? events.filter(event => isSameDay(event.date, date)) : [];
              const isToday = date ? isSameDay(date, new Date()) : false;
              
              return (
                <motion.div
                  key={dayIndex}
                  className={`min-h-32 p-2 bg-white flex flex-col ${!date ? 'bg-gray-50' : ''} ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {date && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center ${
                          date.getDay() === 0 ? 'text-red-600' : 
                          date.getDay() === 6 ? 'text-blue-600' : 
                          'text-gray-700'
                        } ${isToday ? 'bg-blue-500 text-white' : ''}`}>
                          {date.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs text-gray-500">
                            {dayEvents.length} acara
                          </span>
                        )}
                      </div>
                      <div className="flex-grow overflow-y-auto space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <motion.div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${event.color} text-white cursor-pointer flex items-center`}
                            onClick={() => setSelectedEvent(event)}
                            whileHover={{ scale: 1.02 }}
                          >
                            {event.important && <Bell className="mr-1" size={12} />}
                            {event.title}
                          </motion.div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 3} lagi
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = getWeekStartDate(currentDate);
    const days: Date[] = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }

    return (
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="p-2 bg-blue-700 text-white font-semibold"></div>
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 text-center font-semibold ${isSameDay(day, new Date()) ? 'bg-blue-600 text-white' : 'bg-blue-700 text-white'}`}
            >
              <div className="text-sm">{['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][day.getDay()]}</div>
              <div className="text-xs">
                {day.getDate()} {day.getMonth() !== currentDate.getMonth() ? day.toLocaleString('id-ID', { month: 'short' }) : ''}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-8 gap-px bg-gray-200 flex-grow overflow-y-auto">
          <div className="bg-white">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="h-16 text-xs text-gray-500 flex items-end justify-end pr-2 pb-1 bg-white">
                {hour}:00
              </div>
            ))}
          </div>
          
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white relative">
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="h-16 border-b border-gray-100"></div>
              ))}
              
              {events
                .filter(event => isSameDay(event.date, day))
                .map(event => {
                  const startHour = event.date.getHours();
                  const startMinute = event.date.getMinutes();
                  const endHour = event.endDate ? event.endDate.getHours() : startHour + 1;
                  const endMinute = event.endDate ? event.endDate.getMinutes() : 0;
                  const durationMinutes = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) || 60;
                  
                  return (
                    <motion.div
                      key={event.id}
                      className={`absolute left-1 right-1 rounded-md shadow-sm ${event.color} text-white text-xs cursor-pointer overflow-hidden`}
                      style={{
                        top: `${(startHour * 60 + startMinute) * (64/60) + 2}px`,
                        height: `${durationMinutes * (64/60) - 4}px`
                      }}
                      onClick={() => setSelectedEvent(event)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-1">
                        <div className="font-medium truncate flex items-center">
                          {event.important && <Bell className="mr-1" size={12} />}
                          {event.title}
                        </div>
                        <div className="text-xs opacity-90 mt-1">
                          {event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          {event.endDate && ` - ${event.endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter(event => isSameDay(event.date, currentDate));
    
    return (
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="p-4 text-center font-semibold bg-blue-700 text-white">
          {currentDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        
        <div className="grid grid-cols-12 gap-px bg-gray-200 flex-grow">
          <div className="col-span-1 bg-white">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="h-16 text-xs text-gray-500 flex items-end justify-end pr-2 pb-1">
                {hour}:00
              </div>
            ))}
          </div>
          
          <div className="col-span-11 bg-white relative">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="h-16 border-b border-gray-100"></div>
            ))}
            
            {dayEvents.map(event => {
              const startHour = event.date.getHours();
              const startMinute = event.date.getMinutes();
              const endHour = event.endDate ? event.endDate.getHours() : startHour + 1;
              const endMinute = event.endDate ? event.endDate.getMinutes() : 0;
              const durationMinutes = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) || 60;
              
              return (
                <motion.div
                  key={event.id}
                  className={`absolute left-2 right-2 rounded-lg shadow-sm ${event.color} text-white cursor-pointer overflow-hidden`}
                  style={{
                    top: `${(startHour * 60 + startMinute) * (64/60) + 2}px`,
                    height: `${durationMinutes * (64/60) - 4}px`
                  }}
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2">
                    <div className="font-medium flex items-center">
                      {event.important && <Bell className="mr-2" size={14} />}
                      {event.title}
                    </div>
                    <div className="text-xs opacity-90 mt-1">
                      {event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      {event.endDate && ` - ${event.endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                    {event.location && (
                      <div className="text-xs opacity-90 mt-1 flex items-center">
                        <Bookmark className="mr-1" size={12} /> {event.location}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const filteredEvents = events
      .filter(event => {
        if (activeFilter === 'all') return true;
        return event.category === activeFilter;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-700">
            Agenda {activeFilter === 'all' ? 'Semua Kegiatan' : `Kategori ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <motion.div 
                key={event.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${event.color}`}></div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        {event.title}
                        {event.important && <AlertCircle className="ml-2 text-yellow-500" size={16} />}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {event.date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 flex items-center">
                      <Clock className="mr-1" size={14} />
                      {event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      {event.endDate && ` - ${event.endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                    {event.location && (
                      <div className="mt-1 text-sm text-gray-600 flex items-center">
                        <Bookmark className="mr-1" size={14} /> {event.location}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-gray-500 line-clamp-2">
                      {event.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              Tidak ada kegiatan yang ditemukan untuk kategori ini
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (viewMode) {
      case 'month': return renderMonthView();
      case 'week': return renderWeekView();
      case 'day': return renderDayView();
      case 'agenda': return renderAgendaView();
      default: return renderMonthView();
    }
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleExportCalendar = () => {
    alert('Fitur ekspor kalender akan segera tersedia!');
  };

  const handleShareCalendar = () => {
    alert('Fitur berbagi kalender akan segera tersedia!');
  };

  const handlePrintCalendar = () => {
    alert('Fitur cetak kalender akan segera tersedia!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <School className="mr-3" size={28} />
                Kalender Akademik SMKN 1 Adiwerna
              </h1>
              <p className="mt-2 text-blue-100">
                Seluruh kegiatan dan agenda resmi sekolah tahun ajaran 2024/2025
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-blue-800 rounded-lg font-medium flex items-center shadow-md"
                onClick={() => setShowAddEvent(true)}
              >
                <Plus className="mr-2" size={18} />
                Tambah Kegiatan
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg font-medium flex items-center shadow-md"
                onClick={handleExportCalendar}
              >
                <Download className="mr-2" size={18} />
                Ekspor
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Calendar Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
                onClick={() => navigateDate('today')}
              >
                Hari Ini
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight />
              </motion.button>
              
              <h2 className="text-xl font-semibold ml-2">
                {viewMode === 'month' && currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                {viewMode === 'week' && (
                  <>
                    {getWeekStartDate(currentDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - 
                    {getWeekEndDate(currentDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </>
                )}
                {viewMode === 'day' && currentDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                {viewMode === 'agenda' && 'Agenda Kegiatan'}
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <motion.button
                  className={`px-3 py-1 rounded-md flex items-center ${viewMode === 'month' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                  onClick={() => setViewMode('month')}
                  whileHover={{ scale: 1.03 }}
                >
                  <Grid className="mr-2" size={16} />
                  <span>Bulan</span>
                </motion.button>
                
                <motion.button
                  className={`px-3 py-1 rounded-md flex items-center ${viewMode === 'week' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                  onClick={() => setViewMode('week')}
                  whileHover={{ scale: 1.03 }}
                >
                  <List className="mr-2" size={16} />
                  <span>Minggu</span>
                </motion.button>
                
                <motion.button
                  className={`px-3 py-1 rounded-md flex items-center ${viewMode === 'day' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                  onClick={() => setViewMode('day')}
                  whileHover={{ scale: 1.03 }}
                >
                  <Square className="mr-2" size={16} />
                  <span>Hari</span>
                </motion.button>
                
                <motion.button
                  className={`px-3 py-1 rounded-md flex items-center ${viewMode === 'agenda' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                  onClick={() => setViewMode('agenda')}
                  whileHover={{ scale: 1.03 }}
                >
                  <BookOpen className="mr-2" size={16} />
                  <span>Agenda</span>
                </motion.button>
              </div>
              
              {viewMode === 'agenda' && (
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <motion.button
                    className={`px-3 py-1 rounded-md flex items-center text-sm ${activeFilter === 'all' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                    onClick={() => setActiveFilter('all')}
                    whileHover={{ scale: 1.03 }}
                  >
                    <span>Semua</span>
                  </motion.button>
                  
                  {['academic', 'exam', 'holiday', 'event', 'extracurricular'].map(filter => (
                    <motion.button
                      key={filter}
                      className={`px-3 py-1 rounded-md flex items-center text-sm ${activeFilter === filter ? 'bg-white shadow-sm' : 'text-gray-600'}`}
                      onClick={() => setActiveFilter(filter)}
                      whileHover={{ scale: 1.03 }}
                    >
                      {filter === 'academic' && <School className="mr-1" size={14} />}
                      {filter === 'exam' && <BookOpen className="mr-1" size={14} />}
                      {filter === 'holiday' && <Sun className="mr-1" size={14} />}
                      {filter === 'event' && <Users className="mr-1" size={14} />}
                      {filter === 'extracurricular' && <Trophy className="mr-1" size={14} />}
                      <span>
                        {filter === 'academic' && 'Akademik'}
                        {filter === 'exam' && 'Ujian'}
                        {filter === 'holiday' && 'Libur'}
                        {filter === 'event' && 'Event'}
                        {filter === 'extracurricular' && 'Ekstra'}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={handleShareCalendar}
              >
                <Share2 size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={handlePrintCalendar}
              >
                <Printer size={20} />
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="mb-8" ref={calendarRef}>
          {renderView()}
        </div>
        
        {/* Quick Links & CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-700 text-white p-4">
              <h3 className="font-semibold flex items-center">
                <Info className="mr-2" size={20} />
                Informasi Penting
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3">
                    <Bell className="text-blue-600" size={14} />
                  </div>
                  <span>PPDB 2024/2025 dibuka 1-15 Juli 2024</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3">
                    <Bell className="text-blue-600" size={14} />
                  </div>
                  <span>UTS Ganjil dilaksanakan 20-25 Juli 2024</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3">
                    <Bell className="text-blue-600" size={14} />
                  </div>
                  <span>Prakerin kelas XI dimulai 1 Agustus 2024</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                Lihat Semua Pengumuman
              </motion.button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-emerald-700 text-white p-4">
              <h3 className="font-semibold flex items-center">
                <Flag className="mr-2" size={20} />
                Kegiatan Mendatang
              </h3>
            </div>
            <div className="p-4">
              {events
                .filter(event => event.date > new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {event.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1 flex items-center">
                      <Clock className="mr-1" size={14} />
                      {event.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-2 bg-emerald-600 text-white rounded-lg font-medium"
                onClick={() => setViewMode('agenda')}
              >
                Lihat Semua Kegiatan
              </motion.button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-purple-700 text-white p-4">
              <h3 className="font-semibold flex items-center">
                <Settings className="mr-2" size={20} />
                Pengaturan Kalender
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notifikasi</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Aktifkan Notifikasi</option>
                    <option>Hanya Kegiatan Penting</option>
                    <option>Nonaktifkan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tema Warna</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Biru (Default)</option>
                    <option>Hijau</option>
                    <option>Merah</option>
                    <option>Ungu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mulai Minggu</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Hari Senin</option>
                    <option>Hari Minggu</option>
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg font-medium"
              >
                Simpan Pengaturan
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">SMKN 1 Adiwerna</h4>
              <p className="text-gray-400">
                Jl. Raya Adiwerna No. 123, Kabupaten Tegal, Jawa Tengah
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Telepon: (0283) 1234567</li>
                <li>Email: info@smkn1adiwerna.sch.id</li>
                <li>Website: www.smkn1adiwerna.sch.id</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Jurusan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Teknik Komputer dan Jaringan</li>
                <li>Multimedia</li>
                <li>Akuntansi</li>
                <li>Otomatisasi Tata Kelola Perkantoran</li>
                <li>Bisnis Daring dan Pemasaran</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Beranda</a></li>
                <li><a href="#" className="hover:text-white">Kalender Akademik</a></li>
                <li><a href="#" className="hover:text-white">Galeri</a></li>
                <li><a href="#" className="hover:text-white">Kontak</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© 2024 SMKN 1 Adiwerna. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 ${selectedEvent.color} text-white rounded-t-lg`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs flex items-center">
                        {selectedEvent.category === 'academic' && <School className="mr-1" size={12} />}
                        {selectedEvent.category === 'exam' && <BookOpen className="mr-1" size={12} />}
                        {selectedEvent.category === 'holiday' && <Sun className="mr-1" size={12} />}
                        {selectedEvent.category === 'event' && <Users className="mr-1" size={12} />}
                        {selectedEvent.category === 'extracurricular' && <Trophy className="mr-1" size={12} />}
                        {selectedEvent.category === 'academic' && 'Akademik'}
                        {selectedEvent.category === 'exam' && 'Ujian'}
                        {selectedEvent.category === 'holiday' && 'Libur'}
                        {selectedEvent.category === 'event' && 'Event'}
                        {selectedEvent.category === 'extracurricular' && 'Ekstrakurikuler'}
                      </div>
                      {selectedEvent.important && (
                        <div className="ml-2 bg-yellow-500 px-2 py-1 rounded-full text-xs flex items-center">
                          <AlertCircle className="mr-1" size={12} />
                          Penting
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} className="text-white hover:text-gray-200">
                    <ChevronDown size={24} />
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Clock className="mr-3 mt-0.5" size={18} />
                    <div>
                      <p className="font-medium">Tanggal & Waktu</p>
                      <p>
                        {selectedEvent.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        <br />
                        {selectedEvent.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        {selectedEvent.endDate && (
                          <>
                            {' - '}
                            {selectedEvent.endDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) !== 
                             selectedEvent.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) && (
                              <>
                                {selectedEvent.endDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                <br />
                              </>
                            )}
                            {selectedEvent.endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-start">
                      <Bookmark className="mr-3 mt-0.5" size={18} />
                      <div>
                        <p className="font-medium">Lokasi</p>
                        <p>{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                    <div className="flex items-start">
                      <Users className="mr-3 mt-0.5" size={18} />
                      <div>
                        <p className="font-medium">Peserta</p>
                        <p>{selectedEvent.participants.join(', ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Deskripsi Kegiatan</h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {selectedEvent.description || 'Tidak ada deskripsi tambahan'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="mr-2" size={16} />
                    Ingatkan Saya
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="mr-2" size={16} />
                    Bagikan
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg flex items-center ml-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedEvent(null)}
                  >
                    Tutup
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEvent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddEvent(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-blue-700 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Tambah Kegiatan Baru</h3>
                  <button onClick={() => setShowAddEvent(false)} className="text-white hover:text-gray-200">
                    <ChevronDown size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-lg" 
                      placeholder="Contoh: Ujian Tengah Semester"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                      <input 
                        type="time" 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai (opsional)</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Selesai (opsional)</label>
                      <input 
                        type="time" 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option value="academic">Akademik</option>
                      <option value="exam">Ujian</option>
                      <option value="holiday">Libur</option>
                      <option value="event">Event</option>
                      <option value="extracurricular">Ekstrakurikuler</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                    <div className="flex gap-2">
                      {['bg-indigo-600', 'bg-red-600', 'bg-emerald-600', 'bg-amber-500', 'bg-purple-600', 'bg-cyan-500'].map(color => (
                        <button 
                          key={color}
                          className={`w-8 h-8 rounded-full ${color}`}
                        ></button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi (opsional)</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-lg" 
                      placeholder="Contoh: Aula SMKN 1 Adiwerna"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-lg" 
                      rows={3}
                      placeholder="Tambahkan deskripsi lengkap tentang kegiatan ini"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="important" 
                      className="mr-2"
                    />
                    <label htmlFor="important" className="text-sm font-medium text-gray-700">
                      Tandai sebagai penting
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddEvent(false)}
                  >
                    Batal
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Simpan Kegiatan
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;