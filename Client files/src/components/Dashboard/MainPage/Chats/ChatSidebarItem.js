import React from 'react'
import './ChatSidebarItem.css'

const ChatSidebarItem = (props) => {
  console.log("props.selection_status",props.selection_status);
  return (
    <div className= {props.selection_status ? "chat-name-bar-selected" : "chat-name-bar"}>
        <div className='testtttttttt'>
        <img className='chat-profile-image' src={props.user_pic} />
        <div className='chat-name'>
            {props.user_name}
        </div>
        {/* {props.user_email} */}
        </div>
    </div>
  )
}

export default ChatSidebarItem