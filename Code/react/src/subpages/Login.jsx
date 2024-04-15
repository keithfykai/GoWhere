import { Link } from 'react-router-dom'
import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../constants/authContext';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserEmail } = useAuth();
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            setUserEmail(email);
            const user = userCredential.user;
            navigate("/accountdetails")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if(errorCode === 'auth/invalid-email'){
                alert('The email is invalid, please key in a valid email.');
              }
              else if(errorCode === 'auth/missing-password'){
                alert('Please key in a password.');
              }
              else if(errorCode === 'auth/invalid-credential'){
                alert('Wrong Password');
            }
              else {
                alert(errorCode);
            }
        });
       
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          onLogin(event);
        }
      };


  return (
    <div className='max-w-[600px] mt-14 w-full mx-auto text-center flex flex-col justify-center mb-24'>
        <div className='grid grid-cols-1 grid-row'>
            <div className='mb-9'>
                <h1 className='md:text-4xl text-l font-bold text-black-500'>
                    Sign In
                </h1>
                <p className='md:text-m text-l font-sm text-gray-500 mt-3'>
                    Welcome Back.
                </p>
            </div>

            <div className='bg-gray-200 rounded-lg py-4'>
                <form className='flex flex-col items-center'>
                    <input 
                        id="email-address"
                        name="email"
                        type="email"                                    
                        required                                                                                
                        placeholder="Email Address"
                        onChange={(e)=>setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    className='border-none py-3 px-7 w-7/12 mt-10 rounded-full'/>


                    <input 
                        id="password"
                        name="password"
                        type="password"                                    
                        required                                                                                
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    className='border-none py-3 px-7 w-7/12 mt-6 mb-3 rounded-full'/>



                    <div className='flex'>
                        <Link to='/forgotpassword'><button className='bg-white-200 rounded-full font-medium mx-auto py-3 text-black'><u>Forgot Password?</u></button></Link>
                    </div>

                    <div className='flex'>
                        <Link to='/createaccount'><button className='font-medium mt-11 mr-4'><u>Create Account</u></button></Link>
                        <Link to='/'><button className='bg-white mx-2 rounded-full font-medium my-8 px-8 py-3 text-black mx-3'>Cancel</button></Link>
                        <button onClick={onLogin} className='bg-red-500 rounded-full font-medium my-8 px-8 py-3 text-white'>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}
