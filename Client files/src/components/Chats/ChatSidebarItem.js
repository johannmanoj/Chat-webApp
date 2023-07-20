import React from 'react'
import './ChatSidebarItem.css'

const ChatSidebarItem = (props) => {
  console.log("url---",props.user_pic);
  return (
    <div className='chat-name-bar'>
        <div className='testtttttttt'>
        <img className='chat-profile-image' src={props.user_pic} />
        <div className='chat-name'>
            {props.user_name}
        </div>
        </div>
    </div>
  )
}

export default ChatSidebarItem