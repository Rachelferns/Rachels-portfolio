# Notify Dashboard

Notify Dashboard is a student notice management system designed for academic submission. It gives administrators a clean interface to publish and manage notices while students get a searchable, category-based dashboard for viewing updates.

## Problem Statement

Colleges often rely on fragmented notice boards and chat messages to communicate updates. This project centralizes campus communication in a responsive dashboard that supports notice creation, editing, deletion, search, filtering, and urgent alert highlighting.

## Features

- Admin CRUD for notices
- Student-facing notice feed
- Categories: Exam, Event, Urgent
- Search and category filters
- Urgent notice highlighting
- Sidebar dashboard layout with summary cards
- API-based architecture using Next.js route handlers
- Build-ready GitHub Actions workflow for CI/CD demonstration

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion
- Node.js file-based JSON store for demo persistence

## Project Structure

```bash
notify-dashboard/
├── app/
├── components/
├── data/
├── lib/
├── .github/workflows/
├── .env.example
└── README.md
```

## How to Run

```bash
cd notify-dashboard
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Use the `ADMIN_ACCESS_KEY` from your `.env.local` file in the sidebar to enable create, edit, and delete actions.

## Build Command

```bash
npm run build
```

## Deployment Setup

### Vercel

1. Import the `notify-dashboard` folder as a separate project in Vercel.
2. Add environment variables from `.env.example`.
3. Use the default Next.js framework preset.
4. Deploy.

### Persistence Note

This submission uses a local JSON data store for easy academic evaluation. For cloud persistence on Vercel, replace the file store in `lib/notices.ts` with a hosted database such as Supabase, Neon, or MongoDB Atlas.

## CI/CD Concept

The repository includes `.github/workflows/ci.yml` to simulate a simple CI pipeline:

- install dependencies
- run production build
- validate the project on pushes and pull requests

This is suitable to explain continuous integration in an academic demo.

## Screenshots

Add screenshots here before final submission:

- Dashboard overview
- Notice creation form
- Filtered student feed

## Environment Variables

```env
ADMIN_ACCESS_KEY=campus-admin-2026
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Submission Notes

- Fully separate project codebase
- Clean UI with responsive layout
- CRUD-ready API implementation
- Ready for independent deployment
