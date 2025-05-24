import React from 'react';
import Icon from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
  userName?: string;
  onLogout: () => void;
  className?: string;
}

/**
 * Main header component with search and user info
 */
const Header: React.FC<HeaderProps> = ({ onSearch, userName, onLogout, className = '' }) => {
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
    <header className={`bg-white flex items-center justify-between p-4 ${className}`}>
      <div className="flex-1 max-w-md">
        {onSearch && (
          <SearchBar onSearch={onSearch} />
        )}
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-gray-600 text-sm hidden md:block">
          {formattedDate}
          <span className="mx-2 text-gray-400">|</span>
          {formattedTime}
        </div>
        
        {userName && (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Welcome {userName}!
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon name="User" size={16} className="text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;