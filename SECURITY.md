# 🔒 Security Guide - SMKN 1 Adiwerna

Panduan keamanan lengkap untuk website SMKN 1 Adiwerna yang mencakup best practices, vulnerability management, dan incident response.

## 📋 Daftar Isi

- [🔒 Security Guide - SMKN 1 Adiwerna](#-security-guide---smkn-1-adiwerna)
  - [📋 Daftar Isi](#-daftar-isi)
  - [🛡️ Security Overview](#️-security-overview)
  - [🔐 Authentication & Authorization](#-authentication--authorization)
  - [🔑 Environment Security](#-environment-security)
  - [🌐 API Security](#-api-security)
  - [💾 Database Security](#-database-security)
  - [📤 File Upload Security](#-file-upload-security)
  - [🔍 Input Validation](#-input-validation)
  - [🚨 Security Headers](#-security-headers)
  - [🛠️ Development Security](#️-development-security)
  - [🚀 Production Security](#-production-security)
  - [📊 Security Monitoring](#-security-monitoring)
  - [🚨 Vulnerability Reporting](#-vulnerability-reporting)
  - [📚 Security Checklist](#-security-checklist)
  - [🔄 Security Updates](#-security-updates)

## 🛡️ Security Overview

### Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal access rights for users and processes
3. **Zero Trust**: Never trust, always verify
4. **Fail Secure**: System fails in a secure state
5. **Security by Design**: Built-in security from the start

### Threat Model

#### Assets
- Student and staff personal data
- Academic records and documents
- School administrative information
- Media files and galleries
- System credentials and secrets

#### Threats
- **External Attackers**: SQL injection, XSS, CSRF
- **Insider Threats**: Unauthorized access by staff
- **Data Breaches**: Exposure of sensitive information
- **Service Disruption**: DDoS attacks, system failures
- **Social Engineering**: Phishing and impersonation

#### Attack Vectors
- Web application vulnerabilities
- Weak authentication mechanisms
- Insecure direct object references
- Unvalidated inputs and outputs
- Misconfigured security settings

## 🔐 Authentication & Authorization

### JWT Security

```typescript
// Strong JWT configuration
const jwtConfig = {
  secret: process.env.PAYLOAD_SECRET, // Minimum 32 characters
  expiresIn: '15m', // Short expiration time
  issuer: 'smkn1-adiwerna',
  audience: 'smkn1-adiwerna-users',
  algorithm: 'HS256'
}

// Secure token generation
import crypto from 'crypto'

const generateSecureSecret = (): string => {
  return crypto.randomBytes(64).toString('hex')
}

// Token validation middleware
const validateToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, process.env.PAYLOAD_SECRET!)
    return true
  } catch (error) {
    logger.warn('Invalid token attempt', { error: error.message })
    return false
  }
}
```

### Password Security

```typescript
// Password requirements
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true
}

// Password validation
const validatePassword = (password: string): { valid: boolean, errors: string[] } => {
  const errors: string[] = []
  
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`)
  }
  
  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(`Password must not exceed ${PASSWORD_REQUIREMENTS.maxLength} characters`)
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return { valid: errors.length === 0, errors }
}

// Password hashing (PayloadCMS handles this automatically)
// But for custom implementations:
import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12 // Increase for better security
  return await bcrypt.hash(password, saltRounds)
}
```

### Role-Based Access Control

```typescript
// User roles hierarchy
enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STAFF = 'staff',
  STUDENT = 'student'
}

// Permission matrix
const PERMISSIONS = {
  [UserRole.SUPER_ADMIN]: ['*'], // All permissions
  [UserRole.ADMIN]: [
    'users:read', 'users:create', 'users:update',
    'news:*', 'events:*', 'departments:*',
    'teachers:*', 'students:*'
  ],
  [UserRole.TEACHER]: [
    'news:read', 'news:create',
    'students:read', 'achievements:create'
  ],
  [UserRole.STAFF]: [
    'news:read', 'events:read',
    'announcements:create'
  ],
  [UserRole.STUDENT]: [
    'news:read', 'events:read',
    'gallery:read'
  ]
}

// Authorization middleware
const authorize = (requiredPermissions: string[]) => {
  return (req: any, res: any, next: any) => {
    const userRole = req.user?.role
    const userPermissions = PERMISSIONS[userRole] || []
    
    const hasPermission = requiredPermissions.every(permission => {
      return userPermissions.includes('*') || 
             userPermissions.includes(permission) ||
             userPermissions.some(p => p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
    })
    
    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    
    next()
  }
}
```

### Session Security

```typescript
// Secure session configuration
const sessionConfig = {
  name: 'smkn1-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'strict' as const // CSRF protection
  },
  rolling: true // Reset expiration on activity
}

// Session cleanup
const cleanupExpiredSessions = async () => {
  // Implement session cleanup logic
  // Remove expired sessions from storage
}

// Rate limiting for login attempts
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit exceeded for login', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    })
    res.status(429).json({ error: 'Too many login attempts' })
  }
})
```

## 🔑 Environment Security

### Environment Variables

```bash
# .env.example with security comments
# Database
DATABASE_URI=mongodb://127.0.0.1/your-database-name
# ⚠️ Use strong authentication in production
# mongodb://username:password@host:port/database

# PayloadCMS Secrets
PAYLOAD_SECRET=YOUR_SECRET_HERE
# 🔒 MUST be at least 32 characters, randomly generated
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Session Secret
SESSION_SECRET=ANOTHER_SECRET_HERE
# 🔒 Different from PAYLOAD_SECRET, also 32+ characters

# API Keys (if used)
SMTP_PASSWORD=your-smtp-password
# 🔒 Use app-specific passwords, not main account passwords

# Security Headers
SECURITY_KEY=random-security-key
# 🔒 For additional security validations

# Environment
NODE_ENV=development
# 🔒 MUST be 'production' in production environment
```

### Secret Management

```typescript
// Environment validation
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URI: z.string().url(),
  PAYLOAD_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
  SMTP_PASSWORD: z.string().optional(),
})

// Validate on startup
const validateEnvironment = () => {
  try {
    envSchema.parse(process.env)
    logger.info('Environment validation passed')
  } catch (error) {
    logger.error('Environment validation failed', error)
    process.exit(1)
  }
}

// Secret rotation utility
const rotateSecrets = async () => {
  // Implement secret rotation logic
  // Update environment variables
  // Invalidate existing sessions/tokens
  logger.info('Secrets rotated successfully')
}
```

### Production Environment

```bash
# Production .env
NODE_ENV=production
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/smkn1-adiwerna?retryWrites=true&w=majority
PAYLOAD_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
SESSION_SECRET=z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
PAYLOAD_PUBLIC_SERVER_URL=https://smkn1adiwerna.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@smkn1adiwerna.com
SMTP_PASSWORD=app-specific-password
```

## 🌐 API Security

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit'

// Global rate limiting
const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
})

// API-specific rate limiting
const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: 'API rate limit exceeded',
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return req.user?.id || req.ip
  }
})

// Stricter limits for sensitive endpoints
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts'
})
```

### CORS Configuration

```typescript
// Secure CORS setup
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = [
      'https://smkn1adiwerna.com',
      'https://www.smkn1adiwerna.com',
      'https://admin.smkn1adiwerna.com'
    ]
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true)
    
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push('http://localhost:3000')
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      logger.warn('CORS violation', { origin })
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}
```

### API Key Management

```typescript
// API key validation
const validateApiKey = (req: any, res: any, next: any) => {
  const apiKey = req.headers['x-api-key']
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' })
  }
  
  // Validate API key against database
  const isValid = validateApiKeyInDatabase(apiKey)
  
  if (!isValid) {
    logger.warn('Invalid API key attempt', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      apiKey: apiKey.substring(0, 8) + '...' // Log partial key only
    })
    return res.status(401).json({ error: 'Invalid API key' })
  }
  
  next()
}

// API key generation
const generateApiKey = (): string => {
  return 'smkn1_' + crypto.randomBytes(32).toString('hex')
}
```

## 💾 Database Security

### MongoDB Security

```typescript
// Secure connection string
const mongoOptions = {
  authSource: 'admin',
  ssl: true,
  sslValidate: true,
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

// Database access patterns
const secureDbQuery = async (collection: string, query: any, user: any) => {
  // Add user context to all queries
  const secureQuery = {
    ...query,
    // Add tenant isolation if needed
    schoolId: user.schoolId
  }
  
  // Log database access
  logger.info('Database access', {
    collection,
    userId: user.id,
    query: sanitizeQuery(query)
  })
  
  return await db.collection(collection).find(secureQuery)
}
```

### Data Encryption

```typescript
// Field-level encryption for sensitive data
import CryptoJS from 'crypto-js'

const encryptSensitiveField = (data: string): string => {
  const key = process.env.ENCRYPTION_KEY!
  return CryptoJS.AES.encrypt(data, key).toString()
}

const decryptSensitiveField = (encryptedData: string): string => {
  const key = process.env.ENCRYPTION_KEY!
  const bytes = CryptoJS.AES.decrypt(encryptedData, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// Use in PayloadCMS hooks
const Users = {
  fields: [
    {
      name: 'email',
      type: 'text',
      hooks: {
        beforeChange: [
          ({ value }) => {
            // Email is not encrypted but validated
            return value.toLowerCase()
          }
        ]
      }
    },
    {
      name: 'phone',
      type: 'text',
      hooks: {
        beforeChange: [
          ({ value }) => {
            // Encrypt phone numbers
            return value ? encryptSensitiveField(value) : value
          }
        ],
        afterRead: [
          ({ value }) => {
            // Decrypt for authorized users only
            return value ? decryptSensitiveField(value) : value
          }
        ]
      }
    }
  ]
}
```

### Backup Security

```bash
#!/bin/bash
# Secure backup script

# Database backup with encryption
mongodump --uri="$DATABASE_URI" --out="/tmp/backup_$(date +%Y%m%d_%H%M%S)"

# Encrypt backup
tar -czf - "/tmp/backup_$(date +%Y%m%d_%H%M%S)" | \
gpg --cipher-algo AES256 --compress-algo 1 --symmetric \
    --output "/backups/encrypted_backup_$(date +%Y%m%d_%H%M%S).tar.gz.gpg"

# Clean up unencrypted backup
rm -rf "/tmp/backup_$(date +%Y%m%d_%H%M%S)"

# Upload to secure storage
aws s3 cp "/backups/encrypted_backup_$(date +%Y%m%d_%H%M%S).tar.gz.gpg" \
          "s3://smkn1-secure-backups/" \
          --server-side-encryption AES256

# Keep only last 30 days of backups
find /backups -name "encrypted_backup_*.tar.gz.gpg" -mtime +30 -delete
```

## 📤 File Upload Security

### File Validation

```typescript
// Secure file upload configuration
const uploadSecurity = {
  // Allowed file types
  allowedMimeTypes: [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  
  // File size limits (in bytes)
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxImageSize: 5 * 1024 * 1024,  // 5MB for images
  
  // File name restrictions
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.pdf', '.doc', '.docx'],
  
  // Security checks
  scanForMalware: true,
  stripMetadata: true,
  validateImageHeaders: true
}

// File validation function
const validateFile = async (file: any): Promise<{ valid: boolean, errors: string[] }> => {
  const errors: string[] = []
  
  // Check file size
  if (file.size > uploadSecurity.maxFileSize) {
    errors.push(`File size exceeds ${uploadSecurity.maxFileSize / 1024 / 1024}MB limit`)
  }
  
  // Check MIME type
  if (!uploadSecurity.allowedMimeTypes.includes(file.mimetype)) {
    errors.push('File type not allowed')
  }
  
  // Check file extension
  const extension = path.extname(file.originalname).toLowerCase()
  if (!uploadSecurity.allowedExtensions.includes(extension)) {
    errors.push('File extension not allowed')
  }
  
  // Validate file header matches extension
  const isValidHeader = await validateFileHeader(file.buffer, file.mimetype)
  if (!isValidHeader) {
    errors.push('File header does not match declared type')
  }
  
  return { valid: errors.length === 0, errors }
}

// File header validation
const validateFileHeader = async (buffer: Buffer, mimetype: string): Promise<boolean> => {
  const fileTypeFromBuffer = await import('file-type')
  const detectedType = await fileTypeFromBuffer.fileTypeFromBuffer(buffer)
  
  if (!detectedType) return false
  
  const allowedTypes: { [key: string]: string[] } = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'image/gif': ['gif'],
    'application/pdf': ['pdf']
  }
  
  const allowedExtensions = allowedTypes[mimetype] || []
  return allowedExtensions.includes(detectedType.ext)
}
```

### Malware Scanning

```typescript
// Malware scanning with ClamAV
import { NodeClam } from 'clamscan'

const initClamScan = async () => {
  return await new NodeClam().init({
    removeInfected: true,
    quarantineInfected: false,
    scanLog: null,
    debugMode: false,
    fileList: null,
    scanRecursively: true,
    clamdscan: {
      host: 'localhost',
      port: 3310,
      timeout: 60000,
      localFallback: true
    }
  })
}

const scanFile = async (filePath: string): Promise<{ isInfected: boolean, viruses: string[] }> => {
  try {
    const clamscan = await initClamScan()
    const result = await clamscan.scanFile(filePath)
    
    return {
      isInfected: result.isInfected,
      viruses: result.viruses || []
    }
  } catch (error) {
    logger.error('Malware scan failed', { error, filePath })
    // Fail secure - treat as infected if scan fails
    return { isInfected: true, viruses: ['SCAN_FAILED'] }
  }
}
```

### Secure File Storage

```typescript
// Secure file paths
const generateSecureFileName = (originalName: string): string => {
  const timestamp = Date.now()
  const random = crypto.randomBytes(16).toString('hex')
  const extension = path.extname(originalName)
  return `${timestamp}_${random}${extension}`
}

// File upload with security checks
const secureUpload = async (file: any, user: any) => {
  // Validate file
  const validation = await validateFile(file)
  if (!validation.valid) {
    throw new Error(`File validation failed: ${validation.errors.join(', ')}`)
  }
  
  // Generate secure filename
  const secureFileName = generateSecureFileName(file.originalname)
  const filePath = path.join('/secure/uploads', secureFileName)
  
  // Save file temporarily
  await fs.writeFile(filePath, file.buffer)
  
  // Scan for malware
  const scanResult = await scanFile(filePath)
  if (scanResult.isInfected) {
    await fs.unlink(filePath) // Delete infected file
    throw new Error(`File infected with: ${scanResult.viruses.join(', ')}`)
  }
  
  // Strip metadata from images
  if (file.mimetype.startsWith('image/')) {
    await stripImageMetadata(filePath)
  }
  
  // Move to final location
  const finalPath = path.join('/uploads', secureFileName)
  await fs.rename(filePath, finalPath)
  
  // Log upload
  logger.info('File uploaded successfully', {
    userId: user.id,
    fileName: secureFileName,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype
  })
  
  return {
    filename: secureFileName,
    url: `/media/${secureFileName}`,
    size: file.size,
    mimetype: file.mimetype
  }
}
```

## 🔍 Input Validation

### Data Sanitization

```typescript
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import validator from 'validator'

// Create DOMPurify instance
const window = new JSDOM('').window
const purify = DOMPurify(window as any)

// Rich text sanitization
const sanitizeRichText = (html: string): string => {
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  })
}

// Input validation schemas
import { z } from 'zod'

const newsSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(120, 'Title must not exceed 120 characters')
    .refine(val => !/<script|javascript:/i.test(val), 'Invalid characters in title'),
  
  content: z.string()
    .min(1, 'Content is required')
    .transform(sanitizeRichText),
  
  category: z.enum(['academic', 'event', 'achievement', 'announcement', 'general']),
  
  publishDate: z.string()
    .datetime('Invalid date format')
    .refine(val => new Date(val) <= new Date(), 'Publish date cannot be in the future'),
  
  tags: z.array(z.string()
    .min(1, 'Tag cannot be empty')
    .max(50, 'Tag must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Tag contains invalid characters')
  ).max(10, 'Maximum 10 tags allowed')
})

// Validation middleware
const validateInput = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      req.validatedData = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors
        })
      }
      next(error)
    }
  }
}
```

### SQL Injection Prevention

```typescript
// PayloadCMS uses Mongoose which provides automatic protection
// But for custom queries, always use parameterized queries

// Safe database queries
const safeQuery = async (collection: string, filters: any) => {
  // Sanitize filter values
  const sanitizedFilters = Object.keys(filters).reduce((acc, key) => {
    let value = filters[key]
    
    // Escape special MongoDB operators
    if (typeof value === 'string') {
      value = value.replace(/[$]/g, '\\$')
    }
    
    acc[key] = value
    return acc
  }, {} as any)
  
  return await db.collection(collection).find(sanitizedFilters)
}

// Whitelist allowed fields for queries
const allowedQueryFields = {
  news: ['title', 'category', 'status', 'publishDate'],
  users: ['email', 'role', 'isActive'],
  events: ['title', 'startDate', 'endDate', 'location']
}

const validateQueryFields = (collection: string, query: any) => {
  const allowed = allowedQueryFields[collection as keyof typeof allowedQueryFields] || []
  
  for (const field in query) {
    if (!allowed.includes(field)) {
      throw new Error(`Field '${field}' is not allowed for querying`)
    }
  }
}
```

### XSS Prevention

```typescript
// Content Security Policy
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Only for development
    "https://cdn.jsdelivr.net",
    "https://unpkg.com"
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com"
  ],
  fontSrc: [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  imgSrc: [
    "'self'",
    "data:",
    "https:",
    "blob:"
  ],
  connectSrc: [
    "'self'",
    "https://api.smkn1adiwerna.com"
  ],
  mediaSrc: ["'self'"],
  objectSrc: ["'none'"],
  frameSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"]
}

// Apply CSP headers
app.use((req, res, next) => {
  const csp = Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')
  
  res.setHeader('Content-Security-Policy', csp)
  next()
})
```

## 🚨 Security Headers

### HTTP Security Headers

```typescript
// Security headers middleware
const securityHeaders = (req: any, res: any, next: any) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 
    'camera=(), microphone=(), location=(), notifications=()'
  )
  
  // HTTP Strict Transport Security (HTTPS only)
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload'
    )
  }
  
  // Remove server information
  res.removeHeader('X-Powered-By')
  
  next()
}

// HSTS preload for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}
```

### HTTPS Configuration

```nginx
# nginx.conf for HTTPS
server {
    listen 443 ssl http2;
    server_name smkn1adiwerna.com www.smkn1adiwerna.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/smkn1adiwerna.com.crt;
    ssl_certificate_key /etc/ssl/private/smkn1adiwerna.com.key;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Hide server version
    server_tokens off;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🛠️ Development Security

### Secure Development Environment

```bash
# .env.development (example - not to be committed)
NODE_ENV=development
DATABASE_URI=mongodb://127.0.0.1:27017/smkn1-adiwerna-dev
PAYLOAD_SECRET=development-secret-32-chars-min
SESSION_SECRET=another-development-secret-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Development-only settings
DEBUG=payload:*
PAYLOAD_LOG_LEVEL=debug
ENABLE_DEV_TOOLS=true
```

### Code Security Scanning

```json
// package.json security scripts
{
  "scripts": {
    "security:audit": "npm audit --audit-level high",
    "security:fix": "npm audit fix",
    "security:check": "npx audit-ci --config ./audit-ci.json",
    "security:scan": "npx eslint . --ext .ts,.tsx --fix",
    "security:secrets": "npx detect-secrets-hook --baseline .secrets.baseline",
    "security:dependencies": "npx better-npm-audit audit"
  }
}
```

### Git Hooks for Security

```bash
#!/bin/sh
# .git/hooks/pre-commit
# Security checks before commit

echo "Running security checks..."

# Check for secrets
npx detect-secrets-hook --baseline .secrets.baseline

# Check dependencies
npm audit --audit-level high

# Run linting
npm run lint

# Check for sensitive files
if git diff --cached --name-only | grep -E "\.(env|key|pem|p12)$"; then
    echo "❌ Sensitive files detected in commit"
    exit 1
fi

echo "✅ Security checks passed"
```

### Dependency Security

```json
// audit-ci.json
{
  "moderate": true,
  "high": true,
  "critical": true,
  "allowlist": [],
  "registry": "https://registry.npmjs.org/",
  "report-type": "important",
  "package-manager": "npm",
  "path": "./package.json"
}
```

## 🚀 Production Security

### Production Checklist

```bash
# Production security deployment checklist

# 1. Environment Variables
✅ All secrets are randomly generated (32+ chars)
✅ No development secrets in production
✅ Environment variables are properly encrypted at rest
✅ Access to environment variables is logged

# 2. HTTPS/TLS
✅ Valid SSL certificate installed
✅ TLS 1.2+ only
✅ HSTS headers configured
✅ Redirect HTTP to HTTPS

# 3. Security Headers
✅ Content Security Policy configured
✅ X-Frame-Options set to DENY
✅ X-Content-Type-Options set to nosniff
✅ Referrer Policy configured

# 4. Database Security
✅ Database authentication enabled
✅ Database firewall configured
✅ Regular backups with encryption
✅ Backup restoration tested

# 5. Monitoring
✅ Security logging enabled
✅ Intrusion detection configured
✅ Performance monitoring active
✅ Uptime monitoring configured

# 6. Access Control
✅ Admin accounts secured with 2FA
✅ Regular access review conducted
✅ Principle of least privilege applied
✅ Default accounts disabled
```

### Security Configuration

```typescript
// production-security.config.ts
export const productionSecurityConfig = {
  // Rate limiting
  rateLimiting: {
    global: { windowMs: 15 * 60 * 1000, max: 1000 },
    api: { windowMs: 60 * 1000, max: 100 },
    auth: { windowMs: 15 * 60 * 1000, max: 5 }
  },
  
  // Session security
  session: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
    rolling: true
  },
  
  // CORS
  cors: {
    origin: ['https://smkn1adiwerna.com', 'https://www.smkn1adiwerna.com'],
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // File uploads
  uploads: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    virusScanning: true,
    metadataStripping: true
  },
  
  // Logging
  logging: {
    level: 'info',
    logSecurity: true,
    logFailedAuth: true,
    logFileAccess: true
  }
}
```

## 📊 Security Monitoring

### Security Event Logging

```typescript
// Security event logger
import winston from 'winston'

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'smkn1-security' },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/security-error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/security-combined.log' 
    })
  ]
})

