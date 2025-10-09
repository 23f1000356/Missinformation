# System Architecture

## Overview

The AI-Centric Misinformation Intelligence Platform is built on a multi-agent architecture where specialized AI agents work together to detect, verify, and manage misinformation at scale.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React)                     │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  User Dashboard  │         │ Admin Dashboard  │         │
│  │  - Fact Checker  │         │  - Agent Control │         │
│  │  - AI Chat       │         │  - Analytics     │         │
│  │  - Trending      │         │  - Verification  │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │   Socket.IO   │ (Real-time)
                    │   REST API    │
                    └───────┬───────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Server Layer (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Agent Orchestrator                       │  │
│  │  - Coordinates multi-agent workflows                 │  │
│  │  - Manages agent communication                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Multi-Agent System                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │Ingestor  │  │ Claim    │  │ Cluster  │          │   │
│  │  │ Agent    │→ │Extractor │→ │  Agent   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  │       ↓              ↓              ↓                │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │Verific.  │  │Multilang │  │Fact-Check│          │   │
│  │  │ Agent    │  │  Agent   │  │Assistant │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  │       ↓              ↓              ↓                │   │
│  │  ┌──────────┐  ┌──────────┐                         │   │
│  │  │ Analyst  │  │Governance│                         │   │
│  │  │  Agent   │  │  Agent   │                         │   │
│  │  └──────────┘  └──────────┘                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   MongoDB      │  │   OpenAI    │  │  External APIs  │
│  - Claims      │  │  - GPT-4    │  │  - News API     │
│  - Users       │  │  - Embeddings│  │  - Fact-Check  │
│  - Clusters    │  │             │  │  - Social Media │
│  - Audit Logs  │  │             │  │                 │
└────────────────┘  └─────────────┘  └─────────────────┘
```

## Agent Responsibilities

### 1. Ingestor Agent
**Purpose**: Collect and normalize data from multiple sources

**Capabilities**:
- Ingests from Twitter, Telegram, Reddit, News APIs
- Normalizes data structure across platforms
- Handles rate limiting and API quotas
- Queues data for processing

**Data Flow**:
```
External Source → Ingestor → Normalized Data → Claim Extractor
```

### 2. Claim Extractor Agent
**Purpose**: Identify and extract verifiable claims using LLM

**Capabilities**:
- Uses GPT-4 to identify checkable claims
- Extracts entities (people, places, organizations)
- Analyzes sentiment and tone
- Assigns urgency and checkability scores
- Categorizes claims (health, politics, science, etc.)

**AI Model**: GPT-4 with custom prompts

**Output**:
```javascript
{
  text: "Extracted claim",
  entities: [{text: "Entity", type: "PERSON", confidence: 0.9}],
  category: "health",
  checkability: 0.85,
  urgency: "high"
}
```

### 3. Cluster Agent
**Purpose**: Group similar claims using semantic similarity

**Capabilities**:
- Generates embeddings using OpenAI's text-embedding-ada-002
- Calculates cosine similarity between claims
- Creates clusters of related misinformation
- Generates cluster metadata and summaries
- Tracks cluster evolution over time

**Algorithm**:
```
1. Generate embedding for each claim
2. Calculate pairwise similarity
3. Group claims with similarity > 0.85
4. Generate cluster name and description using GPT
5. Track geographic and temporal distribution
```

### 4. Verification Agent
**Purpose**: Search for evidence and verify claims

**Capabilities**:
- Searches multiple evidence sources (web, news, fact-check databases)
- Analyzes evidence stance (supports/refutes/neutral)
- Uses GPT-4 to synthesize verdict
- Generates explanations at multiple levels (short, medium, long, ELI5)
- Assigns confidence scores

**Verification Process**:
```
Claim → Search Evidence → Analyze Sources → GPT-4 Analysis → Verdict
```

**Verdicts**: true, false, misleading, unverified, satire

### 5. Multilingual Agent
**Purpose**: Handle claims in multiple languages

**Capabilities**:
- Detects language using GPT
- Translates claims to English for processing
- Translates explanations back to original language
- Maintains context and nuance in translation

**Supported Languages**: All major languages via GPT-4

### 6. Fact-Checker Assistant Agent
**Purpose**: Interactive AI assistant for users

**Capabilities**:
- Conversational interface for fact-checking
- Maintains conversation context
- Explains verification reasoning
- Answers follow-up questions
- Drafts verification reports for human reviewers

**Interaction Model**: Chat-based with context awareness

### 7. Analyst Agent
**Purpose**: Generate insights and reports automatically

**Capabilities**:
- Generates daily intelligence briefs
- Creates weekly reports with trends
- Detects misinformation spikes
- Identifies trending topics and keywords
- Provides actionable recommendations

**Scheduled Tasks**:
- Daily brief: 8:00 AM
- Spike detection: Every hour
- Weekly report: On demand

### 8. Governance Agent
**Purpose**: Ensure system transparency and fairness

**Capabilities**:
- Maintains immutable audit logs
- Detects bias in verification patterns
- Monitors agent performance
- Generates compliance reports
- Tracks system health metrics

**Bias Detection**:
- Category over-representation
- Verdict distribution analysis
- Language bias detection
- Geographic coverage gaps

## Data Models

### Claim Schema
```javascript
{
  text: String,              // Extracted claim
  originalText: String,      // Original source text
  language: String,          // Language code
  source: {
    platform: String,
    url: String,
    author: String,
    timestamp: Date
  },
  entities: [{
    text: String,
    type: String,            // PERSON, ORG, GPE, DATE
    confidence: Number
  }],
  category: String,          // health, politics, science, etc.
  verificationStatus: String, // pending, in_progress, verified
  verdict: String,           // true, false, misleading, unverified
  confidence: Number,        // 0-1
  aiAnalysis: {
    claimType: String,
    checkability: Number,
    urgency: String,
    reasoning: String
  },
  evidence: [{
    source: String,
    url: String,
    snippet: String,
    credibility: Number,
    stance: String           // supports, refutes, neutral
  }],
  clusterId: ObjectId,
  embedding: [Number],       // Vector embedding
  explanation: {
    short: String,
    medium: String,
    long: String,
    eli5: String
  }
}
```

### Cluster Schema
```javascript
{
  name: String,
  description: String,
  claims: [ObjectId],
  centroid: [Number],        // Vector centroid
  category: String,
  keywords: [String],
  timeline: {
    firstSeen: Date,
    lastSeen: Date,
    peakActivity: Date
  },
  metrics: {
    totalClaims: Number,
    verifiedTrue: Number,
    verifiedFalse: Number,
    totalReach: Number
  },
  geographicDistribution: [{
    country: String,
    count: Number
  }],
  riskLevel: String          // low, medium, high, critical
}
```

## Real-time Communication

### Socket.IO Events

**Client → Server**:
- `subscribe-admin`: Admin subscribes to all events
- `subscribe-user`: User subscribes to personal events
- `verify-claim`: Request claim verification

**Server → Client**:
- `daily-brief`: Daily intelligence brief
- `spike-alert`: Misinformation spike detected
- `claims-extracted`: New claims extracted
- `claim-verified`: Claim verification complete
- `agent-error`: Agent error notification

## Security Architecture

### Authentication
- JWT-based authentication
- Role-based access control (admin, fact-checker, user)
- Secure password hashing with bcrypt

### API Security
- CORS configuration
- Rate limiting (planned)
- Input validation
- SQL injection prevention (using Mongoose)

### Data Privacy
- Audit logging for all actions
- Immutable audit trail
- User data encryption
- Secure API key storage

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- MongoDB replica sets
- Load balancing ready
- Microservices architecture potential

### Performance Optimization
- Database indexing on frequently queried fields
- Caching layer (Redis - planned)
- Pagination for large datasets
- Lazy loading in frontend

### Agent Scaling
- Each agent can be scaled independently
- Queue-based processing
- Async/await for non-blocking operations
- Worker threads for CPU-intensive tasks (planned)

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **AI/ML**: OpenAI GPT-4, LangChain
- **NLP**: Compromise.js, Sentiment
- **Scheduling**: node-cron

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Process Manager**: PM2 (production)
- **Monitoring**: (planned)

## Future Enhancements

1. **Vector Database**: Integrate ChromaDB for better similarity search
2. **Browser Extension**: Real-time fact-checking overlay
3. **Mobile Apps**: iOS and Android applications
4. **Advanced ML**: Custom fine-tuned models
5. **Blockchain**: Immutable verification records
6. **Federation**: Multi-organization collaboration
7. **Advanced Analytics**: Predictive modeling for misinformation spread
8. **API Gateway**: Rate limiting and API management
9. **Caching Layer**: Redis for performance
10. **Kubernetes**: Container orchestration for production
