const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(async () => {
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    try {
      // Drop old username index
      await db.collection('users').dropIndex('username_1');
      console.log('Dropped old username index');
    } catch (err) {
      console.log('Index not found or already removed');
    }

    // Remove bad null records
    const result = await db.collection('users').deleteMany({ username: null });
    console.log(`Deleted ${result.deletedCount} bad records`);

    process.exit();
  })
  .catch(err => console.error(err));
