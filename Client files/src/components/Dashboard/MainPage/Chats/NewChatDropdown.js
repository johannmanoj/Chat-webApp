import "./NewChatDropdown.css";
import { FaSearch, FaPlus, FaTimes, FaEllipsisV, FaEdit} from "react-icons/fa";
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios'

const NewChatDropdown = (props) => {
    const [contactSearch, setContactSearch] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchShow, setSearchShow] = useState(false)
    const nameChangeHandler = (event) =>{ setSearchName(event.target.value) }
    
    const add_contact = async () =>{
        setOpen(false)
        const config = {
            method: 'post',
            url: `http://localhost:8080/log-contact`,
            data : {"user" :localStorage.getItem("userEmail"), "email":contactSearch[0]["email"]}
        }
        await axios(config)
            .then((response) => {
            console.log(response.data);
            // props.setAddContactDropdownVisibility(false)
            })
            .catch((error) => {
            console.log(error.response);
            });
    }

    const submitHandler = async (event) =>{
        event.preventDefault()
        const config = {
            method: 'post',
            url: `http://localhost:8080/email-search`,
            data : {"email" :searchName}
        }
        await axios(config)
        .then((response) => {
            setSearchShow(true)
            setContactSearch(response.data)
        })
        .catch((error) => {
            console.log(error.response);
        });
    }





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
        <li className = 'NewChatDropdown_dropdownItem'>
          <a> {props.text} </a>
        </li>
      );
    }
  
    return (
      <div>
        <div className='NewChatDropdown-container' ref={menuRef}>
            <FaEdit className='NewChatDropdown_icon-1' onClick={()=>{setOpen(!open)}}/>
            <div className={`NewChatDropdown-menu ${open? 'active' : 'inactive'}`} >
                
                {/* <DropdownItem  text = {"New Chat"}/> */}
                <div className="NewChatDropdown-title">New Chat</div>
                <div className="NewChatDropdown-header">
                    <div className="NewChatDropdown-header-background">
                    <input className= {searchName.length > 0 ? 'NewChatDropdown-search-with-x' : 'NewChatDropdown-search'}        onChange={nameChangeHandler} placeholder="Search" value={searchName}></input>
                    {searchName.length > 0 && <FaTimes className="NewChatDropdown-x-icon" onClick={() =>setSearchName("")}/>}
                    </div>
                    <FaSearch className="NewChatDropdown-search-icon" onClick={submitHandler}/>
                </div>

                <div className="NewChatDropdown-search-result">
                    {searchShow && 
                    (contactSearch.length > 0 ? 
                        <div className="NewChatDropdown-search-result-item">
                        <div className= "NewChatDropdown-search-result-item-name">{contactSearch[0]["email"]}</div>
                        { contactSearch.length > 0 && <FaPlus className="NewChatDropdown-plus-icon" onClick={() => add_contact()} />}
                        </div> 
                        : 
                        <div className="NewChatDropdown-search-result-empty">
                        <div> No matching contact found </div>
                        </div>
                    )
                    }  
                </div>
                
            </div>
        </div>
      </div>
    );
};


export default NewChatDropdown;