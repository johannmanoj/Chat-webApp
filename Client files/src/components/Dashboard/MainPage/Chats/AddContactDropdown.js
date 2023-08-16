import "./AddContactDropdown.css";
import { FaDoorOpen } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { FaSearch} from "react-icons/fa";

const AddContactDropdown = (props) => {
    const [contactSearch, setContactSearch] = useState([])
    const [searchName, setSearchName] = useState("")

    const [searchShow, setSearchShow] = useState(false)



    const nameChangeHandler = (event) =>{ setSearchName(event.target.value) }

    const add_contact = async () =>{
        const config = {
          method: 'post',
          url: `http://localhost:8080/log-contact`,
          data : {"user" :localStorage.getItem("userEmail"), "email":contactSearch[0]["email"]}
        }
        await axios(config)
          .then((response) => {
            console.log(response.data);
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
                    <div className="add-contact-header">
                        <input className='add-contact-search' onChange={nameChangeHandler}></input>
                        <FaSearch className="add-contact-search-icon" onClick={submitHandler}/>
                    </div>
                
                
          
                <div className="add-contact-search-result">
                    {searchShow && <div className="add-contact-search-result-item">
                        <div className="add-contact-search-result-item-name">{contactSearch.length > 0 ? contactSearch[0]["email"] : "No contact found"}</div>
                        { contactSearch.length > 0 && <button onClick={() => add_contact()}>Add</button>}
                    </div>}
                    {!searchShow && "Search"}
                </div>
            </div>
        </div>
    )
};


export default AddContactDropdown;