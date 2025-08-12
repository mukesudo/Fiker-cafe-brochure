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
<img width="1354" height="681" alt="Fiker-cafe-brochure" src="https://github.com/user-attachments/assets/a34f8e7d-d545-49b2-a680-921f8bc83a66" />
<img width="1344" height="680" alt="Fiker-cafe-brochure-menu" src="https://github.com/user-attachments/assets/f8b40217-65ad-4640-b48e-e21eda392da0" />
<img width="1350" height="659" alt="Fiker-cafe-brochure-about-us" src="https://github.com/user-attachments/assets/fa4f33c6-03b3-4929-a22b-a6167defee16" />
<img width="1349" height="681" alt="Fiker-cafe-brochure-login" src="https://github.com/user-attachments/assets/036d29c9-023f-481d-8534-1b138d814a1f" />
<img width="1347" height="682" alt="Fiker-cafe-brochure-admin-page" src="https://github.com/user-attachments/assets/10276c71-ff3a-43ee-81c1-81be92729db0" />
<img width="1348" height="681" alt="Fiker-cafe-brochure-contact-us" src="https://github.com/user-attachments/assets/45c6d562-f713-4408-8735-5974a0955532" />

**Contact**
   - For inquiries, reach out via **<a href= "https://www.upwork.com/freelancers/~01b723e04027e66b7c?companyReference=1838525925384134219&mp_source=share">Upwork</a>** or **<a href="https://github.com/mukesudo">Github <a/>** .





     
   
