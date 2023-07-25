// import { useState, useEffect , useContext} from 'react';
// import './App.css';
// import Sidebar from './components/Sidebar';
// import MainPage from './components/MainPage';
// import LoginPage from './components/LoginPage/LoginPage';
// import Auth_Context from './components/Auth_context';

// function App() {
//   const [main_page, setMain_page] = useState("all_chats")
//   const [login, setLogin] = useState(false)
//   const ctx = useContext(Auth_Context)

//   console.log("login",login);

//   useEffect(() => {
//     const loggedInUser = ctx.isLoggedIn
//     setLogin(loggedInUser);
//   }, [login]);

//   const logoutFunc = () =>{
//     localStorage.setItem("login_status", false)
//     setLogin(false)
//   }

 

//   return (
//     <div className="App">

      
//       {!login ?
//         <LoginPage  login_func = {setLogin}/> : 
//         <div>
//             <Sidebar setMain_page_func = {setMain_page} logoutFunc = {logoutFunc}/>
//             <MainPage mainPageData = {main_page}/>
//         </div>
//       }  
      

//     </div>
//   );
// }



// export default App;


import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/UserAuthContext";

function App() {
  return (
    
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
            </Routes>
          </UserAuthContextProvider>
        
  );
}

export default App;
