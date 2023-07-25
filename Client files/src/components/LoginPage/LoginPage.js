import React from 'react'
import './LoginPage.css'
import { signInWithGoogle } from "./Firebase";

const LoginPage = ({}) => {


  return (
    <div className='login-background'>
        <div className='login-card'>
            <button class="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    </div>
  )
}

export default LoginPage