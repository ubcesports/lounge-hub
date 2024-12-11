"use client"

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
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_CLIENTID || ""}
      authorizationParams={{
      redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthContext;
