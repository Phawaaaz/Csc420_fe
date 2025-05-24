import React from 'react';
import Icon from '@/components/atoms/Icon';

interface HeaderProps {
  onSearch: (query: string) => void;
  userName?: string | null;
  onMenuClick?: () => void;
}

/**
 * Main header component with search and user info
 */
const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  userName,
  onMenuClick
}) => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(currentDate);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(currentDate);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Icon name="Menu" size={24} />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* User profile */}
        <div className="flex items-center space-x-4">
          {userName && (
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {userName}
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <Icon name="User" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;