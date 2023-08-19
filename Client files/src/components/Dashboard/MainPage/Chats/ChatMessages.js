import React, { useEffect, useState } from 'react'
import './ChatMessages.css'
import axios from 'axios'
import { FaPaperPlane, FaSmileBeam, FaYinYang} from "react-icons/fa";

const ChatMessages = ({contact_details}) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [messages, setMessages] = useState([
    {
      "message":"Hi, this is John.",
      "type":"internal",
      "created":"1690870585888"
    },
    {
      "message":"Hello",
      "type":"external",
      "created":"1690870585888"
    },
    {
      "message":"How are you doing ?",
      "type":"internal",
      "created":"1690870585888"
    },
  ])

  const [submitstate, setSubmitstate] = useState(false)

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
  },[contact_details.email, submitstate])

  const goalInputChangeHandler = event => { setEnteredValue(event.target.value) };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const config = {
      method: 'post',
      url: `http://localhost:8080/log-message`,
      data : { 
        "user_email": localStorage.getItem('userEmail'), 
        "contact_email": contact_details.email, 
        "message" :enteredValue, 
        "type" : "internal", 
      }
    }
    
    await axios(config)
      .then((response) => {
        console.log("api-res-------", response.data)
        setSubmitstate(!submitstate)
      })
      .catch((error) => {
        console.log("err res ========", error.response.data);
      });

    
    setEnteredValue("")
  };

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
                          {singleMessage.message}<br/>
                        </div>
                    </div><br/>
                    <div className='message-timestamp'>
                      {singleMessage.time_stamp}
                    </div>  
                  </div>
              )
          })}
          {messages.length == 0 && 
            <div className='message-default-text-background'>
              <div className='message-default-text'>
                No Messages
              </div>
            </div>
          }
        </div>
        <div className='message-footer'>
          <input className='message-input' type="text" value={enteredValue} onChange={goalInputChangeHandler} placeholder='Type a message' ></input>
          <FaPaperPlane className='message-icon' onClick={formSubmitHandler} />
        </div>
  
      </div>
    )
  }else {
    return (
      <div className='chatMessages-background-default'>
        <FaYinYang className='message-default-logo'/>
        <div className='message-default-text'>SyncUp</div>
      </div>
    )
  }
}

export default ChatMessages
