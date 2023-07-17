import React from 'react'
import './Sidebar.css'
import { FaCalendarAlt , FaComments, FaBookmark} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <FaComments className='sidebar-icons'/><br/>
        <FaCalendarAlt className='sidebar-icons'/><br/>
        <FaBookmark className='sidebar-icons'/><br/>
        
        <div></div>
    </div>
  )
}

export default Sidebar
