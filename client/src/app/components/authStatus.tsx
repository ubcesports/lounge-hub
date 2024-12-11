"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Component to render small window for auth status
const AuthStatus: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="absolute top-0 left-0 m-4 bg-[#20222C] text-white p-2 rounded shadow">
      {isAuthenticated ? (
        <div className="flex flex-col items-start p-2 text-left" style={{ padding: "10px 35px 10px 15px" }}>
          <span>Logged in</span>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="text-sm text-red-300 hover:text-red-100 mt-1 underline transition duration-300 ease-in-out"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-start p-2" style={{ padding: "10px 15px" }}>
          <span className="text-white">Not logged in</span>
          <button
            onClick={() => loginWithRedirect()}
            className="text-sm text-green-400 hover:text-green-200 mt-1 underline transition duration-300 ease-in-out"
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;
