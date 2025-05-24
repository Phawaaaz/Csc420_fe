import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLink from '@/components/molecules/NavLink';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import { LayoutDashboard, Map, Navigation, Bookmark, Settings, LogOut, X, Menu } from 'lucide-react';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Main sidebar navigation component with collapsible functionality
 */
const Sidebar: React.FC<SidebarProps> = ({ 
  className = '',
  isOpen = true,
  onClose
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          fixed lg:static
          top-0 left-0
          ${isCollapsed && !isOpen ? 'w-16' : isCollapsed ? 'w-60 lg:w-16' : 'w-60'} h-full
          bg-primary
          flex flex-col
          transform transition-all duration-300 ease-in-out
          z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
        <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center lg:justify-center' : 'justify-between'}`}>
          {/* Mobile logo - always show full logo on mobile */}
          <Link to="/dashboard" className="flex items-center space-x-2 text-white lg:hidden">
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

          {/* Desktop logo - full when expanded */}
          {!isCollapsed && (
            <Link to="/dashboard" className="hidden lg:flex items-center space-x-2 text-white">
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
          )}

          {/* Desktop logo - collapsed when minimized */}
          {isCollapsed && (
            <Link to="/dashboard" className="hidden lg:block text-white">
              <div className="w-8 h-8">
                <img 
                  src="/map-icon.svg" 
                  alt="Smart Campus" 
                  className="w-full h-full object-contain invert"
                />
              </div>
            </Link>
          )}
          
          {/* Toggle collapse button for desktop */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:block p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={20} />
          </button>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          {/* Show full labels on mobile, conditional labels on desktop */}
          <NavLink 
            to="/dashboard" 
            icon={LayoutDashboard} 
            label="Dashboard"
            className={`${isCollapsed ? 'lg:justify-center lg:px-4' : ''}`}
          />
          <NavLink 
            to="/map" 
            icon={Map} 
            label="Campus Map"
            className={`${isCollapsed ? 'lg:justify-center lg:px-4' : ''}`}
          />
          <NavLink 
            to="/direction" 
            icon={Navigation} 
            label="Direction"
            className={`${isCollapsed ? 'lg:justify-center lg:px-4' : ''}`}
          />
          <NavLink 
            to="/saved" 
            icon={Bookmark} 
            label="Saved Location"
            className={`${isCollapsed ? 'lg:justify-center lg:px-4' : ''}`}
          />
          <NavLink 
            to="/settings" 
            icon={Settings} 
            label="Settings"
            className={`${isCollapsed ? 'lg:justify-center lg:px-4' : ''}`}
          />
        </nav>
        
        <div className={`p-4 mt-auto border-t border-primary-light ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed && (
            <div className="text-xs text-white/60 mb-4 text-center">
              University of Ilorin<br />
              (c)2025
            </div>
          )}
          
          {isCollapsed ? (
            <button 
              className="w-full p-3 text-white hover:bg-white/10 rounded-lg transition-colors flex justify-center"
              onClick={() => {/* Handle logout */}}
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <Button 
              variant="outline" 
              fullWidth 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {/* Handle logout */}}
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </Button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;