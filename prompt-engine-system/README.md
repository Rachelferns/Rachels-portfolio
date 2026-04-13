# Prompt Engine System

Prompt Engine System is a full-stack academic project that improves raw user queries by converting them into more structured prompts and previewing the improved output. It is designed to demonstrate prompt engineering concepts with a clean, minimal interface.

## Problem Statement

Users often enter vague prompts that produce weak AI outputs. This project helps bridge that gap by applying template-based optimization so the same input becomes clearer, more structured, and more likely to generate better results.

## Features

- Accepts raw user input
- Converts it into an optimized structured prompt
- Displays original input, optimized prompt, and output response
- Includes templates for Q&A, Code Generation, and Summarization
- Shows before-vs-after prompt comparison
- Uses a backend API route to process prompt transformations
- Responsive minimal interface built for demonstration and evaluation

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion
- Custom prompt transformation engine in TypeScript

## How to Run

```bash
cd prompt-engine-system
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Build Command

```bash
npm run build
```

## Deployment Setup

### Vercel

1. Import the `prompt-engine-system` folder as a separate Vercel project.
2. Add the variables from `.env.example` if needed.
3. Deploy using the default Next.js settings.

### Backend Note

The transformation engine currently runs through a Next.js API route, so no separate backend server is required. If you want to extend it with an LLM provider later, the API layer is already separated in `app/api/optimize/route.ts`.

## CI/CD Concept

The included GitHub Actions workflow demonstrates a simple CI pipeline:

- install dependencies
- run a production build
- validate changes on pull requests and pushes

## Screenshots

Add screenshots here before submission:

- Main optimization interface
- Before vs After comparison
- Template-based output panel

## Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=
```

## Submission Notes

- Fully separate project codebase
- Clean architecture for frontend and backend flow
- Template-based prompt engineering demonstration
- Ready for independent deployment
