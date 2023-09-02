import React, { useEffect, useState } from 'react'
import './ChatMessages.css'
import axios from 'axios'
import { FaPaperPlane, FaYinYang} from "react-icons/fa";

import MessageHeaderDropdown from './MessageHeaderDropdown';


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

  const [dropdownVisibility, setDropdownVisibility] = useState(false)

  const [submitstate, setSubmitstate] = useState(false)

  useEffect(() =>{
    const get_contacts_list = async () =>{
      const config = {
        method: 'post',
        url: `http://localhost:8080/get-user-messages`,
        data : {"user_email" :localStorage.getItem('userEmail'), "contact_email":contact_details.email}
      }
      await axios(config)
        .then((response) => {
          // console.log("messages----",response.data.data);
          setMessages(response.data.data)
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


  const date_converter = (input_date) =>{
    var currentTime = new Date(input_date);
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    var formated_time = new Intl.DateTimeFormat('default',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(ISTTime);

        console.log("formated_time",formated_time);
    return formated_time
  }

  if(contact_details.email != ""){
    return (
      <div className='chatMessages-background'>

        <div className='chat-message-header'>
          <img className='chat-message-profile-pic' src={contact_details.profilePic} />
          <div className='chat-message-profile-name'>{contact_details.name}</div>
          <MessageHeaderDropdown contact_email ={contact_details.email} setSubmitstate = {setSubmitstate} submitstate = {submitstate} />
        </div>
        
        <div className='messages-log-background'>
          {messages.map((singleMessage)=>{
              return(
                  <div className={singleMessage.type == "internal" ? 'chat-message-internal-align' : 'chat-message-external-align'}>
                    <div className='chat-message-and-timestamp'>
                      <div  className={singleMessage.type == "internal" ? 'chat-message-internal' : 'chat-message-external'} > 
                          <div className={'message-text'}>
                            {singleMessage.message}<br/>
                          </div>
                      </div>
                      <div className='message-timestamp'>
                        {date_converter(singleMessage.created)}
                      </div> 
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
          <form onSubmit={formSubmitHandler} className='message-footer'>
            <input className='message-input' type="text" value={enteredValue} onChange={goalInputChangeHandler} placeholder='Type a message' ></input>
            <FaPaperPlane className='message-icon' onClick={formSubmitHandler} />
          </form>
          
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
