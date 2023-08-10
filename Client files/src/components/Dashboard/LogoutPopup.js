import "./LogoutPopup.css";
import logoutImage from '../../images/logout.jpg'


const CustomPopup = (props) => {
    const onClickHandler = () =>{
        props.set_show(false)
      }
    
      return(
        <div>
          <div className='backdrop' onClick={onClickHandler}/>
          <div className='modal'>
            {/* <header className='header'>
              <h3>Calender</h3>
            </header> */}

            <img className="logout-image" src= {logoutImage} />
            <p>Are you sure you want to Log out?</p>
            <footer className='actions'>
              <button className='button' onClick={() => props.logoutFunc()}>Yes</button>
              <button className='button' onClick={onClickHandler}>Cancel</button>
            </footer>
          </div>
        </div>
      )
};


export default CustomPopup;