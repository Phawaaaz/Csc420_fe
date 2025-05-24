import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { useAuth } from '@/context/AuthContext';

/**
 * Signup page component
 */
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  
  const validate = (): boolean => {
    let valid = true;
    const newErrors = { 
      displayName: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    };
    
    if (!form.displayName) {
      newErrors.displayName = 'Name is required';
      valid = false;
    }
    
    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    if (signup) {
      signup(form.email, form.password, form.displayName)
        .then(() => {
          navigate('/dashboard');
        })
        .catch((error) => {
          setErrors({
            ...errors,
            email: 'Email already in use or invalid',
          });
        });
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
        <p className="text-sm text-gray-600 mt-1">
          Create an account to use Smart Campus Navigation
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="displayName"
          placeholder="Enter your full name"
          value={form.displayName}
          onChange={handleChange}
          error={errors.displayName}
           className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        errors.displayName 
          ? 'border-red-500 bg-red-50 focus:ring-red-500' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
      }`}
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
           className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        errors.email 
          ? 'border-red-500 bg-red-50 focus:ring-red-500' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
      }`}
        />
        
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        errors.password 
          ? 'border-red-500 bg-red-50 focus:ring-red-500' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
      }`}
        />
        
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
         className={`w-full px-4 py-3 border rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        errors.confirmPassword 
          ? 'border-red-500 bg-red-50 focus:ring-red-500' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
      }`}
        />
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="terms" 
            className="rounded text-primary focus:ring-primary h-4 w-4"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button type="submit" variant="primary" fullWidth>
          SIGN UP
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;