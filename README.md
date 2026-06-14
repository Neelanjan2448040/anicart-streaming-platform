# 🎬 AniCart - The Ultimate Anime Streaming Platform

Welcome to **AniCart**, a commercial-grade, multi-language microservice ecosystem designed to deliver an unparalleled Anime streaming and discovery experience. It seamlessly blends modern React UIs, intelligent AI recommendation engines, robust analytics, and secure administrative controls into one magnificent application.

---

## 🌟 Key Features

### User Experience
- **Guest Teaser Mode**: Unregistered users are treated to a restricted, tantalizing preview of the first 3 movies in the catalog, complete with a gorgeous, high-conversion call-to-action banner.
- **Interactive Editorial Blogs**: A fully functioning blog ecosystem allows users to read beautifully formatted articles detailing the evolution of Anime studios and deep-dives into box office hits.
- **Immersive Parallax UI**: Built with React, TailwindCSS, and FontAwesome, delivering a 4K-ready, ultra-modern dark UI that reacts to scrolling.
- **Global Lo-Fi Background Music**: Integrated HTML5 audio player playing a continuous, cinematic anime Lo-Fi track, with a global mute toggle embedded directly into the Navbar.

### Technical & Commercial Features
- **Full Authentication**: A robust JWT-based secure login and signup system that guards the premium movie catalog.
- **Native AI Guru (`/recommend`)**: A dedicated Python/FastAPI microservice powered by Groq's cutting-edge Llama-3 model. It parses natural language inputs ("I want a dark action anime...") and perfectly matches them to the database.
- **Smart Admin Dashboard (`/admin`)**: Administrators can add, edit, or delete movies. If an Admin leaves the poster image field blank during upload, the **Auto AI System** activates—simulating a neural network generation delay before intelligently assigning a breathtaking AI cover art to the film!
- **Secure Mock Payment Portal (`/payment`)**: A beautifully crafted subscription checkout flow featuring realistic credit-card validation, processing delays, and delightful success bounce animations.

---

## 🏗 Polyglot Microservices Architecture

AniCart employs a highly advanced, multi-language architecture to distribute workloads efficiently across specialized services.

```mermaid
graph TD
    %% Frontend Layer
    subgraph Frontend [React Frontend Application]
        UI[Vite React Application\nPort: 3000]
        Router[React Router DOM]
        Tailwind[TailwindCSS Styling]
        
        UI --> Router
        UI --> Tailwind
    end

    %% Backend Layer
    subgraph Backend [Node.js Backend Monolith]
        API[Express REST API\nPort: 5000]
        Prisma[Prisma ORM Layer]
        SQLite[(SQLite Database\ndev.db)]
        Auth[JWT Authentication]
        
        API --> Auth
        API --> Prisma
        Prisma --> SQLite
    end

    %% Python Microservice
    subgraph AI_Service [Python AI Service]
        FastAPI[FastAPI Server\nPort: 8000]
        Pydantic[Pydantic Validation]
        Groq[Groq Llama-3 API]
        
        FastAPI --> Pydantic
        FastAPI --> Groq
    end

    %% Go Microservice
    subgraph Analytics_Service [Go Telemetry Service]
        Gin[Gin Web Server\nPort: 8080]
        Logger[Event Logger]
        
        Gin --> Logger
    end

    %% Rust WASM Module
    subgraph Search_Engine [Rust WASM Engine]
        WASM[Compiled WASM Binary\nHigh-Speed Search]
    end

    %% System Connections
    UI -- "REST Fetch (Movies/Auth)" --> API
    UI -- "Natural Language Search" --> FastAPI
    UI -- "Track Clicks/Events" --> Gin
    UI -- "Fast Local Search" --> WASM
```

---

## 🚀 Deployment & Local Setup Guide

Follow these steps to deploy the entire microservice ecosystem locally.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/anicart-streaming-platform.git
cd anicart-streaming-platform
```

### 2. Configure the Node.js Backend & Database
The backend handles authentication, movie storage, and the Prisma ORM.
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
node prisma/seed.js   # Seeds the initial anime database and default admin!
npm run dev           # Starts API server on http://localhost:5000
```
> **Default Admin Credentials:** `admin@anicart.com` / `admin`

### 3. Configure the Python AI Microservice
The AI Guru requires Python 3.10+ and a valid Groq API key to process natural language.
```bash
cd ai_service
pip install fastapi uvicorn groq pydantic cors
# Optional: Set your Groq API Key environment variable
# export GROQ_API_KEY="your_api_key_here"

# Start the FastAPI server
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4. Configure the Go Analytics Microservice (Optional)
The Go service tracks high-frequency telemetry (e.g., Subscription Clicks).
```bash
cd analytics_service
go mod tidy
go run main.go        # Starts Gin server on http://localhost:8080
```

### 5. Build and Launch the React Frontend
Finally, boot up the beautiful UI!
```bash
cd frontend
npm install
npm run dev -- --port 3000  # Starts Vite on http://localhost:3000
```

---

## 🔒 Security & Privacy Notice

- **Database Protection**: The `dev.db` SQLite file is ignored via `.gitignore`. Even if you fork or push this repository to GitHub, your users' hashed passwords and data are never uploaded to the public internet.
- **Environment Variables**: The `.env` files containing sensitive keys (like the `GROQ_API_KEY`) are fully protected and excluded from version control. Never commit these files!

---

**Built with ❤️ for Anime fans. Enjoy binge-watching on AniCart! 🍿**
