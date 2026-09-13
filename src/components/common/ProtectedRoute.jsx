import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

/**
 * Enterprise ProtectedRoute Component
 * Guards private parent/shopping workflows:
 * - Prevents flash of protected content during session restoration
 * - Preserves target destination in location.state.from
 * - Redirects guests to /login
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const location = useLocation();

  // 1. Session Restoration Loading Gate (prevents screen flashing)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-12 h-12 border-4 border-pink-100 border-t-[#13805B] rounded-full animate-spin" />
          <span className="absolute text-base select-none">🍓</span>
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Verifying Parent Session...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated Redirect: Save intended route
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Authenticated: Render children or Outlet
  return children ? children : <Outlet />;
}
