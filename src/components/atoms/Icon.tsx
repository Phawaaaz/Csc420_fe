import React from 'react';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

/**
 * Icon component that renders icons from Lucide React
 * 
 * Example usage:
 * ```jsx
 * <Icon name="Map" size={24} color="currentColor" />
 * <Icon name="Search" className="text-primary" />
 * <Icon name="Settings" strokeWidth={1.5} />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
}) => {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return (
    <LucideIcon 
      size={size} 
      color={color} 
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};

export default Icon;