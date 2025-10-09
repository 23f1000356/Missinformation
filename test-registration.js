// Test registration functionality
const axios = require('axios');

async function testRegistration() {
  try {
    console.log('🧪 Testing user registration...\n');

    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'password123'
    };

    console.log('📝 Attempting registration with:', {
      name: testUser.name,
      email: testUser.email,
      passwordLength: testUser.password.length
    });

    const response = await axios.post('http://localhost:5000/api/auth/register', testUser);

    console.log('✅ Registration successful!');
    console.log('📊 Response:', {
      status: response.status,
      userId: response.data.user?.id,
      userName: response.data.user?.name,
      userEmail: response.data.user?.email,
      credibilityScore: response.data.user?.credibilityScore,
      level: response.data.user?.level,
      tokenReceived: !!response.data.token
    });

    // Test login with the same user
    console.log('\n🔑 Testing login with the same credentials...');
    
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: testUser.email,
      password: testUser.password
    });

    console.log('✅ Login successful!');
    console.log('📊 Login Response:', {
      status: loginResponse.status,
      userId: loginResponse.data.user?.id,
      tokenReceived: !!loginResponse.data.token
    });

    console.log('\n🎉 Both registration and login are working correctly!');
    console.log('\n💡 If the UI registration is still failing, check:');
    console.log('1. Browser network tab for the exact error');
    console.log('2. Server console logs for detailed error messages');
    console.log('3. Make sure the frontend is sending the correct data format');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n🔍 This is a validation error. Check:');
      console.log('- All required fields are provided');
      console.log('- Password is at least 6 characters');
      console.log('- Email format is valid');
    } else if (error.response?.status === 500) {
      console.log('\n🔍 This is a server error. Check:');
      console.log('- MongoDB is running and connected');
      console.log('- All dependencies are installed');
      console.log('- Server logs for detailed error information');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🔍 Cannot connect to server. Make sure:');
      console.log('- Server is running on port 5000');
      console.log('- Run: npm run dev or npm run server');
    }
  }
}

testRegistration();
