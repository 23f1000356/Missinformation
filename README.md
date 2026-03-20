# 🤖 AI-Centric Misinformation Intelligence Platform

A comprehensive multi-agent AI system for detecting, verifying, and managing misinformation across multiple sources and languages.

## 🌟 Features

### Multi-Agent Architecture
- **Ingestor Agent**: Collects and normalizes data from social media, news, and files
- **Claim Extractor Agent**: Uses LLM to identify checkable claims and entities
- **Cluster Agent**: Groups similar claims using embeddings & vector DB
- **Verification Agent**: Searches web and fact-check databases for evidence
- **Multilingual Agent**: Detects language, translates, and verifies
- **Fact-Checker Assistant Agent**: Interacts with users and drafts verifications
- **Analyst Agent**: Generates insights and reports automatically
- **Governance Agent**: Ensures audit logging and bias detection

### Admin Dashboard
- AI-generated situational briefs
- Real-time misinformation spike detection
- Interactive claim intelligence map
- Hybrid verification studio (AI + Human)
- Trends & heatmaps visualization
- Auto-generated reports
- Governance & audit logs

### User Dashboard
- AI Fact-Check Assistant (Chat Mode)
- Personalized AI feed
- Community verification loop
- Multi-language support
- Browser extension companion
- Gamified credibility profile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI API key (for LLM features)

### Installation

1. **Install backend dependencies**:
```bash
cd backend/server
npm install
```

2. **Install frontend dependencies**:
```bash
cd frontend/client
npm install
```

3. **Configure environment variables**:
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/misinformation-platform
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

4. **Start the application**:

**Backend** (from `backend/server`):
```bash
npm start
# or for development with hot-reload
npm run dev
```

**Frontend** (from `frontend/client`):
```bash
npm run dev
```

The server will run on `http://localhost:5000` and the client on `http://localhost:5173`

## 📁 Project Structure

```
misinformation-intelligence-platform/
├── frontend/                      # Frontend applications
│   ├── client/                    # React + TypeScript web app
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   ├── contexts/         # React contexts (language, theme)
│   │   │   ├── lib/              # API & utility libraries
│   │   │   ├── pages/            # Admin & User dashboards
│   │   │   ├── store/            # State management
│   │   │   ├── App.tsx           # Main React app
│   │   │   └── main.tsx          # Entry point
│   │   ├── package.json
│   │   ├── vite.config.ts        # Vite configuration
│   │   └── tailwind.config.js    # TailwindCSS config
│   ├── extension/                 # Chrome/Edge browser extension
│   │   ├── content.js            # Content script for claim detection
│   │   ├── background.js         # Service worker
│   │   ├── popup.html            # Extension popup UI
│   │   ├── manifest.json         # Extension manifest (v3)
│   │   └── icons/                # Extension icons
│   └── public/                    # Static assets
├── backend/                       # Backend services
│   ├── server/                    # Node.js + Express application
│   │   ├── agents/               # AI agent implementations
│   │   │   ├── IngestorAgent.js
│   │   │   ├── ClaimExtractorAgent.js
│   │   │   ├── ClusterAgent.js
│   │   │   ├── VerificationAgent.js
│   │   │   └── ... (more agents)
│   │   ├── models/               # MongoDB schemas
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # Business logic
│   │   ├── ml_models/            # ML model files
│   │   └── index.js              # Server entry point
│   ├── scripts/                   # Utility & setup scripts
│   │   ├── check-mongodb.js
│   │   ├── setup-ml-verification.js
│   │   └── ... (more scripts)
│   └── Claim - Sheet1.csv        # Test data
├── .env.example                   # Environment template
├── package.json                   # Root package config
├── requirements.txt               # Python dependencies
└── README.md
```

## 🔄 Development Workflow

### Working with Frontend & Backend Separately

**Backend Development Process:**
1. Navigate to `backend/server` directory
2. Modify agent files in `backend/server/agents/`
3. Update routes in `backend/server/routes/`
4. Modify services in `backend/server/services/`
5. Run tests and start server: `npm start` or `npm run dev`

**Frontend Development Process:**
1. Navigate to `frontend/client` directory
2. Create/modify components in `frontend/client/src/components/`
3. Add new pages in `frontend/client/src/pages/`
4. Update API calls in `frontend/client/src/lib/api.ts`
5. Run dev server: `npm run dev`

**Browser Extension Development:**
1. Located in `frontend/extension/`
2. Modify content scripts in `content.js`
3. Update popup UI in `popup.html` and `popup.js`
4. Reload extension in `chrome://extensions/` after changes

### Running Both Services Concurrently

For full development (recommended), open two terminals:

**Terminal 1 - Backend:**
```bash
cd backend/server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/client
npm run dev
```

Both services will hot-reload on file changes.

### Utility Scripts

