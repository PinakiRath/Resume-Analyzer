import { ArrowUpTrayIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [analysisId, setAnalysisId] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const jobRoles = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile Developer",
    "UI/UX Designer",
    "Project Manager",
    "Machine Learning Engineer",
    "Cybersecurity Specialist",
    "Cloud Engineer"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Clear previous error
    setError('');
    
    if (selectedFile.type !== 'application/pdf') {
      setError('Invalid file type. Please upload a PDF file.');
      return false;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
      setError('File size exceeds 5MB limit. Please upload a smaller file.');
      return false;
    }
    
    if (selectedFile.size === 0) {
      setError('File is empty. Please select a valid file.');
      return false;
    }
    
    setFile(selectedFile);
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    if (!jobRole) {
      setError('Please select a job role');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobRole', jobRole);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      clearInterval(interval);
      setUploadProgress(100);
      setSuccess(true);
      setAnalysisId(response.data.data.resume._id);

      // Redirect to analysis results after a short delay
      setTimeout(() => {
        navigate(`/analysis/${response.data.data.resume._id}`);
      }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <DocumentTextIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Upload Your Resume</h1>
          <p className="text-gray-400 mt-2">
            Upload your PDF resume to get ATS analysis and improvement suggestions
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 flex items-start">
            <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>Resume uploaded successfully! Analyzing your resume...</span>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Resume (PDF)
            </label>
            <div className="flex items-center justify-center w-full">
              <label 
                className={`flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer transition-colors duration-200 ${
                  isDragActive 
                    ? 'border-2 border-primary bg-primary/10' 
                    : 'border-2 border-dashed border-gray-600 bg-dark-600 hover:bg-dark-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowUpTrayIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                  <p className="text-xs text-gray-500 mt-2">Supported formats: PDF</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <div className="mt-2 text-sm text-gray-400 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-400 ml-2"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Job Role
            </label>
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="input-field"
            >
              <option value="">Select your target role</option>
              {jobRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              This helps us analyze your resume for the specific role requirements
            </p>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill bg-primary" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || !file || !jobRole}
            className={`btn-primary w-full ${(!file || !jobRole) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? 'Analyzing...' : 'Upload & Analyze Resume'}
          </button>
        </div>

        <div className="mt-8 p-4 bg-dark-600 rounded-lg">
          <h3 className="font-medium text-white mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li className="flex items-start">
              <CheckCircleIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>We'll analyze your resume's ATS compatibility</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Get your ATS score and skill match percentage</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>Receive AI-powered improvement suggestions</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeUpload;