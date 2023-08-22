import { FaEllipsisV} from "react-icons/fa";
import './MessageHeaderDropdown.css'


import React, {useState, useEffect, useRef} from 'react';

const MessageHeaderDropdown = () => {
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
        <li className = 'dropdownItem'>
          <img src={props.img}></img>
          <a> {props.text} </a>
        </li>
      );
    }
  
    return (
      <div>
        <div className='MessageHeaderDropdown-container' ref={menuRef}>
            <FaEllipsisV className='icon-1' onClick={()=>{setOpen(!open)}}/>
            <div className={`MessageHeaderDropdown-menu ${open? 'active' : 'inactive'}`} >
                <ul>
                
                <DropdownItem  text = {"Contact Info"}/>
                <DropdownItem  text = {"Clear Message"}/>
                <DropdownItem  text = {"Delete Chat"}/>
                </ul>
            </div>
        </div>
      </div>
    );
}



export default MessageHeaderDropdown;
