import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function cleanup() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection.db;

    try {
      await db.collection('users').dropIndex('username_1');
    } catch {
      // Index not found or already removed — safe to ignore
    }

    const result = await db.collection('users').deleteMany({ username: null });

    console.log(`Cleanup finished — deleted ${result.deletedCount} bad records ✅`);
    process.exit(0);
  } catch (err) {
    console.error('Cleanup failed:', err.message);
    process.exit(1);
  }
}

cleanup();
