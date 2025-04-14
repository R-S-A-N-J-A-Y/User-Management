import { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(() => {}, {
    isAuthorized: "false",
    username: null,
    profile: null,
  });

  return (
    <>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
