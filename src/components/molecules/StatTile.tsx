import React from 'react';
import Icon from '@/components/atoms/Icon';
import { LucideCrop as LucideProps } from 'lucide-react';

interface StatTileProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

/**
 * Stat tile component for displaying statistics
 * 
 * Example usage:
 * ```jsx
 * <StatTile 
 *   icon={Map} 
 *   title="Saved Locations" 
 *   value={5} 
 *   subtitle="Last viewed: CIS Faculty" 
 * />
 * ```
 */
const StatTile: React.FC<StatTileProps> = ({
  icon: IconComponent,
  title,
  value,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 flex items-center ${className}`}>
      <div className="flex-shrink-0 mr-4 p-3 bg-primary-light/10 rounded-full">
        <IconComponent size={28} className="text-primary" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatTile;