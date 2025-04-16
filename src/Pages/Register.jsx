import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { Login } = useAuth();
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      date: "",
      gender: "",
    },
    address: {
      doorno: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    credential: {
      username: "",
      password: "",
    },
  });
  const [error, setError] = useState({});

  const handleChange = (section, field, value) => {
    setUser({ ...user, [section]: { ...user[section], [field]: value } });
  };

  const validate = () => {
    let errors = {};

    // personal info validation
    if (user.personal.name === "") {
      errors.name = "*Name is required";
    }
    if (user.personal.email === "") {
      errors.email = "*Email is required";
    }
    if (user.personal.phone === "") {
      errors.phone = "*Phone number is required";
    }
    if (user.personal.date === "") {
      errors.date = "*Date of birth is required";
    }

    // address validation
    if (user.address.doorno === "") {
      errors.doorno = "*Door number is required";
    }
    if (user.address.street === "") {
      errors.street = "*Street is required";
    }
    if (user.address.city === "") {
      errors.city = "*City is required";
    }
    if (user.address.state === "") {
      errors.state = "*State is required";
    }
    if (user.address.country === "") {
      errors.country = "*Country is required";
    }
    if (user.address.pincode === "") {
      errors.pincode = "*Pincode is required";
    }

    // Credential validation
    if (user.credential.username === "") {
      errors.username = "*Username is required";
    }
    if (user.credential.password === "") {
      errors.password = "*Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return false;
    }

    // personal info validation with regex
    if (!/^[A-Za-z\s'-]+$/.test(user.personal.name)) {
      errors.name = "*Name is invalid";
    }
    if (!/\S+@\S+\.\S+/.test(user.personal.email)) {
      errors.email = "*Email is invalid";
    }
    if (!/^\d{10}$/.test(user.personal.phone)) {
      errors.phone = "*Phone number must be 10 digits";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(user.personal.date)) {
      errors.date = "*Date of birth must be in YYYY-MM-DD format";
    }

    // address validation with regex
    if (!/^\d+$/.test(user.address.doorno)) {
      errors.doorno = "*Door No must be digits";
    }
    if (!/^\d{6}$/.test(user.address.pincode)) {
      errors.pincode = "*Pincode must be 6 digits";
    }

    // Password validation with length check
    if (user.credential.password && user.credential.password.length < 6) {
      errors.password = "*Password must be at least 6 characters long";
    }

    setError(errors);
    return Object.keys(errors).length == 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Form has errors", error);
      return;
    }
    const result = await callBackend();
    if (result) {
      Login(user.credential.username);
      Navigate("/dashboard");
      setUser({
        personal: {
          name: "",
          email: "",
          phone: "",
          date: "",
          gender: "",
        },
        address: {
          doorno: "",
          street: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
        credential: {
          username: "",
          password: "",
        },
      });
    }
  };

  const callBackend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/createuser",
        user
      );
      console.log(response);
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Name</label>
          <input
            type="text"
            value={user.personal.name}
            onChange={(e) => handleChange("personal", "name", e.target.value)}
          />
          {error.name && <p>{error.name}</p>}

          <label>Email</label>
          <input
            type="text"
            value={user.personal.email}
            onChange={(e) => handleChange("personal", "email", e.target.value)}
          />
          {error.email && <p>{error.email}</p>}

          <label>Phone Number</label>
          <input
            type="text"
            value={user.personal.phone}
            onChange={(e) => handleChange("personal", "phone", e.target.value)}
          />
          {error.phone && <p>{error.phone}</p>}

          <label>DOB</label>
          <input
            type="date"
            value={user.personal.date}
            onChange={(e) => handleChange("personal", "date", e.target.value)}
          />
          {error.date && <p>{error.date}</p>}

          <div>
            <label>Gender</label>
            <input
              type="radio"
              value="male"
              checked={user.personal.gender === "male"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label>Male</label>
            <input
              type="radio"
              value="female"
              checked={user.personal.gender === "female"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label>Female</label>
            <input
              type="radio"
              value="Other"
              checked={user.personal.gender === "Other"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label>Other</label>
            {error.gender && <p>{error.gender}</p>}
          </div>
        </fieldset>
        <fieldset>
          <label>Door No</label>
          <input
            type="text"
            value={user.address.doorno}
            onChange={(e) => handleChange("address", "doorno", e.target.value)}
          />
          {error.doorno && <p>{error.doorno}</p>}

          <label>Street</label>
          <input
            type="text"
            value={user.address.street}
            onChange={(e) => handleChange("address", "street", e.target.value)}
          />
          {error.street && <p>{error.street}</p>}

          <label>City</label>
          <input
            type="text"
            value={user.address.city}
            onChange={(e) => handleChange("address", "city", e.target.value)}
          />
          {error.city && <p>{error.city}</p>}

          <label>State</label>
          <input
            type="text"
            value={user.address.state}
            onChange={(e) => handleChange("address", "state", e.target.value)}
          />
          {error.state && <p>{error.state}</p>}

          <label>Country</label>
          <input
            type="text"
            value={user.address.country}
            onChange={(e) => handleChange("address", "country", e.target.value)}
          />
          {error.country && <p>{error.country}</p>}

          <label>PIN Code</label>
          <input
            type="text"
            value={user.address.pincode}
            onChange={(e) => handleChange("address", "pincode", e.target.value)}
          />
          {error.pincode && <p>{error.pincode}</p>}
        </fieldset>
        <fieldset>
          <label>Username</label>
          <input
            type="text"
            value={user.credential.username}
            onChange={(e) =>
              handleChange("credential", "username", e.target.value)
            }
          />
          {error.username && <p>{error.username}</p>}

          <label>Password</label>
          <input
            type="text"
            value={user.credential.password}
            onChange={(e) =>
              handleChange("credential", "password", e.target.value)
            }
          />
          {error.password && <p>{error.password}</p>}
        </fieldset>

        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
