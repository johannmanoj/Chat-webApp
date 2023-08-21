import "./AddContactDropdown.css";
import { FaDoorOpen } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { FaSearch, FaPlus, FaTimes} from "react-icons/fa";



const AddContactDropdown = (props) => {
  const [contactSearch, setContactSearch] = useState([])
  const [searchName, setSearchName] = useState("")

  const [searchShow, setSearchShow] = useState(false)
  



  const nameChangeHandler = (event) =>{ setSearchName(event.target.value) }

  const add_contact = async () =>{
      props.setAddContactDropdownVisibility(false)
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

  // console.log("contactSearch------",contactSearch);

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
  
  return(
    <div>
        <div className='chat-dropdown-backdrop' onClick= {() => props.setAddContactDropdownVisibility(false)}/>

        <div className='add-contact-modal'>
          <div className="add-contact-title">New Chat</div>
          <div className="add-contact-header">
            <div className="add-contact-header-background">
              <input className= {searchName.length > 0 ? 'add-contact-search-with-x' : 'add-contact-search'}        onChange={nameChangeHandler} placeholder="Search" value={searchName}></input>
              {searchName.length > 0 && <FaTimes className="add-contact-x-icon" onClick={() =>setSearchName("")}/>}
            </div>
            <FaSearch className="add-contact-search-icon" onClick={submitHandler}/>
            
          </div>
            
            
      
          <div className="add-contact-search-result">
              {searchShow && 
                (contactSearch.length > 0 ? 
                  <div className="add-contact-search-result-item">
                    <div className= "add-contact-search-result-item-name">{contactSearch[0]["email"]}</div>
                    { contactSearch.length > 0 && <FaPlus className="add-contact-plus-icon" onClick={() => add_contact()} />}
                  </div> 
                  : 
                  <div className="add-contact-search-result-empty">
                    <div> No matching contact found </div>
                  </div>
                )
              }

              
              
          </div>
        </div>
    </div>
  )
};


export default AddContactDropdown;