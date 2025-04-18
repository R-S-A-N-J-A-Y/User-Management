import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { CgUserlane } from "react-icons/cg";

const Sidebar = () => {
  const { state } = useAuth();
  return (
    <nav className="sidebar p-4 navbar navbar-expand-lg d-flex flex-column justify-content-between align-items-center h-100">
      <div>
        <CgUserlane size={60} />
      </div>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column justify-content-around align-items-start w-100 h-100">
        <li>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        {!state.isAuthorized && (
          <>
            <li>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </>
        )}
        {state.isAuthorized && (
          <>
            <li>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
