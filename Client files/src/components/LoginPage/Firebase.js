import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const config = require("../../Config")




const app = initializeApp(config.firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () =>{
  // const ctx = useContext(Auth_Context)
  signInWithPopup(auth, provider)
  .then((result) =>{
    const name = result.user.displayName
    const email = result.user.email
    const profilePic = result.user.photoURL
    {}
    // console.log({"name":name, "email":email, "profilePic":profilePic});
    localStorage.setItem("login_status", true)
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("profilePic", profilePic)
    // console.log(result);
  }).catch((error) =>{
    console.log(error);
  })
}
