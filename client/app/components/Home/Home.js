import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SignUp from "../Registration/SignUp";
import Dashboard from "../Dashboard/Dashboard";
import { PromiseProvider } from "mongoose";
import { UserContext } from "../../context/UserContext";
import { getFromStorage } from "../../utils/Storage";

const Home = props => {
  let [loading, setLoading] = useState(false);
  let [token, setToken] = useState("");
  const { user, setUser } = useContext(UserContext);

  const baseURL = "http://localhost:8080";

  //Setting the token
  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    const headers = { token: storageToken };
    setToken(storageToken);

    axios
      .get(`${baseURL}/api/account/getUser`, {
        headers
      })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));

    // if (storageToken) {
    //   setToken(storageToken);
    //   //verify
    //   axios
    //     .get(`${baseURL}/api/account/verify?token=${storageToken}`)
    //     .then(json => {
    //       if (json.data.success) {
    //         setToken(storageToken);
    //         setLoading(false);
    //       } else {
    //         setLoading(false);
    //       }
    //     });
    // } else {
    //   setLoading(false);
    // }
  }, [loading]);

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
    return (
      <div>
        <SignUp loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <Dashboard baseURL={baseURL} token={token} />
      <button onClick={() => logout()}>Log out</button>
      <button onClick={() => setUser("hey")}>Change user context</button>
    </div>
  );
};

export default Home;
