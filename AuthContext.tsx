import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isExaminer: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (username: string, email: string, password: string, isExaminer: boolean) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<User> => {
    // In a real app, this would make an API call
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user data (in real app this would come from backend)
      const user: User = {
        id: `user-${Date.now()}`,
        username: email.split('@')[0],
        email,
        isExaminer: true
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    username: string, 
    email: string, 
    password: string, 
    isExaminer: boolean
  ): Promise<User> => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user creation
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        isExaminer
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};