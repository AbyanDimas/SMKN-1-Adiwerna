# 📱 API Documentation - SMKN 1 Adiwerna

Dokumentasi lengkap API endpoints untuk website SMKN 1 Adiwerna.

## 📋 Daftar Isi

- [📱 API Documentation - SMKN 1 Adiwerna](#-api-documentation---smkn-1-adiwerna)
  - [📋 Daftar Isi](#-daftar-isi)
  - [🌐 Base URLs](#-base-urls)
  - [🔐 Authentication](#-authentication)
  - [📊 Collections API](#-collections-api)
  - [🌍 Globals API](#-globals-api)
  - [🔍 GraphQL API](#-graphql-api)
  - [📄 Response Formats](#-response-formats)
  - [⚠️ Error Handling](#️-error-handling)
  - [💻 SDK Usage](#-sdk-usage)
  - [📚 Examples](#-examples)

## 🌐 Base URLs

```
Development: http://localhost:3000/api
Production:  https://smkn1adiwerna.com/api
```

## 🔐 Authentication

### Admin Authentication

```javascript
// Login
POST /api/users/login
{
  "email": "admin@smkn1adiwerna.com",
  "password": "password"
}

// Response
{
  "message": "Auth Passed",
  "user": {
    "id": "user_id",
    "email": "admin@smkn1adiwerna.com",
    "roles": ["admin"]
  },
  "token": "jwt_token",
  "exp": 1640995200
}
```

### Using JWT Token

```javascript
// Headers for authenticated requests
{
  "Authorization": "JWT your_jwt_token_here"
}
```

### Logout

```javascript
POST /api/users/logout
// Headers: Authorization: JWT token
```

## 📊 Collections API

### 📰 News Collection

#### Get All News

```http
GET /api/news?limit=10&page=1&sort=-publishDate
```

**Query Parameters:**
- `limit` (number): Items per page (default: 10)
- `page` (number): Page number (default: 1)
- `sort` (string): Sort field with direction (`-publishDate` for desc)
- `where` (object): Query conditions
- `depth` (number): Population depth (default: 1)

**Response:**
```json
{
  "docs": [
    {
      "id": "news_id",
      "title": "Judul Berita",
      "slug": "judul-berita",
      "content": "...",
      "excerpt": "Ringkasan berita",
      "featuredImage": {
        "id": "image_id",
        "url": "/media/image.jpg",
        "alt": "Image description"
      },
      "publishDate": "2024-01-15T10:00:00.000Z",
      "category": "academic",
      "isFeatured": true,
      "status": "published",
      "author": {
        "id": "user_id",
        "email": "author@smkn1adiwerna.com"
      },
      "createdAt": "2024-01-15T09:00:00.000Z",
      "updatedAt": "2024-01-15T09:30:00.000Z"
    }
  ],
  "totalDocs": 25,
  "limit": 10,
  "page": 1,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPrevPage": false,
  "nextPage": 2,
  "prevPage": null
}
```

#### Get News by ID

```http
GET /api/news/{id}
```

#### Get News by Slug

```http
GET /api/news/slug/{slug}
```

#### Create News (Auth Required)

```http
POST /api/news
Content-Type: application/json
Authorization: JWT token

{
  "title": "Judul Berita Baru",
  "slug": "judul-berita-baru",
  "content": "Konten berita lengkap...",
  "excerpt": "Ringkasan berita",
  "featuredImage": "image_id",
  "category": "academic",
  "publishDate": "2024-01-15T10:00:00.000Z",
  "status": "published",
  "isFeatured": false
}
```

#### Update News (Auth Required)

```http
PATCH /api/news/{id}
Content-Type: application/json
Authorization: JWT token

{
  "title": "Judul yang Diupdate",
  "status": "published"
}
```

#### Delete News (Auth Required)

```http
DELETE /api/news/{id}
Authorization: JWT token
```

### 🏛️ Departments Collection

#### Get All Departments

```http
GET /api/departments
```

**Response:**
```json
{
  "docs": [
    {
      "id": "dept_id",
      "name": "Teknik Komputer dan Jaringan",
      "slug": "tkj",
      "description": "Deskripsi jurusan TKJ",
      "featuredImage": {
        "url": "/media/tkj.jpg",
        "alt": "TKJ Department"
      },
      "headOfDepartment": {
        "name": "Budi Santoso, S.Kom",
        "title": "Kepala Jurusan TKJ",
        "bio": "Pengalaman mengajar 15 tahun",
        "email": "budi@smkn1adiwerna.com"
      },
      "programs": [
        {
          "programName": "Administrasi Sistem Jaringan",
          "programDescription": "Mengelola infrastruktur jaringan"
        }
      ],
      "contactInformation": {
        "email": "tkj@smkn1adiwerna.com",
        "phone": "+62-123-456-7890"
      }
    }
  ]
}
```

### 👨‍🏫 Teachers Collection

#### Get All Teachers

```http
GET /api/teachers?populate=photo
```

**Response:**
```json
{
  "docs": [
    {
      "id": "teacher_id",
      "name": "Dr. Ahmad Wijaya",
      "position": "Guru Matematika",
      "bio": "Pengalaman mengajar 20 tahun",
      "photo": {
        "url": "/media/teacher.jpg",
        "alt": "Dr. Ahmad Wijaya"
      },
      "subjects": [
        {"subject": "Matematika"},
        {"subject": "Fisika"}
      ],
      "education": [
        {
          "degree": "S3 Pendidikan Matematika",
          "institution": "Universitas Indonesia"
        }
      ]
    }
  ]
}
```

### 🏆 Achievements Collection

#### Get All Achievements

```http
GET /api/achievements?sort=-date&limit=5
```

### 📅 Events Collection

#### Get Upcoming Events

```http
GET /api/events?where[startDate][greater_than_equal]=2024-01-15
```

### 🎭 Extracurriculars Collection

#### Get All Extracurriculars

```http
GET /api/extracurriculars
```

### 🤝 Partners Collection

#### Get All Partners

```http
GET /api/partners
```

### 📁 Media Collection

#### Upload Media

```http
POST /api/media
Content-Type: multipart/form-data
Authorization: JWT token

// Form data
file: [binary file]
alt: "Image description"
```

**Response:**
```json
{
  "doc": {
    "id": "media_id",
    "filename": "image.jpg",
    "mimeType": "image/jpeg",
    "filesize": 128950,
    "width": 1920,
    "height": 1080,
    "url": "/media/image.jpg",
    "alt": "Image description",
    "sizes": {
      "thumbnail": {
        "url": "/media/image-400x300.jpg",
        "width": 400,
        "height": 300
      },
      "medium": {
        "url": "/media/image-768x576.jpg",
        "width": 768,
        "height": 576
      }
    }
  }
}
```

## 🌍 Globals API

### 🏫 School Profile

```http
GET /api/globals/school-profile
```

**Response:**
```json
{
  "schoolName": "SMK Negeri 1 Adiwerna",
  "address": "Jl. Raya Adiwerna, Tegal, Jawa Tengah",
  "phone": "+62-283-123456",
  "email": "info@smkn1adiwerna.sch.id",
  "establishedYear": 1985,
  "accreditation": "A",
  "principalName": "Drs. Sutomo, M.Pd",
  "studentCount": 1200,
  "teacherCount": 85,
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

### 🎯 Vision Mission

```http
GET /api/globals/vision-mission
```

**Response:**
```json
{
  "vision": "Menjadi SMK unggul yang menghasilkan lulusan berkarakter...",
  "mission": [
    "Menyelenggarakan pendidikan yang berkualitas",
    "Mengembangkan keterampilan sesuai kebutuhan industri",
    "Membangun karakter siswa yang berakhlak mulia"
  ],
  "objectives": [
    "Meningkatkan kualitas pembelajaran",
    "Memperkuat kerjasama dengan industri"
  ]
}
```

### 📞 Contact Info

```http
GET /api/globals/contact-info
```

**Response:**
```json
{
  "address": "Jl. Raya Adiwerna No. 123, Tegal, Jawa Tengah 52194",
  "phone": "+62-283-123456",
  "fax": "+62-283-123457",
  "email": "info@smkn1adiwerna.sch.id",
  "website": "https://smkn1adiwerna.sch.id",
  "officeHours": "Senin - Jumat: 07:00 - 16:00",
  "maps": {
    "latitude": -6.8781,
    "longitude": 109.1234,
    "embedUrl": "https://maps.google.com/embed?..."
  }
}
```

### 📱 Social Media

```http
GET /api/globals/social-media
```

**Response:**
```json
{
  "facebook": "https://facebook.com/smkn1adiwerna",
  "instagram": "https://instagram.com/smkn1adiwerna",
  "youtube": "https://youtube.com/@smkn1adiwerna",
  "twitter": "https://twitter.com/smkn1adiwerna",
  "linkedin": "https://linkedin.com/school/smkn1adiwerna",
  "tiktok": "https://tiktok.com/@smkn1adiwerna"
}
```

## 🔍 GraphQL API

### Endpoint

```
POST /api/graphql
```

### Sample Queries

#### Get Published News with Featured Image

```graphql
query GetPublishedNews($limit: Int = 10) {
  News(
    where: { status: { equals: published } }
    limit: $limit
    sort: "-publishDate"
  ) {
    docs {
      id
      title
      slug
      excerpt
      publishDate
      category
      isFeatured
      featuredImage {
        url
        alt
        width
        height
      }
      author {
        email
      }
    }
    totalDocs
    hasNextPage
  }
}
```

#### Get Department with Programs

```graphql
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
        email
      }
      programs {
        programName
        programDescription
        programImage {
          url
          alt
        }
      }
      industryPartners {
        partnerName
        partnerLogo {
          url
          alt
        }
        collaborationDetails
      }
    }
  }
}
```

#### Get School Statistics

```graphql
query GetSchoolStats {
  SchoolProfile {
    studentCount
    teacherCount
    establishedYear
  }
  
  News(where: { status: { equals: published } }) {
    totalDocs
  }
  
  Achievements {
    totalDocs
  }
  
  Partners {
    totalDocs
  }
}
```

### GraphQL Playground

Visit `/api/graphql-playground` for interactive GraphQL exploration.

## 📄 Response Formats

### Success Response

```json
{
  "docs": [...],  // For collections
  "doc": {...},   // For single document
  "totalDocs": 25,
  "limit": 10,
  "page": 1,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

### Error Response

```json
{
  "errors": [
    {
      "message": "Authentication failed",
      "code": "UNAUTHORIZED"
    }
  ]
}
```

## ⚠️ Error Handling

### HTTP Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **422** - Validation Error
- **500** - Internal Server Error

### Common Error Messages

```json
// Validation Error
{
  "errors": [
    {
      "message": "The following field is invalid: title",
      "field": "title",
      "value": ""
    }
  ]
}

// Authentication Error
{
  "errors": [
    {
      "message": "You must be logged in to perform this action."
    }
  ]
}

// Not Found Error
{
  "errors": [
    {
      "message": "The requested resource was not found."
    }
  ]
}
```

## 💻 SDK Usage

### JavaScript/TypeScript

```javascript
// Install payload SDK (if available)
// npm install payload

// Basic usage
const payload = require('payload')

// Get news
const news = await payload.find({
  collection: 'news',
  where: {
    status: {
      equals: 'published'
    }
  },
  limit: 10,
  sort: '-publishDate'
})

// Create news (authenticated)
const newArticle = await payload.create({
  collection: 'news',
  data: {
    title: 'New Article',
    content: 'Article content...',
    status: 'published'
  }
})
```

### Fetch API

```javascript
// Get news
const response = await fetch('/api/news?limit=5&sort=-publishDate')
const data = await response.json()

// Create news (with authentication)
const response = await fetch('/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`
  },
  body: JSON.stringify({
    title: 'New Article',
    content: 'Content...',
    status: 'published'
  })
})
```

### Axios

```javascript
import axios from 'axios'

// Setup axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Authorization': `JWT ${localStorage.getItem('token')}`
  }
})

// Get departments
const departments = await api.get('/departments')

// Create achievement
const achievement = await api.post('/achievements', {
  title: 'Juara 1 Lomba Coding',
  description: 'Tim programming sekolah meraih juara 1',
  category: 'academic',
  date: '2024-01-15'
})
```

## 📚 Examples

### Frontend Integration

```jsx
// React component example
import { useState, useEffect } from 'react'

function NewsSection() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news?limit=5&where[isFeatured][equals]=true')
        const data = await response.json()
        setNews(data.docs)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="news-section">
      {news.map(article => (
        <article key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <img src={article.featuredImage?.url} alt={article.featuredImage?.alt} />
          <time>{new Date(article.publishDate).toLocaleDateString('id-ID')}</time>
        </article>
      ))}
    </div>
  )
}
```

### Search Implementation

```javascript
// Search functionality
async function searchContent(query) {
  const searchPromises = [
    // Search in news
    fetch(`/api/news?where[or][0][title][contains]=${query}&where[or][1][content][contains]=${query}`),
    
    // Search in events
    fetch(`/api/events?where[title][contains]=${query}`),
    
    // Search in achievements
    fetch(`/api/achievements?where[title][contains]=${query}`)
  ]

  const [newsRes, eventsRes, achievementsRes] = await Promise.all(searchPromises)
  
  const results = {
    news: (await newsRes.json()).docs,
    events: (await eventsRes.json()).docs,
    achievements: (await achievementsRes.json()).docs
  }

  return results
}
```

### Pagination Helper

```javascript
// Pagination utility
class PaginationHelper {
  constructor(collection, baseUrl = '/api') {
    this.collection = collection
    this.baseUrl = baseUrl
  }

  async getPage(page = 1, limit = 10, filters = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    })

    const response = await fetch(`${this.baseUrl}/${this.collection}?${params}`)
    return await response.json()
  }

  async getAll(filters = {}) {
    let allItems = []
    let page = 1
    let hasNextPage = true

    while (hasNextPage) {
      const data = await this.getPage(page, 100, filters)
      allItems = [...allItems, ...data.docs]
      hasNextPage = data.hasNextPage
      page++
    }

    return allItems
  }
}

// Usage
const newsHelper = new PaginationHelper('news')
const featuredNews = await newsHelper.getPage(1, 5, { 'where[isFeatured][equals]': 'true' })
```

---

**📱 API Documentation Complete!** Gunakan dokumentasi ini sebagai referensi untuk integrasi dengan website SMKN 1 Adiwerna.

