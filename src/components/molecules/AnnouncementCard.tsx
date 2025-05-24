import React from 'react';
import Icon from '@/components/atoms/Icon';

interface AnnouncementCardProps {
  title: string;
  content: string;
  icon?: string;
  timestamp?: string;
  priority?: 'low' | 'medium' | 'high';
  className?: string;
}

/**
 * Announcement card component for displaying campus notifications
 * 
 * Example usage:
 * ```jsx
 * <AnnouncementCard
 *   title="Library closes at 5PM today"
 *   content="Due to maintenance, the library will close early today"
 *   icon="AlertCircle"
 *   timestamp="2 hours ago"
 *   priority="medium"
 * />
 * ```
 */
const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  icon = 'Bell',
  timestamp,
  priority = 'low',
  className = '',
}) => {
  const priorityColors = {
    low: 'bg-gray-100',
    medium: 'bg-warning/10',
    high: 'bg-error/10 border-l-4 border-error',
  };

  return (
    <div className={`p-4 rounded-lg ${priorityColors[priority]} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <Icon 
            name={icon as any} 
            size={18} 
            className={`
              ${priority === 'low' ? 'text-gray-500' : ''}
              ${priority === 'medium' ? 'text-warning' : ''}
              ${priority === 'high' ? 'text-error' : ''}
            `}
          />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="mt-1 text-sm text-gray-600">{content}</p>
          {timestamp && (
            <p className="mt-2 text-xs text-gray-500">{timestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;