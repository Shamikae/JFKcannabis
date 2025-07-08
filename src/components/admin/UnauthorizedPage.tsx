import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const UnauthorizedPage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-red-100">You don't have permission to access this page</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Hello, {user?.name}</h2>
            <p className="text-neutral-600">
              Your current role ({user?.role}) doesn't have the necessary permissions to access this section.
              Please contact an administrator if you believe you should have access.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/admin"
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
            <button
              onClick={logout}
              className="flex-1 py-2 px-4 border border-neutral-300 rounded-lg shadow-sm text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;