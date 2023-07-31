import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaRegComments} from "react-icons/fa";
import './Login.css'


import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";

const Login = () => {
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      var google_res = await googleSignIn();
      // console.log("google_res", google_res);
      navigate("/Dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <FaRegComments className="login-icons"/>
        <h2>Login</h2>
        
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
