import "./MessageHeaderDropdown.css";
import { FaDoorOpen } from "react-icons/fa";

const MessageHeaderDropdown = (props) => {
    
    
    return(
        <div>
            <div className='MessageHeaderDropdown-backdrop' onClick= {() => props.setDropdownVisibility(false)}/>

            <div className='MessageHeaderDropdown-modal'>
                <div className="add-contact-menu">
                   <div className="MessageHeaderDropdown-text">Contact Info</div> 
                </div>
                <div className="settings-menu">
                    <div className="MessageHeaderDropdown-text">Clear Messages</div>
                </div>
                <div className="settings-menu">
                    <div className="MessageHeaderDropdown-text">Delete Chat</div>
                </div>
            </div>
            
            {/* <div class="menu">
                <li>
                    <a >Parent Link</a>
                    
                    <ul>
                    <a >Contact Info</a>
                    <a >Delete Messages</a>
                    <a >Delete chat</a>
                    
                    </ul>
                </li>
            </div> */}
        </div>
    )
};


export default MessageHeaderDropdown;