import { createContext, useContext, useEffect, useState } from 'react';

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => useContext(GoogleAuthContext);

export const GoogleAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('googleUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const initializeGoogleAuth = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        setIsInitialized(true);
      }
    };

    const handleCredentialResponse = (response) => {
      // Decode the JWT token to get user info
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
      // Store in localStorage for persistence
      localStorage.setItem('googleUser', JSON.stringify(decoded));
      alert(`Welcome, ${decoded.name}! You have successfully signed in.`);
      // Optionally redirect to home
      window.location.href = '/';
    };

    if (window.google) {
      initializeGoogleAuth();
    } else {
      window.addEventListener('load', initializeGoogleAuth);
    }

    return () => {
      window.removeEventListener('load', initializeGoogleAuth);
    };
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('googleUser');
    window.google.accounts.id.disableAutoSelect();
    // Optionally revoke token
  };

  const renderGoogleButton = (elementId) => {
    if (isInitialized && window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        { theme: 'outline', size: 'large' }
      );
    }
  };

  return (
    <GoogleAuthContext.Provider value={{ user, signOut, renderGoogleButton }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
