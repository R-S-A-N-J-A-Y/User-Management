import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const LoginForm = () => {
  const { Login } = useAuth();
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const Validate = () => {
    let Errors = {};
    if (user.username === "") Errors.username = "*Username is Required";
    if (user.password === "") Errors.password = "*Password is Required";
    if (Object.keys(Errors).length > 0) {
      setError(Errors);
      return false;
    }

    // if (!/^[A-Za-z\s'-]+$/.test(user.username)) {
    //   Errors.username = "*Username is invalid";
    // }

    setError(Errors);
    return Object.keys(Errors).length == 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Validate()) return;
    const result = await callBackend();
    if (result) {
      Login(user.username);
      Navigate("/dashboard");
      setUser({ username: "", password: "" });
    }
  };

  const callBackend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/", {
        username: user.username,
        password: user.password,
      });

      if (response.data === "User Found") {
        return true;
      } else {
        setError({ ...error, main: "Username or password is Wrong." });
      }
    } catch (err) {
      console.log(err);
      setError({
        ...error,
        main: "Something Goes Down Try again After Some time",
      });
    }
    return false;
  };

  return (
    <div>
      {error.main && <p>{error.main}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        {error.username && <p>{error.username}</p>}
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {error.password && <p>{error.password}</p>}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