// Security event types
enum SecurityEvent {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  FILE_UPLOAD = 'FILE_UPLOAD',
  ADMIN_ACTION = 'ADMIN_ACTION',
  DATA_EXPORT = 'DATA_EXPORT'
}

// Log security events
const logSecurityEvent = (
  event: SecurityEvent, 
  userId: string, 
  details: any, 
  req: any
) => {
  securityLogger.info('Security Event', {
    event,
    userId,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    details: sanitizeLogData(details)
  })
}

// Usage examples
app.post('/api/users/login', async (req, res) => {
  try {
    const user = await authenticateUser(req.body)
    logSecurityEvent(SecurityEvent.LOGIN_SUCCESS, user.id, {}, req)
    res.json({ success: true, user })
  } catch (error) {
    logSecurityEvent(SecurityEvent.LOGIN_FAILED, null, { 
      email: req.body.email,
      error: error.message 
    }, req)
    res.status(401).json({ error: 'Authentication failed' })
  }
})
```

### Intrusion Detection

```typescript
// Simple intrusion detection system
class IntrusionDetector {
  private suspiciousIPs = new Map<string, number>()
  private blockedIPs = new Set<string>()
  
  checkRequest(req: any): boolean {
    const ip = req.ip
    const userAgent = req.get('User-Agent')
    
    // Check for blocked IPs
    if (this.blockedIPs.has(ip)) {
      logSecurityEvent(SecurityEvent.UNAUTHORIZED_ACCESS, null, {
        reason: 'Blocked IP attempted access',
        ip
      }, req)
      return false
    }
    
    // Check for suspicious patterns
    if (this.isSuspiciousRequest(req)) {
      this.recordSuspiciousActivity(ip)
      
      if (this.suspiciousIPs.get(ip)! >= 5) {
        this.blockIP(ip)
        logSecurityEvent(SecurityEvent.SUSPICIOUS_ACTIVITY, null, {
          reason: 'IP blocked due to suspicious activity',
          ip,
          userAgent
        }, req)
        return false
      }
    }
    
    return true
  }
  
