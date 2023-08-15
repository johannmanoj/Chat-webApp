import React from 'react'
import './Saved.css'
import { FaSearch, FaEllipsisV} from "react-icons/fa";


const Saved = () => {
  return (
   
    <div className='Saved'>
      <div className='save-sidebar'>
        <div className='save-sidebar-header'>
          <h1 className='save-heading'>Saved</h1>
          <FaEllipsisV className =  'save-sidebar-icon'/>
          {/* {dropdownVisibility && <ChatDropdown setDropdownVisibility = {setDropdownVisibility} />} */}
        </div>
        <div className='save-sidebar-search'>
          
          <input className="save-search-bar" placeholder='Search'></input>
          <FaSearch className='save-sidebar-search-icon'/>
        </div>
      </div>
      
      {/* <div className='save-messages'>No Saved Messages</div> */}
      
    </div>
  )
}

export default Saved
