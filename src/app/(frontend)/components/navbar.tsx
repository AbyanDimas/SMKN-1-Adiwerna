'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  School,
  Info,
  Contact,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Search,
  User,
  Calendar,
  Newspaper,
  BookOpen,
  Users,
  GraduationCap,
  Award,
  MoreHorizontal,
  Sun,
  Moon,
  Sparkles,
  Backpack
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  subItems?: NavItem[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, systemTheme } = useTheme();
  const navbarRef = useRef<HTMLElement>(null);

  // Menu utama yang penting
  const primaryItems: NavItem[] = [
    { name: 'Beranda', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Program', href: '/program', icon: <Backpack className="w-5 h-5" /> },
    { name: 'Berita', href: '/berita', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Kontak', href: '/kontak', icon: <Contact className="w-5 h-5" /> },
  ];

  // Menu sekunder dimasukkan ke dropdown "Lainnya"
  const otherItems: NavItem[] = [
    { 
      name: 'Profil Sekolah', 
      href: '#', 
      icon: <Info className="w-5 h-5" />,
      subItems: [
        { name: 'Sejarah', href: '/profil/sejarah', icon: <BookOpen className="w-4 h-4" /> },
        { name: 'Visi Misi', href: '/profil/visi-misi', icon: <School className="w-4 h-4" /> },
      ]
    },
    { 
      name: 'Akademik', 
      href: '#', 
      icon: <GraduationCap className="w-5 h-5" />,
      subItems: [
        { name: 'Kalender', href: '/akademik/kalender', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Struktur', href: '/akademik/struktur', icon: <Users className="w-4 h-4" /> },
      ]
    },
    { 
      name: 'Kesiswaan', 
      href: '#', 
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { name: 'Ekstrakurikuler', href: '/kesiswaan/ekskul', icon: <Award className="w-4 h-4" /> },
        { name: 'Prestasi', href: '/kesiswaan/prestasi', icon: <Award className="w-4 h-4" /> },
      ]
    },
  ];

  // Efek untuk scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsOpen(false);
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const isActive = (href: string, subItems?: NavItem[]) => {
    if (href === '/') return pathname === href;
    if (subItems) return subItems.some(subItem => pathname.startsWith(subItem.href));
    return pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
    setShowSearch(false);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <motion.nav 
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2 border-b border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900 py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 relative mr-3">
                <Image 
                  src="/logo-smk.png"
                  alt="Logo SMK Negeri 1 Adiwerna"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="block md:hidden">
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">SMKN 1 Adiwerna</h1>
              </div>
              <div className="hidden md:block">
<h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">SMKN 1 Adiwerna</h1>
<div className="hidden md:inline-flex bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-md shadow-sm border border-blue-200 dark:border-blue-800">
  <p className="text-[10px] font-semibold leading-none">Sekolah Pusat Keunggulan, Asean Eco School</p>
</div>
</div>
            </Link>
          </div>

          {/* Desktop Navigation - Menu Tengah */}
          <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1">
              {primaryItems.map((item) => (
                <Link href={item.href} key={item.name}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center px-4 py-2 rounded-full transition-all ${
                      isActive(item.href) 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-medium' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </motion.div>
                </Link>
              ))}

              {/* Dropdown Lainnya */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => toggleDropdown('Lainnya')}
                  className={`flex items-center px-4 py-2 rounded-full transition-all ${
                    isActive('#', otherItems.flatMap(item => item.subItems || [])) 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-medium' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <MoreHorizontal className="w-5 h-5 mr-2" />
                  Lainnya
                  <span className="ml-2">
                    {openDropdown === 'Lainnya' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {openDropdown === 'Lainnya' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700"
                    >
                      {otherItems.map((item) => (
                        <div key={item.name}>
                          {item.subItems ? (
                            <>
                              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center">
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                              </div>
                              {item.subItems.map((subItem) => (
                                <Link href={subItem.href} key={subItem.name}>
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center px-6 py-2 ${
                                      pathname === subItem.href 
                                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                                    }`}
                                  >
                                    <span className="mr-2">{subItem.icon}</span>
                                    {subItem.name}
                                  </motion.div>
                                </Link>
                              ))}
                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                            </>
                          ) : (
                            <Link href={item.href}>
                              <motion.div
                                whileHover={{ x: 5 }}
                                className={`flex items-center px-4 py-2 ${
                                  pathname === item.href 
                                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200' 
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                                }`}
                              >
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                              </motion.div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar Modern - Icon Only */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50 border border-gray-200 dark:border-gray-700"
                  >
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        placeholder="Cari..."
                        className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent text-gray-700 dark:text-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher dengan Background Keren */}
            <motion.button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner hover:shadow-md transition-all"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>

            {/* Tanya AI Button */}
            <Link href="/tanya-ai">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 5, -5, 0],
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 text-white shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    background: [
                      'conic-gradient(from 0deg, transparent 0%, #ffffff 10%, transparent 20%)',
                      'conic-gradient(from 90deg, transparent 0%, #ffffff 10%, transparent 20%)',
                      'conic-gradient(from 180deg, transparent 0%, #ffffff 10%, transparent 20%)',
                      'conic-gradient(from 270deg, transparent 0%, #ffffff 10%, transparent 20%)',
                    ],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                />
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                <span>Tanya AI</span>
              </motion.button>
            </Link>

            {/* Login Button */}
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md transition-all"
              >
                <User className="w-5 h-5 mr-2" />
                <span>Login</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Search Mobile Icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Tanya AI Mobile Icon */}
            <Link href="/tanya-ai">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
              >
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </Link>

            {/* Theme Switcher Mobile */}
            <motion.button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2"
            >
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent text-gray-700 dark:text-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {/* Menu Utama Mobile */}
                {primaryItems.map((item) => (
                  <Link href={item.href} key={item.name} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        isActive(item.href) 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-medium' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </motion.div>
                  </Link>
                ))}

                {/* Dropdown Lainnya Mobile */}
                {otherItems.map((item) => (
                  <div key={item.name}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg ${
                            isActive('#', item.subItems) 
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-medium' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                          </div>
                          {openDropdown === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-6 mt-1 space-y-1"
                            >
                              {item.subItems.map((subItem) => (
                                <Link href={subItem.href} key={subItem.name} onClick={() => setIsOpen(false)}>
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center px-4 py-3 rounded-lg ${
                                      pathname === subItem.href 
                                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                                    }`}
                                  >
                                    <span className="mr-3">{subItem.icon}</span>
                                    {subItem.name}
                                  </motion.div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex items-center px-4 py-3 rounded-lg ${
                            isActive(item.href) 
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 font-medium' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </motion.div>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Login Button */}
                <div className="px-4 pt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
                    >
                      <User className="w-5 h-5 mr-2" />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;