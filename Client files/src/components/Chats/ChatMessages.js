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
