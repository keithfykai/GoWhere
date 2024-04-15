import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from 'firebase/firestore'; // Importing doc and setDoc functions

export const CreateAccount = () => {
    const navigate = useNavigate();
    const db = getFirestore();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;  // Exit the function if passwords don't match
        }
       
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);

                // Create document in firestore
                const userDocRef = doc(db, "saved_locations", email);
                await setDoc(userDocRef, {}); 
                console.log('Document successfully created!');
              navigate("/login")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if(errorCode === 'auth/weak-password'){
                alert('The password is too weak, please key in at least 6 characters.');
              }
              else if(errorCode === 'auth/email-already-in-use'){
                alert('The email is already in use, please key in a different email.');
              }
              else if(errorCode === 'auth/invalid-email'){
                alert('The email is invalid, please key in a valid email.');
              }
              else if(errorCode === 'auth/missing-password'){
                alert('Please key in a password.');
              }
              else {
                alert(errorCode);
            }
            
              // ..
          });
    }

    const handleKeyDown = (event) => {  // Function to handle the Enter key
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    return (
    <div className='max-w-[600px] mt-14 mb-24 w-full mx-auto text-center flex flex-col justify-center'>
        <div className='grid grid-cols-1 grid-row'>
            <div className='mb-9'>
                <h1 className='md:text-4xl text-l font-bold text-black-500'>
                    Create Account 
                </h1>
                <p className='md:text-m text-l font-sm text-gray-500 mt-[10px]'>
                    Create an Account Today.
                </p>
            </div>

            <div className='bg-gray-200 rounded-lg py-4'>
                
                <form className='flex flex-col items-center'>
                    <input 
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required                                    
                        placeholder="Email address"           
                        className='border-none py-3 px-7 w-7/12 mt-10 rounded-full'/>

                    <input 
                        type="password"
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required                                 
                        placeholder="Password"
                        className='border-none py-3 px-7 w-7/12 mt-6 rounded-full'/>

                    <input 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required  
                        onKeyDown={handleKeyDown}
                        className='border-none py-3 px-7 w-7/12 mt-6 mb-3 rounded-full'/>

                    <div className='flex'>
                        <Link to='/login'><button className='font-medium mt-11 mr-4'><u>Sign in</u></button></Link>
                        <Link to='/'><button className='bg-white mx-2 rounded-full font-medium my-8 px-8 py-3 text-black mx-3'>Cancel</button></Link>
                        <button
                            type="submit" 
                            onClick={onSubmit} 
                            className='bg-red-500 rounded-full font-medium my-8 px-8 py-3 text-white'>
                                Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

