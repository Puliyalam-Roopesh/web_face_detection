import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const { user } = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [serverStatus, setServerStatus] = useState<'checking' | 'running' | 'error'>('checking');

  useEffect(() => {
    // Check if the Python server is running
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/status');
        if (response.ok) {
          setServerStatus('running');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        setServerStatus('error');
      }
    };

    checkServerStatus();
  }, []);

  if (serverStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="auth-card text-center">
          <h2 className="text-2xl font-semibold mb-4">Checking server status...</h2>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (serverStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="auth-card text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Server Error</h2>
          <p className="mb-4">The Python server is not running. Please start it with:</p>
          <div className="bg-gray-800 text-white p-3 rounded text-left mb-4">
            <code>python server/app.py</code>
          </div>
          <button 
            onClick={() => setServerStatus('checking')}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {view === 'login' ? (
        <Login onSwitchToRegister={() => setView('register')} />
      ) : (
        <Register onSwitchToLogin={() => setView('login')} />
      )}
    </div>
  );
}

export default App;