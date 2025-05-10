import React, { useState } from 'react';
import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const auth = getAuth();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
        case 'currentPassword':
            setCurrentPassword(value);
            break;
        case 'newPassword':
            setNewPassword(value);
            break;
        case 'confirmPassword':
            setConfirmPassword(value);
            break;
        default:
            break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
        // Reauthenticate the user with their current password before updating

        // Update the password using the user's credentials for security
        await updatePassword(auth.currentUser, newPassword);

        setSuccess('Password successfully changed!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null); // Clear any previous errors
        } catch (error) {
        setError(error.message);
        if(error = 'auth/weak-password') {
            setError('Password should be at least 6 characters long.');
        }
        }
    };


  return (
    <div className='max-w-[600px] mt-14 mb-24 w-full mx-auto text-center flex flex-col justify-center'>
        <div className='grid grid-cols-1 grid-row'>
            <div className='mb-9'>
                <h1 className='md:text-4xl text-l font-bold text-black-500'>
                    Change Password 
                </h1>
                <p className='md:text-m text-l font-sm text-gray-500 mt-3'>
                    Change your password here.
                </p>
            </div>
            <div className='bg-gray-200 rounded-lg py-4'>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                    {error && <p className='text-red-500 font-bold'>{error}</p>}
                    {success && <p className='text-green-500 font-bold'>{success}</p>}
                    <input
                        type='password'
                        name='currentPassword'
                        placeholder='Current Password'
                        value={currentPassword}
                        onChange={handleInputChange}
                        className='border-none py-3 px-7 w-7/12 mt-10 rounded-full'
                        required/>
                    <input
                        type='password'
                        name='newPassword'
                        placeholder='New Password'
                        value={newPassword}
                        onChange={handleInputChange}
                        className='border-none py-3 px-7 w-7/12 mt-6 rounded-full'
                        required/>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChange={handleInputChange}
                        className='border-none py-3 px-7 w-7/12 mt-6 mb-3 rounded-full'
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                        required/>
                    <div className='flex'>
                        <Link to='/accountdetails'><button className='bg-white mx-2 rounded-full font-medium my-8 px-8 py-3 text-black mx-3'>Cancel</button></Link>
                        <button type='submit' className='bg-red-500 rounded-full font-medium my-8 px-8 py-3 text-white mr-[-25px]'>Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}