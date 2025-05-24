import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from '@/routes';
import { AuthProvider } from '@/context/AuthContext';
import { MapProvider } from '@/context/MapContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MapProvider>
        <AppRoutes />
      </MapProvider>
    </AuthProvider>
  </StrictMode>
);