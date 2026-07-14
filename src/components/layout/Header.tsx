import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';
import SearchBar from '@/components/molecules/SearchBar';
import { useMap } from '@/context/MapContext';
import { findBestBuildingMatch } from '@/utils/search';

interface HeaderProps {
  userName?: string | null;
  onMenuClick?: () => void;
}

/**
 * Main header component with search and user info
 */
const Header: React.FC<HeaderProps> = ({
  userName,
  onMenuClick
}) => {
  const navigate = useNavigate();
  const { buildings } = useMap();

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

  const suggestions = useMemo(
    () =>
      (buildings || []).map((building) => ({
        id: building.id,
        title: building.name,
        subtitle: building.description,
        type: 'building' as const,
      })),
    [buildings]
  );

  const goToBuilding = (buildingId: string) => {
    navigate(`/map?building=${encodeURIComponent(buildingId)}`);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const match = findBestBuildingMatch(buildings, query);
    if (match) {
      goToBuilding(match.id);
    } else {
      navigate('/map');
    }
  };

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
          <SearchBar
            onSearch={handleSearch}
            onSelectSuggestion={(suggestion) => goToBuilding(suggestion.id)}
            suggestions={suggestions}
            placeholder="Search locations..."
            showSuggestionsOnFocus={false}
          />
        </div>

        {/* User profile */}
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500 hidden md:block whitespace-nowrap">
            {formattedDate} · {formattedTime}
          </span>
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
