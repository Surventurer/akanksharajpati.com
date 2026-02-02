# Akanksha Rajpati Website

A modern, high-end editorial website built with **Next.js 15** and **Payload CMS 3**.

## Project Architecture

The project is structured as a consolidated application where the CMS and Frontend live together:
- **Root**: Global configurations and task delegation.
- **`cms/`**: The core application directory containing the Next.js app, Payload CMS collections, globals, and custom components.

## Prerequisites

- **Node.js**: v18.x or higher
- **NPM**: v9.x or higher
- **MongoDB**: A running MongoDB instance (local or Atlas)

## Getting Started

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd akanksharajpati.com

# Install dependencies
npm run install:cms
```

### 2. Environment Setup

Copy the example environment file in the `cms` directory and fill in your values:

```bash
cp cms/.env.example cms/.env
```

**Required Variables in `cms/.env`**:
- `DATABASE_URI`: Your MongoDB connection string.
- `PAYLOAD_SECRET`: A secure random string for encryption.
- `CMS_SEED_ADMIN_EMAIL`: Initial admin email.
- `CMS_SEED_ADMIN_PASSWORD`: Initial admin password.

### 3. Seed the Database

To populate the CMS with initial content (articles, media, authors), run the seed script from the `cms` directory:

```bash
cd cms
npm run seed
cd ..
```

### 4. Run the Development Server

Start the development server from the root directory:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Key Technical Features

- **Consolidated Setup**: Single Next.js instance running both Payload CMS and the Frontend.
- **TypeScript**: Shared types between CMS collections and Frontend components.
- **Rich Text**: Lexical editor for article content.
- **Dynamic Blocks**: Modular page building with Payload Blocks.

## Deploy on Vercel

The easiest way to deploy this project is using Vercel.

### Prerequisites

1.  **MongoDB Atlas Account**: Vercel does not host databases. You need a cloud MongoDB instance.
    - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Create a free cluster.
    - Whitelist all IPs (`0.0.0.0/0`) in Network Access to allow Vercel to connect.
    - Get your connection string (format: `mongodb+srv://<username>:<password>@cluster...`).

2.  **GitHub Repository**: Push your code to a GitHub repository.

### Step-by-Step Deployment

1.  **Connect to Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
    - Import your GitHub repository.

2.  **Configure Project Settings**:
    - **Framework Preset**: Ensure `Next.js` is selected.
    - **Root Directory**: Click "Edit" and select `cms` as the root directory. This is **critical** because the Next.js app lives inside the `cms` folder.

3.  **Environment Variables**:
    - Add the following environment variables in the Vercel dashboard:
        - `DATABASE_URI`: Your MongoDB Atlas connection string.
        - `PAYLOAD_SECRET`: A secure random string.
        - `CMS_SEED_ADMIN_EMAIL`: Initial admin email.
        - `CMS_SEED_ADMIN_PASSWORD`: Initial admin password.

4.  **Deploy**:
    - Click **Deploy**. Vercel will build your application and provide a production URL.

### Post-Deployment

- Access your site at the provided Vercel URL.
- Go to `/admin` to log in with your seed credentials.
