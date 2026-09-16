import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Abebe Kebede',
    email: 'abebe@addiseats.et',
    isAuthenticated: true,
  });

  const login = (userData) => {
    setUser({ ...userData, isAuthenticated: true });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.isAuthenticated),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
