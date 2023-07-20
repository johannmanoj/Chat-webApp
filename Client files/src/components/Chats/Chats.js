import React from 'react'
import './Chats.css'
import ChatSidebarItem from './ChatSidebarItem'
import { FaSearch} from "react-icons/fa";

const Chats = () => {
  var Data = [
    {
      "name":"John",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791214_man_512x512.png"
    },
    {
      "name":"Sam",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791224_man_512x512.png"
    },
    {
      "name":"Emma",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791221_man_512x512.png"
    }
  ]

  return (
    <div className='Chats' >
      <div className='chat-sidebar'>
        <div className='chat-sidebar-header'>
          <FaSearch className='chat-sidebar-icon'/>
          <input className="chat-search-bar" placeholder='Search'></input>
        </div>
        

        {Data.map((user) => (
        <ChatSidebarItem user_name = {user.name} user_pic = {user.profilePic} />
        ))}
       
      </div>
      <div className='chat-messages'>
          No Chats
      </div>
    </div>
    
    
  )
}

export default Chats