Pre-built scripts are located in `backend/scripts/`:
- `setup-ml-verification.js` - Setup ML verification services
- `setup-enhanced-verification.js` - Setup enhanced verification
- `check-mongodb.js` - Verify MongoDB connection
- `debug-registration.js` - Debug registration issues

## 🎨 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui for components
- Lucide React for icons
- Recharts for visualizations
- Socket.io-client for real-time updates

### Backend
- Node.js + Express
- MongoDB with Mongoose
- OpenAI API for LLM features
- LangChain for agent orchestration
- ChromaDB for vector embeddings
- Socket.io for real-time communication

## 🔧 Configuration

### API Keys Required
- **OpenAI API**: For claim extraction, verification, and chat features
- **News API** (optional): For news source verification
- **Twitter API** (optional): For social media ingestion

## 📊 Usage

### Admin Dashboard
Access at: `http://localhost:5173/admin`
- Monitor real-time misinformation flows
- Review and verify AI-detected claims
- Generate intelligence reports
- Manage agents and data streams

### User Dashboard
Access at: `http://localhost:5173/`
- Paste claims for instant fact-checking
- Chat with AI assistant
- View trending misinformation topics
- Build credibility through contributions

## 🛡️ Security & Governance
- Immutable audit logs for all actions
- Bias detection and model explainability
- JWT-based authentication
- Role-based access control

## 📝 License
MIT License

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Problem Statement
Global crises such as pandemics, geopolitical conflicts, and climate events trigger a rapid surge of online content—much of it confusing, conflicting, or deliberately false. That overload makes it hard for people to know what to trust and how to act, which can cause real-world harm and slow effective response.

## Our Solution (High-level)
Our idea is to build a Chrome extension frontline paired with a lightweight Node/Express verification backend. The extension detects claims on web pages and social feeds, sends them to the backend for NLP/ML verification (embeddings + NLI or LLM), and surfaces clear, source‑backed verdicts and context directly in the browser. This lets users see quick corrections and evidence where misinformation appears, while the backend stores logs and provides an admin dashboard for review and reporting.

## How We Solve the Problem
- Fast in-context interventions: extension shows verdicts and evidence immediately where users read content, reducing spread and confusion.
- Automated triage: NLP/ML (claim extraction, embeddings, NLI/LLM verification) performs initial fact checks quickly to reduce human workload.
- Provenance & transparency: every verdict includes source links, confidence scores, and short explanations so users can verify the reasoning.
- Multilingual support: automatic language detection and translation broaden coverage during global events.
- Human-in-the-loop: flagged items sync to an admin dashboard for expert review, reducing false positives and improving trust.

## Chrome Extension Details
- Frontline agent in the browser: content script detects selected or visible claims; popup and in-page annotations display results.
- User actions: Verify selected text, view short explanation, open full evidence list, translate, flag/report, and share corrections.
- UI: lightweight popup (React or plain HTML), in-page badges for quick verdicts, and a contextual panel with evidence links.
- Privacy & workflow: extension sends only selected text to your local/remote backend (configurable); no telemetry by default; admins can enable logging for audits.
- Local integration: extension calls backend endpoints (e.g., http://localhost:5000/api) which run ML/NLP, query vector DB, and return structured verdicts.

## Key Features (compact)
- In-browser claim verification (Supported / Refuted / Not Enough Information) with confidence %
- Evidence retrieval with source attribution and links
- Selection-based verification, in-page annotations, and popup UI
- Translation and multilingual verification
- Admin dashboard for flagged claims, trend tracking, and manual verification
- Audit logs, role-based access, and configurable privacy controls

## Tech Stack (summary)
- Frontend: React + TypeScript (client & optional popup), Vite, TailwindCSS
- Extension: Chrome/Edge WebExtension (Manifest V3), content scripts, service worker/background, chrome.storage
- Backend: Node.js + Express, MongoDB (Mongoose)
- ML/NLP: sentence-transformers (embeddings), BERT/RoBERTa or LLMs (OpenAI / Google Gemini), ChromaDB for vector store
- Real-time: Socket.io for dashboard updates
- Dev/Deployment: Docker, GitHub Actions, Vercel/Render/Cloud Run recommended

## Quick Start (extension-focused)
1. Configure `.env` in root with API keys and DB (OPENAI_API_KEY or GEMINI_API_KEY, MONGODB_URI).  
2. Start backend:
```bash
cd backend/server
npm install
npm start
```
3. In a separate terminal, start frontend:
```bash
cd frontend/client
npm install
npm run dev
```
4. Load extension: open `chrome://extensions/`, enable Developer mode, "Load unpacked" -> select `frontend/extension`.  
5. Select text on any page and click "Verify" in the extension popup to see verdict, confidence, and evidence.

## Demo & Hackathon MVP
- Demo flow: install extension → select claim on a live page → extension shows verdict + evidence → flagged items appear in admin dashboard.
- MVP scope: extension UI + backend endpoint for claim extraction, embedding search, and a verification model (LLM or lightweight NLI).