  private isSuspiciousRequest(req: any): boolean {
    const suspiciousPatterns = [
      /script.*alert/i,
      /union.*select/i,
      /drop.*table/i,
      /<.*script.*>/i,
      /\.\.\/.*\.\.\//, // Directory traversal
      /\/etc\/passwd/,
      /\/admin/i
    ]
    
    const url = req.url
    const userAgent = req.get('User-Agent') || ''
    const referer = req.get('Referer') || ''
    
    return suspiciousPatterns.some(pattern => 
      pattern.test(url) || 
      pattern.test(userAgent) || 
      pattern.test(referer)
    )
  }
  
  private recordSuspiciousActivity(ip: string) {
    const count = this.suspiciousIPs.get(ip) || 0
    this.suspiciousIPs.set(ip, count + 1)
  }
  
  private blockIP(ip: string) {
    this.blockedIPs.add(ip)
    // Set timeout to unblock after 24 hours
    setTimeout(() => {
      this.blockedIPs.delete(ip)
      this.suspiciousIPs.delete(ip)
    }, 24 * 60 * 60 * 1000)
  }
}

const intrusionDetector = new IntrusionDetector()

// Middleware to check for intrusions
app.use((req, res, next) => {
  if (!intrusionDetector.checkRequest(req)) {
    return res.status(403).json({ error: 'Access denied' })
  }
  next()
})
```

### Security Metrics

```typescript
// Security metrics collection
const securityMetrics = {
  loginAttempts: 0,
  failedLogins: 0,
  blockedRequests: 0,
  fileUploads: 0,
  suspiciousActivity: 0,
  
  // Track metrics
  incrementMetric(metric: keyof typeof securityMetrics) {
    if (typeof this[metric] === 'number') {
      (this[metric] as number)++
    }
  },
  
  // Get metrics for dashboard
  getMetrics() {
    return {
      ...this,
      successRate: this.loginAttempts > 0 ? 
        ((this.loginAttempts - this.failedLogins) / this.loginAttempts * 100).toFixed(2) + '%' :
        'N/A'
    }
  },
  
  // Reset daily metrics
  resetDailyMetrics() {
    this.loginAttempts = 0
    this.failedLogins = 0
    this.blockedRequests = 0
    this.fileUploads = 0
    this.suspiciousActivity = 0
  }
}

