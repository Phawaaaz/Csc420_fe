import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Layouts
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// Features
import DashboardPage from '@/features/dashboard/DashboardPage';
import SavedLocationPage from '@/features/saved/SavedLocationPage';
import SettingsPage from '@/features/settings/SettingsPage';
import ProfileSettings from '@/features/settings/ProfileSettings';
import ThemeSettings from '@/features/settings/ThemeSettings';
import TutorialSettings from '@/features/settings/TutorialSettings';
import LanguageSettings from '@/features/settings/LanguageSettings';
import LoginPage from '@/features/auth/LoginPage';
import SignupPage from '@/features/auth/SignupPage';
import NotFoundPage from '@/features/notFound/NotFoundPage';
import LoadingScreen from '@/features/loading/LoadingScreen';

// Lazy-loaded: these pull in react-leaflet/leaflet, by far the heaviest
// dependency, so they get their own chunk instead of bloating the main bundle.
const MapPage = lazy(() => import('@/features/map/MapPage'));
const DirectionPage = lazy(() => import('@/features/direction/DirectionPage'));

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

/**
 * Main application routes
 */
const AppRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        
        {/* App routes */}
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/map"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <MapPage />
              </Suspense>
            }
          />
          <Route
            path="/direction"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DirectionPage />
              </Suspense>
            }
          />
          <Route path="/saved" element={<SavedLocationPage />} />
          
          {/* Settings routes */}
          <Route path="/settings" element={<SettingsPage />}>
            <Route index element={<Navigate to="/settings/profile" replace />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="theme" element={<ThemeSettings />} />
            <Route path="tutorial" element={<TutorialSettings />} />
            <Route path="language" element={<LanguageSettings />} />
          </Route>
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;