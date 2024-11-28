"use client"

import { rdl_admin_user_list } from "@prisma/client";
import React, { SetStateAction } from "react";

export interface AuthContextType {
  auth: rdl_admin_user_list | null;
  onAuth: React.Dispatch<SetStateAction<rdl_admin_user_list | null>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<rdl_admin_user_list | null>(null);

  return (
    <AuthContext.Provider value={{ auth: user, onAuth: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext) as AuthContextType;
