import {React, useContext } from 'react'
import Sidebar from './Sidebar';
import MainPage from './MainPage';
import Auth_Context from './Auth_context';

import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";



const Dashboard = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <button variant="primary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
}

export default Dashboard