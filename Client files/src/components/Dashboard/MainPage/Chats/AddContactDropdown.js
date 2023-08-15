import "./AddContactDropdown.css";
import { FaDoorOpen } from "react-icons/fa";

const AddContactDropdown = (props) => {
    
    
    return(
        <div>
            <div className='chat-dropdown-backdrop' onClick= {() => props.setAddContactDropdownVisibility(false)}/>

            <div className='add-contact-modal'>
                <input className='add-contact-search'></input>
                <div className="add-contact-menu">
                   <div className="add-contact-menu-item">Search</div> 
                </div>
                <div className="add-contact-search-result">
                    Contacts
                </div>
            </div>
        </div>
    )
};


export default AddContactDropdown;