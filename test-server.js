// Simple test script to verify server functionality
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Try to connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/misinformation-platform', {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', '));
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Solutions:');
    console.log('1. Install MongoDB Community Server');
    console.log('2. Start MongoDB service: net start MongoDB (as admin)');
    console.log('3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    console.log('4. Update MONGODB_URI in .env file');
  }
}

testConnection();
