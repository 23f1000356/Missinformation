const { getAIService } = require('./AIService');
const WebScrapingService = require('./WebScrapingService');
const MLVerificationService = require('./MLVerificationService');
const Claim = require('../models/Claim');

class ComprehensiveVerificationService {
  constructor() {
    this.aiService = getAIService();
    this.verificationPipeline = [
      'data_collection',
      'data_preprocessing', 
      'evidence_retrieval',
      'ml_verification',
      'result_formatting'
    ];
  }

  /**
   * Main verification method following the pipeline you specified
   */
  async verifyClaim(claimText, category = 'other') {
    console.log(`🔍 Starting comprehensive verification pipeline for: "${claimText.substring(0, 50)}..."`);
    
    const startTime = Date.now();
    const pipelineResults = {
      claim: claimText,
      category,
      startTime,
      steps: {}
    };

    try {
      // Step 1: Data Collection (Web Scraping + APIs)
      console.log('📊 Step 1: Data Collection');
      const evidenceData = await this.collectEvidence(claimText);
      pipelineResults.steps.data_collection = {
        completed: true,
        evidence_count: evidenceData.length,
        sources: [...new Set(evidenceData.map(e => e.source))]
      };

      // Step 2: Data Preprocessing
      console.log('🧹 Step 2: Data Preprocessing');
      const cleanedData = await this.preprocessData(claimText, evidenceData);
      pipelineResults.steps.data_preprocessing = {
        completed: true,
        cleaned_claim: cleanedData.claim,
        processed_evidence: cleanedData.evidence.length
      };

      // Step 3: Evidence Retrieval (Similarity Matching)
      console.log('🔎 Step 3: Evidence Retrieval');
      const relevantEvidence = await this.retrieveRelevantEvidence(cleanedData.claim, cleanedData.evidence);
      pipelineResults.steps.evidence_retrieval = {
        completed: true,
        relevant_evidence_count: relevantEvidence.length,
        avg_relevance_score: relevantEvidence.length > 0 ? 
          relevantEvidence.reduce((sum, e) => sum + e.relevanceScore, 0) / relevantEvidence.length : 0
      };

      // Step 4: ML Verification (BERT/RoBERTa)
      console.log('🤖 Step 4: ML Verification');
      console.log('🔍 ML Input:', {
        claim: cleanedData.claim,
        category: category,
        evidenceCount: relevantEvidence.length
      });
      
      const mlResult = await this.performMLVerification(cleanedData.claim, relevantEvidence, category);
      
      console.log('🎯 ML Result:', {
        verdict: mlResult.verdict,
        confidence: mlResult.confidence,
        reasoning: mlResult.reasoning,
        source: mlResult.source
      });
      
      pipelineResults.steps.ml_verification = {
        completed: true,
        verdict: mlResult.verdict,
        confidence: mlResult.confidence
      };

      // Step 5: Result Formatting
      console.log('📋 Step 5: Result Formatting');
      const finalResult = await this.formatFinalResult(mlResult, relevantEvidence, pipelineResults);
      
      // Save to database with the complete verification result
      try {
        console.log('💾 Saving verification result to database...');
        await this.saveToDB(claimText, finalResult, category);
        console.log('✅ Verification result saved successfully');
      } catch (dbError) {
        console.warn('⚠️ Database save failed, but continuing with verification result:', dbError.message);
      }

      console.log(`✅ Verification pipeline completed in ${Date.now() - startTime}ms`);
      return finalResult;

    } catch (error) {
      console.error('❌ Verification pipeline failed:', error);
      
      // Return fallback result
      return this.getFallbackResult(claimText, error.message);
    }
  }

  /**
   * Step 1: Data Collection - Web Scraping + APIs
   */
  async collectEvidence(claimText) {
    const evidence = [];
    
    try {
      // Web scraping from fact-checking sites
      console.log('🕷️ Collecting evidence via web scraping...');
      const webScrapingResult = await WebScrapingService.verifyClaim(claimText);
      
      if (webScrapingResult && webScrapingResult.evidence) {
        evidence.push(...webScrapingResult.evidence.map(e => ({
          ...e,
          collection_method: 'web_scraping'
        })));
      }

      // Additional API sources (you can add more here)
      console.log('🌐 Collecting evidence via APIs...');
      const apiEvidence = await this.collectFromAPIs(claimText);
      evidence.push(...apiEvidence);

      // Database evidence
      console.log('💾 Collecting evidence from database...');
      const dbEvidence = await this.collectFromDatabase(claimText);
      evidence.push(...dbEvidence);

    } catch (error) {
      console.warn('⚠️ Evidence collection partially failed:', error.message);
    }

    console.log(`📊 Collected ${evidence.length} evidence items`);
    return evidence;
  }

