# Vue Jobs 🚀

A modern, premium job board application built with Vue 3, Vite, and Tailwind CSS. Featuring a sleek dark-mode aesthetic, smooth page transitions, and skeleton loading animations, this project demonstrates modern frontend architecture and UI/UX best practices.

![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## ✨ Features

- **Premium UI/UX:** Deep zinc/slate dark backgrounds with neon emerald accents, glassmorphism headers, and polished micro-interactions.
- **Smooth Animations:** Vue `<Transition>` integration for seamless page crossfades and interactive hover states.
- **Skeleton Loading:** Custom animated pulse placeholders provide immediate feedback while data is fetched.
- **Static-Ready Architecture:** Data fetching is decoupled from a live backend. Job listings are served via a static `jobs.json` asset, making the application 100% compatible with free static hosts (Cloudflare Pages, Netlify, GitHub Pages).
- **Form Handling:** Reactive forms for adding and editing jobs, featuring mock submission handling for static environments.
- **Toast Notifications:** Elegant, non-intrusive alerts for user actions using `vue-toastification`.

## 🛠️ Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [Vue Router 4](https://router.vuejs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [PrimeIcons](https://primefaces.org/primeicons/)

## 📂 Project Structure

```text
├── public/
│   ├── favicon.ico
│   └── jobs.json         # Static mock database for job listings
├── src/
│   ├── assets/           # Global styles and images (main.css, logo.png)
│   ├── components/       # Reusable Vue components (Navbar, Hero, Cards, etc.)
│   ├── views/            # Page-level components (Home, Jobs, Add/Edit Job)
│   ├── router/           # Vue Router configuration
│   ├── App.vue           # Root layout and transition wrapper
│   └── main.js           # Vue application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite bundler configuration
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vue-jobs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
   *The compiled static files will be placed in the `dist/` directory, ready for deployment.*

## 🏗️ Architecture Note: Static Deployment

This application is configured for **Static Hosting**. 
- **Read Operations:** The app fetches job data directly from `public/jobs.json`.
- **Write Operations:** Because static hosts (like Netlify or Cloudflare Pages) do not run an active backend server, actions like POST (Add Job), PUT (Edit Job), and DELETE (Delete Job) are **mocked**. They simulate network latency and return success notifications to demonstrate the UI flow without crashing or requiring a live database.

To connect this to a real database, you would replace the mocked Axios calls in `AddJobView.vue`, `EditJobView.vue`, and `JobView.vue` with real API endpoints, and host a separate backend server or utilize Serverless Functions.

## 📄 License

This project is open-source and available under the MIT License.
