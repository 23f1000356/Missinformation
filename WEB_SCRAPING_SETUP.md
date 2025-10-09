# Web Scraping Setup Guide

## Overview

This guide explains how to set up and use the web scraping functionality in your misinformation intelligence platform. The system automatically scrapes fact-checking websites to verify claims and provide evidence-based verdicts.

## Features Implemented

### ✅ Core Features
- **Automated Web Scraping**: Scrapes 6+ major fact-checking sites (Snopes, PolitiFact, FactCheck.org, AFP Fact Check, Alt News, Boom Live)
- **Real-time Claim Verification**: When users submit claims, the system automatically searches fact-checking sites
- **Evidence Collection**: Collects titles, snippets, ratings, and relevance scores from fact-checking sources
- **Database Integration**: Stores all scraping data with claims for future reference
- **Admin Dashboard**: Enhanced Claim Intelligence section with web scraping statistics and manual scraping controls
- **User Dashboard**: Enhanced evidence display showing web scraping sources and verdicts

### ✅ Automated Scheduling
- **Daily Scraping**: Processes unverified claims (runs at 2 AM)
- **Hourly Priority Scraping**: Handles urgent/viral claims (runs every hour)
- **Weekly Re-scraping**: Updates existing claims with fresh data (runs Sundays at 3 AM)

### ✅ Safety & Compliance
- **Rate Limiting**: Respectful delays between requests (1-3 seconds)
- **Robots.txt Compliance**: Checks robots.txt before scraping
- **Error Handling**: Graceful failure handling with detailed logging
- **User-Agent Rotation**: Uses realistic browser user agents

## Installation

### 1. Install Node.js Dependencies

The required Node.js packages are already added to your `package.json`:

```bash
npm install
```

Key packages added:
- `cheerio`: HTML parsing and manipulation
- `node-cron`: Task scheduling
- `axios`: HTTP requests

### 2. Install Python Dependencies (Optional)

For advanced scraping features, install Python dependencies:

```bash
pip install -r requirements.txt
```

This includes:
- `requests`: HTTP library
- `beautifulsoup4`: HTML parsing
- `pandas`: Data manipulation
- `selenium`: Browser automation
- `scrapy`: Web scraping framework

### 3. Environment Configuration

No additional environment variables are required. The system works out of the box with your existing setup.

## Usage

### User Dashboard

1. **Submit a Claim**: Users enter any claim in the verification input
2. **Automatic Scraping**: System searches fact-checking sites automatically
3. **View Results**: Enhanced evidence display shows:
   - Fact-checking site badges
   - Verdict indicators (True/False/Misleading)
   - Relevance scores
   - Source ratings
   - Web scraping summary

### Admin Dashboard

1. **View Statistics**: Claim Intelligence page shows:
   - Supported fact-checking sites count
   - Scraping coverage percentage
   - Number of scraped claims
   - Recent scraping activity

2. **Manual Scraping**: Click "Web Scrape" button on any claim to manually trigger scraping

3. **Monitor Status**: Health check endpoint (`/api/health`) includes scraping scheduler status

## API Endpoints

### New Endpoints Added

- `POST /api/claims/quick-verify` - Enhanced with web scraping
- `POST /api/claims/:id/scrape` - Manual scraping trigger (admin only)
- `GET /api/claims/scraping/stats` - Scraping statistics
- `GET /api/health` - Includes scraping scheduler status

## Supported Fact-Checking Sites

1. **Snopes** (snopes.com)
2. **PolitiFact** (politifact.com)
3. **FactCheck.org** (factcheck.org)
4. **AFP Fact Check** (factcheck.afp.com)
5. **Alt News** (altnews.in)
6. **Boom Live** (boomlive.in)

## Database Schema Updates

### Claim Model Enhancements

```javascript
// New fields added to Claim schema
evidence: [{
  // Existing fields...
  relevanceScore: Number,
  verdict: String,
  rating: String,
  scrapedAt: Date,
  factCheckingSite: String,
  content: String
}],

webScrapingData: {
  lastScraped: Date,
  sitesSearched: Number,
  resultsFound: Number,
  topRelevanceScore: Number,
  scrapingEnabled: Boolean,
  scrapingHistory: [{
    timestamp: Date,
    sitesSearched: Number,
    resultsFound: Number,
    topVerdict: String
  }]
}
```

## Scheduling Configuration

### Default Schedule
- **Daily Scraping**: 2:00 AM IST (unverified claims)
- **Hourly Scraping**: Every hour (priority claims)
- **Weekly Re-scraping**: Sunday 3:00 AM IST (existing claims)

### Manual Triggers
```javascript
// Trigger manual scraping jobs
ScrapingScheduler.triggerManualScraping('daily')
ScrapingScheduler.triggerManualScraping('hourly')
ScrapingScheduler.triggerManualScraping('weekly')
```

## Performance Considerations

### Rate Limiting
- 1-3 second delays between requests
- Maximum 20 claims per daily job
- Maximum 5 claims per hourly job
- Maximum 10 claims per weekly job

### Error Handling
- Individual site failures don't stop the process
- Detailed error logging for debugging
- Graceful degradation when scraping fails

### Resource Usage
- Minimal memory footprint
- Efficient HTML parsing with Cheerio
- Database indexing for performance

## Monitoring & Debugging

### Logs
The system provides detailed console logging:
```
🔍 Searching fact-checking sites for: "claim text..."
✅ Found 3 potential matches across fact-checking sites
🌐 Starting web scraping verification...
✅ Web scraping completed successfully
```

### Health Check
Monitor system status via `/api/health`:
```json
{
  "status": "healthy",
  "scrapingScheduler": {
    "isRunning": true,
    "activeTasks": ["daily", "hourly", "weekly"],
    "nextRuns": {
      "daily": "2024-01-02T02:00:00.000Z",
      "hourly": "2024-01-01T15:00:00.000Z",
      "weekly": "2024-01-07T03:00:00.000Z"
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **No Results Found**
   - Check if fact-checking sites are accessible
   - Verify claim text contains meaningful keywords
   - Check network connectivity

2. **Scraping Failures**
   - Review console logs for specific errors
   - Check if site structure has changed
   - Verify rate limiting isn't too aggressive

3. **Scheduler Not Running**
   - Check server logs for initialization errors
   - Verify MongoDB connection is stable
   - Ensure proper timezone configuration

### Debug Mode
Enable detailed logging by setting environment variable:
```bash
DEBUG=scraping npm start
```

## Future Enhancements

### Planned Features
- [ ] Machine learning for relevance scoring
- [ ] Additional fact-checking sites
- [ ] Image and video claim verification
- [ ] Multi-language support expansion
- [ ] Real-time scraping alerts

### Customization Options
- Add new fact-checking sites in `WebScrapingService.js`
- Modify scheduling in `ScrapingScheduler.js`
- Adjust rate limiting and delays
- Customize relevance scoring algorithms

## Security & Ethics

### Compliance
- Respects robots.txt files
- Uses reasonable request delays
- Only scrapes publicly available content
- No personal data collection

### Best Practices
- Monitor scraping frequency
- Respect site terms of service
- Implement proper error handling
- Regular code updates for site changes

## Support

For issues or questions:
1. Check console logs for error messages
2. Review this documentation
3. Test with simple claims first
4. Monitor network connectivity

The web scraping system is designed to be robust and self-healing, automatically handling most common issues while providing detailed logging for troubleshooting.
