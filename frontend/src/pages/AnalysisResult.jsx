import { ArrowDownTrayIcon, CheckCircleIcon, LightBulbIcon, XCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { exportAsJSON, generateAnalysisReport } from '../services/exportService';

const AnalysisResult = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const { data, isLoading, error, refetch } = useQuery(
    ['analysis', id],
    async () => {
      const response = await axios.get(`/api/resume/${id}`);
      return response.data.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!id
    }
  );

  useEffect(() => {
    if (data) {
      setResumeData(data.resume);
      setAnalysisData(data.analysis);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-xl">Error loading analysis results</div>
        <button 
          onClick={() => refetch()}
          className="mt-4 btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis Results</h1>
        <p className="text-gray-400">Detailed breakdown of your resume's ATS compatibility</p>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="text-center">
          <div className="relative inline-block">
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#374151"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={analysisData.atsScore >= 80 ? "#22c55e" : analysisData.atsScore >= 60 ? "#facc15" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${analysisData.atsScore} ${100 - analysisData.atsScore}`}
                strokeDashoffset="25"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy="0.3em"
                fill="white"
                fontSize="20"
                fontWeight="bold"
              >
                {analysisData.atsScore}%
              </text>
            </svg>
          </div>
          <h2 className={`text-4xl font-bold mt-4 ${getScoreColor(analysisData.atsScore)}`}>
            ATS Score: {analysisData.atsScore}%
          </h2>
          <p className="text-gray-400 mt-2">
            Your resume's compatibility with ATS systems
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card text-center"
        >
          <div className={`text-3xl font-bold ${getScoreColor(analysisData.matchPercentage)}`}>
            {analysisData.matchPercentage}%
          </div>
          <div className="text-gray-400 mt-2">Job Role Match</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card text-center"
        >
          <div className="text-3xl font-bold text-white">
            {analysisData.skillsFound?.length || 0}
          </div>
          <div className="text-gray-400 mt-2">Skills Found</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card text-center"
        >
          <div className="text-3xl font-bold text-red-500">
            {analysisData.skillsMissing?.length || 0}
          </div>
          <div className="text-gray-400 mt-2">Skills Missing</div>
        </motion.div>
      </div>

      {/* Skills Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4">Skills Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-500 mb-2 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Skills Found
            </h3>
            <div className="space-y-2">
              {analysisData.skillsFound?.map((skill, index) => (
                <div key={index} className="flex items-center bg-dark-600 p-2 rounded">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-white">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-red-500 mb-2 flex items-center">
              <XCircleIcon className="h-5 w-5 mr-2" />
              Skills Missing
            </h3>
            <div className="space-y-2">
              {analysisData.skillsMissing?.map((skill, index) => (
                <div key={index} className="flex items-center bg-dark-600 p-2 rounded">
                  <XCircleIcon className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-white">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <LightBulbIcon className="h-6 w-6 mr-2 text-primary" />
          AI-Powered Suggestions
        </h2>
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-line text-gray-300">
            {analysisData.aiFeedback || "No AI feedback available for this analysis."}
          </div>
        </div>
      </motion.div>

      {/* Sections Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4">Resume Sections</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(analysisData.sections || {}).map(([section, present]) => (
            <div key={section} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                present ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {present ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <XCircleIcon className="h-6 w-6" />
                )}
              </div>
              <div className="text-sm text-gray-400 capitalize">{section}</div>
              <div className="text-xs text-gray-500">
                {present ? 'Present' : 'Missing'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4">Export Results</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => generateAnalysisReport(resumeData, analysisData)}
            className="btn-primary inline-flex items-center px-4 py-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export as PDF
          </button>
          <button 
            onClick={() => exportAsJSON(resumeData, analysisData)}
            className="btn-secondary inline-flex items-center px-4 py-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export as JSON
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisResult;