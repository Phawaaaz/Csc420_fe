import React from 'react';
import DashboardSummary from '@/features/dashboard/components/DashboardSummary';
import RecentActivity from '@/features/dashboard/components/RecentActivity';
import AnnouncementPanel from '@/components/organisms/AnnouncementPanel';
import { useAuth } from '@/context/AuthContext';
import { useMap } from '@/context/MapContext';

/**
 * Dashboard page component
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { savedLocations } = useMap();
  
  // Sample data - would come from API in a real app
  const recentActivities = [
    {
      id: '1',
      type: 'search',
      target: 'CIS',
      timestamp: '10:00am',
    },
    {
      id: '2',
      type: 'search',
      target: 'Food Vendor',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      type: 'direction',
      target: 'Computer Lab',
      timestamp: 'Yesterday',
    },
  ];
  
  const announcements = [
    {
      id: '1',
      title: 'Tip:',
      content: 'You can use the search bar for quick searches.',
      icon: 'LightbulbIcon',
      priority: 'low',
    },
    {
      id: '2',
      title: 'Tip:',
      content: 'You can use the search bar for quick searches.',
      icon: 'LightbulbIcon',
      priority: 'low',
    },
    {
      id: '3',
      title: 'Tip:',
      content: 'You can use the search bar for quick searches.',
      icon: 'LightbulbIcon',
      priority: 'low',
    },
    {
      id: '4',
      title: 'Library closes at 5Pm today',
      content: 'Due to scheduled maintenance, the library will close early today.',
      icon: 'AlertCircle',
      priority: 'medium',
    },
    {
      id: '5',
      title: 'New Schedule on your timeline',
      content: 'Your class schedule has been updated. Check your timeline for changes.',
      icon: 'Calendar',
      priority: 'low',
    },
  ] as any;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome {user?.displayName || 'Tunde'}!</h1>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800">KEY FEATURES</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary rounded-lg p-6 text-white">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <img src="/map-icon.svg" alt="Map" className="w-6 h-6 invert" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Interactive Campus Map</h3>
          <p className="text-sm text-center">
            Find your way in the University of Ilorin campus with our detailed interactive map.
          </p>
        </div>
        
        <div className="bg-primary rounded-lg p-6 text-white">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="text-2xl">ℹ</i>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Building Information</h3>
          <p className="text-sm text-center">
            Learn about the facilities, opening hours, and services available in each building.
          </p>
        </div>
        
        <div className="bg-primary rounded-lg p-6 text-white">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">⇨</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Step-by-Step Directions</h3>
          <p className="text-sm text-center">
            Get precise directions to navigate between any building on campus.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DashboardSummary 
            savedLocations={savedLocations?.length || 5} 
            recentDirections={3}
            lastVisited="CIS Faculty"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 mb-3 flex items-center justify-center">
                <img src="/map-icon.svg" alt="Map" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-center">5</h3>
              <p className="text-sm text-gray-600">Saved Locations</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 mb-3 flex items-center justify-center text-5xl text-primary">
                <span>ⓘ</span>
              </div>
              <h3 className="text-xl text-center">CIS</h3>
              <p className="text-sm text-gray-600">Faculty</p>
              <p className="text-xs text-gray-400">Last Viewed</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center text-gray-800 mb-2">
              <span className="text-2xl mr-2">↩</span>
              <h3 className="text-lg font-medium">3</h3>
            </div>
            <p className="text-sm text-gray-600">Directions today</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <AnnouncementPanel 
            title="Announcement" 
            announcements={announcements} 
            className="h-full"
          />
        </div>
      </div>
      
      <RecentActivity activities={recentActivities} />
    </div>
  );
};

export default DashboardPage;