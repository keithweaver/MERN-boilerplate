import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setInStorage } from "../../utils/Storage";

const SignIn = props => {
  const baseURL = "http://localhost:8080";
  let loading = props.loading;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signInError, setSignInError] = useState("");

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSignIn = () => {
    axios
      .post(
        `${baseURL}/api/account/signin`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          props.history.push("/");
        } else {
          setSignInError(res.data.message), (loading = false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onChangeEmail}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
      />
      <button onClick={() => onSignIn()}>Sign In</button>
      {signInError ? <p>{signInError}</p> : null}
      <div>
        <p>Don't have an account?</p>
        <Link to="/signUp">
          <p>Sign Up</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
