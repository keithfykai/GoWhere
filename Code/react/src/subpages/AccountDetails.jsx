import { Link } from 'react-router-dom'
import ProfileAvatar from '../assets/ProfileAvatar.png';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth , useAuth , upload} from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';


export const AccountDetails = () => {

  const [email , setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(ProfileAvatar);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmail(user.email)
          setUsername(user.email.split('@')[0])
        } else {
          // User is signed out
          navigate("/");
        }
      });
    if(currentUser?.photoURL){
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  const navigate = useNavigate();

  function handleChange(e){
    if(e.target.files[0]){
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick(){
    upload(photo, currentUser, setLoading);
  }
    
  return (
    <div className='mt-14 mb-24'>
      <div className="flex flex-col w-2/5 items-end ml-10">
        <h1 className='md:text-4xl text-l font-bold text-black-500'>Account Details</h1>
      </div>
      <div className="pt-5 flex sm:flex-row wrap my-7">
        <div className="w-2/5 flex flex-row justify-end">
          <div className="flex flex-col justify-end items-center">
            <img  src={photoURL} alt="Profile Picture" className='mb-2 w-[170px] h-[170px] rounded-full'/>
            <h2 className='md:text-2xl text-l font-bold text-black-500 pt-2 mb-3'>{username}</h2>
            <label className="ml-[-100px]" id='uploadimage' for="imageInput" >Browse Image Files</label>

            <input 
              type="file" 
              id="imageInput"
              onChange={handleChange}
            />

            <button onClick={handleClick} disabled={loading || !photo} className='mt-[-51.5px] mr-[-160px] bg-red-500 rounded-full text-sm mt-1 px-6 py-2 text-white'>Upload</button>
            
            
          </div>
        </div>
        <div className="w-3/5 flex flex-col items-start mt-1 pl-16 ml-8">
          <div className="flex flex-col bg-gray-100 shadow rounded-xl pl-16 pr-32 py-12">
            <div className="ml-3 grid gap-x-3 gap-y-3" style={{ gridTemplateColumns: 'repeat(2, minmax(0, max-content))' }}>
              <div className='font-semibold'>Email:</div>
              <div className='opacity-70'>{email}</div>
              <div className='col-span-2 mt-3'>
                <Link to='/changepassword'><button className='underline underline-offset-2'>Change Password</button></Link>
              </div>
            </div>
            <div className='mt-4'>
              <Link to='/savedlocations'><button className='bg-red-500 rounded-full font-medium mt-4 px-8 py-3 text-white'>Saved Locations</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};