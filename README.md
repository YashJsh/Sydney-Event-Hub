# Sydney Events Hub 🎉

A web application that automatically scrapes and displays events in Sydney, Australia, with email ticket booking integration.

![Event Page Preview](./screenshots/Event1.png)
![Event Page](./screenshots/Event2.png)

## Features ✨
- 🕷️ Automated event scraping from multiple sources
- 🎟️ "Get Tickets" with email capture
- 🔄 Auto-updating event listings
- 📱 Responsive design
- 📧 Email validation and storage
- 🚀 Modern tech stack

## Tech Stack

**Frontend:**
- React + TypeScript
- TanStack Query (React Query)
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express
- Puppeteer
- Prisma ORM
- PostgreSQL

## Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v15+)
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/YashJsh/Sydney-Event-Hub.git
cd Sydney-Event-Hub
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

3. **Database Configuration**
```bash
Create .env file in the backend folder 
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
PORT=5003
```
4. **Run Database Migrations**
```bash
npx prisma migrate dev
```
5. **Frontend Setup**
```bash
cd ../frontend
npm install
```
6. **Create .env for frontend**
```bash
VITE_BASE_URL = "http://localhost:5003/api"
```

7. **Run Application**
```
# Backend (from backend directory)
npm run dev
# Frontend (from frontend directory)
npm run dev
```