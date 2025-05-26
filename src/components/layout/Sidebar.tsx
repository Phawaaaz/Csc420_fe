import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "@/components/molecules/NavLink";
import Button from "@/components/atoms/Button";
import {
  LayoutDashboard,
  Map,
  Navigation,
  Bookmark,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Main sidebar navigation component with improved mobile behaviour & smarter collapse
 */
const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  isOpen = true,
  onClose,
}) => {
  // desktop-only collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  // mobile-only collapse state
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const toggleMobileCollapse = () => setIsMobileCollapsed((prev) => !prev);

  // width helper – responsive to both mobile and desktop states
  const sidebarWidth = isMobileCollapsed
    ? "w-16 lg:w-60" + (isCollapsed ? " lg:w-16" : "")
    : "w-60" + (isCollapsed ? " lg:w-16" : "");

  // class helper for links when collapsed
  const linkCollapsed = `
  ${isMobileCollapsed ? "justify-center px-4 [&>span]:hidden" : ""}
  ${isCollapsed ? "lg:justify-center lg:px-4 lg:[&>span]:hidden" : ""}
`.trim();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0
          ${sidebarWidth} h-full
          bg-primary flex flex-col
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-50
          ${className}
        `}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center ${
            isCollapsed ? "justify-center lg:justify-center" : "justify-between"
          }`}
        >
          {/* Logo – mobile (full) */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-white lg:hidden"
          >
            <img
              src="/map-icon.svg"
              alt="Smart Campus"
              className="h-10 w-10 invert object-contain"
            />
            <div>
              <div className="text-xl font-bold">SMART</div>
              <div className="text-xs tracking-widest opacity-80">
                CAMPUS NAVIGATION
              </div>
            </div>
          </Link>

          {/* Logo – desktop (full) */}
          {!isCollapsed && (
            <Link
              to="/dashboard"
              className="hidden items-center space-x-2 text-white lg:flex"
            >
              <img
                src="/map-icon.svg"
                alt="Smart Campus"
                className="h-10 w-10 invert object-contain"
              />
              <div>
                <div className="text-xl font-bold">SMART</div>
                <div className="text-xs tracking-widest opacity-80">
                  CAMPUS NAVIGATION
                </div>
              </div>
            </Link>
          )}

          {/* Logo – desktop (icon‑only) */}
          {isCollapsed && (
            <Link to="/dashboard" className="hidden text-white lg:block">
              <img
                src="/map-icon.svg"
                alt="Smart Campus"
                className="h-8 w-8 invert object-contain"
              />
            </Link>
          )}

          {/* Collapse / expand (desktop) */}
          <button
            onClick={toggleCollapse}
            className="hidden p-2 text-white transition-colors hover:bg-white/10 rounded-lg lg:block"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="p-2 text-white transition-colors hover:bg-white/10 rounded-lg lg:hidden"
            title="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <NavLink
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            className={linkCollapsed}
          />
          <NavLink
            to="/map"
            icon={Map}
            label="Campus Map"
            className={linkCollapsed}
          />
          <NavLink
            to="/direction"
            icon={Navigation}
            label="Direction"
            className={linkCollapsed}
          />
          <NavLink
            to="/saved"
            icon={Bookmark}
            label="Saved Location"
            className={linkCollapsed}
          />
          <NavLink
            to="/settings"
            icon={Settings}
            label="Settings"
            className={linkCollapsed}
          />
        </nav>

        {/* Footer */}
        <div
          className={`mt-auto border-t border-primary-light p-4 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          {!isCollapsed && (
            <div className="mb-4 text-center text-xs text-white/60">
              University of Ilorin
              <br />
              (c)2025
            </div>
          )}

          {isCollapsed ? (
            <button
              className="flex w-full justify-center rounded-lg p-3 text-white transition-colors hover:bg-white/10"
              onClick={() => {
                /* Handle logout */
              }}
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <Button
              variant="outline"
              fullWidth
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                /* Handle logout */
              }}
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
