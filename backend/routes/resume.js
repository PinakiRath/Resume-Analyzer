import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadResume, getResumeAnalysis, getResumeHistory } from '../controllers/resumeController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `resume_${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

router.route('/upload').post(protect, upload.single('resume'), uploadResume);
router.route('/history').get(protect, getResumeHistory);
router.route('/:id').get(protect, getResumeAnalysis);

export default router;