// Reset metrics daily
setInterval(() => {
  securityMetrics.resetDailyMetrics()
}, 24 * 60 * 60 * 1000)
```

## 🚨 Vulnerability Reporting

### Responsible Disclosure

**We take security seriously!** If you discover a security vulnerability in the SMKN 1 Adiwerna website, please follow responsible disclosure practices:

#### How to Report

1. **Email**: Send details to `security@smkn1adiwerna.com`
2. **Subject**: `[SECURITY] Vulnerability Report - [Brief Description]`
3. **Encryption**: Use our PGP key for sensitive details (available on request)

#### What to Include

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact and severity assessment
- **Proof of Concept**: Screenshots or code snippets (if applicable)
- **Suggested Fix**: If you have suggestions for fixes
- **Contact Info**: Your preferred contact method for follow-up

#### Example Report

```
Subject: [SECURITY] Vulnerability Report - SQL Injection in News Search

Description:
The news search functionality appears to be vulnerable to SQL injection attacks.

Steps to Reproduce:
1. Navigate to /berita
2. Enter the following in the search box: ' OR 1=1 --
3. Observe that all news articles are returned regardless of search terms

Impact:
This could allow an attacker to:
- Extract sensitive data from the database
- Modify or delete database records
- Potentially gain unauthorized access

