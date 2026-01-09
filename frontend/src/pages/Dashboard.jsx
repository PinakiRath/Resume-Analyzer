import { ArrowUpTrayIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Analyze your resume for ATS compatibility",
      icon: <ArrowUpTrayIcon className="h-6 w-6 text-primary" />,
      link: "/upload",
    },
    {
      title: "View History",
      description: "Check your previous resume analyses",
      icon: <ClockIcon className="h-6 w-6 text-primary" />,
      link: "/history",
    },
    {
      title: "Update Profile",
      description: "Manage your account settings",
      icon: <UserCircleIcon className="h-6 w-6 text-primary" />,
      link: "/profile",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>

        <p className="text-gray-400">
          Get started by uploading your resume for analysis
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card hover:bg-dark-600 transition-colors duration-200 cursor-pointer"
            onClick={() => (window.location.href = action.link)}
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                {action.icon}
              </div>

              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {action.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          How it works
        </h2>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
              1
            </div>
            <div>
              <h3 className="font-medium text-white">
                Upload Your Resume
              </h3>
              <p className="text-gray-400 text-sm">
                Upload your PDF resume to our secure platform
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
              2
            </div>
            <div>
              <h3 className="font-medium text-white">
                AI Analysis
              </h3>
              <p className="text-gray-400 text-sm">
                Our AI analyzes your resume for ATS compatibility
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
              3
            </div>
            <div>
              <h3 className="font-medium text-white">
                Get Results
              </h3>
              <p className="text-gray-400 text-sm">
                Receive detailed analysis with improvement suggestions
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <Link
          to="/upload"
          className="btn-primary inline-flex items-center px-6 py-3"
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
          Upload Resume for Analysis
        </Link>
      </motion.div>

    </div>
  );
};

export default Dashboard;
