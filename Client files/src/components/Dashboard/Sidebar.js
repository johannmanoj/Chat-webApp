import React, { useState } from 'react'
import './Sidebar.css'
import { FaCalendarAlt , FaComments, FaBookmark, FaSmileBeam, FaSignOutAlt} from "react-icons/fa";

import LogoutPopup from './LogoutPopup'

const Sidebar = ({setMain_page_func, logoutFunc}) => {
  const [showCalender, setShowCalender] = useState(false)



  return (
    <div className='sidebar'>
      <img className='profile-image' src={localStorage.getItem('photoURL')} />
      <FaComments className='sidebar-icons' onClick={() =>{setMain_page_func("all_chats")}}/><br/>
      {/* <FaCalendarAlt className='sidebar-icons' onClick={() =>{setMain_page_func("calender")}}/><br/> */}
      <FaBookmark className='sidebar-icons' onClick={()=>{setMain_page_func("saved")}}/><br/>

      
      {/* <FaSignOutAlt className='sidebar-icons' onClick={() => logoutFunc()} /><br/> */}


      <FaSignOutAlt className='sidebar-icons' onClick={(e) => setShowCalender(!showCalender)} /><br/>
      { showCalender && <LogoutPopup set_show = {setShowCalender} logoutFunc = {logoutFunc}/>}
    </div>
  )
}

export default Sidebar
