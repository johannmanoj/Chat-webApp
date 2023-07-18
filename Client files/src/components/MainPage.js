import React from 'react'
import './MainPage.css'
import Chats from './Chats/Chats'
import Saved from './Saved'
import Calender from './Calender'

const MainPage = (props) => {
  if(props.mainPageData == "all_chats"){
    return (
      <div className='main_page'>
          <Chats />
      </div>
    )
  }else if(props.mainPageData == "calender"){
    return (
      <div className='main_page'>
          <Saved />
      </div>
    )
  }else if(props.mainPageData == "saved"){
    return (
      <div className='main_page'>
          <Calender />
      </div>
    )
  }
  
}

export default MainPage
