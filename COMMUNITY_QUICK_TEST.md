# Community Report - Quick Test Guide

## 🚀 Quick Start

Your Community Report system is now ready! Here's how to test it:

### 1. **Server Status Check**
Your server should already be running with these logs:
```
✅ Connected to MongoDB
🌱 Seeding misinformation clusters...
✅ Created 7 clusters
🗳️ Seeding community votes...
✅ Community votes seeding completed successfully!
🚀 Server running on port 5000
```

### 2. **Access Community Report**

**Option A: Direct URL**
- Go to: `http://localhost:5173/community`

**Option B: From User Dashboard**
- Go to: `http://localhost:5173`
- Login with default credentials
- Click "Community Report" in the sidebar

### 3. **Test the Features**

#### **Tab 1: Vote on Claims**
1. Browse available claims
2. See existing community vote counts
3. Cast your vote:
   - Select: True/False/Misleading/Unverified
   - Set confidence: 0-100%
   - Add evidence (optional)
   - Submit vote
4. See updated vote counts immediately

#### **Tab 2: Leaderboard**
- View top contributors
- See user rankings
- Check credibility scores
- View voting statistics

#### **Tab 3: My Votes**
- See your voting history
- Review your previous votes
- Track your accuracy

#### **Tab 4: Statistics**
- Community vote distribution
- Top contributors
- Overall participation metrics

## 🧪 API Testing

Test the backend APIs directly:
```bash
node test-community.js
```

Expected output:
```
✅ Claims endpoint working: X claims found
✅ Stats endpoint working:
   - Total votes: X
   - Total voters: X
   - Claims with votes: X
✅ Leaderboard endpoint working: X contributors found
```

## 🎯 Sample Data

The system includes:
- **10+ Claims** available for voting
- **5 Sample Users** with different credibility scores
- **25+ Community Votes** with realistic patterns
- **Weighted Consensus** calculations
- **Leaderboard Rankings** based on activity

## 🔧 Troubleshooting

### **If Community Report page is blank:**
1. Check browser console for errors
2. Verify server is running on port 5000
3. Check network tab for failed API calls

### **If no claims appear:**
1. Ensure database has claims: Check server logs for "Created X claims"
2. Try refreshing the page
3. Check filters - set to "All Categories" and "All Status"

### **If voting doesn't work:**
1. Make sure you're logged in
2. Check browser console for errors
3. Verify user ID is being passed correctly

### **Database Issues:**
If you see MongoDB errors:
1. Ensure MongoDB is running
2. Check connection string in .env
3. Try restarting the server

## 🎮 Test Scenarios

### **Scenario 1: New User Voting**
1. Login as a regular user
2. Go to Community Report
3. Vote on 2-3 claims
4. Check leaderboard position
5. View voting history

### **Scenario 2: Consensus Building**
1. Vote on the same claim with multiple users
2. Watch vote counts update
3. See if consensus is reached (60% threshold)
4. Check if claim verdict updates

### **Scenario 3: Evidence Submission**
1. Vote on a claim
2. Add detailed evidence/reasoning
3. Submit vote
4. Check if evidence appears in voting history

## 📊 Expected Results

After testing, you should see:
- **Active voting interface** with real-time updates
- **Community statistics** showing participation
- **Leaderboard** with user rankings
- **Personal voting history** tracking your contributions
- **Consensus indicators** when community agrees

## 🎉 Success Indicators

✅ **Community Report page loads** without errors
✅ **Claims display** with vote counts
✅ **Voting works** and updates immediately
✅ **Leaderboard shows** active contributors
✅ **Statistics display** community metrics
✅ **Personal history** tracks your votes

## 🔄 Next Steps

Once testing is complete:
1. **Invite more users** to participate
2. **Add more claims** for voting
3. **Monitor consensus** building
4. **Track user engagement** metrics
5. **Expand gamification** features

The Community Report transforms your platform into a collaborative fact-checking ecosystem where users actively participate in fighting misinformation!
