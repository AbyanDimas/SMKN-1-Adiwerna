# 👨‍💻 Development Guide - SMKN 1 Adiwerna

Panduan lengkap untuk development dan kontribusi pada proyek website SMKN 1 Adiwerna.

## 📋 Daftar Isi

- [👨‍💻 Development Guide - SMKN 1 Adiwerna](#-development-guide---smkn-1-adiwerna)
  - [📋 Daftar Isi](#-daftar-isi)
  - [🛠️ Development Setup](#️-development-setup)
  - [📁 Project Structure](#-project-structure)
  - [🏗️ Architecture](#️-architecture)
  - [📝 Coding Standards](#-coding-standards)
  - [🔧 Development Workflow](#-development-workflow)
  - [🧪 Testing](#-testing)
  - [📦 Component Development](#-component-development)
  - [🗄️ Database Development](#️-database-development)
  - [🎨 UI/UX Development](#-uiux-development)
  - [🚀 Performance Optimization](#-performance-optimization)
  - [🔍 Debugging](#-debugging)
  - [📚 Best Practices](#-best-practices)
  - [🤝 Contributing](#-contributing)

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: 18.20.2 atau lebih tinggi
- **PNPM**: 9.0 atau lebih tinggi
- **MongoDB**: 4.4 atau lebih tinggi
- **Git**: 2.30 atau lebih tinggi
- **VS Code**: Direkomendasikan (dengan extensions)

### Initial Setup

```bash
# 1. Clone repository
git clone https://github.com/username/SMKN-1-Adiwerna.git
cd SMKN-1-Adiwerna

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env

# 4. Start MongoDB (jika lokal)
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod

# 5. Start development server
pnpm dev
```

### VS Code Setup

Install recommended extensions:

```json
// .vscode/extensions.json sudah tersedia
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "unifiedjs.vscode-mdx",
    "mongodb.mongodb-vscode"
  ]
}
```

### Environment Variables

```env
# Development
NODE_ENV=development
DATABASE_URI=mongodb://127.0.0.1:27017/smkn1-adiwerna-dev
PAYLOAD_SECRET=development-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Debug (optional)
DEBUG=payload:*
PAYLOAD_LOG_LEVEL=debug
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Admin routes group
│   │   ├── admin/[[...segments]]/
│   │   │   ├── page.tsx         # Admin panel main page
│   │   │   └── not-found.tsx    # Admin 404 page
│   │   ├── api/                 # API routes
│   │   │   ├── [...slug]/       # PayloadCMS REST API
│   │   │   ├── graphql/         # GraphQL endpoint
│   │   │   └── graphql-playground/ # GraphQL playground
│   │   ├── layout.tsx           # Admin layout
│   │   └── custom.scss          # Admin custom styles
│   ├── (frontend)/              # Frontend routes group
│   │   ├── components/          # React components
│   │   │   ├── home/           # Homepage components
│   │   │   │   ├── sections/   # Homepage sections
│   │   │   │   ├── types/      # TypeScript types
│   │   │   │   └── utils/      # Utility functions
│   │   │   └── navbar.tsx      # Navigation component
│   │   ├── berita/             # News pages
│   │   ├── program/            # Programs pages
│   │   ├── kontak/             # Contact pages
│   │   ├── tanya-ai/           # AI chat pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Frontend layout
│   │   └── globals.css         # Global styles
│   └── my-route/               # Custom API routes
├── collections/                 # PayloadCMS collections
│   ├── Users.ts                # User management
│   ├── Media.ts                # File uploads
│   ├── News.ts                 # News articles
│   ├── Events.ts               # School events
│   ├── Departments.ts          # Academic departments
│   ├── Teachers.ts             # Faculty information
│   ├── Achievements.ts         # School achievements
│   ├── Extracurriculars.ts     # Extracurricular activities
│   ├── Gallery.ts              # Photo gallery
│   ├── Partners.ts             # Industry partners
│   ├── Documents.ts            # Document management
│   ├── Announcements.ts        # School announcements
│   ├── OrganizationStructure.ts # Organization chart
│   ├── SchoolProfile.ts        # School profile (global)
│   ├── VisionMission.ts        # Vision & mission (global)
│   ├── AboutPage.ts            # About page content (global)
│   ├── ContactInfo.ts          # Contact information (global)
│   └── SocialMedia.ts          # Social media links (global)
├── payload.config.ts           # PayloadCMS configuration
└── payload-types.ts            # Generated TypeScript types
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + PostCSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend**: PayloadCMS 3 + Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: PayloadCMS Auth (JWT)
- **API**: REST + GraphQL

### Design Patterns

#### 1. Route Groups
```typescript
// (admin) dan (frontend) untuk memisahkan concern
app/
├── (admin)/     # Admin-only routes
└── (frontend)/  # Public-facing routes
```

#### 2. Component Architecture
```typescript
// Atomic Design Pattern
components/
├── atoms/       # Basic building blocks
├── molecules/   # Simple component combinations
├── organisms/   # Complex UI components
└── templates/   # Page-level components
```

#### 3. Collection-based CMS
```typescript
// Modular collection structure
collections/
├── core/        # Essential collections (Users, Media)
├── academic/    # School-related collections
├── content/     # Content management collections
└── institutional/ # Administrative collections
```

## 📝 Coding Standards

### TypeScript

```typescript
// Always use interface for object types
interface NewsItem {
  id: string
  title: string
  slug: string
  content: string
  publishDate: Date
  author: User
}

// Use type for unions and primitives
type Status = 'draft' | 'published' | 'archived'
type ID = string

// Prefer const assertions
const CATEGORIES = ['academic', 'event', 'achievement'] as const
type Category = typeof CATEGORIES[number]

// Use generic types appropriately
interface ApiResponse<T> {
  docs: T[]
  totalDocs: number
  hasNextPage: boolean
}
```

### React Components

```tsx
// Functional components with TypeScript
interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage
}) => {
  return (
    <section className="hero-section">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  )
}

// Use default export for page components
export default function HomePage() {
  return <div>Homepage content</div>
}
```

### CSS/Tailwind

```css
/* Use CSS custom properties for themes */
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;
}

.dark {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-accent: #fbbf24;
}

/* Prefer Tailwind utilities */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors;
}
```

### Naming Conventions

```typescript
// Files and folders: kebab-case
hero-section.tsx
contact-info.ts
school-profile.ts

// Components: PascalCase
export const HeroSection = () => {}
export const ContactForm = () => {}

// Variables and functions: camelCase
const newsItems = []
const fetchNews = async () => {}

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = '/api'
const MAX_FILE_SIZE = 1024 * 1024

// Types and interfaces: PascalCase
interface NewsItem {}
type Status = 'active' | 'inactive'
```

## 🔧 Development Workflow

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/news-management

# 2. Make changes and commit frequently
git add .
git commit -m "feat: add news creation form"

# 3. Push and create PR
git push origin feature/news-management

# 4. After review, merge to main
git checkout main
git pull origin main
git merge feature/news-management
```

### Commit Message Convention

```
type(scope): description

Types:
- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting, missing semicolons, etc.
- refactor: code refactoring
- test: adding missing tests
- chore: maintenance tasks

Examples:
feat(news): add news filtering by category
fix(auth): resolve login redirect issue
docs(api): update GraphQL documentation
style(components): format hero section code
refactor(collections): optimize news collection schema
test(api): add news API endpoint tests
chore(deps): update dependencies to latest versions
```

### Branch Naming

```
feature/description     # New features
bugfix/description      # Bug fixes
hotfix/description      # Critical fixes
refactor/description    # Code refactoring
docs/description        # Documentation updates

Examples:
feature/news-management
bugfix/navbar-mobile-issue
hotfix/security-vulnerability
refactor/component-structure
docs/api-documentation
```

## 🧪 Testing

### Setup Testing Framework

```bash
# Install testing dependencies
pnpm add -D jest @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event jest-environment-jsdom
```

### Component Testing

```typescript
// __tests__/components/HeroSection.test.tsx
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/home/sections/HeroSection'

describe('HeroSection', () => {
  it('renders hero title', () => {
    render(<HeroSection />)
    
    const heading = screen.getByRole('heading', {
      name: /selamat datang di smkn 1 adiwerna/i
    })
    
    expect(heading).toBeInTheDocument()
  })

  it('has registration link', () => {
    render(<HeroSection />)
    
    const regLink = screen.getByRole('link', { name: /daftar sekarang/i })
    expect(regLink).toHaveAttribute('href', '/pendaftaran')
  })
})
```

### API Testing

```typescript
// __tests__/api/news.test.ts
import { GET } from '@/app/api/news/route'
import { NextRequest } from 'next/server'

describe('/api/news', () => {
  it('returns news list', async () => {
    const request = new NextRequest('http://localhost:3000/api/news')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('docs')
    expect(Array.isArray(data.docs)).toBe(true)
  })
})
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test HeroSection.test.tsx
```

## 📦 Component Development

### Creating New Components

```bash
# Create component structure
mkdir -p src/components/shared/NewsCard
cd src/components/shared/NewsCard

# Create files
touch index.tsx
touch NewsCard.stories.tsx
touch NewsCard.test.tsx
touch README.md
```

### Component Template

```tsx
// src/components/shared/NewsCard/index.tsx
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

interface NewsCardProps {
  news: {
    id: string
    title: string
    slug: string
    excerpt: string
    featuredImage?: {
      url: string
      alt: string
    }
    publishDate: string
    author: {
      email: string
    }
  }
  className?: string
}

export const NewsCard: React.FC<NewsCardProps> = ({ 
  news, 
  className = '' 
}) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {news.featuredImage && (
        <div className="aspect-video relative">
          <Image
            src={news.featuredImage.url}
            alt={news.featuredImage.alt}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          <Link 
            href={`/berita/${news.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {news.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(news.publishDate).toLocaleDateString('id-ID')}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {news.author.email}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default NewsCard
```

### Storybook Stories

```tsx
// src/components/shared/NewsCard/NewsCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { NewsCard } from './index'

const meta: Meta<typeof NewsCard> = {
  title: 'Components/NewsCard',
  component: NewsCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    news: {
      id: '1',
      title: 'Prestasi Siswa SMKN 1 Adiwerna di Lomba Programming',
      slug: 'prestasi-siswa-lomba-programming',
      excerpt: 'Tim programming SMKN 1 Adiwerna berhasil meraih juara 1 dalam kompetisi programming tingkat nasional.',
      featuredImage: {
        url: '/media/news-example.jpg',
        alt: 'Prestasi Programming'
      },
      publishDate: '2024-01-15T10:00:00.000Z',
      author: {
        email: 'admin@smkn1adiwerna.com'
      }
    }
  }
}

export const WithoutImage: Story = {
  args: {
    news: {
      id: '2',
      title: 'Pengumuman Penerimaan Siswa Baru Tahun 2024',
      slug: 'pengumuman-psb-2024',
      excerpt: 'Pendaftaran siswa baru tahun ajaran 2024/2025 akan dibuka mulai tanggal 1 Februari 2024.',
      publishDate: '2024-01-10T08:00:00.000Z',
      author: {
        email: 'humas@smkn1adiwerna.com'
      }
    }
  }
}
```

## 🗄️ Database Development

### Collection Schema Design

```typescript
// src/collections/News.ts
import { CollectionConfig } from 'payload'

const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', 'status'],
    group: 'Content',
  },
  access: {
    read: ({ req }) => {
      // Public can read published news
      if (req.user) return true
      return {
        status: { equals: 'published' },
        publishDate: { less_than_equal: new Date().toISOString() }
      }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 120,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (typeof value === 'string') return value
            return slugify(siblingData.title)
          }
        ]
      }
    },
    // ... more fields
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.author = req.user.id
        }
        return data
      }
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create' && doc.status === 'published') {
          // Send notifications, update cache, etc.
          await notifySubscribers(doc)
        }
      }
    ]
  }
}
```

### Database Relationships

```typescript
// One-to-Many relationship
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  required: true,
}

