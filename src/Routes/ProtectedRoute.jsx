import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthorized) Navigate("/login");
  }, [state.isAuthorized, Navigate]);

  return state.isAuthorized ? children : <></>;
};

export default ProtectedRoute;
