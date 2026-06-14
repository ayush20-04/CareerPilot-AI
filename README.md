# CareerPilot AI

CareerPilot AI is a beginner-friendly full-stack SaaS project that helps users improve their LinkedIn profiles with AI.

## Tech Stack

- React + Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB with Mongoose
- Gemini API

## Features

- LinkedIn Profile Analyzer
- Headline Optimizer
- About Section Generator
- Skills Suggestions
- LinkedIn Post Generator
- Saved generation history in MongoDB

## Folder Structure

```txt
CareerPilot-AI/
├── frontend/
│   ├── src/
│   ├── src/components/
│   ├── src/pages/
│   └── src/services/
└── backend/
    ├── routes/
    ├── controllers/
    ├── models/
    ├── config/
    └── server.js
```

## Step 1: Backend Setup

Open a terminal inside the backend folder:

```bash
cd backend
npm install
```

Create a real `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Then update these values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/careerpilot-ai
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend runs at:

```txt
http://localhost:5000
```

## Step 2: Frontend Setup

Open another terminal inside the frontend folder:

```bash
cd frontend
npm install
```

Create a real `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Start the frontend:

```bash
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

## Backend API Routes

```txt
POST /api/ai/analyze-profile
POST /api/ai/optimize-headline
POST /api/ai/generate-about
POST /api/ai/suggest-skills
POST /api/ai/generate-post
GET  /api/history
DELETE /api/history/:id
```

## How The App Works

1. The user fills a form in the React frontend.
2. The frontend sends the form data to the Express backend using REST APIs.
3. The backend sends a structured prompt to the Gemini API.
4. Gemini returns the generated result.
5. The backend saves the result in MongoDB through Mongoose.
6. The frontend displays the result and refreshes the saved history panel.

## Notes

- Keep real API keys inside `.env` files only.
- Make sure MongoDB is running before starting the backend.
- If the frontend cannot reach the backend, check `VITE_API_URL` and `FRONTEND_URL`.
