import React, { useEffect, useState } from 'react'
import './ChatMessages.css'
import axios from 'axios'

const ChatMessages = ({contact_details}) => {
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
        data : {"email" :contact_details.email}
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
  },[contact_details])

  if(contact_details.email != ""){
    return (
      <div className='chatMessages-background'>
        <div className='chat-message-header'>
          <img className='chat-message-profile-pic' src={contact_details.profilePic} />
          {/* <div className='chat-message-profile-pic'></div> */}
          <div className='chat-message-profile-name'>{contact_details.name}</div>
        </div>
        
        <div className='messages-log-background'>
          {messages.map((singleMessage)=>{
              return(
                  <div className={singleMessage.type == "internal" ? 'chat-message-internal-align' : 'chat-message-external-align'}>
                      <div  className={singleMessage.type == "internal" ? 'chat-message-internal' : 'chat-message-external'} > 
                          <div className={'message-text'}>
                            {singleMessage.message}
                          </div>
                      </div>
                  </div>
              )
          })}
        </div>
        <div className='message-footer'>
          <input className='message-input'></input>
        </div>
  
      </div>
    )
  }else {
    return (
      <div className='chatMessages-background'></div>
    )
  }
}

export default ChatMessages
