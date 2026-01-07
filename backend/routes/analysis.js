const express = require('express');
const { getResumeAnalysis } = require('../controllers/resumeController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Since analysis is part of resume, we'll reuse the resume controller
// GET /api/analysis/:id is the same as GET /api/resume/:id
router.route('/:id').get(protect, getResumeAnalysis);

module.exports = router;