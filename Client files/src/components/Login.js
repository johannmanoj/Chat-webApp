import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios'
import image from './images/chat-icon-grey.png'
import { useUserAuth } from "./UserAuthContext";

const Login = () => {
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const log_user = async () => {
    const config = {
      method: 'post',
      url: `http://localhost:8080/log-user`,
      data : { 
        "email": localStorage.getItem('userEmail'), 
        "firstName": localStorage.getItem('displayName'), 
        "lastName" :"", 
        "profilePic" : localStorage.getItem('photoURL'), 
      }
    }
    
    await axios(config)
      .then((response) => {
        console.log("api-res-------", response.data)
      })
      .catch((error) => {
        console.log("err res ========", error.response.data);
      });
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      var google_res = await googleSignIn();
      console.log("google_res", google_res);
      
      localStorage.setItem("userEmail", google_res["user"]["email"])
      localStorage.setItem("displayName", google_res["user"]["displayName"])
      localStorage.setItem("photoURL", google_res["user"]["photoURL"])
      
      await log_user()
      navigate("/Dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-background2">
      <div className="login-group">
        <img src={image} className="login-google-icon"></img>
        <span><a href="#" onClick={handleGoogleSignIn}></a></span>
      </div>
    </div>
  );
};

export default Login;
