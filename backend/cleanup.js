require('dotenv').config();
const mongoose = require('mongoose');

async function cleanup() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    const db = mongoose.connection.db;

    try {
      await db.collection('users').dropIndex('username_1');
      console.log('Dropped old username index');
    } catch (err) {
      console.log('Index not found or already removed');
    }

    const result = await db.collection('users').deleteMany({ username: null });
    console.log(`Deleted ${result.deletedCount} bad records`);

    console.log('Cleanup finished ✅');
    process.exit(0);

  } catch (err) {
    console.error('Cleanup failed:', err.message);
    process.exit(1);
  }
}

cleanup();
