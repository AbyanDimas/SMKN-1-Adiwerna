export interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface Achievement {
  title: string;
  category: string;
  year: string;
}

export interface Facility {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface Extracurricular {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Activity {
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface Teacher {
  name: string;
  position: string;
  expertise: string;
  image: string;
}

export interface GalleryItem {
  image: string;
  caption: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}