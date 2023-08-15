import "./ChatDropdown.css";
import { FaDoorOpen } from "react-icons/fa";

const ChatDropdown = (props) => {
    
    
    return(
        <div>
            <div className='chat-dropdown-backdrop' onClick= {() => props.setDropdownVisibility(false)}/>

            <div className='chat-dropdown-modal'>
                <div className="add-contact-menu">
                   <div className="add-contact-menu-item">Add Contact</div> 
                </div>
                <div className="settings-menu">
                    <div className="settings-menu-item">Settings</div>
                </div>
            </div>
        </div>
    )
};


export default ChatDropdown;