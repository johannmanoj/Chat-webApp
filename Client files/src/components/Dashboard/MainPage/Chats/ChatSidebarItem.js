import React from 'react'
import './ChatSidebarItem.css'

const ChatSidebarItem = (props) => {

  return (
    <div className='chat-name-bar' >
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