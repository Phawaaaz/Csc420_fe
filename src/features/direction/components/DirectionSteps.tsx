import React from 'react';
import Icon from '@/components/atoms/Icon';

interface DirectionStep {
  id: string;
  instruction: string;
  distance: string;
  time: string;
  icon?: string;
}

interface DirectionStepsProps {
  steps: DirectionStep[];
  className?: string;
}

/**
 * Component to display step-by-step directions
 */
const DirectionSteps: React.FC<DirectionStepsProps> = ({
  steps,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Step-by-Step Directions</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="flex items-start"
          >
            <div className="flex-shrink-0 w-10 flex flex-col items-center">
              <div className="rounded-full w-8 h-8 bg-primary text-white flex items-center justify-center">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="h-full w-0.5 bg-gray-200 my-1"></div>
              )}
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <Icon 
                  name={(step.icon || 'ArrowRight') as any} 
                  size={16} 
                  className="text-primary mr-2" 
                />
                <p className="text-sm font-medium text-gray-800">{step.instruction}</p>
              </div>
              
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span className="mr-2">{step.distance}</span>
                <span>•</span>
                <span className="ml-2">{step.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectionSteps;