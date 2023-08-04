import React from 'react'
import './MainPage.css'
import Chats from './MainPage/Chats/Chats'
import Saved from './MainPage/Saved'
import Calender from './MainPage/Calender'

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
          <Calender />
      </div>
    )
  }else if(props.mainPageData == "saved"){
    return (
      <div className='main_page'>
          <Saved />
      </div>
    )
  }
  
}

export default MainPage
