# PulseIQ Application

This project consists of a Next.js frontend and a FastAPI backend.

## Frontend (Next.js)

The frontend is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


### Getting Started

1. Navigate to the directory:
```bash
cd pulseiq-poc
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Backend (FastAPI)

A simple FastAPI server with a `/chat` endpoint.

### Environment Setup

Create a `.env` file in the backend directory with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Setup

1. Navigate to the backend directory:
```bash
cd fastapi
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The server will be available at http://localhost:8000

### API Endpoints

- `GET /`: Health check endpoint
- `POST /chat`: Chat endpoint that accepts JSON with a "message" field

### API Documentation

Once the server is running, you can access the auto-generated API documentation at:
- http://localhost:8000/docs
- http://localhost:8000/redoc

