// Manual test script for Community Report
const mongoose = require('mongoose');
const CommunityVote = require('./server/models/CommunityVote');
const Claim = require('./server/models/Claim');
const User = require('./server/models/User');

async function manualTest() {
  try {
    console.log('🧪 Manual Community Report Test\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/misinformation-platform');
    console.log('✅ Connected to MongoDB');
    
    // Check existing data
    const claimCount = await Claim.countDocuments();
    const userCount = await User.countDocuments();
    const voteCount = await CommunityVote.countDocuments();
    
    console.log(`📊 Database Status:`);
    console.log(`   - Claims: ${claimCount}`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Community Votes: ${voteCount}`);
    
    if (claimCount === 0) {
      console.log('\n❌ No claims found. The server should seed claims automatically.');
      console.log('💡 Make sure your server is running and check the logs.');
    }
    
    if (userCount === 0) {
      console.log('\n❌ No users found. The server should create a default admin.');
      console.log('💡 Check if the admin seeding completed successfully.');
    }
    
    if (voteCount === 0) {
      console.log('\n⚠️ No community votes found. This is normal for a fresh install.');
      console.log('💡 Votes will be created when users start voting.');
    }
    
    // Test basic aggregation (similar to what the API does)
    if (claimCount > 0) {
      console.log('\n🔍 Testing claim aggregation...');
      
      const claimsWithVotes = await Claim.aggregate([
        { $limit: 5 },
        {
          $lookup: {
            from: 'communityvotes',
            localField: '_id',
            foreignField: 'claimId',
            as: 'communityVotes'
          }
        },
        {
          $addFields: {
            totalVotes: { $size: '$communityVotes' },
            trueVotes: {
              $size: {
                $filter: {
                  input: '$communityVotes',
                  cond: { $eq: ['$$this.vote', 'true'] }
                }
              }
            },
            falseVotes: {
              $size: {
                $filter: {
                  input: '$communityVotes',
                  cond: { $eq: ['$$this.vote', 'false'] }
                }
              }
            }
          }
        },
        {
          $project: {
            text: 1,
            category: 1,
            verdict: 1,
            totalVotes: 1,
            trueVotes: 1,
            falseVotes: 1
          }
        }
      ]);
      
      console.log(`✅ Found ${claimsWithVotes.length} claims for testing:`);
      claimsWithVotes.forEach((claim, idx) => {
        console.log(`   ${idx + 1}. "${claim.text.substring(0, 50)}..." (${claim.totalVotes} votes)`);
      });
    }
    
    console.log('\n🎯 Test Results:');
    if (claimCount > 0 && userCount > 0) {
      console.log('✅ Database is ready for Community Report');
      console.log('✅ You can now test the Community Report UI');
      console.log('\n📋 Next Steps:');
      console.log('1. Go to http://localhost:5173/community');
      console.log('2. Login with your user account');
      console.log('3. Try voting on claims');
      console.log('4. Check the leaderboard and statistics');
    } else {
      console.log('❌ Database not ready. Please ensure server is running properly.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

manualTest();
