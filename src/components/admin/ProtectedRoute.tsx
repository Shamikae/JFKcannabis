import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'staff';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'admin'
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    // If user doesn't have required role, redirect to unauthorized page
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;