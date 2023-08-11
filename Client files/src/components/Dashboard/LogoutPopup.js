import "./LogoutPopup.css";
import logoutImage from '../../images/logout.jpg'
import { FaDoorOpen } from "react-icons/fa";

const CustomPopup = (props) => {
    const onClickHandler = () =>{
        props.set_show(false)
      }
    
      return(
        <div>
          <div className='backdrop' />
          <div className='modal'>
            <FaDoorOpen className="logout-door-icon"/>
            {/* <h2 className="header">Already leaving?</h2> */}
            <div className="header">Already leaving?</div>
            <button className='logout-button-1' onClick={() => props.logoutFunc()}>Yes, Log out</button>
            <button className='logout-button-2' onClick={onClickHandler}>No, I am staying</button>
          </div>
        </div>
      )
};


export default CustomPopup;