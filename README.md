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

1. **Install dependencies**:
```bash
npm run install-all
```

2. **Configure environment variables**:
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/misinformation-platform
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

3. **Start the application**:
```bash
npm run dev
```

The server will run on `http://localhost:5000` and the client on `http://localhost:5173`

## 📁 Project Structure

```
misinformation-intelligence-platform/
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Admin & User dashboards
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js + Express backend
│   ├── agents/           # AI agent implementations
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.js          # Server entry point
├── package.json
└── README.md
```

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
