import { createContext, useContext, useReducer, useState } from "react";
import AuthReducer from "../Reducers/AuthReducer";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isAuthorized: false,
    username: null,
    password: null,
    profile: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const Login = (username, password) => {
    dispatch({
      type: "Login",
      payload: { username: username, password: password },
    });
    console.log("Successfully Logged...");
  };

  const Logout = () => {
    dispatch({ type: "Logout" });
    console.log("Successfully Logged Out...");
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://user-management-server-production-6862.up.railway.app/auth/login",
        {
          username: state.username,
          password: state.password,
        }
      );
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
