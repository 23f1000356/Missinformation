# Quick Start Guide

Get the AI Misinformation Intelligence Platform running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ MongoDB installed and running (`mongod --version`)
- ✅ OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment (1 minute)

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/misinformation-platform
JWT_SECRET=my-super-secret-key-12345
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
CLIENT_URL=http://localhost:5173
```

**Important**: Replace `sk-your-actual-openai-api-key-here` with your real OpenAI API key!

### 3. Start MongoDB (if not running)

```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. Run the Application (1 minute)

```bash
# Start both backend and frontend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
🌐 Client URL: http://localhost:5173
✅ Connected to MongoDB
🤖 Initializing AI Agents...
```

### 5. Access the Platform

Open your browser and navigate to:
- **User Dashboard**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin

## First Time Usage

### Admin Login (Default Account)

A default admin account is automatically created when the server starts:

**Admin Credentials:**
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

1. Go to http://localhost:5173
2. Click "Login"
3. Enter the admin credentials above
4. You'll be redirected to the admin dashboard

⚠️ **Security Note**: Change the default password after first login in production!

### Create a User Account

1. Go to http://localhost:5173
2. Click "Register"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
4. Click "Create Account"

### Try Fact-Checking

1. On the user dashboard, paste a claim like:
   ```
   "Vaccines cause autism"
   ```
2. Click "Verify with AI"
3. Wait 5-10 seconds for AI analysis
4. View the verdict, confidence score, and explanation
5. Ask follow-up questions in the AI chat

## Testing the Platform

### User Dashboard Features

1. **Fact-Check Claims**
   - Paste any claim or statement
   - Get instant AI verification
   - View confidence scores and evidence

2. **AI Chat Assistant**
   - Ask "Why is this false?"
   - Request "Explain like I'm 5"
   - Get context and sources

3. **View Trending**
   - See what misinformation is spreading
   - Check recent verifications

### Admin Dashboard Features

1. **Overview**
   - View AI situational brief
   - Monitor claim statistics
   - See top misinformation clusters

2. **Streams & Agents**
   - Monitor all 8 AI agents
   - View processing queues
   - Control agent status (pause/resume)

3. **Claim Intelligence**
   - Browse all claims
   - View clusters and connections
   - Search and filter

4. **Verification Studio**
   - Review pending claims
   - Verify with AI assistance
   - Submit verdicts

5. **Trends & Heatmaps**
   - View category distribution
   - See geographic spread
   - Identify trending topics

6. **Reports**
   - Generate daily briefs
   - Create weekly reports
   - Export analytics

7. **Governance**
   - View audit logs
   - Run bias detection
   - Check compliance

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: 
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Issue: "OpenAI API error"
**Solution**:
- Verify your API key is correct in `.env`
- Check you have credits: https://platform.openai.com/account/usage
- Ensure no extra spaces in the API key

### Issue: "Port 5000 already in use"
**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Issue: "Module not found"
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

cd client
rm -rf node_modules
npm install
```

### Issue: Frontend won't start
**Solution**:
```bash
cd client
npm run dev
```

## Example Claims to Test

Try verifying these claims:

1. **False Claim**: "5G towers cause COVID-19"
2. **True Claim**: "The Earth orbits around the Sun"
3. **Misleading**: "Eating carrots improves night vision" (partially true, but exaggerated)
4. **Political**: "Unemployment rate is at historic lows"
5. **Health**: "Drinking 8 glasses of water daily is essential"

## Next Steps

### Customize the Platform

1. **Add Data Sources**: Edit `server/agents/IngestorAgent.js` to add Twitter, Reddit, etc.
2. **Adjust AI Prompts**: Modify prompts in agent files for different behaviors
3. **Change UI Theme**: Edit `client/tailwind.config.js` for colors
4. **Add Languages**: The system supports all languages via GPT-4

### Production Deployment

See `SETUP.md` for detailed production deployment instructions including:
- Environment configuration
- Database security
- SSL/HTTPS setup
- Process management with PM2
- Monitoring and logging

### Learn More

- **Architecture**: Read `ARCHITECTURE.md` for system design details
- **API Docs**: See `SETUP.md` for API endpoint documentation
- **README**: Check `README.md` for feature overview

## Support & Resources

- **OpenAI Documentation**: https://platform.openai.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **React Docs**: https://react.dev
- **Node.js Docs**: https://nodejs.org/docs

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes reflect immediately
- Backend: Nodemon restarts server on file changes

### Debugging
```bash
# View backend logs
npm run server

# View frontend logs
cd client && npm run dev

# MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

### Testing API Endpoints
Use tools like:
- **Postman**: https://www.postman.com
- **Thunder Client** (VS Code extension)
- **curl** commands

Example:
```bash
# Health check
curl http://localhost:5000/api/health

# Quick verify
curl -X POST http://localhost:5000/api/claims/quick-verify \
  -H "Content-Type: application/json" \
  -d '{"text": "The moon is made of cheese"}'
```

## Performance Tips

1. **Use GPT-3.5 for faster responses** (edit agent files)
2. **Limit claim batch sizes** to avoid rate limits
3. **Add caching** for frequently accessed data
4. **Index MongoDB collections** for faster queries

## Security Reminders

⚠️ **Before deploying to production**:
- [ ] Change JWT_SECRET to a strong random string
- [ ] Enable MongoDB authentication
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Never commit `.env` file
- [ ] Rotate API keys regularly
- [ ] Set up rate limiting
- [ ] Enable logging and monitoring

---

## You're All Set! 🎉

The platform is now running. Start fact-checking claims and exploring the AI-powered features!

**Need help?** Check the troubleshooting section above or review the detailed documentation in `SETUP.md` and `ARCHITECTURE.md`.
