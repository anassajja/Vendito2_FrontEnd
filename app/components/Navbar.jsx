'use client'; // React and Tailwind CSS
'use strict'; // React and Tailwind CSS

import React, { useCallback, Fragment, useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import debounce from 'lodash.debounce';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
} // Utility function to conditionally apply classes

export default function Navbar({ setOffers, setError, setSelectedCity, setIsProfileVisible, setIsUserOffersVisible, setIsSettingsVisible, onHomeClick, handleSearch}) { // Destructure the props passed to the Navbar component
  const { isAuthenticated } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);
  const [selectedCityState, setSelectedCityState] = useState(() => {
    // Try to get the last selected city from localStorage
    const savedCity = localStorage.getItem('selectedCity'); // Get the selected city from localStorage
    // If there's a saved city, use it; otherwise, use an empty string to represent "All cities"
    return savedCity ? savedCity : ''; 
  });
  const navigation = [
    { name: 'Home', href: onHomeClick, current: true },
    { name: 'About', href: 'about', current: false },
    { name: 'Contact', href: 'contact', current: false },
    { name: 'Dashboard', href: 'admin', current: false },
    { name: 'FAQ', href: 'faq', current: false}
  ];
  const cities = ['Rabat', 'Casablanca', 'Marrakech', 'Tanger', 'Fes', 'Agadir', 'Kenitra', 'Oujda', 'Tetouan', 'Temara'];
  const { user } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState('');

  const debouncedHandleSearch = useCallback( // Define the debouncedHandleSearch function
    debounce((term) => handleSearch(term), 500), // Debounce the handleSearch function
    []
  );

  const handleSubmit = (event) => { // Define the handleSubmit function
    event.preventDefault();
    debouncedHandleSearch(inputValue);
  };

/*   useEffect(() => { // Fetch the search results when the searchTerm changes
    if (searchTerm) { // Only make a request if a search term is provided
      handleSearch(searchTerm); // Fetch the search results
    }
  }, [searchTerm]); */

  const handleProfileClick = () => { // Define the handleProfileClick function
    setIsProfileVisible(true);
  };

  const handleUserOffersClick = () => { // Define the handleUserOffersClick function
    setIsUserOffersVisible(true);
  };

  const handleSettingsClick = () => { // Define the handleSettingsClick function
    setIsSettingsVisible(true);
  };

  const filterByCity = (city) => {
    // Only make a request if a city is selected
    if (city) {
      axios.get(`http://localhost:8000/api/offers/filter/location/${city}`)
        .then((response) => {
          console.log('Offers fetched successfully', response.data);
          setOffers(response.data.offers);
          setSelectedCity(city);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching offers:', error);
          setError(error.message);
        });
    }
  };

  console.log('user:', user);
  console.log('user.avatar:', user && user.avatar); // Log the user's avatar filename
  
  useEffect(() => { // Fetch the user's avatar when the component mounts
    if (user && user.avatar) {
      setUserAvatar(`http://localhost:8000/users/avatar/${user.avatar}`);
    }
  }, [user]);
  
  console.log('userAvatar:', userAvatar); // Log the user's avatar URL

  useEffect(() => {
    setSelectedCity(selectedCityState); // Update the selectedCity state in the Home component when a city is selected
    filterByCity(selectedCityState); // Fetch the offers when the component mounts
  }, [selectedCityState]);

  useEffect(() => {
    // Save the selected city to localStorage whenever it changes
    localStorage.setItem('selectedCity', selectedCityState);
  }, [selectedCityState]); // Add selectedCityState as a dependency

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <> 
          <div className="mx-auto max-w-7xl px-2 sm:px-6 l">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="relative h-10 w-20">
                    <Link href="/">
                      <Image
                        src="/vendito.png"
                        alt="Vendito"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href === onHomeClick ? '#' : item.href} // If the href is the onHomeClick function, set it to '#'
                        onClick={item.href === onHomeClick ? item.href : undefined} // If the href is the onHomeClick function, set it to the function
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )} // Apply the appropriate classes based on the current state
                        aria-current={item.current ? 'page' : undefined} // Indicate the current page
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <select
                    value={selectedCityState}
                    onChange={(e) => setSelectedCityState(e.target.value)}
                    className="mr-4 rounded-md text-gray-300 bg-gray-700"
                  >
                    <option value="">All cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search..."
                    className="rounded-md text-gray-300 bg-gray-700 pl-10 pr-4 py-2 w-full"
                  />
                  <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  </button>
                </div>
                </form>
              </div>
              <div className="flex items-center pr-2 sm:ml-6">
                {isAuthenticated ? ( // If the user is authenticated
                  <><>
                    <div className="hidden sm:block">
                      <Link href="./offer">
                        <button type="button" className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-primary-2 focus:bg-blue-700 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                          <PlusIcon className="h-4 w-4 mr-2 inline-block" aria-hidden="true" />
                          Create Offer
                        </button>
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                      <div>
                      {isLoading && <div className='text-white'>Loading...</div>} {/* Display a loading message while the user's avatar is loading */}
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {userAvatar ? (
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={userAvatar} // Use the user's avatar URL here
                            alt="Avatar"
                            width={500}
                            height={300} 
                            onLoad={() => setIsLoading(false)}
                            onError={(e) => { // Handle the error event
                              e.target.onerror = null;  // Prevent infinite loop
                              e.target.src="/images/default-avatar.jpg"; // Path to a default avatar image in your public directory
                            }} />
                        ) : null} {/* Render the user's avatar if it's available */} 
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleProfileClick}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-center w-full')}
                            >
                              Your Profile
                            </button>
                          )}
                        </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSettingsClick}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-center w-full')}
                              >
                                Settings
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleUserOffersClick}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-center w-full')}
                              >
                                Your Offers
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                onClick={() => {
                                  logOut();
                                  alert("You're logged out."); // Display a window alert
                                }}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} // Apply the appropriate classes based on the active state
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                  </Menu></>
                ) : ( // If the user is not authenticated
                  <Link href="/login">
                    <button
                      type="button"
                      className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-primary-2 focus:bg-blue-700 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}