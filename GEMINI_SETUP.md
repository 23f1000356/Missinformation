# Using Google Gemini API (Free Alternative to OpenAI)

Google Gemini offers a **generous free tier** that's perfect for development and testing!

## Step 1: Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key (starts with `AIza...`)

## Step 2: Install the Gemini Package

```bash
npm install @google/generative-ai
```

## Step 3: Configure Your Environment

Update your `.env` file:

```env
# AI Provider - Choose 'gemini' or 'openai'
AI_PROVIDER=gemini

# Google Gemini API Key (FREE!)
GEMINI_API_KEY=AIzaSy...your-actual-key-here

# Optional: Keep OpenAI as fallback
OPENAI_API_KEY=sk-your-openai-key-here
```

## Step 4: Restart Your Server

```bash
npm run dev
```

## Gemini Free Tier Limits

- **60 requests per minute** (RPM)
- **1 million tokens per day**
- **1500 requests per day**
- **FREE forever!** ✨

## Models Available

The system will automatically try these models in order:
1. `gemini-1.5-flash` - Fast and efficient (recommended)
2. `gemini-1.5-flash-8b` - Even faster, smaller model
3. `gemini-pro` - Fallback option

## Troubleshooting

### Rate Limit Errors
If you see rate limit errors, the system will:
1. Automatically retry with different models
2. Fall back to OpenAI if configured
3. Return mock responses as last resort

### API Key Not Working
- Make sure your API key starts with `AIza`
- Check that you've enabled the Gemini API in Google AI Studio
- Verify your `.env` file has `AI_PROVIDER=gemini`

## Switching Between Providers

You can easily switch between OpenAI and Gemini by changing the `AI_PROVIDER` in your `.env` file:

```env
# Use Gemini (free)
AI_PROVIDER=gemini

# Or use OpenAI (paid)
AI_PROVIDER=openai
```

The system will automatically use the configured provider with fallback support!

## Benefits of Gemini

✅ **Free tier** - No credit card required  
✅ **Fast responses** - Optimized for speed  
✅ **High quality** - Comparable to GPT-4  
✅ **Generous limits** - 1M tokens/day  
✅ **Easy setup** - Just one API key  

Enjoy unlimited fact-checking! 🚀
