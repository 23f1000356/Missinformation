const EnhancedVerificationService = require('./server/services/EnhancedVerificationService');

async function testVerification() {
  console.log('🧪 Testing Enhanced Verification System\n');
  
  const testClaims = [
    'The Earth revolves around the Sun',
    'Vaccines cause autism',
    'Climate change is a hoax',
    'Water boils at 100 degrees Celsius',
    'The moon is made of cheese'
  ];
  
  for (const claim of testClaims) {
    console.log(`\n🔍 Testing claim: "${claim}"`);
    console.log('─'.repeat(50));
    
    try {
      const result = await EnhancedVerificationService.verifyClaim(claim);
      
      console.log(`✅ Verdict: ${result.verdict.toUpperCase()}`);
      console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
      console.log(`📝 Source: ${result.source}`);
      console.log(`💬 Explanation: ${result.explanation?.short || 'No explanation'}`);
      
      if (result.evidence && result.evidence.length > 0) {
        console.log(`🔗 Evidence sources: ${result.evidence.length}`);
        result.evidence.slice(0, 2).forEach((evidence, idx) => {
          console.log(`   ${idx + 1}. ${evidence.source}: ${evidence.title}`);
        });
      }
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n📊 System Statistics:');
  const stats = EnhancedVerificationService.getStats();
  console.log(`   Scientific facts in database: ${stats.scientificFactsCount}`);
  console.log(`   AI configured: ${stats.aiConfigured}`);
  console.log(`   AI provider: ${stats.aiProvider}`);
  console.log(`   Web scraping enabled: ${stats.webScrapingEnabled}`);
}

// Run the test
testVerification().catch(console.error);
