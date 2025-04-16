import { createContext, useContext, useReducer } from "react";
import AuthReducer from "../Reducers/AuthReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isAuthorized: "false",
    username: null,
    profile: null,
  });

  const Login = (username) => {
    dispatch({ type: "Login", payload: username });
    console.log("Successfully Logged...");
  };

  return (
    <>
      <AuthContext.Provider value={{ state, Login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
