import { FaEllipsisV} from "react-icons/fa";
import './ContactInfoSlider.css'
import axios from 'axios'


import React, {useState, useEffect, useRef} from 'react';

const ContactInfoSlider = ({contact_email, submitstate, setSubmitstate, profilePic}) => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  const refresh = () => window.location.reload(true)

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };
    document.addEventListener("mousedown", handler);
    
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  const clear_messages = async () =>{
    const config = {
      method: 'post',
      url: `http://localhost:8080/clear-contact-messages`,
      data : {"user_email" :localStorage.getItem("userEmail"), "contact_email":contact_email}
    }
    await axios(config)
      .then((response) => {
        setSubmitstate(!submitstate)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const delete_contact = async () =>{
    const config = {
      method: 'post',
      url: `http://localhost:8080/delete-contact`,
      data : {"user_email" :localStorage.getItem("userEmail"), "contact_email":contact_email}
    }
    await axios(config)
      .then((response) => {
        setSubmitstate(!submitstate)
        console.log(response.data);
        refresh()
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  


  return (
    <div>
      <div className='ContactInfoSlider-container' ref={menuRef}>

          <FaEllipsisV className='icon-1' onClick={()=>{setOpen(!open)}}/>
          <div className={`ContactInfoSlider-menu ${open? 'active' : 'inactive'}`} >
            <img src={profilePic} className="ContactInfoSlider-pic"></img>
            <ul>
            <div className = 'dropdownItem' >Contact Info</div>
            <div className = 'dropdownItem' onClick={() =>clear_messages()}>Clear Message</div>
            <div className = 'dropdownItem' onClick={() => delete_contact()}>Delete Chat</div>
            </ul>
          </div>
      </div>
    </div>
  );
}



export default ContactInfoSlider;