// Many-to-Many relationship
{
  name: 'relatedNews',
  type: 'relationship',
  relationTo: 'news',
  hasMany: true,
  filterOptions: ({ id }) => ({
    id: { not_equals: id }
  })
}

// Polymorphic relationship
{
  name: 'relatedContent',
  type: 'relationship',
  relationTo: ['news', 'events', 'achievements'],
  hasMany: true,
}
```

### Data Validation

```typescript
// Custom validation
{
  name: 'email',
  type: 'text',
  validate: (value) => {
    if (!value) return 'Email is required'
    if (!isValidEmail(value)) return 'Please enter a valid email'
    return true
  }
}

// Conditional fields
{
  name: 'eventDetails',
  type: 'group',
  admin: {
    condition: (data) => data.category === 'event'
  },
  fields: [
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    }
  ]
}
```

## 🎨 UI/UX Development

### Theme Implementation

```typescript
// src/lib/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    school: {
      blue: '#1e40af',
      yellow: '#fbbf24',
      green: '#10b981',
    }
  },
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  spacing: {
    section: '5rem',
    container: '1.5rem',
  }
}
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
">
  {/* Content */}
</div>

// Responsive text
<h1 className="
  text-2xl 
  md:text-3xl 
  lg:text-4xl 
  xl:text-5xl 
  font-bold
