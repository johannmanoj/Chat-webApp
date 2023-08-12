import "./ChatDropdown.css";
import { FaDoorOpen } from "react-icons/fa";

const ChatDropdown = (props) => {
    
    
    return(
        <div>
            <div className='chat-dropdown-backdrop' onClick= {() => props.setDropdownVisibility(false)}/>

            <div className='chat-dropdown-modal'>
                <div>Option 1</div>
                <div>Option 2</div>
                <div>Option 3</div>
            </div>
        </div>
    )
};


export default ChatDropdown;