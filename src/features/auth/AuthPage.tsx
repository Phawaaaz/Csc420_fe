import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SignupForm, { SignupFormData } from './components/SignupForm';
import LoginForm from './components/LoginForm';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState<string>();
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (email: string, password: string) => {
    if (!login) {
      setError('Authentication service is not available');
      return;
    }

    try {
      setError(undefined);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    if (!signup) {
      setError('Authentication service is not available');
      return;
    }

    try {
      setError(undefined);
      await signup(data.email, data.password, `${data.firstName} ${data.lastName}`);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo.svg"
          alt="Campus Map"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoginMode ? (
            <LoginForm
              onSubmit={handleLogin}
              onToggleMode={toggleMode}
              error={error}
            />
          ) : (
            <SignupForm
              onSubmit={handleSignup}
              onToggleMode={toggleMode}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 