">
  Responsive Title
</h1>
```

### Animation Guidelines

```tsx
// Consistent animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Usage
<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
  {items.map((item, index) => (
    <motion.div key={index} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 🚀 Performance Optimization

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Responsive images
<Image
  src="/hero-image.jpg"
  alt="Hero background"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false // Disable SSR if needed
})

// Route-based code splitting (automatic with App Router)
// Each page.tsx automatically creates a separate chunk
```

### Bundle Analysis

```bash
# Analyze bundle size
pnpm build
pnpm bundle-analyzer

# Check performance
pnpm audit
pnpm ls --depth=0
```

## 🔍 Debugging

### Development Tools

```typescript
// Debug environment variables
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URI: process.env.DATABASE_URI?.replace(/\/\/.*@/, '//***@'),
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? '***' : 'NOT_SET'
})

// PayloadCMS debug
const payload = await getPayload({
  config: configPromise,
  logger: console, // Enable detailed logging
})
```

### Error Boundaries

```tsx
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Logging

```typescript
// src/lib/logger.ts
interface LogLevel {
  ERROR: 0
  WARN: 1
  INFO: 2
  DEBUG: 3
}

class Logger {
  private level: number

  constructor(level: keyof LogLevel = 'INFO') {
    this.level = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 }[level]
  }

  error(message: string, ...args: any[]) {
    if (this.level >= 0) console.error(`[ERROR] ${message}`, ...args)
  }

  warn(message: string, ...args: any[]) {
    if (this.level >= 1) console.warn(`[WARN] ${message}`, ...args)
  }

  info(message: string, ...args: any[]) {
    if (this.level >= 2) console.info(`[INFO] ${message}`, ...args)
  }

  debug(message: string, ...args: any[]) {
    if (this.level >= 3) console.debug(`[DEBUG] ${message}`, ...args)
  }
}

export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? 'DEBUG' : 'INFO'
)
```

