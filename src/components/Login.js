import { useState, useRef } from "react"
import Header from "./Header"
import  { checkValidData } from "../utils/validate"
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";



const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage]= useState(null);
  
  
  const name = useRef(null)
  const email = useRef(null);
  const password= useRef(null);
  const dispatch = useDispatch();
  
  const handleButtonClick = () => {
       //validate the form data
      

      console.log(email.current.value);
      console.log(password.current.value);

      const message = checkValidData(email.current.value,password.current.value);
      setErrorMessage(message);
         if(message) return;
         
       
       //sign up
     if(!isSignInForm){

        // sign up logic
        createUserWithEmailAndPassword(
          auth, 
          email.current.value,
           password.current.value
        )

        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: USER_AVATAR,
          })
          .then(() => {
            const { uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(
            adduser({
              uid: uid, 
              email: email, 
              displayName: displayName, 
              photoURL: photoURL
            })
            );
            })
          .catch((error) => {
            setErrorMessage(error.message)
            });
          })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage )
           });
           }
   //sign in
else {
  // sign in logic
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage )
  });

    }

  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);

  }


  return (

    <div>
      <Header />
      <div className="absolute">
      <img
     src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="logo" 
      />
      </div>

      <form 
      onSubmit={(e) => e.preventDefault() }
       className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In": "Sign Up"} 
          </h1>
          
          {!isSignInForm && (
          <input type="text"
          ref={name}
          placeholder="Full Name" 
         className="p-3 my-2 w-full  bg-gray-700  rounded-sm" 
         />)} 

        <input type="text"
         ref={email}
         placeholder="Email Address or phone number" 
         className="p-3 my-2 w-full bg-gray-700  rounded-sm" 
         />

         <input type=" password"
         ref={password}
         placeholder="Password" 
         className="p-3 my-2 w-full  bg-gray-700  rounded-sm" 
         />

         <p className="text-red-500 font-bold text-md py-2">{errorMessage}</p>

        <button className="p-3 my-6 bg-red-700 w-full rounded-sm " onClick={handleButtonClick}>
        {isSignInForm ? "Sign In": "Sign Up"} 
          </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
        {isSignInForm ? "New to NetFlix? Sign Up now": "Already registered? Sign In Now."} 
          </p>

      </form>
      </div>
  )
}

export default Login