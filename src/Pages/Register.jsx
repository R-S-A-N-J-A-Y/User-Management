import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    Personal: {
      name: "",
      email: "",
      phone: "",
      date: "",
      gender: "",
    },
    Address: {
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

    // Personal info validation
    if (user.Personal.name === "") {
      errors.name = "*Name is required";
    }
    if (user.Personal.email === "") {
      errors.email = "*Email is required";
    }
    if (user.Personal.phone === "") {
      errors.phone = "*Phone number is required";
    }
    if (user.Personal.date === "") {
      errors.date = "*Date of birth is required";
    }

    // Address validation
    if (user.Address.doorno === "") {
      errors.doorno = "*Door number is required";
    }
    if (user.Address.street === "") {
      errors.street = "*Street is required";
    }
    if (user.Address.city === "") {
      errors.city = "*City is required";
    }
    if (user.Address.state === "") {
      errors.state = "*State is required";
    }
    if (user.Address.country === "") {
      errors.country = "*Country is required";
    }
    if (user.Address.pincode === "") {
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

    // Personal info validation with regex
    if (!/^[A-Za-z\s'-]+$/.test(user.Personal.name)) {
      errors.email = "*Name is invalid";
    }
    if (!/\S+@\S+\.\S+/.test(user.Personal.email)) {
      errors.email = "*Email is invalid";
    }
    if (!/^\d{10}$/.test(user.Personal.phone)) {
      errors.phone = "*Phone number must be 10 digits";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(user.Personal.date)) {
      errors.date = "*Date of birth must be in YYYY-MM-DD format";
    }

    // Address validation with regex
    if (!/^\d+$/.test(user.Address.doorno)) {
      errors.doorno = "*Door No must be digits";
    }
    if (!/^\d{6}$/.test(user.Address.pincode)) {
      errors.pincode = "*Pincode must be 6 digits";
    }

    // Password validation with length check
    if (user.credential.password && user.credential.password.length < 6) {
      errors.password = "*Password must be at least 6 characters long";
    }

    setError(errors);
    return Object.keys(errors).length == 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log("Form has errors", error);
      return;
    }
    setUser({
      Personal: {
        name: "",
        email: "",
        phone: "",
        date: "",
        gender: "",
      },
      Address: {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Name</label>
          <input
            type="text"
            value={user.Personal.name}
            onChange={(e) => handleChange("Personal", "name", e.target.value)}
          />
          {error.name && <p>{error.name}</p>}

          <label>Email</label>
          <input
            type="text"
            value={user.Personal.email}
            onChange={(e) => handleChange("Personal", "email", e.target.value)}
          />
          {error.email && <p>{error.email}</p>}

          <label>Phone Number</label>
          <input
            type="text"
            value={user.Personal.phone}
            onChange={(e) => handleChange("Personal", "phone", e.target.value)}
          />
          {error.phone && <p>{error.phone}</p>}

          <label>DOB</label>
          <input
            type="date"
            value={user.Personal.date}
            onChange={(e) => handleChange("Personal", "date", e.target.value)}
          />
          {error.date && <p>{error.date}</p>}

          <div>
            <label>Gender</label>
            <input
              type="radio"
              value="male"
              checked={user.Personal.gender === "male"}
              onChange={(e) =>
                handleChange("Personal", "gender", e.target.value)
              }
            />
            <label>Male</label>
            <input
              type="radio"
              value="female"
              checked={user.Personal.gender === "female"}
              onChange={(e) =>
                handleChange("Personal", "gender", e.target.value)
              }
            />
            <label>Female</label>
            <input
              type="radio"
              value="Other"
              checked={user.Personal.gender === "Other"}
              onChange={(e) =>
                handleChange("Personal", "gender", e.target.value)
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
            value={user.Address.doorno}
            onChange={(e) => handleChange("Address", "doorno", e.target.value)}
          />
          {error.doorno && <p>{error.doorno}</p>}

          <label>Street</label>
          <input
            type="text"
            value={user.Address.street}
            onChange={(e) => handleChange("Address", "street", e.target.value)}
          />
          {error.street && <p>{error.street}</p>}

          <label>City</label>
          <input
            type="text"
            value={user.Address.city}
            onChange={(e) => handleChange("Address", "city", e.target.value)}
          />
          {error.city && <p>{error.city}</p>}

          <label>State</label>
          <input
            type="text"
            value={user.Address.state}
            onChange={(e) => handleChange("Address", "state", e.target.value)}
          />
          {error.state && <p>{error.state}</p>}

          <label>Country</label>
          <input
            type="text"
            value={user.Address.country}
            onChange={(e) => handleChange("Address", "country", e.target.value)}
          />
          {error.country && <p>{error.country}</p>}

          <label>PIN Code</label>
          <input
            type="text"
            value={user.Address.pincode}
            onChange={(e) => handleChange("Address", "pincode", e.target.value)}
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
