// Test script for Community Report functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testCommunityEndpoints() {
  try {
    console.log('🧪 Testing Community Report endpoints...\n');

    // Test 1: Get community claims
    console.log('1. Testing GET /community/claims');
    try {
      const claimsResponse = await axios.get(`${BASE_URL}/community/claims`);
      console.log(`✅ Claims endpoint working: ${claimsResponse.data.claims?.length || 0} claims found`);
    } catch (error) {
      console.log(`❌ Claims endpoint failed: ${error.message}`);
    }

    // Test 2: Get community stats
    console.log('\n2. Testing GET /community/stats');
    try {
      const statsResponse = await axios.get(`${BASE_URL}/community/stats`);
      console.log(`✅ Stats endpoint working:`);
      console.log(`   - Total votes: ${statsResponse.data.totalVotes || 0}`);
      console.log(`   - Total voters: ${statsResponse.data.totalVoters || 0}`);
      console.log(`   - Claims with votes: ${statsResponse.data.claimsWithVotes || 0}`);
    } catch (error) {
      console.log(`❌ Stats endpoint failed: ${error.message}`);
    }

    // Test 3: Get leaderboard
    console.log('\n3. Testing GET /community/leaderboard');
    try {
      const leaderboardResponse = await axios.get(`${BASE_URL}/community/leaderboard`);
      console.log(`✅ Leaderboard endpoint working: ${leaderboardResponse.data?.length || 0} contributors found`);
    } catch (error) {
      console.log(`❌ Leaderboard endpoint failed: ${error.message}`);
    }

    // Test 4: Test voting (requires user ID)
    console.log('\n4. Testing community voting...');
    try {
      // First get a claim
      const claimsResponse = await axios.get(`${BASE_URL}/community/claims?limit=1`);
      if (claimsResponse.data.claims && claimsResponse.data.claims.length > 0) {
        const claim = claimsResponse.data.claims[0];
        console.log(`   - Found claim to test: "${claim.text.substring(0, 50)}..."`);
        console.log(`   - Current votes: True=${claim.trueVotes}, False=${claim.falseVotes}, Misleading=${claim.misleadingVotes}`);
      } else {
        console.log('   - No claims available for voting test');
      }
    } catch (error) {
      console.log(`❌ Voting test setup failed: ${error.message}`);
    }

    // Test 5: Check database collections
    console.log('\n5. Testing database connectivity...');
    try {
      const healthResponse = await axios.get(`${BASE_URL}/health`);
      console.log(`✅ Server health check passed`);
      console.log(`   - Status: ${healthResponse.data.status}`);
      console.log(`   - Scraping scheduler: ${healthResponse.data.scrapingScheduler?.isRunning ? 'Running' : 'Stopped'}`);
    } catch (error) {
      console.log(`❌ Health check failed: ${error.message}`);
    }

    console.log('\n🎉 Community Report testing completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Visit http://localhost:5173/community to test the UI');
    console.log('2. Login and try voting on claims');
    console.log('3. Check the leaderboard and statistics');
    console.log('4. View your voting history');

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
}

// Run the tests
testCommunityEndpoints();
