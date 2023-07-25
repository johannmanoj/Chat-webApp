import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaRegComments} from "react-icons/fa";


import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";

const Login = () => {
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/Dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <FaRegComments className="login-icons"/>
        <h2 className="mb-3">Login</h2>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
