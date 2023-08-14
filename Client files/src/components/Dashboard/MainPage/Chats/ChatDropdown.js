import "./ChatDropdown.css";
import { FaDoorOpen } from "react-icons/fa";

const ChatDropdown = (props) => {
    
    
    return(
        <div>
            <div className='chat-dropdown-backdrop' onClick= {() => props.setDropdownVisibility(false)}/>

            <div className='chat-dropdown-modal'>
                <div>Add Contact</div>
                <div>Settings</div>
            </div>
        </div>
    )
};


export default ChatDropdown;