  /**
   * Collect evidence from APIs (placeholder for future API integrations)
   */
  async collectFromAPIs(claimText) {
    // Placeholder for Google Fact Check Tools API, NewsAPI, etc.
    // You can implement these based on your API keys and requirements
    return [];
  }

  /**
   * Collect evidence from database
   */
  async collectFromDatabase(claimText) {
    try {
      const existingClaims = await Claim.find({
        $text: { $search: claimText },
        evidence: { $exists: true, $ne: [] }
      }).limit(5);

      const dbEvidence = [];
      
      existingClaims.forEach(claim => {
        claim.evidence.forEach(evidence => {
          dbEvidence.push({
            ...evidence.toObject(),
            collection_method: 'database',
            source_claim_id: claim._id
          });
        });
      });

      return dbEvidence;
    } catch (error) {
      console.warn('⚠️ Database evidence collection failed:', error);
      return [];
    }
  }

  /**
   * Step 2: Data Preprocessing
   */
  async preprocessData(claimText, evidenceData) {
    // Clean and tokenize claim
    const cleanedClaim = claimText
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?-]/g, '')
      .toLowerCase();

    // Clean and structure evidence
    const processedEvidence = evidenceData.map(evidence => ({
      ...evidence,
      snippet: this.cleanText(evidence.snippet || evidence.content || ''),
      title: this.cleanText(evidence.title || ''),
      processed_at: new Date()
    })).filter(e => e.snippet.length > 10); // Filter out empty evidence

    return {
      claim: cleanedClaim,
      evidence: processedEvidence
    };
  }

  /**
   * Clean text for ML processing
   */
  cleanText(text) {
    if (!text) return '';
    
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?-]/g, '')
      .trim()
      .substring(0, 500); // Limit length for ML models
  }

  /**
   * Step 3: Evidence Retrieval using similarity
   */
  async retrieveRelevantEvidence(claim, evidence) {
    // Calculate relevance scores
    const scoredEvidence = evidence.map(e => ({
      ...e,
      relevanceScore: this.calculateSemanticSimilarity(claim, e.snippet + ' ' + e.title)
    }));

    // Filter and sort by relevance
    return scoredEvidence
      .filter(e => e.relevanceScore > 0.3)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5); // Top 5 most relevant
  }

  /**
   * Calculate semantic similarity (simplified version)
   */
  calculateSemanticSimilarity(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    // Jaccard similarity with length penalty
    const jaccard = intersection.size / union.size;
    const lengthPenalty = Math.min(text2.length / 100, 1); // Prefer longer evidence
    
    return jaccard * lengthPenalty;
  }

  /**
   * Step 4: ML Verification using transformer models
   */
  async performMLVerification(claim, evidence, category = 'other') {
    try {
      // Use ML service for verification with category
      const mlResult = await MLVerificationService.verifyClaim(claim, evidence, category);
      return mlResult;
    } catch (error) {
      console.warn('⚠️ ML verification failed, using fallback AI analysis:', error);
      
      // Fallback to AI service
      return await this.performAIVerification(claim, evidence);
    }
  }

  /**
   * Fallback AI verification
   */
  async performAIVerification(claim, evidence) {
    if (!this.aiService.isConfigured()) {
      throw new Error('Neither ML models nor AI service available');
    }

    const prompt = `Analyze this claim against the provided evidence and classify it:

Claim: "${claim}"

Evidence:
${evidence.map((e, i) => `${i+1}. ${e.source}: ${e.snippet}`).join('\n')}

Classify as:
- "supported" if evidence supports the claim
- "refuted" if evidence contradicts the claim  
- "not_enough_info" if insufficient evidence

Respond with JSON: {"verdict": "supported/refuted/not_enough_info", "confidence": 0.0-1.0, "reasoning": "explanation"}`;

    try {
      const response = await this.aiService.generateJSON([
        { role: 'system', content: 'You are an expert fact-checker. Analyze claims objectively.' },
        { role: 'user', content: prompt }
      ]);

      return {
        verdict: response.verdict || 'not_enough_info',
        confidence: Math.min(response.confidence || 0.5, 0.9),
        reasoning: response.reasoning || 'AI-based analysis',
        source: 'ai-fallback'
      };
    } catch (error) {
      throw new Error('Both ML and AI verification failed');
    }
  }

  /**
   * Step 5: Format final result in your required format
   */
  async formatFinalResult(mlResult, evidence, pipelineResults) {
    const { verdict, confidence, reasoning } = mlResult;
    
    // Format according to your requirements
    let emoji, formattedVerdict;
    
    switch (verdict.toLowerCase()) {
      case 'supported':
      case 'true':
        emoji = '✅';
        formattedVerdict = 'Supported';
        break;
      case 'refuted':
      case 'false':
        emoji = '❌';
        formattedVerdict = 'Refuted';
        break;
      default:
        emoji = '⚪';
        formattedVerdict = 'Not Enough Information';
        break;
    }

    const confidencePercent = Math.round(confidence * 100);
    
    return {
      // Your required format
      classification: `${emoji} ${formattedVerdict} (Confidence: ${confidencePercent}%)`,
      
      // Detailed breakdown
      verdict: verdict.toLowerCase(),
      confidence,
      confidencePercent,
      emoji,
      formattedVerdict,
      
      // Evidence and analysis
      evidence: evidence.slice(0, 5),
      reasoning,
      
      // Pipeline metadata
      pipeline: {
        steps_completed: Object.keys(pipelineResults.steps).length,
        total_time_ms: Date.now() - pipelineResults.startTime,
        evidence_sources: [...new Set(evidence.map(e => e.source))],
        verification_method: mlResult.source || 'ml-analysis'
      },
      
      // Detailed explanation
      explanation: {
        short: `${formattedVerdict} with ${confidencePercent}% confidence`,
        medium: `Analysis of ${evidence.length} evidence sources indicates this claim is ${formattedVerdict.toLowerCase()} (${confidencePercent}% confidence)`,
        long: `Our comprehensive verification pipeline analyzed this claim through web scraping, evidence retrieval, and machine learning models. Based on ${evidence.length} evidence sources from ${[...new Set(evidence.map(e => e.source))].join(', ')}, the claim is classified as ${formattedVerdict.toLowerCase()} with ${confidencePercent}% confidence. ${reasoning}`,
        eli5: `We checked this claim by looking at lots of websites and using smart computer programs. The result is: ${formattedVerdict.toLowerCase()}.`
      },
      
      timestamp: new Date(),
      version: '2.0'
    };
  }

  /**
   * Save verification result to database
   */
  async saveToDB(claimText, result, category = 'other') {
    try {
      // Map the verdict to database format
      let dbVerdict = 'unverified';
      if (result.verdict === 'supported') {
        dbVerdict = 'true';
      } else if (result.verdict === 'refuted') {
        dbVerdict = 'false';
      } else if (result.verdict === 'not_enough_info') {
        dbVerdict = 'unverified';
      }

      console.log('💾 Attempting to save claim to database:', {
        text: claimText.substring(0, 50) + '...',
        originalVerdict: result.verdict,
        dbVerdict: dbVerdict,
        confidence: result.confidence,
        category: category
      });

      // Always create a new claim entry for recent claims tracking
      const claim = new Claim({
        text: claimText,
        originalText: claimText,
        category: category,
        verdict: dbVerdict,
        confidence: result.confidence || 0.5,
        verificationStatus: 'verified',
        evidence: Array.isArray(result.evidence) ? result.evidence : [],
        explanation: result.explanation || { short: 'Verification completed' },
        aiAnalysis: {
          verdict: result.verdict || 'unverified',
          confidence: result.confidence || 0.5,
          reasoning: result.reasoning || 'AI-powered verification',
          provider: 'comprehensive-pipeline',
          analyzedAt: new Date()
        }
      });

      const savedClaim = await claim.save();
      console.log('✅ Claim saved successfully with ID:', savedClaim._id);
      console.log('📊 Saved claim details:', {
        id: savedClaim._id,
        text: savedClaim.text.substring(0, 50) + '...',
        verdict: savedClaim.verdict,
        createdAt: savedClaim.createdAt
      });
      
      return savedClaim;
    } catch (error) {
      console.error('❌ Failed to save to database:', error);
      console.error('Error details:', error.message);
      throw error; // Re-throw to see the error in the main flow
    }
  }

  /**
   * Get fallback result when pipeline fails
   */
  getFallbackResult(claimText, errorMessage) {
    return {
      classification: '⚪ Not Enough Information (Confidence: 20%)',
      verdict: 'not_enough_info',
      confidence: 0.2,
      confidencePercent: 20,
      emoji: '⚪',
      formattedVerdict: 'Not Enough Information',
      evidence: [],
      reasoning: `Verification failed: ${errorMessage}`,
      pipeline: {
        steps_completed: 0,
        total_time_ms: 0,
        evidence_sources: [],
        verification_method: 'fallback'
      },
      explanation: {
        short: 'Unable to verify this claim',
        medium: 'Our verification system encountered an error and could not analyze this claim',
        long: `The comprehensive verification pipeline failed to analyze this claim due to: ${errorMessage}. Please try again later.`,
        eli5: 'Sorry, we couldn\'t check this claim right now.'
      },
      timestamp: new Date(),
      version: '2.0',
      error: errorMessage
    };
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      pipeline_steps: this.verificationPipeline,
      ml_service: MLVerificationService.getStatus(),
      web_scraping: WebScrapingService.getScrapingStats(),
      ai_service: this.aiService.isConfigured()
    };
  }
}

module.exports = new ComprehensiveVerificationService();