Proof of Concept:
[Include screenshot or code snippet]

Suggested Fix:
Use parameterized queries or prepared statements for all database interactions.

Contact: john.doe@example.com
```

#### Our Response Process

1. **Acknowledgment**: Within 24 hours
2. **Initial Assessment**: Within 3 business days
3. **Regular Updates**: Every 5 business days until resolved
4. **Resolution**: Timeline depends on severity
5. **Disclosure**: Coordinated disclosure after fix is deployed

#### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| **Critical** | Remote code execution, data breach | 24 hours |
| **High** | Authentication bypass, privilege escalation | 72 hours |
| **Medium** | XSS, CSRF, information disclosure | 1 week |
| **Low** | Minor information leakage, configuration issues | 2 weeks |

### Security Bounty

While we don't currently offer monetary rewards, we do provide:

- **Recognition**: Public acknowledgment (with your permission)
- **Certificate**: Digital certificate of appreciation
- **Early Access**: Beta access to new features
- **Swag**: SMKN 1 Adiwerna merchandise

### Out of Scope

Please **DO NOT** report:
- Issues in third-party libraries (report to the maintainers)
- Social engineering attempts
- Physical security issues
- Denial of service attacks
- Issues requiring physical access to devices
- Self-XSS that cannot be used to attack other users

### Legal

We commit to:
- Not pursuing legal action against researchers who follow responsible disclosure
- Working with you to understand and resolve issues
- Acknowledging your contribution publicly (if desired)

## 📚 Security Checklist

### Development Security Checklist

- [ ] **Environment Variables**
  - [ ] All secrets are in environment variables, not code
  - [ ] Development secrets are different from production
  - [ ] Secrets are at least 32 characters long
  - [ ] No secrets committed to version control

- [ ] **Authentication & Authorization**
  - [ ] Strong password requirements implemented
  - [ ] JWT tokens have reasonable expiration times
  - [ ] Role-based access control implemented
  - [ ] Session management is secure

- [ ] **Input Validation**
  - [ ] All user inputs are validated
  - [ ] Rich text content is sanitized
  - [ ] SQL injection protection in place
  - [ ] XSS protection implemented

- [ ] **File Uploads**
  - [ ] File type validation implemented
  - [ ] File size limits enforced
  - [ ] Malware scanning enabled
  - [ ] Metadata stripping for images

- [ ] **API Security**
  - [ ] Rate limiting implemented
  - [ ] CORS properly configured
  - [ ] API endpoints require authentication where needed
  - [ ] Sensitive data is not exposed in responses

- [ ] **Security Headers**
  - [ ] Content Security Policy configured
  - [ ] X-Frame-Options set
  - [ ] X-Content-Type-Options set
  - [ ] HSTS enabled for HTTPS

### Production Security Checklist

- [ ] **Infrastructure Security**
  - [ ] HTTPS enabled with valid certificate
  - [ ] TLS 1.2+ only
  - [ ] Server software is up to date
  - [ ] Firewall properly configured

- [ ] **Database Security**
  - [ ] Database authentication enabled
  - [ ] Database firewall configured
  - [ ] Regular backups with encryption
  - [ ] Database logs monitored

- [ ] **Monitoring & Logging**
  - [ ] Security events are logged
  - [ ] Log files are monitored
  - [ ] Intrusion detection system active
  - [ ] Performance monitoring enabled

- [ ] **Access Control**
  - [ ] Admin accounts use strong passwords
  - [ ] Two-factor authentication enabled
  - [ ] Regular access reviews conducted
  - [ ] Default accounts disabled

- [ ] **Compliance**
  - [ ] Privacy policy updated
  - [ ] Data protection measures in place
  - [ ] User consent mechanisms implemented
  - [ ] Data retention policies defined

## 🔄 Security Updates

### Keeping Dependencies Secure

```bash
# Weekly security update routine
npm audit
npm audit fix

