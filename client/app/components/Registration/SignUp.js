import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = props => {
  const baseURL = "http://localhost:8080";
  let loading = props.loading;
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signUpError, setSignUpError] = useState("");

  const onChangeFirstName = e => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = e => {
    setLastName(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSignUp = () => {
    axios
      .post(
        `${baseURL}/api/account/signup`,
        {
          firstName: firstName,
          lastName: lastName,
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
          props.history.push("/signIn");
        } else {
          setSignUpError(res.data.message);
          loading = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={onChangeFirstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={onChangeLastName}
      />
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
      <button onClick={() => onSignUp()}>Sign Up</button>
      {signUpError ? <p>{signUpError}</p> : null}
      <div>
        <p>Already have an account?</p>
        <Link to="/signIn">
          <p>Sign In</p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
