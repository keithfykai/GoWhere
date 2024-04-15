import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const auth = getAuth();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent successfully!');
      setEmail('');
    } catch (error) {
      const errorCode = error.code; // Extract error code
    
      if (errorCode === 'auth/invalid-email') {
        setError('Invalid email, please key in a valid email.');
      } else if (errorCode === 'auth/user-not-found') {
        setError('The email is not found, please key in a different email.');
      } else if (errorCode === 'auth/missing-email') {
        setError('Please key in an email.');
      } else {
        setError(error.message); // Set error message from the error object
      }
    }
    
  };

  return (
    <div className='max-w-[600px] mt-14 w-full mx-auto text-center flex flex-col justify-center mb-24'>
      <div className='grid grid-cols-1 grid-row'>
        <div className='mb-9'>
          <h1 className='md:text-4xl text-l font-bold text-black-500'>
            Forgot Password?
          </h1>
          <p className='md:text-m text-l font-sm text-gray-500 mt-3'>
            Don't worry, we can help you get back in.
          </p>
        </div>

        <div className='bg-gray-200 rounded-lg py-4'>
          <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            {error && <p className='text-red-500 font-bold'>{error}</p>}
            {success && <p className='text-green-500 font-bold'>{success}</p>}
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={handleInputChange}
              className='border-none py-3 px-7 w-7/12 mt-10 mb-3 rounded-full'
              required
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
            <div className='flex'>
              <Link to='/login'>
                <button className='bg-white mx-2 rounded-full font-medium my-8 px-8 py-3 text-black mx-3'>
                  Cancel
                </button>
              </Link>
              <button className='bg-red-500 rounded-full font-medium my-8 px-8 py-3 text-white mr-[-27px]'>
                Send Reset Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
