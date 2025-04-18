import React from "react";
import { useAuth } from "../Context/AuthContext";

const Greeting = () => {
  const { state } = useAuth();
  return (
    <div
      className="p-5 rounded-3 position-relative"
      style={{ background: "rgb(204, 236, 248)" }}
    >
      <div className="left fs-5" style={{ width: "700px" }}>
        <p>
          Hello <span>{state.username}</span>
        </p>
        <p className="description">
          Maximize your productivity by utilizing the features available to you
          for effective day planning.
        </p>
      </div>
      <div className="right">
        <img
          className="dashboard-img-floater"
          src="/Images/DashboardHerpage.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Greeting;
