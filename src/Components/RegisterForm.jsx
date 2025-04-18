import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
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
    if (field in error) {
      const { [field]: _, ...rest } = error;
      setError(rest);
    }
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
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/createuser",
        user
      );
      console.log(response);
      return true;
    } catch (err) {
      const response = err.response.data;
      if (response.code === 11000) {
        if ("personal.phone" in response.keyValue) {
          setError({
            ...error,
            phone: "*The Entered Mobile Number is Already Registered.",
          });
        } else if ("personal.email" in response.keyValue) {
          setError({
            ...error,
            email: "*The Entered Email is Already Registered.",
          });
        } else {
          setError({
            ...error,
            username: "*This Username is Not Available",
          });
        }
      } else {
        console.log("----------- ", err);
      }
    }
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-2 py-0 d-flex flex-column gap-5"
    >
      <fieldset className="border border-dark rounded-3 px-5 pt-5 pb-3 d-flex flex-column gap-2 position-relative">
        <legend
          className="fw-bold text-center legend px-2 bg-white"
          style={{ width: "300px" }}
        >
          Personal Information
        </legend>
        <label className="form-label">Name</label>
        <input
          className="form-control"
          type="text"
          value={user.personal.name}
          onChange={(e) => handleChange("personal", "name", e.target.value)}
        />
        {error.name && <p className="text-danger">{error.name}</p>}

        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="text"
          value={user.personal.email}
          onChange={(e) => handleChange("personal", "email", e.target.value)}
        />
        {error.email && <p className="text-danger">{error.email}</p>}

        <label className="form-label">Phone Number</label>
        <input
          className="form-control"
          type="text"
          value={user.personal.phone}
          onChange={(e) => handleChange("personal", "phone", e.target.value)}
        />
        {error.phone && <p className="text-danger">{error.phone}</p>}

        <label className="form-label">DOB</label>
        <input
          className="form-control"
          type="date"
          value={user.personal.date}
          onChange={(e) => handleChange("personal", "date", e.target.value)}
        />
        {error.date && <p className="text-danger">{error.date}</p>}

        <label className="form-label">Gender</label>
        <div className="d-flex gap-5">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              checked={user.personal.gender === "male"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              checked={user.personal.gender === "female"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label className="form-check-label">Female</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Other"
              checked={user.personal.gender === "Other"}
              onChange={(e) =>
                handleChange("personal", "gender", e.target.value)
              }
            />
            <label className="form-check-label">Other</label>
          </div>

          {error.gender && <p className="text-danger">{error.gender}</p>}
        </div>
      </fieldset>
      <fieldset className="border border-dark rounded-3 px-5 pt-5 pb-4 d-flex flex-column gap-2  position-relative">
        <legend
          className="fw-bold text-center legend px-2 bg-white"
          style={{ width: "160px" }}
        >
          Address
        </legend>
        <label className="form-label">Door No</label>
        <input
          className="form-control"
          type="text"
          value={user.address.doorno}
          onChange={(e) => handleChange("address", "doorno", e.target.value)}
        />
        {error.doorno && <p className="text-danger">{error.doorno}</p>}

        <label className="form-label">Street</label>
        <input
          className="form-control"
          type="text"
          value={user.address.street}
          onChange={(e) => handleChange("address", "street", e.target.value)}
        />
        {error.street && <p className="text-danger">{error.street}</p>}

        <label className="form-label">City</label>
        <input
          className="form-control"
          type="text"
          value={user.address.city}
          onChange={(e) => handleChange("address", "city", e.target.value)}
        />
        {error.city && <p className="text-danger">{error.city}</p>}

        <label className="form-label">State</label>
        <input
          className="form-control"
          type="text"
          value={user.address.state}
          onChange={(e) => handleChange("address", "state", e.target.value)}
        />
        {error.state && <p className="text-danger">{error.state}</p>}

        <label className="form-label">Country</label>
        <input
          className="form-control"
          type="text"
          value={user.address.country}
          onChange={(e) => handleChange("address", "country", e.target.value)}
        />
        {error.country && <p className="text-danger">{error.country}</p>}

        <label className="form-label">PIN Code</label>
        <input
          className="form-control"
          type="text"
          value={user.address.pincode}
          onChange={(e) => handleChange("address", "pincode", e.target.value)}
        />
        {error.pincode && <p className="text-danger">{error.pincode}</p>}
      </fieldset>
      <fieldset className="border border-dark rounded-3 px-5 pt-5 pb-4 d-flex flex-column gap-2  position-relative">
        <legend
          className="fw-bold text-center legend px-2 bg-white"
          style={{ width: "200px" }}
        >
          Credentials
        </legend>
        <label className="form-label">Username</label>
        <input
          className="form-control"
          type="text"
          value={user.credential.username}
          onChange={(e) =>
            handleChange("credential", "username", e.target.value)
          }
        />
        {error.username && <p className="text-danger">{error.username}</p>}

        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="text"
          value={user.credential.password}
          onChange={(e) =>
            handleChange("credential", "password", e.target.value)
          }
        />
        {error.password && <p className="text-danger">{error.password}</p>}
      </fieldset>

      <button className="btn btn-primary" style={{ height: "50px" }}>
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
