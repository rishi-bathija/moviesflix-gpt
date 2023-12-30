import React, { useRef, useState } from 'react'
import Header from './Header'
import './loginStyle.css'
import { checkValidateData } from '../utils/validate'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import userProfile from './Untitled.png';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignIn, setIsSignIn] = useState(true);
  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  }


  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const phone = useRef(null);

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    // console.log(name.current.value);
    // console.log(phone.current.value);
    // Validate the form data
    const message = checkValidateData(email.current.value, password.current.value, name?.current?.value, phone?.current?.value);
    console.log(message);
    setErrorMsg(message);

    // if the message is present, i.e there must be something wrong with the validation


    if (message) return;

    // signin/signup:-

    // signup
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);

          // update user's profile
          updateProfile(user, {
            displayName: name.current.value, photoURL: {userProfile}
          }).then(() => {
            // Profile updated!

            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));

            // once profile is updated, the navigate to browse
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMsg(error.message);
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage)
        });
    }
    //signin
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " : " + errorMessage)
        });

    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} style={{ width: '30%' }} className="absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-90">

        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}</h1>

        {!isSignIn && (<input ref={name} className="p-4 my-4 w-full bg-gray-700 rounded-sm" type="text" placeholder='Full Name' />)}

        {!isSignIn && (<input ref={phone} className="p-4 my-4 w-full bg-gray-700 rounded-sm" type="text" placeholder='Mobile No.' />)}

        {/* ref={email} gives the reference of the input box(email) in the form of object*/}
        <input ref={email} className="p-4 my-4 w-full bg-gray-700 rounded-sm" type="text" placeholder='Email Address' />

        <input ref={password} className="p-4 my-4 w-full bg-gray-700 rounded-sm" type="password" placeholder='Password' />

        <p style={{ color: 'red', fontWeight: 'bolder' }}>{errorMsg}</p>

        <button onClick={handleButtonClick} className="p-4 my-4 bg-red-600 w-full rounded-sm">{isSignIn ? "Sign In" : "Sign Up"}</button>

        <p className='py-4 p-text cursor-pointer text-dec' onClick={handleSignIn}>

          {isSignIn ? "New to Netfix? Sign Up Now" : "Already registered? Sign in"}</p>
      </form>
    </div>
  )
}

export default Login
