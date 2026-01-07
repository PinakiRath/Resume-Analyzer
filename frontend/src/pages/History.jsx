import { ArrowUpTrayIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const History = () => {
  const { data, isLoading, error, refetch } = useQuery(
    'resumeHistory',
    async () => {
      const response = await axios.get('/api/resume/history');
      return response.data.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1
    }
  );

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
        <div className="text-red-500 text-xl">Error loading history</div>
        <button 
          onClick={() => refetch()}
          className="mt-4 btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis History</h1>
        <p className="text-gray-400">View your previous resume analyses</p>
      </motion.div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div
              key={item.resume._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:bg-dark-600 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-white">{item.resume.fileName}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.resume.createdAt).toLocaleDateString()} • {item.resume.jobRole}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`text-lg font-bold ${getScoreColor(item.analysis?.atsScore || 0)}`}>
                    {item.analysis?.atsScore || 0}%
                  </div>
                  <Link
                    to={`/analysis/${item.resume._id}`}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card text-center"
        >
          <div className="mx-auto h-12 w-12 rounded-full bg-dark-600 flex items-center justify-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mt-4">No analysis history</h3>
          <p className="text-gray-400 mt-2">
            You haven't analyzed any resumes yet. Upload your resume to get started.
          </p>
          <div className="mt-6">
            <Link
              to="/upload"
              className="btn-primary inline-flex items-center"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Resume
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default History;