import { ArrowRightOnRectangleIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = user ? [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Upload Resume', link: '/upload' },
    { name: 'History', link: '/history' },
  ] : [];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg' 
          : 'bg-transparent py-5 dark:bg-transparent light:bg-white/50'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors border border-primary/20">
                <img src="/logo.svg" alt="Rezumate Logo" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">Rezu<span className="text-primary">mate</span></span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-1">
            {user && navItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link 
                  key={item.name}
                  to={item.link}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive ? 'text-white' : 'text-dark-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10 border border-white/5"
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3 ml-4 border-l border-white/10 pl-4">
                <Link 
                  to="/profile" 
                  className="flex items-center text-dark-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-dark-900 border border-white/5 shadow-sm hover:border-white/10 group"
                >
                  <UserCircleIcon className="h-5 w-5 mr-2 text-primary group-hover:text-primary-light transition-colors" />
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-dark-300 hover:text-error hover:bg-error/10 rounded-lg transition-colors border border-transparent hover:border-error/20"
                  aria-label="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 border-l border-white/10 pl-4">
                <Link 
                  to="/auth" 
                  className="text-dark-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth" 
                  className="btn-primary py-2 px-5 text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-dark-300 hover:text-white hover:bg-dark-800 transition-colors bg-dark-900 border border-white/5 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
        
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-dark-950/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center px-4 py-3 mb-4 bg-dark-900 rounded-xl border border-white/5">
                    <UserCircleIcon className="h-10 w-10 text-primary mr-3" />
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-dark-400 text-sm">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.link;
                      return (
                        <Link 
                          key={item.name}
                          to={item.link}
                          className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-dark-200 hover:text-white hover:bg-white/5'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                    <Link 
                      to="/profile" 
                      className="block px-4 py-3 rounded-xl text-dark-200 hover:text-white hover:bg-white/5 text-base font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings & Profile
                    </Link>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-4">
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-error hover:bg-error/10 rounded-xl text-base font-medium transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/auth" 
                    className="block w-full text-center px-4 py-3 text-white bg-dark-800 hover:bg-dark-700 rounded-xl text-base font-medium transition-colors border border-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth" 
                    className="flex justify-center w-full btn-primary py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Free Account
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;