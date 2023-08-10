import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaRegComments} from "react-icons/fa";
import './Login.css'
import axios from 'axios'


import GoogleButton from "react-google-button";
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
    // <div className="login-background">
    //   <div className="login-card">
    //     <FaRegComments className="login-icons"/>
    //     <h2>Login</h2>
        
    //     <div>
    //       {/* <GoogleButton
    //         className="g-btn"
    //         type="dark"
    //         onClick={handleGoogleSignIn}
    //       /> */}
    //       <div className="login-button">
    //         <img src="https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png" className="google-logo" width="30" height="30" />
    //         <div className="google-signin">Sign in with Google</div>
    //       </div>
   
          
    //     </div>
    //   </div>
    // </div>
    <div className="login-background2">
      <span><a href="#" onClick={handleGoogleSignIn}></a></span>
    </div>
    
  );
};

export default Login;
