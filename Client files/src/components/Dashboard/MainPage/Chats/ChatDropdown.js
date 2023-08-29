import "./ChatDropdown.css";
import { FaEllipsisV } from "react-icons/fa";

import React, {useState, useEffect, useRef} from 'react';

const ChatDropdown = () => {
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    
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
  
    const DropdownItem =(props) =>{
      return(
        <li className = 'ChatDropdown_dropdownItem'>
          <img src={props.img}></img>
          <a> {props.text} </a>
        </li>
      );
    }
  
    return (
      <div>
        <div className='ChatDropdown-container' ref={menuRef}>
            <FaEllipsisV className='ChatDropdown_icon-1' onClick={()=>{setOpen(!open)}}/>
            <div className={`ChatDropdown-menu ${open? 'active' : 'inactive'}`} >
                <ul>
                  <DropdownItem  text = {"Settings"}/>
                </ul>
            </div>
        </div>
      </div>
    );
};


export default ChatDropdown;