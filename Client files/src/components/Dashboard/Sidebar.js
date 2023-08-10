import React, { useState } from 'react'
import './Sidebar.css'
import { FaCalendarAlt , FaComments, FaBookmark, FaSmileBeam, FaSignOutAlt} from "react-icons/fa";

const Sidebar = ({setMain_page_func, logoutFunc}) => {

  return (
    <div className='sidebar'>
      <img className='profile-image' src={localStorage.getItem('photoURL')} />
      <FaComments className='sidebar-icons' onClick={() =>{setMain_page_func("all_chats")}}/><br/>
      {/* <FaCalendarAlt className='sidebar-icons' onClick={() =>{setMain_page_func("calender")}}/><br/> */}
      <FaBookmark className='sidebar-icons' onClick={()=>{setMain_page_func("saved")}}/><br/>
      <FaSignOutAlt className='sidebar-icons' onClick={() => logoutFunc()} /><br/>
    </div>
  )
}

export default Sidebar
