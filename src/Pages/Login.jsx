import React, { useState } from "react";

const Login = () => {
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

    if (!/^[A-Za-z\s'-]+$/.test(user.username)) {
      Errors.username = "*Username is invalid";
    }

    setError(Errors);
    return Object.keys(Errors).length == 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Validate()) return;
    setUser({ username: "", password: "" });
  };

  return (
    <div>
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

export default Login;
