import React , { useState , useEffect}  from 'react'
import './Chats.css'
import ChatSidebarItem from './ChatSidebarItem'
import ChatMessages from './ChatMessages';
import { FaSearch} from "react-icons/fa";
import axios from 'axios';

const Chats = () => {
  const [contactList, setContactList] = useState([
    {
      "name":"John",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791214_man_512x512.png"
    },
    {
      "name":"Sam",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791224_man_512x512.png"
    },
    {
      "name":"Emma",
      "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791221_man_512x512.png"
    }
  ])

  // var Data = [
  //   {
  //     "name":"John",
  //     "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791214_man_512x512.png"
  //   },
  //   {
  //     "name":"Sam",
  //     "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791224_man_512x512.png"
  //   },
  //   {
  //     "name":"Emma",
  //     "profilePic":"https://www.shareicon.net/data/512x512/2016/07/05/791221_man_512x512.png"
  //   }
  // ]

  useEffect(() =>{
    const get_contacts_list = async () =>{
      const config = {
        method: 'post',
        url: `http://localhost:8080/get-user-list`,
        // data : {"date" :props.req_date}
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

  console.log("contactList",contactList);
  

  return (
    <div className='Chats' >
      <div className='chat-sidebar'>
        <div className='chat-sidebar-header'>
          <FaSearch className='chat-sidebar-icon'/>
          <input className="chat-search-bar" placeholder='Search'></input>
        </div>
        

        {contactList.map((user) => (
        <ChatSidebarItem user_name = {user.firstName} user_pic = {user.profilePic} />
        ))}
       
      </div>
      <div className='chat-messages'>
          <ChatMessages />
      </div>
    </div>
    
    
  )
}

export default Chats
