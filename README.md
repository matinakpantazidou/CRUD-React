# Technical Interview Task App

A task management application designed for technical interviews. Candidates are tasked with implementing core CRUD operations while working with React, Node.js, TypeScript, and Supabase.

## Features

- ✅ Task listing (implemented)
- 📝 Task creation (to be implemented)
- 🔄 Task updates (to be implemented)
- 🗑️ Task deletion (to be implemented)

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Start the backend server:
   ```bash
   npm run dev:server
   ```

## Interview Tasks

Candidates need to implement:

1. Task Creation (`POST /api/tasks`)
2. Task Updates (`PUT /api/tasks/:id`)
3. Task Deletion (`DELETE /api/tasks/:id`)
4. Single Task Retrieval (`GET /api/tasks/:id`)

The frontend components and API endpoints are prepared, but the implementation is left for the candidate to complete.
