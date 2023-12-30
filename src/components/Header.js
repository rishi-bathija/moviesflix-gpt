import React, { useEffect } from 'react'
import logo from './Netflix_Logo_PMS.png'
import userIcon from './Untitled.png'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';


const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useeffect called");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));


        navigate("/browse");

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b  from-black z-10 cursor-pointer flex justify-between'>
      <img className="w-48" src={logo} alt="logo" />
      {user && (
        <div className='flex items-center'>
          <span className='text-white mr-4 text-lg'> Hello, {user?.displayName} </span>
          <img className='w-12 h-12 p-1 rounded-full' src={user?.photoURL} alt="user" />
          <button onClick={handleSignOut} className="text-white ml-4 py-1 px-2 border border-white rounded-md change-color">Sign Out</button>
        </div>)}
    </div>
  )
}

export default Header
