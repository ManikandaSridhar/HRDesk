const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('\n   ⚠️  TROUBLESHOOTING:');
    console.error('   1. Whitelist your IP in MongoDB Atlas (Network Access)');
    console.error('   2. Check if credentials are correct');
    console.error('   3. Ensure database URL is accessible');
    console.error('   4. Check your internet connection\n');
    process.exit(1);
  }
};

module.exports = connectDB;
