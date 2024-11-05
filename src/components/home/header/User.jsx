import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/slices/UserSlice"; 
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.Users.isLoading);
  const user = useSelector((state) => state.Users.user);

  const handleLogout = async () => {

    await dispatch(logoutUser());
    
    navigate("/login"); 
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default User;
