# ID Card Generator Platform

A full-stack SaaS platform for generating ID cards from PDF documents using AI parsing.

## 🚀 Quick Start

1. **Setup**: Install dependencies and run migrations
2. **Integrate AI API**: See [EXTERNAL_API_SETUP.md](./EXTERNAL_API_SETUP.md)

## 📚 Documentation

- **[External API Setup](./EXTERNAL_API_SETUP.md)** - How to configure your external AI API

## 🏗️ Project Structure

```
FIDA/
├── backend/          # NestJS backend API
├── frontend/         # Next.js frontend
├── EXTERNAL_API_SETUP.md  # External API setup guide
└── README.md         # This file
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: Neon PostgreSQL
- **Authentication**: Session-based (express-session)

## 📋 Features

- ✅ User authentication (admin/client roles)
- ✅ PDF upload and parsing
- ✅ External AI API integration
- ✅ ID card generation and download
- ✅ Usage tracking and statistics
- ✅ Admin dashboard for user management

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=your-neon-postgres-url
SESSION_SECRET=your-session-secret
FRONTEND_URL=http://localhost:3000
PORT=4000
EXTERNAL_API_URL=https://your-ai-api.com/parse  # Optional
EXTERNAL_API_KEY=your-api-key                   # Optional
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🚦 Running the Application

### Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📖 Documentation

See [EXTERNAL_API_SETUP.md](./EXTERNAL_API_SETUP.md) for external API setup instructions.

## 📝 License

ISC

# FIDA
