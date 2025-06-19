# 🚀 Deployment Guide - SMKN 1 Adiwerna

Panduan lengkap untuk deployment website SMKN 1 Adiwerna ke berbagai platform.

## 📋 Daftar Isi

- [🚀 Deployment Guide - SMKN 1 Adiwerna](#-deployment-guide---smkn-1-adiwerna)
  - [📋 Daftar Isi](#-daftar-isi)
  - [🏗️ Persiapan Deployment](#️-persiapan-deployment)
  - [🐳 Docker Deployment](#-docker-deployment)
  - [☁️ Cloud Platform Deployment](#️-cloud-platform-deployment)
  - [🔧 Environment Variables](#-environment-variables)
  - [🗄️ Database Setup](#️-database-setup)
  - [🌐 Domain \& SSL](#-domain--ssl)
  - [📈 Monitoring \& Logging](#-monitoring--logging)

## 🏗️ Persiapan Deployment

### 1. Environment Variables Production

Buat file `.env.production`:

```env
# Database
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/smkn1-adiwerna?retryWrites=true&w=majority

# PayloadCMS
PAYLOAD_SECRET=your-super-secure-production-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
PAYLOAD_PUBLIC_DRAFT_SECRET=your-draft-secret-key

# Environment
NODE_ENV=production
PORT=3000

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Storage (if using cloud storage)
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-1
```

### 2. Build Optimization

Update `next.config.mjs` untuk production:

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Untuk Docker deployment
  experimental: {
    reactCompiler: false
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
    unoptimized: false // Aktifkan optimasi gambar di production
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false
}

export default withPayload(nextConfig)
```

## 🐳 Docker Deployment

### 1. Dockerfile Production

```dockerfile
# Dockerfile
FROM node:22.12.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Docker Compose Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build: .
    container_name: smkn1-adiwerna-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URI=mongodb://mongo:27017/smkn1-adiwerna
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
    depends_on:
      - mongo
    restart: unless-stopped
    networks:
      - app-network

  mongo:
    image: mongo:7.0
    container_name: smkn1-adiwerna-mongo
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
      - MONGO_INITDB_DATABASE=smkn1-adiwerna
    volumes:
      - mongo_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    restart: unless-stopped
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: smkn1-adiwerna-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - app-network

volumes:
  mongo_data:

networks:
  app-network:
    driver: bridge
```

### 3. Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;
        
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;

        client_max_body_size 50M;

        location / {
            proxy_pass http://app;
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
}
```

### 4. Deploy dengan Docker

```bash
# 1. Clone repository
git clone https://github.com/username/SMKN-1-Adiwerna.git
cd SMKN-1-Adiwerna

# 2. Setup environment variables
cp .env.example .env.production
# Edit .env.production dengan nilai production

# 3. Build dan deploy
docker-compose -f docker-compose.prod.yml up -d --build

# 4. Check logs
docker-compose -f docker-compose.prod.yml logs -f

# 5. Setup SSL dengan Let's Encrypt
docker exec -it smkn1-adiwerna-nginx sh
# Install certbot dan setup SSL
```

## ☁️ Cloud Platform Deployment

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Environment Variables di Vercel:**
- `DATABASE_URI`: MongoDB Atlas connection string
- `PAYLOAD_SECRET`: Random secret key
- `PAYLOAD_PUBLIC_SERVER_URL`: https://your-domain.vercel.app

### 2. Railway Deployment

1. Connect GitHub repository di [Railway](https://railway.app)
2. Add environment variables
3. Deploy automatically

### 3. DigitalOcean App Platform

```yaml
# .do/app.yaml
name: smkn1-adiwerna
services:
- name: web
  source_dir: /
  github:
    repo: username/SMKN-1-Adiwerna
    branch: main
  run_command: pnpm start
  build_command: pnpm build && pnpm generate:types
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URI
    value: ${DATABASE_URI}
  - key: PAYLOAD_SECRET
    value: ${PAYLOAD_SECRET}

databases:
- name: mongodb
  engine: MONGODB
```

### 4. AWS EC2 Deployment

```bash
# 1. Launch EC2 instance (Ubuntu 22.04 LTS)
# 2. Connect ke instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Install Docker
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# 4. Clone repository
git clone https://github.com/username/SMKN-1-Adiwerna.git
cd SMKN-1-Adiwerna

# 5. Setup environment
cp .env.example .env.production
# Edit environment variables

# 6. Deploy
docker compose -f docker-compose.prod.yml up -d --build

# 7. Setup domain dan SSL
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔧 Environment Variables

### Production Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URI` | MongoDB connection string | ✅ | `mongodb+srv://...` |
| `PAYLOAD_SECRET` | PayloadCMS secret key | ✅ | `random-secret-key` |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public server URL | ✅ | `https://smkn1adiwerna.com` |
| `NODE_ENV` | Environment | ✅ | `production` |
| `PORT` | Server port | ❌ | `3000` |
| `SMTP_HOST` | Email server host | ❌ | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | ❌ | `587` |
| `SMTP_USER` | Email username | ❌ | `your-email@gmail.com` |
| `SMTP_PASS` | Email password | ❌ | `app-password` |

### Security Best Practices

1. **Generate Strong Secrets**:
   ```bash
   # Generate PAYLOAD_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use Environment-specific configs**:
   ```bash
   # Development
   NODE_ENV=development
   DATABASE_URI=mongodb://localhost:27017/smkn1-adiwerna-dev
   
   # Production
   NODE_ENV=production
   DATABASE_URI=mongodb+srv://...atlas.mongodb.net/smkn1-adiwerna
   ```

## 🗄️ Database Setup

### MongoDB Atlas Setup

1. **Create Cluster**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create new cluster
   - Choose appropriate tier (M0 for free tier)

2. **Database Access**:
   - Create database user
   - Set appropriate permissions
   - Whitelist IP addresses

3. **Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/smkn1-adiwerna?retryWrites=true&w=majority
   ```

### Local MongoDB Setup

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongo
use smkn1-adiwerna
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["readWrite"]
})
```

## 🌐 Domain & SSL

### DNS Configuration

```
# A Records
@ → your-server-ip
www → your-server-ip

# CNAME Records (if using CDN)
cdn → your-cdn-url
```

### SSL Certificate

#### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d smkn1adiwerna.com -d www.smkn1adiwerna.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Cloudflare SSL

1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS (Full Strict)
4. Setup Page Rules for caching

## 📈 Monitoring & Logging

### Application Monitoring

```javascript
// Add to payload.config.ts
export default buildConfig({
  // ... other config
  onInit: async (payload) => {
    payload.logger.info('PayloadCMS initialized successfully')
  },
  admin: {
    loggers: {
      console: {
        level: process.env.NODE_ENV === 'production' ? 'error' : 'info'
      }
    }
  }
})
```

### Docker Logging

```yaml
# docker-compose.prod.yml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Health Checks

```javascript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database connection
    // Check critical services
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    )
  }
}
```

### Backup Strategy

```bash
# MongoDB Backup Script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="smkn1-adiwerna"

# Create backup
mongodump --uri="$DATABASE_URI" --out="$BACKUP_DIR/backup_$DATE"

# Compress backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$BACKUP_DIR/backup_$DATE"

# Remove uncompressed backup
rm -rf "$BACKUP_DIR/backup_$DATE"

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

### Monitoring dengan Uptime Robot

1. Sign up di [Uptime Robot](https://uptimerobot.com)
2. Add monitor untuk your-domain.com
3. Setup email/SMS alerts
4. Monitor critical endpoints:
   - `/` (Homepage)
   - `/api/health` (Health check)
   - `/admin` (Admin panel)

---

**🚀 Deployment berhasil!** Website SMKN 1 Adiwerna siap melayani pengguna di production.

