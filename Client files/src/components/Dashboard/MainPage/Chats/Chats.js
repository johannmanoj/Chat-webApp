import React , { useState , useEffect}  from 'react'
import './Chats.css'
import ChatSidebarItem from './ChatSidebarItem'
import ChatMessages from './ChatMessages';
import { FaSearch, FaEllipsisV, FaEdit, FaTimes} from "react-icons/fa";
import axios from 'axios';
import ChatDropdown from './ChatDropdown';
import AddContactDropdown from './AddContactDropdown';

const Chats = () => {
  const [contactList, setContactList] = useState([])
  const [selectedContact, setSelectedContact] = useState({"email":"", "name":"", "profilePic":""})
  // const [selectedContactDetails, setSelectedContactDetails] = useState()

  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const [AddContactDropdownVisibility, setAddContactDropdownVisibility] = useState(false)

  const [searchContact, setSearchContact] = useState([])
  const [searchText, setSearchText] = useState("")


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

  useEffect(() =>{
    const get_search_contacts_list = async () =>{
      var data_list = []
      var req_data = contactList.filter(x => x.firstName.toLowerCase().includes(searchText.toLowerCase()))

      setSearchContact(req_data)
    }

    get_search_contacts_list()
  },[searchText, contactList])
  
  const nameChangeHandler = (event) =>{ setSearchText(event.target.value) }

  

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
          <div className='search-bar-background'>
            <input className="chat-search-bar" placeholder='Search' onChange={nameChangeHandler} value={searchText}></input>
            {searchText.length > 0 ? <FaTimes className='chat-sidebar-search-icon'  onClick={() =>setSearchText("")}/> : <FaSearch className='chat-sidebar-search-icon'/>}
          </div>
        </div>

        {searchContact.map((user) => (
          <div key={Math.random(100000)} onClick={() =>  setSelectedContact({"email":user.contact_email, "name":user.firstName, "profilePic":user.profilePic})}>
            <ChatSidebarItem user_name = {user.firstName} user_pic = {user.profilePic} user_email = {user.contact_email} />
          </div>
        ))}
        
      </div>
      
      <ChatMessages className='chat-messages' contact_details = {selectedContact} />
      
    </div>
  )
}

export default Chats
