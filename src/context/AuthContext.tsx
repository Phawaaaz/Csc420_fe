import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

/**
 * Authentication context for user management
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = {
          uid: `user-${Date.now()}`,
          email,
          displayName: email.split('@')[0],
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        resolve();
      }, 1000);
    });
  };
  
  const signup = async (
    email: string, 
    password: string, 
    displayName: string
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          uid: `user-${Date.now()}`,
          email,
          displayName,
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        resolve();
      }, 1000);
    });
  };
  
  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      // Clear user data
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      setUser(null);
      resolve();
    });
  };
  
  const updateProfile = async (data: Partial<User>): Promise<void> => {
    return new Promise((resolve) => {
      if (user) {
        const updatedUser = { ...user, ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      resolve();
    });
  };
  
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};