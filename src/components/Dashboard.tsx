import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Bell, Settings, Home } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <motion.div 
                  className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <ShieldCheck size={20} className="text-blue-500" />
                </motion.div>
                <span className="ml-2 text-xl font-semibold text-gray-800">FaceAuth</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Home size={18} className="mr-1" />
                  Dashboard
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Settings size={18} className="mr-1" />
                  Settings
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <motion.div 
            className="px-4 py-6 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-center mb-6">
                <motion.div 
                  className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={40} className="text-blue-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.username}!</h1>
                <p className="text-gray-600 mt-1">You've successfully authenticated with facial recognition</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
                <p className="text-sm">
                  This is a demonstration of a facial authentication system. In a real application, 
                  you would have access to protected resources and user-specific content here.
                </p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Sample cards that would show user data in a real app */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Security</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Your account is protected with facial authentication.</p>
                    </div>
                    <div className="mt-3">
                      <button className="btn-secondary text-sm">Update Settings</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Last login: Just now</p>
                    </div>
                    <div className="mt-3">
                      <button className="btn-secondary text-sm">View All Activity</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Info</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>User ID: {user?.id.substring(0, 8)}...</p>
                    </div>
                    <div className="mt-3">
                      <button className="btn-secondary text-sm">Edit Profile</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={logout}
                  className="btn-primary"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Import the ShieldCheck icon
import { ShieldCheck } from 'lucide-react';

export default Dashboard;