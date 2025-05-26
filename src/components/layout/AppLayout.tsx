import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';

/**
 * Main application layout with sidebar and header
 */
const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Implement search functionality
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          onSearch={handleSearch} 
          userName={user?.displayName}
          onMenuClick={toggleSidebar}
        />
        
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;