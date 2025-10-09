const { getAIService } = require('./AIService');
const WebScrapingService = require('./WebScrapingService');

class EnhancedVerificationService {
  constructor() {
    this.aiService = getAIService();
    
    // Well-established scientific facts that should always be verified as true
    this.scientificFacts = [
      {
        patterns: [/earth.*revolves.*around.*sun/i, /earth.*orbits.*sun/i, /sun.*center.*solar.*system/i],
        verdict: 'true',
        confidence: 0.99,
        explanation: 'This is a well-established scientific fact. The Earth orbits around the Sun in our solar system, as proven by centuries of astronomical observations and scientific evidence.'
      },
      {
        patterns: [/gravity.*exists/i, /objects.*fall.*down/i, /gravity.*pulls.*objects/i],
        verdict: 'true',
        confidence: 0.99,
        explanation: 'Gravity is a fundamental force of nature, well-documented and proven through scientific observation and experimentation.'
      },
      {
        patterns: [/water.*boils.*100.*celsius/i, /water.*boils.*212.*fahrenheit/i],
        verdict: 'true',
        confidence: 0.95,
        explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure. This is a well-established physical property.'
      },
      {
        patterns: [/vaccines.*cause.*autism/i],
        verdict: 'false',
        confidence: 0.98,
        explanation: 'Multiple large-scale scientific studies have conclusively shown no link between vaccines and autism. This claim has been thoroughly debunked by the medical community.'
      },
      {
        patterns: [/climate.*change.*hoax/i, /global.*warming.*hoax/i],
        verdict: 'false',
        confidence: 0.97,
        explanation: 'Climate change is supported by overwhelming scientific consensus. It is not a hoax but a well-documented phenomenon backed by extensive research.'
      }
    ];
  }

  /**
   * Enhanced claim verification that combines multiple approaches
   */
  async verifyClaim(claimText) {
    console.log(`🔍 Enhanced verification for: "${claimText.substring(0, 50)}..."`);
    
    try {
      // Step 1: Check against known scientific facts
      const scientificCheck = this.checkScientificFacts(claimText);
      if (scientificCheck) {
        console.log('✅ Matched known scientific fact');
        return {
          ...scientificCheck,
          source: 'scientific-knowledge',
          evidence: [{
            source: 'Scientific Consensus',
            title: 'Well-established Scientific Fact',
            snippet: scientificCheck.explanation,
            url: 'https://en.wikipedia.org/wiki/Scientific_consensus',
            relevanceScore: 1.0,
            verdict: scientificCheck.verdict,
            factCheckingSite: 'Scientific Knowledge Base'
          }]
        };
      }

      // Step 2: Try web scraping first
      let webScrapingResult = null;
      try {
        webScrapingResult = await WebScrapingService.verifyClaim(claimText);
        console.log('✅ Web scraping completed');
        
        // If web scraping found good results, use them
        if (webScrapingResult && webScrapingResult.evidence.length > 0 && webScrapingResult.confidence > 0.5) {
          return webScrapingResult;
        }
      } catch (error) {
        console.warn('⚠️ Web scraping failed:', error.message);
      }

      // Step 3: Use AI-powered fact-checking as fallback or enhancement
      console.log('🤖 Using AI-powered fact-checking...');
      const aiResult = await this.aiFactCheck(claimText);
      
      // Step 4: Combine results if both are available
      if (webScrapingResult && aiResult) {
        return this.combineResults(webScrapingResult, aiResult);
      }
      
      // Return AI result if web scraping failed or had low confidence
      if (aiResult) {
        return aiResult;
      }
      
      // Return web scraping result as last resort
      if (webScrapingResult) {
        return webScrapingResult;
      }
      
      // If everything fails, return unverified
      return {
        verdict: 'unverified',
        confidence: 0.1,
        explanation: {
          short: 'Unable to verify this claim',
          medium: 'We could not find sufficient evidence to verify this claim through our fact-checking sources.',
          long: 'This claim could not be verified through our available fact-checking methods including web scraping and AI analysis.',
          eli5: 'We couldn\'t find enough information to check if this is true or false.'
        },
        evidence: [],
        source: 'no-verification-possible'
      };
      
    } catch (error) {
      console.error('❌ Enhanced verification failed:', error);
      throw error;
    }
  }

  /**
   * Check claim against known scientific facts
   */
  checkScientificFacts(claimText) {
    const normalizedClaim = claimText.toLowerCase().trim();
    
    for (const fact of this.scientificFacts) {
      for (const pattern of fact.patterns) {
        if (pattern.test(normalizedClaim)) {
          return {
            verdict: fact.verdict,
            confidence: fact.confidence,
            explanation: {
              short: fact.explanation,
              medium: fact.explanation,
              long: fact.explanation + ' This is part of our scientific knowledge base.',
              eli5: this.simplifyExplanation(fact.explanation)
            }
          };
        }
      }
    }
    
    return null;
  }

