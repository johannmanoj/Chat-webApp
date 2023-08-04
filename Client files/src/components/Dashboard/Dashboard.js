import {React, useContext, useState } from 'react'
import Sidebar from './Sidebar';
import MainPage from './MainPage';

import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext";

import './Dashboard.css'


const Dashboard = () => {
  const [main_page, setMain_page] = useState("all_chats")

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("userEmail")
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {/* <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div> */}

      <Sidebar setMain_page_func = {setMain_page} logoutFunc = {handleLogout}/>
      <MainPage mainPageData = {main_page}/>
      
      
    </div>
  );
}

export default Dashboard