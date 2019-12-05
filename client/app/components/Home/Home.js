import React, { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "../Registration/SignUp";
import { PromiseProvider } from "mongoose";

const Home = props => {
  let [loading, setLoading] = useState(false);
  let [token, setToken] = useState("");

  const baseURL = "http://localhost:8080";

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken) {
      setToken(storageToken);
      //verify
      console.log("getting token");
      axios.get(`${baseURL}/api/account/verify?token=${token}`).then(json => {
        if (json.success) {
          setToken(token);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/signIn");
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    console.log("token:", token);
    return (
      <div>
        <SignUp loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
};

export default Home;
