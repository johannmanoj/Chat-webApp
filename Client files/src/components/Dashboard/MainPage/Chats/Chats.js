import React , { useState , useEffect}  from 'react'
import './Chats.css'
import ChatSidebarItem from './ChatSidebarItem'
import ChatMessages from './ChatMessages';
import { FaSearch, FaEllipsisV, FaEdit} from "react-icons/fa";
import axios from 'axios';
import ChatDropdown from './ChatDropdown';
import AddContactDropdown from './AddContactDropdown';

const Chats = () => {
  const [contactList, setContactList] = useState([])
  const [selectedContact, setSelectedContact] = useState({"email":"", "name":"", "profilePic":""})
  const [selectedContactDetails, setSelectedContactDetails] = useState()

  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const [AddContactDropdownVisibility, setAddContactDropdownVisibility] = useState(false)

  useEffect(() =>{
    const get_contacts_list = async () =>{
      const config = {
        method: 'post',
        url: `http://localhost:8080/get-user-contacts`,
        data : {"user" :localStorage.getItem("userEmail")}
      }
      await axios(config)
        .then((response) => {
          setContactList(response.data)
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    get_contacts_list()
  },[])

  return (
    <div className='Chats' >
      <div className='chat-sidebar'>

        <div className='chat-sidebar-header'>
          <h1 className='chat-heading'>Chats</h1>
          <FaEdit className='chat-add-icon' onClick={() => setAddContactDropdownVisibility(!AddContactDropdownVisibility)}/>
          <FaEllipsisV className = {dropdownVisibility ? 'chat-sidebar-icon2' : 'chat-sidebar-icon'} onClick={() => setDropdownVisibility(!dropdownVisibility)}/>
          {dropdownVisibility && <ChatDropdown setDropdownVisibility = {setDropdownVisibility} />}
          {AddContactDropdownVisibility && <AddContactDropdown setAddContactDropdownVisibility = {setAddContactDropdownVisibility} />}
        </div>

        <div className='chat-sidebar-search'>
          <input className="chat-search-bar" placeholder='Search'></input>
          <FaSearch className='chat-sidebar-search-icon'/>
        </div>

        {contactList.map((user) => (
          <div onClick={() =>  setSelectedContact({"email":user.email, "name":user.firstName, "profilePic":user.profilePic})}>
            <ChatSidebarItem user_name = {user.firstName} user_pic = {user.profilePic} user_email = {user.email} />
          </div>
        ))}
        
      </div>
      
      <ChatMessages className='chat-messages' contact_details = {selectedContact} />
      
    </div>
  )
}

export default Chats
