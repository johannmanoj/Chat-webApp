import React from 'react'
import './ChatSidebarItem.css'

const ChatSidebarItem = (props) => {
  return (
    <div className='chat-name-bar'>
        <div className='testtttttttt'>
        <div className='chat-profile-image'></div>
        <div className='chat-name'>
            {props.user_name}
        </div>
        </div>
    </div>
  )
}

export default ChatSidebarItem