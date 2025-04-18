import React from "react";
import UserCard from "./UserCard";

const UserActions = () => {
  const Actions = [
    {
      name: "Create New Account",
      message: "Start fresh by creating a new user account.",
    },
    {
      name: "Update Account",
      message: "Make changes to your existing account details.",
    },
    {
      name: "Manage Account",
      message: "Access settings and controls for user accounts.",
    },
    {
      name: "View Activity",
      message: "Track and review recent account activities.",
    },
  ];

  return (
    <div className="row row-cols-sm-1 row-cols-lg-2 row-cols-xl-3 gy-4">
      {Actions.map((val, index) => (
        <div className="col" key={index}>
          <UserCard name={val.name} message={val.message} />
        </div>
      ))}
    </div>
  );
};

export default UserActions;
