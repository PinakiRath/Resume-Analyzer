import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resume.js';
import analysisRoutes from './routes/analysis.js';



const app = express();

// Needed because __dirname doesn't exist in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analysis', analysisRoutes);

// Static frontend
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-analyzer'
)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Database connection error:', error);
});