import React from "react";
import RegisterForm from "../Components/RegisterForm";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="p-3 d-flex flex-column gap-4">
      <div className="top text-center px-5 py-2">
        <h1>Hey there! </h1>
        <h1>Just a few steps away...</h1>
        <h3 className="fs-6">
          Set up your profile to get started with seamless user management and
          collaboration
        </h3>
      </div>
      <div className="middle px-5 py-2">
        <RegisterForm />
      </div>
      <div className="bottom">
        <p className="fs-5 text-center">
          Already have an Account ? Try
          <NavLink to="/login"> Logging </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
