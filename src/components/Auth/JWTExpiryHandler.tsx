import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time as a Unix timestamp (seconds since epoch)
}

interface JWTExpiryHandlerProps {
  token: string;
  onTokenExpired: () => void;
}

const JWTExpiryHandler: React.FC<JWTExpiryHandlerProps> = ({ token, onTokenExpired }) => {
  const getTokenExpiry = (token: string): number | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token); // Explicitly cast to JwtPayload
      return decoded.exp;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  };

  useEffect(() => {
    const expiryTime = getTokenExpiry(token);

    if (expiryTime) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = expiryTime - currentTime;

      if (timeLeft <= 0) {
        // Token is already expired
        onTokenExpired();
      } else {
        // Set a timeout to trigger when the token expires
        const timeoutId = setTimeout(() => {
          onTokenExpired();
        }, timeLeft * 1000);

        // Clear timeout on cleanup
        return () => clearTimeout(timeoutId);
      }
    }
  }, [token, onTokenExpired]);

  return null; // This component does not render anything
};

export default JWTExpiryHandler;
