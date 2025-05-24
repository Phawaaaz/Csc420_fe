import React from 'react';
import StatTile from '@/components/molecules/StatTile';
import { Map, Compass, Clock } from 'lucide-react';

interface DashboardSummaryProps {
  savedLocations: number;
  recentDirections: number;
  lastVisited?: string;
  className?: string;
}

/**
 * Dashboard summary component with stats
 */
const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  savedLocations,
  recentDirections,
  lastVisited,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <StatTile 
        icon={Map} 
        title="Saved Locations" 
        value={savedLocations} 
        subtitle={lastVisited ? `Last viewed: ${lastVisited}` : undefined}
      />
      
      <StatTile 
        icon={Compass} 
        title="Directions Today" 
        value={recentDirections}
      />
      
      <StatTile 
        icon={Clock} 
        title="Average Navigation Time" 
        value="4.2 min"
        subtitle="Based on your recent trips"
      />
    </div>
  );
};

export default DashboardSummary;