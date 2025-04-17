import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const LoginForm = () => {
  const { Login } = useAuth();
  const Navigate = useNavigate();
  const [alertBox, setAlertBox] = useState(false);

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
      setAlertBox(false);
      Login(user.username);
      Navigate("/dashboard");
      setUser({ username: "", password: "" });
    }
  };

  const callBackend = async () => {
    let showAlertTimeout;
    try {
      showAlertTimeout = setTimeout(() => {
        setAlertBox(true);
      }, 300); // Only show if slow enough to be noticeable

      const response = await axios.post("http://localhost:3000/auth/", {
        username: user.username,
        password: user.password,
      });

      clearTimeout(showAlertTimeout);
      setAlertBox(false); // Hide alert

      if (response.data === "User Found") {
        return true;
      } else {
        setError({ ...error, main: "Username or password is wrong." });
        return false;
      }
    } catch (err) {
      clearTimeout(showAlertTimeout);
      setAlertBox(false);
      setError({ ...error, main: "Something went wrong. Try again later." });
      return false;
    }
  };

  return (
    <div>
      {alertBox && (
        <div className="alert-box bg-dark text-white p-3 rounded-3">
          Verifying user in the database...
        </div>
      )}
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
