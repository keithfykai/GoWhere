import {ReactTyped} from 'react-typed';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase';

const Hero = () => {
  const [loggedin, setLoggedin] = useState(false);

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
   
  }, [])

  return (
      <div className={'text-black'}>
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center mb-2">
          <p className='text-black font-bold p-2'>
            EXPLORE BEYOND YOUR DOUBTS
          </p>
          <h1 className='md:text-7xl font-poppins sm:text-6xl text-5xl md:py-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-500'>
            GoWhere
          </h1>
          <div className="flex justify-center items-center">
            <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 '>
              Find your new favorite
            </p>
            <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-red-400'
              strings={['restaurant','park','theater','cafe','library','mall']}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          <p className='md:text-xl text-l font-normal text-gray-500'>
            GoWhere is a Location Suggestion Application for Singaporeans who want to explore and find new locations around them. 
          </p>
          
          {loggedin ? null
          : <Link to='/createaccount' className='text-red-500'><button className='bg-red-500 w-[200px] rounded-full font-medium my-6 mx-auto py-3 text-white'>Get Started</button></Link>
          }
        </div>
      </div>
  );
};

export default Hero;


