import React, { useState } from 'react'
import './Sidebar.css'
import { FaCalendarAlt , FaComments, FaBookmark} from "react-icons/fa";

const Sidebar = ({setMain_page_func}) => {

  return (
    <div className='sidebar'>
        <FaComments className='sidebar-icons' onClick={() =>{setMain_page_func("all_chats")}}/><br/>
        <FaCalendarAlt className='sidebar-icons' onClick={() =>{setMain_page_func("calender")}}/><br/>
        <FaBookmark className='sidebar-icons' onClick={()=>{setMain_page_func("saved")}}/><br/>
    </div>
  )
}

export default Sidebar
