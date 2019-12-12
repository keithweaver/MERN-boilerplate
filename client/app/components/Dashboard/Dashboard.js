import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./../../context/UserContext";

const Dashboard = props => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user}</p>
      {console.log("user:", user)}
    </div>
  );
};

export default Dashboard;
