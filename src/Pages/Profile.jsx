import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { state, fetchProfile, isLoading, Logout } = useAuth();

  useEffect(() => {
    if (!state.profile) {
      fetchProfile();
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{state.profile?.personal.name}</h1>

      <button className="btn btn-danger ms-2" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