# Check for critical vulnerabilities
npm audit --audit-level critical

# Update all dependencies
npm update

# Check for outdated packages
npm outdated
```

### Security Patch Management

```javascript
// automated-security-updates.js
const { execSync } = require('child_process')
const fs = require('fs')

const runSecurityUpdates = () => {
  try {
    // Check for security vulnerabilities
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' })
    const audit = JSON.parse(auditResult)
    
    if (audit.metadata.vulnerabilities.total > 0) {
      console.log(`Found ${audit.metadata.vulnerabilities.total} vulnerabilities`)
      
      // Attempt automatic fix
      execSync('npm audit fix --force')
      
      // Send notification
      sendSecurityNotification(audit.metadata.vulnerabilities)
    }
    
  } catch (error) {
    console.error('Security update failed:', error.message)
  }
}

// Run weekly
setInterval(runSecurityUpdates, 7 * 24 * 60 * 60 * 1000)
```

### Emergency Security Procedures

#### Security Incident Response Plan

1. **Detection** (0-15 minutes)
   - Automated monitoring alerts
   - Manual discovery reporting
   - User reports of suspicious activity

2. **Assessment** (15-30 minutes)
   - Determine severity level
   - Identify affected systems
   - Estimate potential impact

3. **Containment** (30-60 minutes)
   - Isolate affected systems
   - Block malicious traffic
   - Preserve evidence

4. **Eradication** (1-4 hours)
   - Remove malicious code
   - Patch vulnerabilities
   - Update security controls

5. **Recovery** (4-24 hours)
   - Restore from clean backups
   - Gradual system restoration
   - Monitor for recurrence

6. **Lessons Learned** (1-7 days)
   - Document incident details
   - Update security procedures
   - Implement preventive measures

#### Emergency Contacts

```bash
# Emergency Security Contacts
Security Team Lead: security-lead@smkn1adiwerna.com
System Administrator: sysadmin@smkn1adiwerna.com
Principal: principal@smkn1adiwerna.com
IT Support: it-support@smkn1adiwerna.com

# External Contacts
Hosting Provider: support@hosting-provider.com
Domain Registrar: support@domain-registrar.com
SSL Certificate Provider: support@ssl-provider.com
```

---

**🔒 Security is Everyone's Responsibility!** 

This security guide should be reviewed and updated regularly. All team members should be familiar with these security practices and procedures.

**Last Updated**: 2024-01-15  
**Next Review**: 2024-04-15  
**Version**: 1.0