  /**
   * AI-powered fact-checking using Gemini/OpenAI
   */
  async aiFactCheck(claimText) {
    if (!this.aiService.isConfigured()) {
      throw new Error('AI service not configured');
    }

    const prompt = `You are an expert fact-checker. Analyze the following claim and provide a detailed fact-check.

Claim: "${claimText}"

Please analyze this claim and respond with a JSON object containing:
{
  "verdict": "true" | "false" | "misleading" | "unverified",
  "confidence": 0.0-1.0,
  "explanation": {
    "short": "Brief explanation (1-2 sentences)",
    "medium": "Detailed explanation (3-4 sentences)",
    "long": "Comprehensive explanation with context",
    "eli5": "Simple explanation for a 5-year-old"
  },
  "evidence": [
    {
      "source": "Source name",
      "title": "Evidence title",
      "snippet": "Key evidence snippet",
      "url": "https://example.com (if available)",
      "relevanceScore": 0.0-1.0,
      "verdict": "supports/refutes/neutral"
    }
  ],
  "reasoning": "Step-by-step reasoning process"
}

Guidelines:
- For well-established scientific facts (like Earth orbiting Sun), mark as "true" with high confidence
- For debunked conspiracy theories, mark as "false" with high confidence  
- For complex claims, provide nuanced analysis
- Always provide evidence and reasoning
- Be objective and fact-based`;

    try {
      const messages = [
        {
          role: 'system',
          content: 'You are a professional fact-checker with expertise in science, politics, health, and current events. Always provide accurate, evidence-based analysis.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const response = await this.aiService.generateJSON(messages, { temperature: 0.3 });
      
      if (!response) {
        throw new Error('AI returned empty response');
      }

      // Validate and enhance the AI response
      return {
        verdict: response.verdict || 'unverified',
        confidence: Math.min(Math.max(response.confidence || 0.5, 0), 1),
        explanation: response.explanation || {
          short: 'AI analysis completed',
          medium: 'The AI has analyzed this claim based on available knowledge.',
          long: 'Our AI fact-checking system has processed this claim using its training data.',
          eli5: 'The computer checked this claim for you.'
        },
        evidence: this.formatAIEvidence(response.evidence || []),
        source: 'ai-analysis',
        reasoning: response.reasoning || 'AI-based analysis',
        aiProvider: this.aiService.getProvider()
      };
      
    } catch (error) {
      console.error('❌ AI fact-checking failed:', error);
      throw new Error(`AI fact-checking failed: ${error.message}`);
    }
  }

  /**
   * Format AI evidence to match expected structure
   */
  formatAIEvidence(aiEvidence) {
    return aiEvidence.map(evidence => ({
      source: evidence.source || 'AI Knowledge Base',
      title: evidence.title || 'AI Analysis',
      snippet: evidence.snippet || evidence.description || 'Evidence from AI analysis',
      url: evidence.url || 'https://en.wikipedia.org/wiki/Fact-checking',
      relevanceScore: evidence.relevanceScore || 0.8,
      verdict: evidence.verdict || 'neutral',
      factCheckingSite: 'AI Analysis',
      scrapedAt: new Date()
    }));
  }

  /**
   * Combine web scraping and AI results
   */
  combineResults(webResult, aiResult) {
    // Use web scraping verdict if confidence is high, otherwise use AI
    const primaryResult = webResult.confidence > aiResult.confidence ? webResult : aiResult;
    const secondaryResult = webResult.confidence > aiResult.confidence ? aiResult : webResult;
    
    return {
      verdict: primaryResult.verdict,
      confidence: Math.max(webResult.confidence, aiResult.confidence),
      explanation: primaryResult.explanation,
      evidence: [
        ...webResult.evidence,
        ...aiResult.evidence
      ],
      source: 'combined-analysis',
      webScrapingData: webResult.webScrapingData,
      aiAnalysis: {
        verdict: aiResult.verdict,
        confidence: aiResult.confidence,
        reasoning: aiResult.reasoning,
        provider: aiResult.aiProvider
      },
      scrapingSummary: webResult.scrapingSummary
    };
  }

  /**
   * Simplify explanation for ELI5 format
   */
  simplifyExplanation(explanation) {
    // Simple patterns to make explanations more child-friendly
    return explanation
      .replace(/scientific evidence/gi, 'scientists have proven')
      .replace(/well-established/gi, 'we know for sure')
      .replace(/astronomical observations/gi, 'looking at space with telescopes')
      .replace(/centuries of/gi, 'many years of')
      .replace(/fundamental force/gi, 'basic rule of nature')
      .replace(/atmospheric pressure/gi, 'air pressure')
      .replace(/conclusively shown/gi, 'clearly proven')
      .replace(/medical community/gi, 'doctors and scientists');
  }

  /**
   * Get verification statistics
   */
  getStats() {
    return {
      scientificFactsCount: this.scientificFacts.length,
      aiConfigured: this.aiService.isConfigured(),
      aiProvider: this.aiService.getProvider(),
      webScrapingEnabled: true
    };
  }
}

module.exports = new EnhancedVerificationService();
