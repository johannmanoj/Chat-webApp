import React from 'react'
import './Chats.css'
import ChatSidebarItem from './ChatSidebarItem'
import { FaSearch} from "react-icons/fa";

const Chats = () => {
  var Data = [{"name":"John"},{"name":"Sam"},{"name":"Daniel"}]



  return (
    <div className='Chats' >
      <div className='chat-sidebar'>
        <FaSearch className=''/>
        <input className="chat-search-bar" placeholder='Search'></input>

        {Data.map((user) => (
        <ChatSidebarItem user_name = {user.name}/>
        ))}
       
      </div>
      <div className='chat-messages'>
          No Chats
      </div>
    </div>
    
    
  )
}

export default Chats
