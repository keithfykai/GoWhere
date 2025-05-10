import styles from './style';
import {Navbar} from './components';
import { Route, Routes} from 'react-router-dom';
import { Home } from './Home';
import { Login } from './subpages/Login';
import { CreateAccount } from './subpages/CreateAccount';
import Footer from './components/Footer';
import ForgotPassword from './subpages/ForgotPassword';
import { Questionnaire } from './subpages/Questionnaire';
import { AccountDetails } from './subpages/AccountDetails';
import { SavedLocations } from './subpages/SavedLocations';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect } from 'react';
import { ChangePassword } from './subpages/ChangePassword';
import { MapPage } from './subpages/MapPage';

function App(){
  return (
  <>
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
    </div>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/createaccount' element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/questionnaire' element={<Questionnaire />} />
      <Route path='/accountdetails' element={<AccountDetails />} />
      <Route path='/savedlocations' element={<SavedLocations />} />
      <Route path='/map' element={<MapPage />} />
      <Route path='/changepassword' element={<ChangePassword />} />
    </Routes>
    
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer/>
        </div>
    </div>
  </>
);
  }

export default App
