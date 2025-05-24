import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';
import { LucideCrop as LucideProps } from 'lucide-react';

interface NavLinkProps extends Omit<RouterNavLinkProps, 'className'> {
  icon: React.ComponentType<LucideProps>;
  label: string;
  className?: string;
}

/**
 * Navigation link component with icon for sidebar
 * 
 * Example usage:
 * ```jsx
 * <NavLink to="/dashboard" icon={Dashboard} label="Dashboard" />
 * <NavLink to="/settings" icon={Settings} label="Settings" end />
 * ```
 */
const NavLink: React.FC<NavLinkProps> = ({ 
  icon: IconComponent, 
  label, 
  className = '', 
  ...props 
}) => {
  return (
    <RouterNavLink
      className={({ isActive }) => `
        flex items-center space-x-3 px-4 py-3 text-white transition-colors
        ${isActive ? 'bg-primary-light font-medium' : 'hover:bg-primary-light/50'}
        ${className}
      `}
      {...props}
    >
      <IconComponent size={20} />
      <span>{label}</span>
    </RouterNavLink>
  );
};

export default NavLink;