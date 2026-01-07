import { CheckCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRole: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        targetRole: user.targetRole || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await updateProfile(formData.name, formData.targetRole);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Profile update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
            <UserCircleIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">Profile Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account information</p>
        </div>

        {success && (
          <div className="mb-6 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-200 flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="input-field bg-dark-600/50 cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-gray-500">
              Email cannot be changed. Contact support if you need to update it.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Job Role
            </label>
            <select
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select your target role</option>
              {jobRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              This helps us provide more relevant analysis and suggestions.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Account Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card mt-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Member since</span>
            <span className="text-white">
              {user ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Account status</span>
            <span className="text-green-500">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email verified</span>
            <span className="text-green-500">Yes</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;