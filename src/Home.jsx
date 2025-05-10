import styles from './style';
import {Hero} from './components';
import Features from './components/Features';
import { Link } from 'react-router-dom';
import Map from './mapbox/Map';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebase';

export const Home = () => {

  const [loggedin, setLoggedin] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
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
    <div className="bg-white w-full overflow-hidden mt-10">
      <div className={`bg-white ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
          
        </div>
      </div>

      <div className={`bg-white ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
        
        </div>
      </div>

      <hr/>


      <Features/>

    </div>
  )
}

