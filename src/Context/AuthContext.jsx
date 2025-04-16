import { createContext, useContext, useReducer, useState } from "react";
import AuthReducer from "../Reducers/AuthReducer";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isAuthorized: false,
    username: null,
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const Login = (username) => {
    dispatch({ type: "Login", payload: username });
    console.log("Successfully Logged...");
  };

  const Logout = () => {
    dispatch({ type: "Logout" });
    console.log("Successfully Logged Out...");
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: state.username,
      });
      dispatch({ type: "FetchProfile", payload: response.data });
      console.log("Fetched profile:", response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{ state, Login, Logout, fetchProfile, isLoading }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
