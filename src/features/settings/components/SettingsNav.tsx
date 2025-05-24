import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';

interface SettingsNavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SettingsNavProps {
  items: SettingsNavItem[];
  className?: string;
}

/**
 * Settings navigation component
 */
const SettingsNav: React.FC<SettingsNavProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav className={`space-y-1 ${className}`}>
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `
            flex items-center px-4 py-2 text-sm font-medium rounded-md
            ${isActive 
              ? 'bg-primary-light/10 text-primary' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <Icon 
            name={item.icon as any} 
            size={18} 
            className="mr-3 flex-shrink-0" 
          />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default SettingsNav;