const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  atsScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  skillsFound: [{
    type: String,
    trim: true
  }],
  skillsMissing: [{
    type: String,
    trim: true
  }],
  matchPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  jobRole: {
    type: String,
    required: true,
    trim: true
  },
  sections: {
    summary: {
      type: Boolean,
      default: false
    },
    experience: {
      type: Boolean,
      default: false
    },
    education: {
      type: Boolean,
      default: false
    },
    skills: {
      type: Boolean,
      default: false
    },
    contact: {
      type: Boolean,
      default: false
    }
  },
  formattingQuality: {
    type: Number,
    min: 0,
    max: 100
  },
  aiFeedback: {
    type: String,
    default: ''
  },
  improvementSuggestions: [{
    type: String
  }],
  keywordDensity: {
    type: Number,
    min: 0,
    max: 100
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Analysis', analysisSchema);