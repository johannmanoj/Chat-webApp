import React, { useEffect, useState } from 'react'
import './ChatMessages.css'
import axios from 'axios'

const ChatMessages = (props) => {
  const [messages, setMessages] = useState([
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
  ])

  useEffect(() =>{
    const get_contacts_list = async () =>{
      const config = {
        method: 'post',
        url: `http://localhost:8080/get-user-messages`,
        data : {"email" :props.contact_name}
      }
      await axios(config)
        .then((response) => {
          
          setMessages(response.data)
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    get_contacts_list()
  },[props.contact_name])

  return (
    <div>
      <div className='chat-message-header'>
        <img className='chat-message-profile-pic' src={"https://www.shareicon.net/data/512x512/2016/07/05/791214_man_512x512.png"} />
        {/* <div className='chat-message-profile-pic'></div> */}
        <div className='chat-message-profile-name'>John</div>
      </div>
      
        {messages.map((singleMessage)=>{
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
