import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini yükle
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');
    
    if (storedRole) {
      setRole(storedRole);
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('User parse error:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Custom event dispatch et
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Custom event dispatch et
    window.dispatchEvent(new Event('storage'));
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    window.dispatchEvent(new Event('storage'));
  };

  const hasRole = (requiredRole) => {
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  };

  const isAuthenticated = () => {
    return !!role;
  };

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    updateRole,
    hasRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