## 📚 Best Practices

### Security

```typescript
// Sanitize user input
import DOMPurify from 'dompurify'

const sanitizedContent = DOMPurify.sanitize(userInput)

// Validate API inputs
import { z } from 'zod'

const NewsSchema = z.object({
  title: z.string().min(1).max(120),
  content: z.string().min(1),
  category: z.enum(['academic', 'event', 'achievement']),
})

// Environment validation
const envSchema = z.object({
  DATABASE_URI: z.string().url(),
  PAYLOAD_SECRET: z.string().min(32),
})

const env = envSchema.parse(process.env)
```

### Performance

```typescript
// Memoization for expensive calculations
import { useMemo } from 'react'

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processExpensiveOperation(item))
  }, [data])

  return <div>{/* Render processed data */}</div>
}

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window'

const LargeList = ({ items }) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={100}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index].title}
      </div>
    )}
  </List>
)
```

### Accessibility

```tsx
// Semantic HTML
<main role="main">
  <article>
    <header>
      <h1>Article Title</h1>
      <time dateTime="2024-01-15">15 Januari 2024</time>
    </header>
    <section>
      <p>Article content...</p>
    </section>
  </article>
</main>

// Keyboard navigation
<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Click me
</button>

// Screen reader support
<img 
  src="/image.jpg" 
  alt="Descriptive text for screen readers"
  role="img"
/>

<label htmlFor="search-input">
  Search news
</label>
<input 
  id="search-input"
  type="search"
  aria-describedby="search-help"
/>
<div id="search-help">
  Enter keywords to search for news articles
</div>
```

## 🤝 Contributing

### Pull Request Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/SMKN-1-Adiwerna.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push & Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Code Review**
   - Address feedback
   - Ensure tests pass
   - Update if needed

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log statements in production code
- [ ] Accessibility considerations addressed
- [ ] Performance impact considered
- [ ] Security implications reviewed

### Release Process

```bash
# 1. Update version
npm version patch|minor|major

# 2. Generate changelog
git log --oneline --decorate

# 3. Create release
git tag v1.0.0
git push origin v1.0.0

# 4. Deploy
pnpm build
pnpm deploy
```

---

**👨‍💻 Happy Coding!** Gunakan panduan ini untuk berkontribusi pada pengembangan website SMKN 1 Adiwerna.

