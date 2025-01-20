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
  const domain = "dev-yayco41htm1qbg2o.us.auth0.com";
  const clientId = "EOxanAxL6IJKIaWgumbCATs9iL22eaj0";

  if (typeof window === "undefined") {
    return null; // Return null on the server side
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
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
