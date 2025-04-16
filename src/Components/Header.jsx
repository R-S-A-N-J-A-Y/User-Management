import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Header = () => {
  const { state, Logout } = useAuth();
  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/about">About</NavLink>
      </div>
      {!state.isAuthorized && (
        <>
          <div>
            <NavLink to="/register">Register</NavLink>
          </div>
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
        </>
      )}
      {state.isAuthorized && (
        <>
          <div>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </div>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div>
            <button onClick={Logout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
