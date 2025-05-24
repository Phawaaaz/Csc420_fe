import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { MapProvider } from '@/context/MapContext';

// Layouts
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// Features
import DashboardPage from '@/features/dashboard/DashboardPage';
import MapPage from '@/features/map/MapPage';
import DirectionPage from '@/features/direction/DirectionPage';
import SavedLocationPage from '@/features/saved/SavedLocationPage';
import SettingsPage from '@/features/settings/SettingsPage';
import AuthPage from '@/features/auth/AuthPage';
import NotFoundPage from '@/features/notFound/NotFoundPage';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <MapProvider>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>
            
            {/* App routes */}
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/direction" element={<DirectionPage />} />
              <Route path="/saved" element={<SavedLocationPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MapProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
