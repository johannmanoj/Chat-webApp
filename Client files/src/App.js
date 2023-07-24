import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';

function App() {
  const [main_page, setMain_page] = useState("all_chats")
  console.log("main_page",main_page);
  return (
    <div className="App">
      <LoginPage />
      {/* <Sidebar setMain_page_func = {setMain_page} />
      <MainPage mainPageData = {main_page}/> */}
    </div>
  );
}

export default App;
