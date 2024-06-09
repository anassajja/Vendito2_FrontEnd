'use client';
'use strict'; // React and Axios

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Image from 'next/image';

export default function Profile() {
  const { user } = useContext(AuthContext); // Get the user from the AuthContext
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Add a new state to manage the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);

  console.log('User outside useEffect:', user); // Log the user outside the useEffect hook

  useEffect(() => { // Fetch the user data when the component mounts
    console.log('User:', user); // Log the user inside the useEffect hook
    if (user && user.id) { // If the user is logged in and the user ID is defined, fetch the user data
      setIsLoading(true);
      axios.get(`http://localhost:8000/api/users/${user.id}`)
        .then((response) => { // Set the user data when the data is fetched successfully
          setUserData(response.data);
          setIsLoading(false);
          console.log('User data fetched successfully', response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
          setIsLoading(false);
        });
    }
  }, [user]); // Add user as a dependency

  const handleInputChange = (event) => {
    if (event.target.type === 'file') { // If the input type is file, set the file as the value
      setUserData({
        ...userData,
        user: {
          ...userData.user,
          avatar: event.target.files[0]
        }
      });
    }
    else {
      setUserData({ // Update the user data when the input value changes
        ...userData, // Spread the existing user data
        user: {
          ...userData.user, // Spread the existing user data
          [event.target.name]: event.target.value
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('User data to update:', userData); // Log the user data to update
    axios.put(`http://localhost:8000/api/updateProfile`, userData.user, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => {
        console.log('User data updated successfully', response.data);
        console.log('User data to update:', userData); // Log the user data to update
        setError(null);
        window.alert('Profile updated successfully'); // Show an alert when the profile is updated
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        setError('Error updating user data');
      });
  };

  return (
    <div>
    {isLoading ? ( // If the data is loading, display a loading message
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    ) : error ? (
      <div className="text-2xl text-red-500 text-center">Error: {error} </div>
    ) : ( 
      <div className="flex justify-center items-center">
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and information about user.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit} className='space-y-4'>
            <dl className='space-y-4'>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  First name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="first_name" value={userData.user.first_name} onChange={handleInputChange} />
                  ) : (
                    userData.user.first_name
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Last name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="last_name" value={userData.user.last_name} onChange={handleInputChange} />
                  ) : (
                    userData.user.last_name
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Username
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="username" value={userData.user.username} onChange={handleInputChange} />
                  ) : (
                    userData.user.username
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 flex items-center">
                <dt className="text-sm font-medium text-gray-500 flex-initial">
                  Avatar
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-center flex-grow">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="file" name="avatar" accept='image/*' onChange={handleInputChange} />
                  ) : (
                    <Image src={`http://localhost:8000/users/avatar/${userData.user.avatar}?${Date.now()}`} alt="User avatar" width={40} height={40}  className="h-12 w-12 rounded-full"/>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  C.N.I.E
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="cnie" value={userData.user.cnie} onChange={handleInputChange} />
                  ) : (
                    userData.user.cnie
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="email" name="email" value={userData.user.email} onChange={handleInputChange} />
                  ) : (
                    userData.user.email  // Render the email address if the form is not visible
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="password" name="password" value={userData.user.password} onChange={handleInputChange} />
                  ) : (
                    '********'
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="date" name="birthdate" value={userData.user.birthdate} onChange={handleInputChange} />
                  ) : (
                    userData.user.birthdate
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="phone" value={userData.user.phone} onChange={handleInputChange} />
                  ) : (
                    userData.user.phone
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <input type="text" name="address" value={userData.user.address} onChange={handleInputChange} />
                  ) : (
                    userData.user.address
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  City
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isFormVisible ? ( // Render an input field if the form is visible
                    <select name="city" value={userData.user.city} onChange={handleInputChange}>
                      <option value="Rabat">Rabat</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Mohammedia">Mohammedia</option>
                    </select>
                  ) : (
                    userData.user.city
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Status
                </dt>
                <dd className={`mt-1 sm:mt-0 sm:col-span-2 ${userData.user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {userData.user.status}
                </dd>
              </div>
            </dl>
            {isFormVisible && ( // Render a button to save changes if the form is visible
              <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Save changes</button>
            )} {/* Render a button to save changes if the form is visible */}
            </form>
            <button 
              onClick={() => setIsFormVisible(!isFormVisible)} 
              className={`px-4 py-2 text-white rounded hover:bg-gray-700 mt-4 mb-4 ${isFormVisible ? 'bg-red-500' : 'bg-green-500'}`}
            >
              {isFormVisible ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}