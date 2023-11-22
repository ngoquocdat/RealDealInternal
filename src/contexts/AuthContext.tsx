import React from "react";
import { AuthService, IAuthServiceModel } from "services/AuthService";

const defaultAuthContextValue: IAuthServiceModel = {
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContextValue);

export function AuthProvider({ children }: any) {
  const { credential, register, login, logout } = AuthService();

  return (
    <AuthContext.Provider
      value={{
        credential,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
