import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ name, message }) => {
  const Navigate = useNavigate();

  const handleClick = () => {
    if (name === "Create New Account") Navigate("/register");
    else if (name === "Update Account") Navigate("/update");
    else if (name === "Manage Account") Navigate("/manage");
    else Navigate("./profile");
  };

  return (
    <div
      className="card border border-dark rounded-3 p-3"
      style={{ minheight: "200px" }}
    >
      <div className="card-body">
        <h5 className="card-title mb-4">{name}</h5>
        <p className="card-text">{message}</p>
        <button className="btn btn-primary" onClick={handleClick}>
          Click Here
        </button>
      </div>
    </div>
  );
};

export default UserCard;
