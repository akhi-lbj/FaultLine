# FaultLine - Risk Decision System

FaultLine is an AI-driven predictive risk auditing and decision matrix platform. It analyzes interview transcripts, customer behaviors, and team inputs using Google's Gemini AI to calculate predictive risk indexes, financial exposures, and portfolio impacts for upcoming product features or initiatives.

## Features

- **Transcript Inspector**: Parses interview transcripts to isolate semantic constructs, contradictory customer behaviors, and interviewer confirmation leading prompts.
- **Predictive Risk Index**: Utilizes probability curves to calibrate feature risk.
- **Financial Exposure**: Assesses potential financial risk based on assigned development budgets.
- **Portfolio Board**: Track multiple feature initiatives and their associated audit risks in a unified dashboard.
- **Authentication**: Secure login and user session management powered by Firebase.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Framer Motion
- **Backend**: Node.js, Express, Drizzle ORM, PostgreSQL, Nodemailer
- **AI Integration**: `@google/genai` (Gemini API)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Firebase account (for authentication)
- Google Gemini API Key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env.local` (or `.env`) and fill in the required values:
   ```bash
   cp .env.example .env.local
   ```
   *Make sure to provide your `GEMINI_API_KEY`, `DATABASE_URL`, and Firebase configuration.*

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will start concurrently with the backend API.

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## View in AI Studio

View the original app deployment in AI Studio: [https://ai.studio/apps/c0db95a1-2936-4019-b362-661a5b8a53d9](https://ai.studio/apps/c0db95a1-2936-4019-b362-661a5b8a53d9)
