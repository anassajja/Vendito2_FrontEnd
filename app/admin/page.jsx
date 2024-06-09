'use strict';
'use client';

import React from 'react';
import { useState, useEffect, useContext, Fragment } from 'react';
import { BellIcon, HomeIcon, UsersIcon, ArrowRightStartOnRectangleIcon, CogIcon, ChevronRightIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { Menu, Transition } from '@headlessui/react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); 
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('token');
  const router = useRouter();
  const [adminAvatar, setAdminAvatar] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext); // Get isAuthenticated and user from the context
  const userRole = user ? user.role : null; // Check if user exists before accessing its role property
  const { logOut } = useContext(AuthContext);
  const [serverLoad, setServerLoad] = useState(0);
  const [contacts, setContacts] = useState([]); // Add a new state variable for contacts

  useEffect(() => { 
    const timer = setInterval(() => { 
      setCurrentDateTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);

  function simulateServerLoad() {
    // Generate a random server load between 0 and 100
    return Math.floor(Math.random() * 100);
  }
  
  useEffect(() => {
    // Update the server load every second
    const timer = setInterval(() => {
      setServerLoad(simulateServerLoad());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);

  // If user is not authenticated or not an admin, or userRole is null, redirect to forbidden page
  if (!isAuthenticated || userRole !== 'admin' || userRole === null) {
    router.push('/forbidden');
  }
  }, [isAuthenticated, userRole, router]); // Add isAuthenticated and userRole as dependencies

  useEffect(() => {
    axios.get('http://localhost:8000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}` // replace `token` with your admin token
      }
    })
    .then((response) => {
      console.log('Users fetched successfully:', response.data); // Log the data to the console
      // Assuming the admin's data is the first one in the response
      // and the avatar filename is stored in the 'avatar' field
      const adminData = response.data.users.find(user => user.role === 'admin');
      setAdminAvatar(adminData.avatar); // Update the admin avatar in state
      setUsers(response.data.users); // Update the users in state
      setLoading(false); // Hide the loading state
      setError(null); // Clear the error message
    })
    .catch(error => {
      console.error('Failed to fetch users:', error.message);
      setError(error.message);
      setAdminAvatar(''); // Clear the admin avatar
      setLoading(false); // Hide the loading state
    });
  }, [token]); // Add token as a dependency
    
  useEffect(() => {
    axios.get('http://localhost:8000/api/offers')
    .then((response) => {
      console.log('Offers fetched successfully:', response.data); // Log the data to the console
      setOffers(response.data.offers); // Update the offers in state
      setLoading(false); // Hide the loading state
      setError(null); // Clear the error message
    })
    .catch(error => {
      console.error('Failed to fetch offers:', error.message);
      setError(error.message);
      setLoading(false); // Hide the loading state
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/contacts', {
      headers: {
        'Authorization': `Bearer ${token}` // replace `token` with your admin token
      }
    })
    .then((response) => {
      console.log('Contacts fetched successfully:', response.data); // Log the data to the console
      setContacts(response.data.contacts); // Update the contacts in state
      setLoading(false); // Hide the loading state
      setError(null); // Clear the error message
    })
    .catch(error => {
      console.error('Failed to fetch contacts:', error.message);
      setError(error.message);
      setLoading(false); // Hide the loading state
    });
  }, [token]); // Add token as a dependency

  return (
    <>
      <div className="bg-orange-100 min-h-screen">
        <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
          <div className="flex items-center justify-between py-2 text-5x1">
          <div className="font-bold text-blue-900 text-xl flex items-center">
            Admin<span className="text-orange-600">Panel</span>
          </div>
            <div className="flex items-center text-gray-500">
              <BellIcon className="h-10 w-20 p-2 "/>
              <div className="relative">
                <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="rounded-md text-black-300 bg-white-700 pl-10 pr-4 py-2 w-full"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                {/* <MagnifyingGlassIcon className="h-5 w-5 mr-2 inline-block text-gray-600" /> */}
              </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <Image src={`http://localhost:8000/users/avatar/${adminAvatar}`} alt="Admin Avatar" width={60} height={60} className="h-8 w-8 rounded-full"
                         onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src="/images/default-avatar.jpg"; // Path to a default avatar image in your public directory
                          }} 
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/admin/profile"
                              className={`${
                                active ? 'bg-gray-100' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <UserCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={`${
                                active ? 'bg-gray-100' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <CogIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => ( // Add the active state to the Menu.Item component
                            <Link
                              href="#"
                              onClick={() => {
                                logOut();
                                alert("You're logged out."); // Display a window alert
                              }}
                              className={`${
                                active ? 'bg-gray-100' : 'text-red-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`} //
                            >
                              <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
            </div>
          </div>
        </div>
        <div className="flex flex-row pt-24 px-10 pb-4">
          <div className="w-2/12 mr-6">
            <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <a href="#" className="inline-block text-gray-600 hover:text-black my-4 w-full">
              <HomeIcon className="h-5 w-5 mr-2 inline-block" />
              Dashboard
              <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </a>
              <Link href="/admin/user" className="inline-block text-gray-600 hover:text-black my-4 w-full">
              <UsersIcon className="h-5 w-5 mr-2 inline-block" />
              Users
              <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </Link>
              <a href="/admin/offer" className="inline-block text-gray-600 hover:text-black my-4 w-full">
               <ShoppingBagIcon className="h-5 w-5 mr-2 inline-block" />
                Offers
                <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </a>
            </div>
            <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
              <a href="/admin/profile" className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <UserCircleIcon className="h-5 w-5 mr-2 inline-block" />
                Profile
                <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </a>
              <a href="" className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <CogIcon className="h-5 w-5 mr-2 inline-block" />
                Settings
                <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </a>
              <a href="" className="inline-block text-gray-600 hover:text-black my-4 w-full">
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2 inline-block" />
                Logout
                <ChevronRightIcon className="h-6 w-5 inline-block float-right" />
              </a>
            </div>
          </div>
          <div className="w-10/12">
            <div className="flex flex-row">
              <div
                className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6"
              >
                <p className="text-5xl text-indigo-900">
                  Welcome <br />
                  <strong>Your Marketplace, Your Rules</strong>
                </p>
                <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
                  <strong>{currentDateTime.toLocaleTimeString()}</strong>
                </span>
              </div>
              <div
                className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6"
              >
                <p className="text-5xl text-indigo-900">
                  Inbox <br />
                  <strong>{contacts.length}</strong>
                </p>
                <a href="/admin/messages" className="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2" >
                  <strong>See messages</strong>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-green-400">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                  </path>
                </svg>
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">
                  Total Users
                </h3>
                <p className="text-3xl">
                  {users.length}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-blue-400">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                  </path>
                </svg>
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">
                  Total Offers
                </h3>
                <p className="text-3xl">
                  {offers.length}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-indigo-400">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                  </path>
                </svg>
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">
                  Total Contacts
                </h3>
                <p className="text-3xl">
                  {contacts.length}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-red-400">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                  </path>
                </svg>
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">
                  Server Load 
                </h3>
                <p className="text-3xl">
                  {serverLoad}%
                </p>
              </div>
            </div>
          </div>
            <br />
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center text-gray-600 animate-fadeIn">Users</h1>
            </div>
            <div className="flex flex-row mt-6">
              <div className="shadow-lg rounded-lg overflow-hidden mx-auto w-full">
                {loading ? (
                  <div
                  aria-label="Loading..."
                  className="flex items-center space-x-2 content-center justify-center h-screen w-screen fixed top-0 left-0 z-50"
                  role="status"
                  >
                  <svg
                    className="h-20 w-20 animate-spin stroke-gray-500"
                    viewBox="0 0 256 256"
                  >
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="128"
                      x2="128"
                      y1="32"
                      y2="64"
                    />
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="195.9"
                      x2="173.3"
                      y1="60.1"
                      y2="82.7"
                    />
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="224"
                      x2="192"
                      y1="128"
                      y2="128"
                    >
                    </line>
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="195.9"
                      x2="173.3"
                      y1="195.9"
                      y2="173.3"
                    />
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="128"
                      x2="128"
                      y1="224"
                      y2="192"
                    >
                    </line>
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="60.1"
                      x2="82.7"
                      y1="195.9"
                      y2="173.3"
                    />
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="32"
                      x2="64"
                      y1="128"
                      y2="128"
                    />
                    <line
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                      x1="60.1"
                      x2="82.7"
                      y1="60.1"
                      y2="82.7"
                    >
                    </line>
                  </svg>
                  <span className="text-4xl font-medium text-gray-500">
                    Loading...
                  </span>
                  </div>
                ) : error ? (
                  <div className="text-2xl text-red-500 text-center">Error: {error} </div>
                ) : (
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Username
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Email
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Phone
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="py-4 px-6 border-b border-gray-200">{user.username}</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">{user.email}</td>
                        <td className="py-4 px-6 border-b border-gray-200">{user.phone}</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          <span className={`py-1 px-2 rounded-full text-xs ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div>
            </div>
            <br />
            <div>
              <h1 className="text-3xl font-bold mb-4 text-center text-gray-600 animate-fadeIn">Offers</h1>
            </div>
            <div className="flex flex-row mt-6">
              <div className="shadow-lg rounded-lg overflow-hidden mx-auto w-full text-center">
                {loading ? (
                  <div
                    aria-label="Loading..."
                    className="flex items-center space-x-2 content-center justify-center h-screen w-screen fixed top-0 left-0 z-50"
                    role="status"
                    >
                    <svg
                      className="h-20 w-20 animate-spin stroke-gray-500"
                      viewBox="0 0 256 256"
                    >
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="128"
                        x2="128"
                        y1="32"
                        y2="64"
                      />
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="195.9"
                        x2="173.3"
                        y1="60.1"
                        y2="82.7"
                      />
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="224"
                        x2="192"
                        y1="128"
                        y2="128"
                      >
                      </line>
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="195.9"
                        x2="173.3"
                        y1="195.9"
                        y2="173.3"
                      />
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="128"
                        x2="128"
                        y1="224"
                        y2="192"
                      >
                      </line>
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="60.1"
                        x2="82.7"
                        y1="195.9"
                        y2="173.3"
                      />
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="32"
                        x2="64"
                        y1="128"
                        y2="128"
                      />
                      <line
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"
                        x1="60.1"
                        x2="82.7"
                        y1="60.1"
                        y2="82.7"
                      >
                      </line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">
                      Loading...
                    </span>
                  </div>
                ) : error ? (
                  <div className="text-2xl text-red-500 text-center font-bold">Error: {error} </div>
                ) : (
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Title
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Image
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Price
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-left">
                    {offers.map(offer => (
                      <tr key={offer.id}>
                        <td className="py-4 px-6 border-b border-gray-200">{offer.title}</td>
                        <td className="py-4 px-6 border-b border-gray-200"><Image src={`http://localhost:8000/offers/images/${offer.image}`} alt={offer.title} className="object-cover" width={100} height={100} /></td>
                        <td className="py-4 px-6 border-b border-gray-200">{offer.price} DH</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          <span className={`py-1 px-2 rounded-full text-xs ${offer.status === 'accepted' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;