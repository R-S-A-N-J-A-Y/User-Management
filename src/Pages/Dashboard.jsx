import React from "react";
import Greeting from "../Components/Greeting";
import UserActions from "../Components/userActions";

const Dashboard = () => {
  return (
    <div className="px-5 py-4 d-flex flex-column justify-content-between gap-5">
      <h1>Dashboard</h1>
      <Greeting />
      <UserActions />
    </div>
  );
};

export default Dashboard;
