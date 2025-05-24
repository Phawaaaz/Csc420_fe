import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  onToggleMode: () => void;
  error?: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onToggleMode, error }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<SignupFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<SignupFormData> = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = true;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h2>
        <p className="mt-3 text-base text-gray-600">
          Join our community and start exploring the campus
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="User" size={16} className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm 
                  focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                  transition-all duration-200 ease-in-out
                  placeholder:text-gray-400 placeholder:text-sm
                  ${validationErrors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                  ${formData.firstName ? 'border-primary/50' : ''}`}
                placeholder="John"
              />
            </div>
            {validationErrors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {validationErrors.firstName}
              </p>
            )}
          </div>

          <div className="relative group">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="User" size={16} className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm 
                  focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                  transition-all duration-200 ease-in-out
                  placeholder:text-gray-400 placeholder:text-sm
                  ${validationErrors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                  ${formData.lastName ? 'border-primary/50' : ''}`}
                placeholder="Doe"
              />
            </div>
            {validationErrors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {validationErrors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="relative group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={16} className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                transition-all duration-200 ease-in-out
                placeholder:text-gray-400 placeholder:text-sm
                ${validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                ${formData.email ? 'border-primary/50' : ''}`}
              placeholder="you@example.com"
            />
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {validationErrors.email}
            </p>
          )}
        </div>

        <div className="relative group">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={16} className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                transition-all duration-200 ease-in-out
                placeholder:text-gray-400 placeholder:text-sm
                ${validationErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                ${formData.password ? 'border-primary/50' : ''}`}
              placeholder="••••••••"
            />
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {validationErrors.password}
            </p>
          )}
        </div>

        <div className="relative group">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={16} className="text-gray-400 group-focus-within:text-primary transition-colors duration-200" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm 
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                transition-all duration-200 ease-in-out
                placeholder:text-gray-400 placeholder:text-sm
                ${validationErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                ${formData.confirmPassword ? 'border-primary/50' : ''}`}
              placeholder="••••••••"
            />
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 transition-all duration-200"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        {validationErrors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            You must agree to the terms and conditions
          </p>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 border border-red-100">
            <div className="flex">
              <Icon name="AlertCircle" className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Icon name="Loader" className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm; 