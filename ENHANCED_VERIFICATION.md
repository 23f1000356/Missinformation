# Enhanced Verification System

## Overview

The Enhanced Verification System combines multiple approaches to provide accurate fact-checking:

1. **Scientific Knowledge Base** - Built-in database of well-established scientific facts
2. **Web Scraping** - Searches multiple fact-checking websites
3. **AI Analysis** - Uses Gemini/OpenAI for intelligent fact-checking
4. **Combined Analysis** - Merges results for maximum accuracy

## Problem Solved

**Before**: Claims like "The Earth revolves around the Sun" were showing as "UNVERIFIED" with low confidence because:
- Web scraping couldn't find specific fact-checking articles for basic scientific facts
- The system relied too heavily on finding dedicated fact-check articles

**After**: The enhanced system now:
- ✅ Recognizes well-established scientific facts immediately
- ✅ Uses AI to analyze claims when web scraping fails
- ✅ Provides accurate verdicts with high confidence
- ✅ Combines multiple verification methods for better results

## Features

### 1. Scientific Knowledge Base
Pre-configured patterns for well-established facts:
- Earth revolves around the Sun → TRUE (99% confidence)
- Gravity exists → TRUE (99% confidence)
- Vaccines cause autism → FALSE (98% confidence)
- Climate change is a hoax → FALSE (97% confidence)

### 2. AI-Powered Analysis
- Uses Gemini or OpenAI for intelligent fact-checking
- Provides detailed explanations and reasoning
- Handles complex claims that require nuanced analysis
- Fallback when web scraping finds no results

### 3. Web Scraping Enhancement
- Searches 6+ fact-checking sites (Snopes, PolitiFact, FactCheck.org, etc.)
- Extracts verdicts and evidence
- Calculates relevance scores
- Respects robots.txt and rate limits

### 4. Combined Results
- Merges web scraping and AI results
- Uses highest confidence verdict
- Provides comprehensive evidence from all sources
- Tracks analysis metadata

## Setup Instructions

### 1. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file and add your API key
# For Gemini (recommended - free):
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key-here

# For OpenAI (paid):
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 2. Get API Keys

#### Gemini API (Free)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create new API key
4. Copy key to `.env` file

#### OpenAI API (Paid)
1. Visit: https://platform.openai.com/api-keys
2. Sign in to OpenAI account
3. Create new API key
4. Copy key to `.env` file

### 3. Run Setup Script
```bash
node setup-enhanced-verification.js
```

### 4. Test the System
```bash
node test-verification.js
```

## API Changes

### Enhanced Response Format
```json
{
  "verdict": "true",
  "confidence": 0.99,
  "explanation": {
    "short": "This is a well-established scientific fact...",
    "medium": "The Earth orbits around the Sun in our solar system...",
    "long": "Comprehensive explanation with context...",
    "eli5": "Simple explanation for a 5-year-old"
  },
  "evidence": [
    {
      "source": "Scientific Consensus",
      "title": "Well-established Scientific Fact",
      "snippet": "Evidence description",
      "url": "https://en.wikipedia.org/wiki/Scientific_consensus",
      "relevanceScore": 1.0,
      "verdict": "true",
      "factCheckingSite": "Scientific Knowledge Base"
    }
  ],
  "source": "scientific-knowledge",
  "claimId": "claim_id",
  "aiAnalysis": {
    "provider": "gemini",
    "verdict": "true",
    "confidence": 0.99,
    "reasoning": "AI reasoning process"
  },
  "scrapingSummary": {
    "sitesSearched": 6,
    "resultsFound": 3,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Verification Flow

1. **Check Scientific Facts**: Look for patterns in built-in knowledge base
2. **Web Scraping**: Search fact-checking sites if not found
3. **AI Analysis**: Use AI as fallback or enhancement
4. **Combine Results**: Merge all available evidence
5. **Return Best Result**: Highest confidence verdict with all evidence

## Testing Results

After implementation, these claims now show correct results:

| Claim | Before | After |
|-------|--------|-------|
| "The Earth revolves around the Sun" | UNVERIFIED (10%) | TRUE (99%) |
| "Vaccines cause autism" | UNVERIFIED | FALSE (98%) |
| "Climate change is a hoax" | UNVERIFIED | FALSE (97%) |
| "Water boils at 100°C" | UNVERIFIED | TRUE (95%) |

## File Structure

```
server/
├── services/
│   ├── EnhancedVerificationService.js  # Main enhanced service
│   ├── WebScrapingService.js          # Web scraping logic
│   └── AIService.js                   # AI integration
├── routes/
│   └── claims.js                      # Updated API endpoints
└── models/
    └── Claim.js                       # Updated model with AI fields

test-verification.js                   # Test script
setup-enhanced-verification.js         # Setup helper
```

## Configuration Options

### Scientific Facts Database
Add new patterns in `EnhancedVerificationService.js`:
```javascript
{
  patterns: [/your.*pattern.*here/i],
  verdict: 'true',
  confidence: 0.95,
  explanation: 'Your explanation here'
}
```

### AI Provider Selection
```bash
# Use Gemini (recommended)
AI_PROVIDER=gemini

# Use OpenAI
AI_PROVIDER=openai
```

### Web Scraping Sites
Configured in `WebScrapingService.js`:
- Snopes
- PolitiFact  
- FactCheck.org
- AFP Fact Check
- Alt News
- Boom Live

## Troubleshooting

### Common Issues

1. **"AI service not configured"**
   - Check `.env` file has correct API key
   - Verify `AI_PROVIDER` matches your configured service

2. **Low confidence results**
   - Add more patterns to scientific facts database
   - Check if web scraping is finding relevant results
   - Verify AI is providing good analysis

3. **Web scraping failures**
   - Check internet connection
   - Verify fact-checking sites are accessible
   - Review rate limiting delays

### Debug Mode
Enable detailed logging by setting:
```bash
NODE_ENV=development
```

## Performance

- **Scientific Facts**: Instant recognition (< 10ms)
- **Web Scraping**: 2-5 seconds (searches 6 sites)
- **AI Analysis**: 1-3 seconds (depends on provider)
- **Combined**: 3-8 seconds total for complex claims

## Security

- API keys stored in environment variables
- Rate limiting for web scraping
- Robots.txt compliance
- Input validation and sanitization

## Future Enhancements

1. **Machine Learning**: Train custom models on fact-checking data
2. **Real-time Updates**: Dynamic scientific facts database
3. **Multi-language**: Support for non-English claims
4. **Image Analysis**: Fact-check images and videos
5. **Social Media**: Direct integration with platforms

## Support

For issues or questions:
1. Check this documentation
2. Run the test script: `node test-verification.js`
3. Review server logs for detailed error messages
4. Ensure all dependencies are installed: `npm install`
