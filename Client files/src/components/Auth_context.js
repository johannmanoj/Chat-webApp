import React, { useEffect, useState } from "react";

const Auth_Context = React.createContext({
    isLoggedIn: true,
    onLogout: () => {},
    onLogin:() =>{}

})

export const AuthContextProvider = (props) =>{
    const [isLoggedIn , setIsLoggedin] = useState(false);

    useEffect(() =>{
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

        if(storedUserLoggedInInformation === '1'){
            setIsLoggedin(true)
        }
    }, [])

    const logoutHandler = () =>{
        localStorage.removeItem("isLoggedIn")
        setIsLoggedin(false);
    }

    const loginHandler = () =>{
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedin(true)
    }
    return <AuthContextProvider value={{
        isLoggedIn: isLoggedIn, 
        onLogout: logoutHandler, 
        onLogin: loginHandler
    }}>
        {props.children}
    </AuthContextProvider>
}

export default Auth_Context