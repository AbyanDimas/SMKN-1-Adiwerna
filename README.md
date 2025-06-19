# 🏫 Website SMKN 1 Adiwerna

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![PayloadCMS](https://img.shields.io/badge/PayloadCMS-3.42.0-blue?style=flat-square&logo=headlesscms)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.10-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

Website resmi SMK Negeri 1 Adiwerna yang dibangun dengan teknologi modern untuk memberikan informasi dan layanan terbaik kepada siswa, guru, orang tua, dan masyarakat umum.

## 📋 Daftar Isi

- [🏫 Website SMKN 1 Adiwerna](#-website-smkn-1-adiwerna)
  - [📋 Daftar Isi](#-daftar-isi)
  - [🌟 Fitur Utama](#-fitur-utama)
  - [🛠️ Teknologi Yang Digunakan](#️-teknologi-yang-digunakan)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [Deployment & DevOps](#deployment--devops)
  - [📁 Struktur Proyek](#-struktur-proyek)
  - [🚀 Quick Start](#-quick-start)
    - [1. Clone Repository](#1-clone-repository)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Environment Setup](#3-environment-setup)
    - [4. Database Setup](#4-database-setup)
    - [5. Development Server](#5-development-server)
  - [🐳 Docker Development](#-docker-development)
  - [📊 Collections (Data Models)](#-collections-data-models)
    - [Core Collections](#core-collections)
    - [Academic Collections](#academic-collections)
    - [Content Collections](#content-collections)
    - [Institutional Collections](#institutional-collections)
    - [Partnership Collections](#partnership-collections)
  - [🌍 Global Settings](#-global-settings)
  - [🎨 Frontend Features](#-frontend-features)
    - [Pages](#pages)
    - [Components](#components)
  - [🔧 Configuration](#-configuration)
    - [PayloadCMS Configuration](#payloadcms-configuration)
    - [Next.js Configuration](#nextjs-configuration)
    - [Tailwind CSS Configuration](#tailwind-css-configuration)
  - [📱 API Endpoints](#-api-endpoints)
    - [REST API](#rest-api)
    - [GraphQL API](#graphql-api)
  - [🚀 Production Build](#-production-build)
  - [🌐 Deployment](#-deployment)
    - [Deployment menggunakan Docker](#deployment-menggunakan-docker)
    - [Deployment ke Cloud Platform](#deployment-ke-cloud-platform)
  - [🧪 Testing](#-testing)
  - [📝 Scripts](#-scripts)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📞 Support](#-support)

## 🌟 Fitur Utama

### 🎯 Frontend Features
- **Responsive Design** - Tampilan optimal di semua perangkat
- **Dark/Light Theme** - Mode gelap dan terang dengan transisi smooth
- **Interactive Animations** - Menggunakan Framer Motion untuk UX yang menarik
- **SEO Optimized** - Struktur SEO yang baik untuk visibilitas search engine
- **Progressive Web App** - Pengalaman seperti aplikasi mobile
- **Accessibility Compliant** - Mendukung standar aksesibilitas web

### 📊 Content Management
- **Admin Dashboard** - Panel admin yang user-friendly
- **Rich Text Editor** - Editor konten dengan fitur lengkap
- **Media Management** - Upload dan manajemen file media
- **Multi-language Support** - Dukungan bahasa Indonesia dan Inggris
- **Version Control** - Sistem versioning untuk konten
- **Draft System** - Sistem draft untuk preview sebelum publish

### 🔐 Security & Performance
- **Role-based Access Control** - Sistem peran dan akses
- **Image Optimization** - Otomatis optimasi gambar
- **Caching System** - Sistem cache untuk performa optimal
- **API Rate Limiting** - Pembatasan akses API
- **Data Validation** - Validasi data yang ketat

## 🛠️ Teknologi Yang Digunakan

### Frontend
- **[Next.js 15.3.0](https://nextjs.org/)** - React framework dengan App Router
- **[React 19.1.0](https://react.dev/)** - Library UI modern
- **[TypeScript 5.7.3](https://www.typescriptlang.org/)** - Type safety dan developer experience
- **[Tailwind CSS 4.1.10](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.18.1](https://www.framer.com/motion/)** - Animasi dan transisi
- **[Lucide React 0.515.0](https://lucide.dev/)** - Icon library modern
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme switching

### Backend
- **[PayloadCMS 3.42.0](https://payloadcms.com/)** - Headless CMS
- **[GraphQL 16.8.1](https://graphql.org/)** - Query language untuk API
- **[Sharp 0.32.6](https://sharp.pixelplumbing.com/)** - Image processing

### Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[@payloadcms/db-mongodb 3.42.0](https://payloadcms.com/docs/database/mongodb)** - MongoDB adapter

### Deployment & DevOps
- **[Docker](https://www.docker.com/)** - Containerization
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container development
- **[Node.js 18.20.2+](https://nodejs.org/)** - Runtime environment
- **[PNPM 9+](https://pnpm.io/)** - Package manager

## 📁 Struktur Proyek

```
SMKN-1-Adiwerna/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (admin)/           # Admin dashboard routes
│   │   │   ├── 📁 admin/
│   │   │   │   ├── 📄 page.tsx   # Admin main page
│   │   │   │   └── 📄 not-found.tsx
│   │   │   ├── 📁 api/           # API routes
│   │   │   │   ├── 📁 [...slug]/ # PayloadCMS API
│   │   │   │   ├── 📁 graphql/   # GraphQL endpoint
│   │   │   │   └── 📁 graphql-playground/
│   │   │   ├── 📄 layout.tsx     # Admin layout
│   │   │   └── 📄 custom.scss    # Admin styles
│   │   ├── 📁 (frontend)/        # Frontend routes
│   │   │   ├── 📁 components/    # React components
│   │   │   │   ├── 📁 home/      # Homepage components
│   │   │   │   │   ├── 📁 sections/
│   │   │   │   │   │   ├── 📄 HeroSection.tsx
│   │   │   │   │   │   ├── 📄 AboutSection.tsx
│   │   │   │   │   │   ├── 📄 ProgramsSection.tsx
│   │   │   │   │   │   ├── 📄 NewsSection.tsx
│   │   │   │   │   │   └── ... (14+ sections)
│   │   │   │   │   ├── 📁 types/   # TypeScript interfaces
│   │   │   │   │   └── 📁 utils/   # Utility functions
│   │   │   │   └── 📄 navbar.tsx  # Navigation component
│   │   │   ├── 📁 berita/         # News page
│   │   │   ├── 📁 program/        # Programs page
│   │   │   ├── 📁 kontak/         # Contact page
│   │   │   ├── 📁 tanya-ai/       # AI Chat page
│   │   │   ├── 📄 page.tsx        # Homepage
│   │   │   ├── 📄 layout.tsx      # Frontend layout
│   │   │   └── 📄 globals.css     # Global styles
│   │   └── 📁 my-route/           # Custom API route
│   ├── 📁 collections/            # PayloadCMS collections
│   │   ├── 📄 Users.ts            # User management
│   │   ├── 📄 Media.ts            # File uploads
│   │   ├── 📄 News.ts             # News articles
│   │   ├── 📄 Events.ts           # School events
│   │   ├── 📄 Departments.ts      # Academic departments
│   │   ├── 📄 Teachers.ts         # Faculty information
│   │   ├── 📄 Achievements.ts     # School achievements
│   │   ├── 📄 Extracurriculars.ts # Extracurricular activities
│   │   ├── 📄 Gallery.ts          # Photo gallery
│   │   ├── 📄 Partners.ts         # Industry partners
│   │   ├── 📄 Documents.ts        # Document management
│   │   ├── 📄 Announcements.ts    # School announcements
│   │   ├── 📄 OrganizationStructure.ts
│   │   ├── 📄 SchoolProfile.ts    # School profile (global)
│   │   ├── 📄 VisionMission.ts    # Vision & mission (global)
│   │   ├── 📄 AboutPage.ts        # About page content (global)
│   │   ├── 📄 ContactInfo.ts      # Contact information (global)
│   │   └── 📄 SocialMedia.ts      # Social media links (global)
│   ├── 📄 payload.config.ts       # PayloadCMS configuration
│   └── 📄 payload-types.ts        # Generated TypeScript types
├── 📁 public/                     # Static assets
│   └── 📄 logo-smk.png           # School logo
├── 📁 media/                      # Media uploads
│   ├── 📄 DPIB.png               # Department images
│   ├── 📄 ROOTS.jpg
│   ├── 📄 TITL-.jpg
│   └── ... (various department images)
├── 📁 .vscode/                    # VS Code configuration
│   ├── 📄 extensions.json        # Recommended extensions
│   ├── 📄 launch.json            # Debug configuration
│   └── 📄 settings.json          # Workspace settings
├── 📄 package.json               # Project dependencies
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 next.config.mjs            # Next.js configuration
├── 📄 postcss.config.mjs         # PostCSS configuration
├── 📄 eslint.config.mjs          # ESLint configuration
├── 📄 .prettierrc.json           # Prettier configuration
├── 📄 docker-compose.yml         # Docker Compose setup
├── 📄 Dockerfile                 # Docker container setup
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
└── 📄 README.md                  # Documentation
```

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/username/SMKN-1-Adiwerna.git
cd SMKN-1-Adiwerna
```

### 2. Install Dependencies

```bash
# Menggunakan PNPM (recommended)
pnpm install

# Atau menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

### 3. Environment Setup

```bash
# Copy environment variables
cp .env.example .env
```

Edit file `.env` dan sesuaikan dengan konfigurasi Anda:

```env
# Database Configuration
DATABASE_URI=mongodb://127.0.0.1:27017/smkn1-adiwerna

# PayloadCMS Secret (generate random string)
PAYLOAD_SECRET=your-super-secret-key-here

# Server Configuration (optional)
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_DRAFT_SECRET=draft-secret-key

# Environment
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
sudo systemctl start mongod

# Atau menggunakan brew (macOS)
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)

1. Buat akun di [MongoDB Atlas](https://cloud.mongodb.com/)
2. Buat cluster dan database
3. Dapatkan connection string
4. Update `DATABASE_URI` di file `.env`

### 5. Development Server

```bash
# Start development server
pnpm dev

# Server akan berjalan di:
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin
# GraphQL: http://localhost:3000/api/graphql
```

## 🐳 Docker Development

Jika Anda prefer menggunakan Docker untuk development:

```bash
# Start semua services (MongoDB + App)
docker-compose up

# Atau run di background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

File `docker-compose.yml` sudah dikonfigurasi dengan:
- MongoDB service
- Auto-reload untuk development
- Volume mounting untuk live code changes

## 📊 Collections (Data Models)

### Core Collections

#### 👥 Users
- **Deskripsi**: Manajemen pengguna dan autentikasi
- **Fields**: email, password, roles, profile
- **Access**: Admin only

#### 📁 Media
- **Deskripsi**: Upload dan manajemen file
- **Fields**: filename, mimeType, filesize, alt text
- **Features**: Image resizing, focal point

### Academic Collections

#### 🏛️ Departments
- **Deskripsi**: Jurusan dan program keahlian
- **Fields**: 
  - Basic: name, slug, description, featuredImage
  - Leadership: headOfDepartment (name, title, bio, photo, email)
  - Programs: array of academic programs
  - Partners: industry collaboration
  - SEO: meta fields
  - Contact: email, phone, location

#### 👨‍🏫 Teachers
- **Deskripsi**: Data guru dan staff
- **Fields**: name, photo, position, bio, subjects, education
- **Features**: Multi-language support

#### 📄 Documents
- **Deskripsi**: Dokumen sekolah (kurikulum, panduan, dll)
- **Fields**: title, file, category, description
- **Access**: Role-based access

#### 🏆 Achievements
- **Deskripsi**: Prestasi sekolah dan siswa
- **Fields**: title, description, date, category, images
- **Categories**: Academic, sports, competitions

#### 🎭 Extracurriculars
- **Deskripsi**: Kegiatan ekstrakurikuler
- **Fields**: name, description, schedule, instructor, gallery
- **Features**: Online registration integration

### Content Collections

#### 📰 News
- **Deskripsi**: Berita dan artikel sekolah
- **Fields**:
  - Content: title, slug, content, excerpt
  - Media: featuredImage, imageGallery
  - Meta: publishDate, category, tags, isFeatured
  - Relations: relatedNews, relatedEvents
  - SEO: metaTitle, metaDescription, keywords
  - Author: relationship to users
- **Features**: 
  - Draft system dengan autosave
  - Version control (max 10 versions)
  - Advanced rich text editor
  - Custom slug generation
  - Related content suggestions

#### 📅 Events
- **Deskripsi**: Event dan kegiatan sekolah
- **Fields**: title, description, startDate, endDate, location, registration
- **Features**: Calendar integration

#### 📢 Announcements
- **Deskripsi**: Pengumuman penting
- **Fields**: title, content, priority, validUntil
- **Features**: Auto-expiry system

#### 🖼️ Gallery
- **Deskripsi**: Galeri foto sekolah
- **Fields**: title, images, description, category
- **Features**: Lightbox view, bulk upload

### Institutional Collections

#### 🏢 OrganizationStructure
- **Deskripsi**: Struktur organisasi sekolah
- **Fields**: position, name, photo, department
- **Features**: Hierarchical display

### Partnership Collections

#### 🤝 Partners
- **Deskripsi**: Mitra industri dan kerjasama
- **Fields**: name, logo, website, description, type
- **Categories**: Industry, education, government

## 🌍 Global Settings

Global settings yang dapat diakses di seluruh website:

#### 🏫 SchoolProfile
- **Deskripsi**: Profil umum sekolah
- **Fields**: schoolName, address, phone, email, establishedYear

#### 🎯 VisionMission
- **Deskripsi**: Visi, misi, dan tujuan sekolah
- **Fields**: vision, mission, objectives

#### ℹ️ AboutPage
- **Deskripsi**: Konten halaman tentang
- **Fields**: content, history, facilities

#### 📞 ContactInfo
- **Deskripsi**: Informasi kontak
- **Fields**: address, phone, email, maps, office hours

#### 📱 SocialMedia
- **Deskripsi**: Tautan media sosial
- **Fields**: facebook, instagram, youtube, twitter, linkedin

## 🎨 Frontend Features

### Pages

#### 🏠 Homepage (`/`)
Landing page dengan 15+ sections:
- **HeroSection**: Banner utama dengan animasi
- **StatsSection**: Statistik sekolah
- **AboutSection**: Tentang sekolah
- **ProgramsSection**: Program keahlian
- **FacilitiesSection**: Fasilitas sekolah
- **AchievementsSection**: Prestasi terbaru
- **PartnersSection**: Mitra kerjasama
- **TestimonialsSection**: Testimoni
- **ExtracurricularsSection**: Ekstrakurikuler
- **ActivitiesSection**: Kegiatan sekolah
- **TeachersSection**: Guru unggulan
- **GallerySection**: Galeri foto
- **FAQSection**: Frequently Asked Questions
- **NewsSection**: Berita terbaru
- **CTASection**: Call-to-action
- **Footer**: Footer dengan informasi lengkap

#### 📰 News Page (`/berita`)
- Daftar berita dengan filtering
- Search functionality
- Pagination
- Category filtering
- Featured news highlight

#### 🎓 Programs Page (`/program`)
- Informasi program keahlian
- Departemen detail
- Kurikulum overview
- Career prospects

#### 📞 Contact Page (`/kontak`)
- Form kontak
- Informasi alamat
- Maps integration
- Office hours

#### 🤖 AI Chat (`/tanya-ai`)
- Virtual assistant
- FAQ automation
- Information query

### Components

#### 🧭 Navbar
- Responsive navigation
- Theme switcher (dark/light)
- Search functionality
- Mobile-optimized menu
- Active page highlighting
- Dropdown menus

#### 🎭 Animations
- Smooth page transitions
- Hover effects
- Loading animations
- Scroll-triggered animations
- Interactive elements

## 🔧 Configuration

### PayloadCMS Configuration

File: `src/payload.config.ts`

```typescript
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Core Collections
    Users, Media,
    // Academic Collections  
    Departments, Teachers, Documents, Extracurriculars, Achievements,
    // Content Collections
    News, Events, Announcements, Gallery,
    // Institutional Collections
    OrganizationStructure,
    // Partnership Collections
    Partners,
  ],
  globals: [ContactInfo, VisionMission, SchoolProfile, AboutPage, SocialMedia],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
})
```

### Next.js Configuration

File: `next.config.mjs`

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false
  },
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  }
}

export default withPayload(nextConfig)
```

### Tailwind CSS Configuration

File: `@tailwindcss/postcss`

- Utility-first CSS framework
- Custom color palette sesuai branding sekolah
- Responsive design system
- Dark mode support
- Custom animations

## 📱 API Endpoints

### REST API

Base URL: `http://localhost:3000/api`

#### Collections API
```
GET    /api/news              # Get all news
POST   /api/news              # Create news (auth required)
GET    /api/news/:id          # Get news by ID
PUT    /api/news/:id          # Update news (auth required)
DELETE /api/news/:id          # Delete news (auth required)

GET    /api/departments       # Get all departments
GET    /api/teachers          # Get all teachers
GET    /api/events            # Get all events
GET    /api/achievements      # Get all achievements
# ... similar patterns for other collections
```

#### Custom Endpoints
```
GET    /api/news/slug/:slug   # Get news by slug
GET    /api/departments/slug/:slug # Get department by slug
```

#### Global API
```
GET    /api/globals/school-profile    # School profile
GET    /api/globals/vision-mission    # Vision & mission
GET    /api/globals/contact-info      # Contact information
GET    /api/globals/social-media      # Social media links
GET    /api/globals/about-page        # About page content
```

### GraphQL API

Endpoint: `http://localhost:3000/api/graphql`

Playground: `http://localhost:3000/api/graphql-playground`

#### Example Queries

```graphql
# Get all published news
query GetNews {
  News(where: { status: { equals: published } }) {
    docs {
      id
      title
      slug
      excerpt
      publishDate
      featuredImage {
        url
        alt
      }
      category
    }
  }
}

# Get department by slug
query GetDepartment($slug: String!) {
  Departments(where: { slug: { equals: $slug } }) {
    docs {
      id
      name
      description
      featuredImage {
        url
        alt
      }
      headOfDepartment {
        name
        title
        bio
      }
      programs {
        programName
        programDescription
      }
    }
  }
}
```

## 🚀 Production Build

```bash
# Build untuk production
pnpm build

# Start production server
pnpm start

# Generate types
pnpm generate:types

# Generate import map
pnpm generate:importmap
```

## 🌐 Deployment

### Deployment menggunakan Docker

#### 1. Build Docker Image

```bash
# Build image
docker build -t smkn1-adiwerna .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URI="your-mongodb-uri" \
  -e PAYLOAD_SECRET="your-secret" \
  smkn1-adiwerna
```

#### 2. Docker Compose Production

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URI=mongodb://mongo:27017/smkn1-adiwerna
      - PAYLOAD_SECRET=your-production-secret
    depends_on:
      - mongo
    restart: unless-stopped
  
  mongo:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped
    
volumes:
  mongo_data:
```

```bash
# Deploy dengan Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Deployment ke Cloud Platform

#### Vercel Deployment

1. **Setup Environment Variables**:
   ```
   DATABASE_URI=your-mongodb-atlas-uri
   PAYLOAD_SECRET=your-secret-key
   PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.vercel.app
   ```

2. **Deploy**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

#### Railway Deployment

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

#### DigitalOcean App Platform

1. Create new app from GitHub
2. Configure build settings:
   - Build Command: `pnpm build`
   - Run Command: `pnpm start`
3. Set environment variables

## 🧪 Testing

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint --fix

# Check types
pnpm type-check

# Format code
pnpm format
```

## 📝 Scripts

| Script | Deskripsi |
|--------|----------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build untuk production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm generate:types` | Generate TypeScript types |
| `pnpm generate:importmap` | Generate import map |
| `pnpm payload` | Run PayloadCMS CLI commands |

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Gunakan TypeScript untuk type safety
- Follow ESLint dan Prettier rules
- Tulis commit message yang deskriptif
- Test fitur sebelum submit PR
- Update dokumentasi jika diperlukan

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

Jika mengalami masalah atau membutuhkan bantuan:

- 📧 Email: admin@smkn1adiwerna.sch.id
- 📱 WhatsApp: +62-xxx-xxxx-xxxx
- 🌐 Website: https://smkn1adiwerna.sch.id
- 📍 Alamat: Jl. Raya Adiwerna, Tegal, Jawa Tengah

---

**SMKN 1 Adiwerna** - Mencetak Generasi Unggul dan Berkarakter 🎓
