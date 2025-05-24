import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from '@/components/molecules/NavLink';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import { LayoutDashboard, Map, Navigation, Bookmark, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

/**
 * Main sidebar navigation component
 */
const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`w-60 bg-primary flex flex-col h-full ${className}`}>
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-2 text-white">
          <div className="w-10 h-10">
            <img 
              src="/map-icon.svg" 
              alt="Smart Campus" 
              className="w-full h-full object-contain invert"
            />
          </div>
          <div>
            <div className="font-bold text-xl">SMART</div>
            <div className="text-xs tracking-widest opacity-80">CAMPUS NAVIGATION</div>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 mt-6">
        <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavLink to="/map" icon={Map} label="Campus Map" />
        <NavLink to="/direction" icon={Navigation} label="Direction" />
        <NavLink to="/saved" icon={Bookmark} label="Saved Location" />
        <NavLink to="/settings" icon={Settings} label="Settings" />
      </nav>
      
      <div className="p-4 mt-auto border-t border-primary-light">
        <div className="text-xs text-white/60 mb-4 text-center">
          University of Ilorin<br />
          (c)2025
        </div>
        <Button 
          variant="outline" 
          fullWidth 
          className="border-white text-white hover:bg-white hover:text-primary"
          onClick={() => {/* Handle logout */}}
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Sign out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;