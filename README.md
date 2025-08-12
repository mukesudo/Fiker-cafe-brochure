# Fiker Cafe Brochure Website

A modern, responsive brochure website for Fiker Cafe, showcasing a traditional menu with dynamic admin management. Built with **Next.js 14 (Pages Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Fastify**, **Prisma**, and **JWT authentication**. Deployed on **Vercel** (frontend) and **Render** (backend).

## Features
- **Home Page**: Engaging hero, about section, Traditional menu, and contact form, styled with cosmic aesthetics.
- **Login Page**: Secure admin login (username: `admin`, password: `password`) with a back button to return to the homepage.
- **Admin Page**: Dynamic CRUD for menu items with Tailwind CSS toasts, confirmation dialogs, and TypeScript-safe error handling.
- **Contact Page**: Form submission stored via Prisma with success alerts.
- **Navigation Bar**: Responsive nav bar with Login (when not logged in) and Logout (when logged in) buttons.
- **Performance**: Optimized with compressed images for fast loading.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and Framer Motion animations.

## Tech Stack
- **Frontend**: Next.js 14 (Pages Router), TypeScript, Tailwind CSS, Framer Motion, Axios.
- **Backend**: Fastify, Prisma, PostgreSQL, JWT authentication.
- **Deployment**: Vercel (frontend), Render (backend).
- **Tools**: Git, GitHub Codespaces, Node.js 20.x.

## Setup
1. **Clone Repository**:
   ```bash
   git clone https://github.com/mukesudo/fiker-cafe-brochure.git
   cd fiker-cafe-brochure
   ```
2. **Backend**:
   ```bash
      cd backend
      npm install
      npx prisma migrate dev
      node index.js
   ```
   - Set environment variables in `backend/.env`
     ```bash
     DATABASE_URL="your-postgresql-url"
     SECRET_KEY="your-secret-key"
     ```
3. **Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   - Set environment variables in `frontend/.env.local`
     ```bash
     NEXT_PUBLIC_API_URL="http://localhost:3001"
     ```
4. Access at `http://localhost:3000`.

**Admin Access**
- Navigate to `/login`.
- Use credentials: username `admin`, password `password`.
- Manage menu items via `/admin` with add/edit/delete, toasts, and confirmations.

**Deployment**
   - **Backend**: Deployed on Render (`https://cosmic-brew-backend.onrender.com`).
      - Build Command: `npm install && npx prisma migrate deploy`
      - Start Command: `node index.js`
      - Environment Variables: `DATABASE_URL`, `SECRET_KEY`

   - **Frontend:** Deployed on Vercel (`https://cosmic-brew-brochure.vercel.app`).
     - Framework Preset: Next.js
     - Environment Variable: `NEXT_PUBLIC_API_URL=https://cosmic-brew-backend.onrender.com`

**Screenshots**





     
   
