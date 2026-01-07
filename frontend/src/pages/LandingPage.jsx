import { ArrowRightIcon, ChartBarIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      title: "ATS Score",
      description: "Get your resume's ATS compatibility score to understand how well it passes automated screening systems.",
      icon: <ChartBarIcon className="h-8 w-8 text-primary" />
    },
    {
      title: "Skill Extraction",
      description: "Identify which skills from the job description are present or missing in your resume.",
      icon: <LightBulbIcon className="h-8 w-8 text-primary" />
    },
    {
      title: "Job Role Match",
      description: "See how well your resume aligns with the specific job role you're applying for.",
      icon: <ShieldCheckIcon className="h-8 w-8 text-primary" />
    },
    {
      title: "AI-Powered Suggestions",
      description: "Receive actionable recommendations to improve your resume and increase interview chances.",
      icon: <ArrowRightIcon className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-dark-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start">
                  <img src="/logo.svg" alt="Rezumate Logo" className="w-16 h-16 mb-4 lg:mb-0 lg:mr-4" />
                  <motion.h1 
                    className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="block">AI-Powered Resume</span>
                    <span className="block text-primary mt-2">ATS Analyzer</span>
                  </motion.h1>
                </div>
                <motion.p 
                  className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Upload your resume and get instant analysis on ATS compatibility, skill matching, and actionable improvement suggestions. 
                  Increase your chances of getting past automated screening systems and landing interviews.
                </motion.p>
                <motion.div 
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/auth"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/upload"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-dark-700 hover:bg-dark-600 md:py-4 md:text-lg md:px-10"
                    >
                      Analyze Resume
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.div 
            className="h-56 w-full bg-gradient-to-r from-primary to-purple-600 sm:h-72 lg:h-full lg:w-full opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2 
              className="text-base text-primary font-semibold tracking-wide uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Features
            </motion.h2>
            <motion.h3 
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to optimize your resume
            </motion.h3>
            <motion.p 
              className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our AI-powered platform provides comprehensive analysis to help you get past ATS systems and land more interviews.
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title} 
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 text-primary">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dark-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.h2 
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block">Ready to optimize your resume?</span>
            <span className="block text-primary mt-2">Get started today.</span>
          </motion.h2>
          <motion.div 
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;