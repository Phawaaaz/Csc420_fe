import React from 'react';
import Icon from '@/components/atoms/Icon';

interface ActivityItem {
  id: string;
  type: 'search' | 'direction' | 'visited';
  target: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  className?: string;
}

/**
 * Recent activity component showing user's recent interactions
 */
const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  className = '',
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return 'Search';
      case 'direction': return 'Navigation';
      case 'visited': return 'MapPin';
      default: return 'Activity';
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'search':
        return `You searched for ${activity.target}`;
      case 'direction':
        return `Direction to ${activity.target}`;
      case 'visited':
        return `You visited ${activity.target}`;
      default:
        return `Activity involving ${activity.target}`;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="mr-3 mt-0.5">
                <Icon 
                  name={getActivityIcon(activity.type) as any} 
                  size={18} 
                  className="text-primary"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{getActivityText(activity)}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;