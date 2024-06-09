'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const AuthContext = createContext(); // Create a context object

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add a user state
  const router = useRouter();
  const token = Cookies.get('token'); // Get the token from the cookies

  useEffect(() => {
    if (token) { // Check if the token exists
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user'))); // Set the user state to the user stored in localStorage
    }
  }, [token]);


  const logIn = (userData) => { // Update the logIn function to accept userData and role parameters
    setIsAuthenticated(true);
    setUser(userData); // Set the user state to the userData parameter
    localStorage.setItem('isAuthenticated', 'true'); // Store isAuthenticated in localStorage
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear the user state when the user logs out
    localStorage.removeItem('isAuthenticated'); // Remove isAuthenticated from localStorage
    localStorage.removeItem('user'); // Remove user from localStorage
    setTimeout(() => router.push('/home'), 1000); // Add a delay before the redirection
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
