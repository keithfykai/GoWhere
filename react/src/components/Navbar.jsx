import { logo,close,menu } from '../assets';
import { navLinks } from '../constants';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ProfileAvatar from '../assets/ProfileAvatar.png';
import { auth , useAuth , upload} from '../firebase/firebase';


const Navbar = () => {
  const [toggle,setToggle] = useState(false)
  const [loggedin, setLoggedin] = useState(false);
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(ProfileAvatar);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          setLoggedin(true);
          // ...
        } else {
          setLoggedin(false);
        }
      });
      if(currentUser?.photoURL){
        setPhotoURL(currentUser.photoURL);
      }
  }, [currentUser])

  const navigate = useNavigate();

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        alert("Signed Out Successfully")
        setLoggedin(false);
    }).catch((error) => {
    // An error happened.
    });
  }

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to='/'><img src={logo} alt="GoWhere" className="w-[124px] h-[32px]" /></Link>
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li className="font-poppins font-normal cursor-pointer text-[16px] mr-10 text-black"><Link to='/'>Home</Link></li>
          {loggedin && <li className="font-poppins font-normal cursor-pointer text-[16px] mr-10 text-black"><Link to='/questionnaire'>Search</Link></li>}
          {loggedin && <li className="font-poppins font-normal cursor-pointer text-[16px] mr-10 text-black"><Link to='/accountdetails'>Account</Link></li>}
          {loggedin && <img  src={photoURL} alt="Profile Picture" className='w-[40px] h-[40px] mr-9 rounded-full'/>}
        </ul>
        
        {loggedin ? <Link to='/'>
          <button
            onClick={handleLogout}
            className="py-2 px-5 sm:flex hidden rounded-full text-[16px] text-white bg-red-500 hover:bg-red-700 duration-300">
            Sign Out
          </button>
        </Link> 
        : 
        <Link to='/login'>
        <button
            className="py-2 px-5 sm:flex hidden rounded-full text-[16px] text-white bg-red-500 hover:bg-red-700 duration-300">
            Sign In
        </button>
        </Link>}        


        <div className="sm:hidden flex flex-1 justify-end items=center">
          <img src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] objext-contain"
          onClick={()=> setToggle((prev)=>!prev)}
          />

          <div
            className={toggle ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-300 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              {navLinks.map((nav, index) => (
                <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] p-4 border-b border-gray-600 ${index===navLinks.length - 1 ? 'mb-0' : 'mb-4'} text-black`}>
                  <a href={`#${nav.id}`}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar;


