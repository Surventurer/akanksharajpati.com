# Akanksha Rajpati Website

A modern, high-end editorial website built with **Next.js 16** and **Payload CMS 3**.

## Prerequisites

- **Node.js**: v18.x or higher
- **pnpm**: v9.x (do not use npm or yarn)
- **MongoDB**: A running MongoDB instance (local or Atlas)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

**Required Variables**:
- `DATABASE_URI`: Your MongoDB connection string
- `PAYLOAD_SECRET`: A secure random string for encryption
- `CMS_SEED_ADMIN_EMAIL`: Initial admin email
- `CMS_SEED_ADMIN_PASSWORD`: Initial admin password

### 3. Run Development Server

```bash
pnpm dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Production Build

```bash
pnpm build
pnpm start
```

## Deploy on Vercel

1. Push your code to a GitHub repository
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!
