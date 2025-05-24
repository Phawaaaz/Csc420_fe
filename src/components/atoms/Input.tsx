import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

/**
 * Input component for form fields
 * 
 * Example usage:
 * ```jsx
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * <Input label="Password" type="password" error="Password is required" />
 * <Input icon={<SearchIcon />} placeholder="Search..." />
 * ```
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  icon,
  ...props
}) => {
  const baseInputClasses = 'rounded-md border bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent';
  
  const errorClasses = error ? 'border-error focus:ring-error' : 'border-gray-300';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`flex flex-col space-y-1 ${widthClass}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`${baseInputClasses} ${errorClasses} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
};

export default Input;