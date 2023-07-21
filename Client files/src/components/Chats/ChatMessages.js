import React, { useEffect, useState } from 'react'
import './ChatMessages.css'

const ChatMessages = () => {
    var Messages_data = [
        {
          "message":"Hi, this is John.",
          "type":"internal"
        },
        {
          "message":"Hello",
          "type":"external"
        },
        {
          "message":"How are you doing ?",
          "type":"internal"
        },
      ]

    return (
        <div>
          <div className='chat-message-header'>
            <img className='chat-message-profile-pic' src={"https://www.shareicon.net/data/512x512/2016/07/05/791214_man_512x512.png"} />
            {/* <div className='chat-message-profile-pic'></div> */}
            <div className='chat-message-profile-name'>John</div>
          </div>
          
            {Messages_data.map((singleMessage)=>{
                return(
                    <div className={singleMessage.type == "internal" ? 'chat-message-internal-align' : 'chat-message-external-align'}>
                        <div  className={singleMessage.type == "internal" ? 'chat-message-internal' : 'chat-message-external'} > 
                            {singleMessage.message}
                        </div>
                    </div>
                )
            })}
        </div>
  )
}

export default ChatMessages
