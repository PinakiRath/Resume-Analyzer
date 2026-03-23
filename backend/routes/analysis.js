import express from 'express';
import { getResumeAnalysis } from '../controllers/resumeController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Since analysis is part of resume, we'll reuse the resume controller
// GET /api/analysis/:id is the same as GET /api/resume/:id
router.route('/:id').get(protect, getResumeAnalysis);

export default router;