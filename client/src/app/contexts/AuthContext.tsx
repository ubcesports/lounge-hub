"use client";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";

dotenv.config();

// Props for AuthContext
interface AuthContextProps {
  children: React.ReactNode;
}

// AuthContext to wrap the application around
const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  if (typeof window === "undefined") {
    return null; // Return null on the server side
  }

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_CLIENTID || ""}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      // Store the tokens in localStorage, so they aren't lost on the browser refresh (which it usually is w Auth0)
      cacheLocation="localstorage"
      // use refresh tokens
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthContext;
