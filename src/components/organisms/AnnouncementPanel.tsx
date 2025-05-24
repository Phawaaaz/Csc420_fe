import React from 'react';
import AnnouncementCard from '@/components/molecules/AnnouncementCard';

interface Announcement {
  id: string;
  title: string;
  content: string;
  icon?: string;
  timestamp?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface AnnouncementPanelProps {
  announcements: Announcement[];
  title?: string;
  className?: string;
}

/**
 * Panel for displaying multiple announcements
 * 
 * Example usage:
 * ```jsx
 * <AnnouncementPanel 
 *   title="Campus Announcements" 
 *   announcements={announcementList} 
 * />
 * ```
 */
const AnnouncementPanel: React.FC<AnnouncementPanelProps> = ({
  announcements,
  title = 'Announcement',
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              content={announcement.content}
              icon={announcement.icon}
              timestamp={announcement.timestamp}
              priority={announcement.priority}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No announcements available</p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPanel;