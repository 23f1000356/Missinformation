#!/usr/bin/env node

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import services
const ComprehensiveVerificationService = require('./server/services/ComprehensiveVerificationService');
const MLVerificationService = require('./server/services/MLVerificationService');

// Test claims with known outcomes
const testClaims = [
  {
    claim: "Vaccines cause autism",
    expectedVerdict: "refuted",
    description: "Well-debunked medical misinformation"
  },
  {
    claim: "The Earth revolves around the Sun",
    expectedVerdict: "supported", 
    description: "Basic scientific fact"
  },
  {
    claim: "Drinking water helps with hydration",
    expectedVerdict: "supported",
    description: "Common knowledge claim"
  },
  {
    claim: "Broccoli is a green vegetable",
    expectedVerdict: "supported",
    description: "Simple factual claim"
  },
  {
    claim: "Climate change is caused by solar flares from Mars",
    expectedVerdict: "refuted",
    description: "Scientific misinformation"
  }
];

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/misinformation-platform');
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
}

async function testMLService() {
  console.log('\n🧪 Testing ML Verification Service...');
  
  try {
    const status = MLVerificationService.getStatus();
    console.log('📊 ML Service Status:', status);
    
    // Try to initialize models
    const initialized = await MLVerificationService.initializeModels();
    console.log(`🤖 ML Models Initialized: ${initialized}`);
    
    return initialized;
  } catch (error) {
    console.error('❌ ML Service test failed:', error.message);
    return false;
  }
}

async function testComprehensiveService() {
  console.log('\n🔍 Testing Comprehensive Verification Service...');
  
  try {
    const status = ComprehensiveVerificationService.getStatus();
    console.log('📊 Comprehensive Service Status:', JSON.stringify(status, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Comprehensive Service test failed:', error.message);
    return false;
  }
}

async function runVerificationTests() {
  console.log('\n🚀 Running Verification Tests...\n');
  
  const results = [];
  
  for (let i = 0; i < testClaims.length; i++) {
    const testCase = testClaims[i];
    console.log(`\n📝 Test ${i + 1}/${testClaims.length}: ${testCase.description}`);
    console.log(`🔍 Claim: "${testCase.claim}"`);
    
    try {
      const startTime = Date.now();
      const result = await ComprehensiveVerificationService.verifyClaim(testCase.claim);
      const duration = Date.now() - startTime;
      
      console.log(`⏱️  Duration: ${duration}ms`);
      console.log(`📊 Result: ${result.classification}`);
      console.log(`🎯 Expected: ${testCase.expectedVerdict}, Got: ${result.verdict}`);
      
      const isCorrect = result.verdict.toLowerCase().includes(testCase.expectedVerdict.toLowerCase()) ||
                       testCase.expectedVerdict.toLowerCase().includes(result.verdict.toLowerCase());
      
      results.push({
        claim: testCase.claim,
        expected: testCase.expectedVerdict,
        actual: result.verdict,
        confidence: result.confidence,
        correct: isCorrect,
        duration,
        classification: result.classification,
        evidenceCount: result.evidence?.length || 0
      });
      
      console.log(`${isCorrect ? '✅' : '❌'} ${isCorrect ? 'PASSED' : 'FAILED'}`);
      
      // Add delay between tests to be respectful to external services
      if (i < testClaims.length - 1) {
        console.log('⏳ Waiting 2 seconds before next test...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
      results.push({
        claim: testCase.claim,
        expected: testCase.expectedVerdict,
        actual: 'error',
        confidence: 0,
        correct: false,
        duration: 0,
        error: error.message,
        evidenceCount: 0
      });
    }
  }
  
  return results;
}

function generateReport(results) {
  console.log('\n📊 VERIFICATION TEST REPORT');
  console.log('=' .repeat(50));
  
  const passed = results.filter(r => r.correct).length;
  const total = results.length;
  const accuracy = ((passed / total) * 100).toFixed(1);
  
  console.log(`\n🎯 Overall Accuracy: ${passed}/${total} (${accuracy}%)`);
  
  const avgConfidence = results
    .filter(r => r.confidence > 0)
    .reduce((sum, r) => sum + r.confidence, 0) / results.filter(r => r.confidence > 0).length;
  
  console.log(`📈 Average Confidence: ${(avgConfidence * 100).toFixed(1)}%`);
  
  const avgDuration = results
    .filter(r => r.duration > 0)
    .reduce((sum, r) => sum + r.duration, 0) / results.filter(r => r.duration > 0).length;
  
  console.log(`⏱️  Average Duration: ${avgDuration.toFixed(0)}ms`);
  
  const totalEvidence = results.reduce((sum, r) => sum + r.evidenceCount, 0);
  console.log(`🔍 Total Evidence Collected: ${totalEvidence} items`);
  
  console.log('\n📋 Detailed Results:');
  results.forEach((result, index) => {
    const status = result.correct ? '✅' : '❌';
    console.log(`\n${index + 1}. ${status} ${result.claim.substring(0, 50)}...`);
    console.log(`   Expected: ${result.expected} | Got: ${result.actual}`);
    if (result.classification) {
      console.log(`   Output: ${result.classification}`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  console.log('\n🔧 System Performance:');
  console.log(`- ML Models: ${results.some(r => r.duration > 0) ? 'Working' : 'Failed'}`);
  console.log(`- Web Scraping: ${results.some(r => r.evidenceCount > 0) ? 'Working' : 'Limited'}`);
  console.log(`- Error Rate: ${((total - passed) / total * 100).toFixed(1)}%`);
  
  return {
    accuracy: parseFloat(accuracy),
    avgConfidence: avgConfidence,
    avgDuration: avgDuration,
    totalTests: total,
    passed: passed,
    failed: total - passed
  };
}

async function main() {
  console.log('🚀 ML Verification System Test Suite');
  console.log('====================================\n');
  
  // Connect to database
  const dbConnected = await connectDatabase();
  if (!dbConnected) {
    console.log('⚠️ Continuing without database connection...');
  }
  
  // Test ML Service
  const mlWorking = await testMLService();
  
  // Test Comprehensive Service
  const comprehensiveWorking = await testComprehensiveService();
  
  if (!comprehensiveWorking) {
    console.error('❌ Cannot run tests - Comprehensive Service not working');
    process.exit(1);
  }
  
  // Run verification tests
  const results = await runVerificationTests();
  
  // Generate report
  const report = generateReport(results);
  
  // Final recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (report.accuracy >= 80) {
    console.log('✅ System is working well! Ready for production use.');
  } else if (report.accuracy >= 60) {
    console.log('⚠️ System is partially working. Consider:');
    console.log('   - Installing Python ML dependencies');
    console.log('   - Checking internet connection for web scraping');
    console.log('   - Configuring AI service (Gemini/OpenAI)');
  } else {
    console.log('❌ System needs attention. Check:');
    console.log('   - Python and ML dependencies installation');
    console.log('   - Network connectivity');
    console.log('   - Environment variables configuration');
  }
  
  if (report.avgDuration > 10000) {
    console.log('⏱️ Consider optimizing for faster response times');
  }
  
  console.log('\n🎉 Test suite completed!');
  
  // Cleanup
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  
  process.exit(report.accuracy >= 60 ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { runVerificationTests, generateReport };
