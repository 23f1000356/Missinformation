# Setup Instructions

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- OpenAI API key

## Installation Steps

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/misinformation-platform

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# OpenAI API (Required for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: External APIs
NEWS_API_KEY=your_news_api_key
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# Vector Database
CHROMA_DB_PATH=./data/chromadb

# CORS Settings
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 4. Run the Application

```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the Application

- **User Dashboard**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
- **API Server**: http://localhost:5000

## Default Admin Account

To create an admin account, register a new user and manually update the role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Testing the AI Features

1. **Fact-Check a Claim**: Go to the user dashboard and paste any claim to verify
2. **Chat with AI**: Use the AI assistant to ask questions about claims
3. **Admin Features**: Access the admin dashboard to monitor agents and view analytics

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGODB_URI in your .env file
- For Atlas, ensure your IP is whitelisted

### OpenAI API Issues
- Verify your API key is valid
- Check you have sufficient credits
- Ensure the key has access to GPT-4 (or change to GPT-3.5 in agent files)

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## Production Deployment

### Backend (Node.js)
- Set NODE_ENV=production
- Use a process manager like PM2
- Set up proper MongoDB with authentication
- Use environment variables for secrets

### Frontend (React)
- Build the client: `cd client && npm run build`
- Serve the build folder with a web server (nginx, Apache, etc.)
- Update API URLs to production endpoints

### Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Enable MongoDB authentication
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable API key rotation
- [ ] Set up monitoring and logging

## Features Overview

### Multi-Agent AI System
- **Ingestor Agent**: Data collection and normalization
- **Claim Extractor**: AI-powered claim identification
- **Cluster Agent**: Semantic grouping of similar claims
- **Verification Agent**: Evidence search and analysis
- **Multilingual Agent**: Translation and language detection
- **Fact-Checker Assistant**: Interactive AI chat
- **Analyst Agent**: Automated reporting and insights
- **Governance Agent**: Bias detection and audit logging

### Admin Dashboard
- Real-time agent monitoring
- Claim intelligence visualization
- Verification studio (AI + Human)
- Trends and heatmaps
- Automated report generation
- Governance and audit logs

### User Dashboard
- Instant claim verification
- AI chat assistant
- Trending misinformation feed
- Personalized credibility scoring
- Multi-language support

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Claims Endpoints
- `GET /api/claims` - Get all claims (with filters)
- `GET /api/claims/:id` - Get single claim
- `POST /api/claims` - Submit new claim
- `POST /api/claims/quick-verify` - Quick verification
- `PATCH /api/claims/:id` - Update claim (admin)

### Agent Endpoints
- `GET /api/agents/status` - Get all agent statuses
- `POST /api/agents/:name/:action` - Control agent (admin)
- `POST /api/agents/chat` - Chat with AI assistant

### Analytics Endpoints
- `GET /api/analytics/overview` - Dashboard overview
- `GET /api/analytics/trends` - Trend data
- `GET /api/analytics/categories` - Category distribution
- `GET /api/analytics/heatmap` - Geographic heatmap
- `GET /api/analytics/top-clusters` - Top clusters

### Governance Endpoints
- `GET /api/governance/audit-logs` - Audit logs (admin)
- `GET /api/governance/compliance-report` - Compliance report (admin)
- `GET /api/governance/bias-report` - Bias detection report (admin)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the README.md
3. Check MongoDB and API logs
4. Verify environment variables are set correctly
