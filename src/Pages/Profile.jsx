import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { state, fetchProfile, isLoading, Logout } = useAuth();
  const { profile } = state;
  useEffect(() => {
    if (!state.profile) {
      fetchProfile();
    }
  }, []);

  if (isLoading) return <p className="p-5">Loading...</p>;

  if (!profile)
    return <p className="p-5">Error Loading Profile, Try Refreshing...</p>;

  const { personal, address, credential } = profile;
  const [year, month, day] = personal.date.split("T")[0].split("-");

  return (
    <div className="px-5 pt-3 pb-2">
      <div className="d-flex align-center justify-content-between p-2 mb-3">
        <h1>User Profile</h1>

        <button
          className="btn btn-danger ms-2"
          style={{ width: "100px" }}
          onClick={Logout}
        >
          Logout
        </button>
      </div>
      <div className="d-flex flex-column gap-4">
        <div className="border border-black rounded-3 p-3 card  position-relative">
          <legend
            className="fw-bold text-center legend px-2 bg-white"
            style={{ width: "150px" }}
          >
            Personal
          </legend>
          <div className="card-body">
            <p className="card-text fw-bold">
              Name: <span className="fw-normal">{personal.name}</span>
            </p>
            <p className="card-text fw-bold">
              Email: <span className="fw-normal">{personal.email}</span>
            </p>
            <p className="card-text fw-bold">
              Phone: <span className="fw-normal">{personal.phone}</span>
            </p>
            <p className="card-text fw-bold">
              DOB:{" "}
              <span className="fw-normal">
                {day}/{month}/{year}
              </span>
            </p>
            <p className="card-text fw-bold">
              Gender:{" "}
              <span className="fw-normal">
                {personal.gender.charAt(0).toUpperCase() +
                  personal.gender.slice(1)}
              </span>
            </p>
          </div>
        </div>
        <div className="border border-black rounded-3 p-3 card position-relative">
          <legend
            className="fw-bold text-center legend px-2 bg-white"
            style={{ width: "150px" }}
          >
            Address
          </legend>
          <div className="card-body ">
            <p className="card-text">
              No. {address.doorno}, {address.street}, {address.city},{" "}
              {address.state}, {address.country}, {address.pincode}.
            </p>
          </div>
        </div>
        <div className="border border-black rounded-3 p-3 card position-relative">
          <legend
            className="fw-bold text-center legend px-2 bg-white"
            style={{ width: "200px" }}
          >
            Creadentials
          </legend>
          <div className="card-body ">
            <p className="card-text fw-bold">
              UserName: <span className="fw-normal">{credential.username}</span>
            </p>
            <p className="card-text fw-bold">
              Password:{" "}
              <span className="fw-normal">
                {"*".repeat(parseInt(credential.password.length))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
