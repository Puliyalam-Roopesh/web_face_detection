import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, User, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FaceScanner from './FaceScanner';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { login, isLoading, setIsLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const [error, setError] = useState('');
  const [scanComplete, setScanComplete] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleStartScan = () => {
    if (!username) {
      setError('Please enter a username first');
      return;
    }
    setError('');
    setShowWebcam(true);
  };

  const handleCapture = async () => {
    if (!webcamRef.current) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (!imageSrc) {
        throw new Error('Failed to capture image');
      }
      
      setScanComplete(true);
      
      // Send registration request to backend
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          faceData: imageSrc,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        login(data.user);
      } else {
        setError(data.message || 'Registration failed');
        setScanComplete(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
      setScanComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <motion.div 
          className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <ShieldCheck size={30} className="text-blue-500" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-600 mt-1">Register with facial recognition</p>
      </div>

      {error && (
        <motion.div 
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Choose a Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <input
            id="username"
            type="text"
            className="input-field pl-10"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={showWebcam || isLoading}
          />
        </div>
      </div>

      {!showWebcam ? (
        <button
          className="btn-primary w-full flex items-center justify-center"
          onClick={handleStartScan}
          disabled={isLoading}
        >
          <Camera size={18} className="mr-2" />
          Capture Face
        </button>
      ) : (
        <div className="mt-4">
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 300,
                height: 225,
                facingMode: "user"
              }}
              className="rounded-lg"
            />
            <FaceScanner isScanning={!scanComplete} isComplete={scanComplete} />
          </div>
          
          <div className="mt-4 flex flex-col space-y-3">
            <button
              className="btn-primary"
              onClick={handleCapture}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Registering</span>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                </>
              ) : (
                'Register'
              )}
            </button>
            
            <button
              className="btn-secondary"
              onClick={() => setShowWebcam(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-medium"
            disabled={isLoading}
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;