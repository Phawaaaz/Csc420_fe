import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

/**
 * 404 Not Found page component
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-6">
          <Icon name="Map" size={64} className="text-primary mx-auto" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
          Let's help you navigate back to a known location.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/dashboard">
            <Button variant="primary">
              <Icon name="Home" size={18} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <Link to="/map">
            <Button variant="outline">
              <Icon name="Map" size={18} className="mr-2" />
              Explore Campus Map
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;