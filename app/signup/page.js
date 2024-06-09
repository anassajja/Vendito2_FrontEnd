'use strict'; // Strict mode helps you write cleaner code, like preventing you from using undeclared variables
'use client'; // This is a client-side component

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [cnie, setCnie] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(''); // State to store the error message
    const [successMessage, setSuccessMessage] = useState(''); // State to store the success message


    const handleSubmit = async (event) => { // Function to handle the form submission
        event.preventDefault(); // Prevent the default form submit event
        setErrorMessage(''); // Reset the error message
        setSuccessMessage(''); // Reset the success message

        if (password !== passwordConfirmation) { // If the password and password confirmation do not match
            setErrorMessage('Passwords do not match!'); // Set the error message
            return; // Exit the function
        }

        if (!firstName || !lastName || !username || !cnie || !birthdate || !phone || !address || !city || !email || !password || !passwordConfirmation) { // If any of the required fields are empty
            setErrorMessage('Please fill in all the required fields!'); // Set the error message
            return; // Exit the function
        }

        const formData = new FormData(); // Create a new FormData object
        formData.append('first_name', firstName); // Append the first name to the form data
        formData.append('last_name', lastName); // Append the last name to the form data
        formData.append('username', username); // Append the username to the form data
        formData.append('cnie', cnie); // Append the cnie to the form data
        formData.append('birthdate', birthdate); // Append the birthdate to the form data
        formData.append('phone', phone); // Append the phone number to the form data
        formData.append('address', address); // Append the address to the form data
        formData.append('city', city); // Append the city to the form data
        formData.append('avatar', avatar); // Append the avatar to the form data
        formData.append('email', email); // Append the email to the form data
        formData.append('password', password); // Append the password to the form data
        formData.append('password', passwordConfirmation); // Append the password confirmation to the form data
        

        try {
            const response = await axios.post('http://localhost:8000/api/register', formData, { // Send a POST request to the /api/register endpoint
                headers: { // Set the headers
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            }); 
            
            if (response.status === 201) { // If the response status code is 201
                console.log(response.data); // Log the response data 
                setSuccessMessage('Your account has been created successfully!'); // Set the success message
                setErrorMessage(''); // Reset the error message
                setTimeout(() => { // Set a timeout to redirect the user to the login page after 2 seconds
                    router.push('/login');
                }, 1000);
            }
            else if (response.error) {
                console.log(response.error); // Log the error message
                setErrorMessage(response.error); // Set the error message
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message); // Log the error message
                setErrorMessage(error.response.data.message); // Set the error message
            }
        };

    };

    return (
        <>
            <div className="py-20">
                <div className="flex h-full items-center justify-center">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                        <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
                            <h1 className="mb-4 text-2xl font-bold text-center dark:text-white">SignUp</h1>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="first_name"
                                >
                                First name: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)} // Update the state when the input changes
                                    placeholder="your first name"
                                    required ="" // Make the input required
                                />
                                </div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="last_name"
                                >
                                Last name: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={lastName}
                                    placeholder="your last name"
                                    onChange={(event) => setLastName(event.target.value)} // Update the state when the input changes
                                    required=""
                                />
                                </div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="username"
                                >
                                Username: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)} // Update the state when the input changes
                                    placeholder="your username"
                                    required=""
                                />
                                </div>
                          </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="cnie"
                                >
                                C.N.I.E: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                          </div>
                          <div className="flex w-full rounded-lg pt-1">
                            <div className="relative w-full">
                              <input
                                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                id="cnie"
                                type="text"
                                name="cnie"
                                value={cnie}
                                onChange={(event) => setCnie(event.target.value)} // Update the state when the input changes
                                placeholder="your C.N.I.E"
                                required=""
                              />
                            </div>
                          </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="birthdate"
                                >
                                Birthdate: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>  
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="birthdate"
                                    type="date"
                                    name="birthdate"
                                    value={birthdate}
                                    onChange={(event) => setBirthdate(event.target.value)} // Update the state when the input changes
                                    placeholder="your birthdate"
                                    required=""
                                />
                                </div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="phone"
                                >
                                Phone number: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)} // Update the state when the input changes
                                    placeholder="+212"
                                    required=""
                                />
                                </div>
                            </div>
                          </div>
                          <div> 
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="address"
                                >
                                Address: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)} // Update the state when the input changes
                                    placeholder="your address"
                                    required=""
                                />
                                </div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="city"
                                >
                                City: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <select
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)} // Update the state when the input changes
                                    required=""
                                >
                                    <option value="">Select a city</option>
                                    <option value="Casablanca">Casablanca</option>
                                    <option value="Rabat">Rabat</option>
                                    <option value="Marrakech">Marrakech</option>
                                    <option value="Tanger">Tanger</option>
                                    <option value="Fes">Fes</option>
                                    <option value="Agadir">Agadir</option>
                                    <option value="Meknes">Meknes</option>
                                    <option value="Oujda">Oujda</option>
                                    <option value="Kenitra">Kenitra</option>
                                    <option value="Tetouan">Tetouan</option>
                                    <option value="Safi">Safi</option>
                                    <option value="El Jadida">El Jadida</option>
                                    <option value="Nador">Nador</option>
                                    <option value="Settat">Settat</option>
                                    <option value="Khouribga">Khouribga</option>
                                    <option value="Beni Mellal">Beni Mellal</option>
                                    <option value="Mohammedia">Mohammedia</option>
                                    <option value="Taza">Taza</option>
                                    <option value="Khemisset">Khemisset</option>
                                    <option value="Taourirt">Taourirt</option>
                                    <option value="Essaouira">Essaouira</option>
                                    <option value="Ouarzazate">Ouarzazate</option>
                                    <option value="Berrechid">Berrechid</option>
                                    <option value="Dakhla">Dakhla</option>
                                    <option value="Tifelt">Tifelt</option>
                                    <option value="Larache">Larache</option>
                                    <option value="Ksar El Kebir">Ksar El Kebir</option>
                                    <option value="Guelmim">Guelmim</option>
                                    <option value="Berrechid">Berrechid</option>
                                    <option value="Tiznit">Tiznit</option>
                                    <option value="Lagouira">Lagouira</option>
                                    <option value="Tata">Tata</option>
                                    <option value="Sidi Kacem">Sidi Kacem</option>
                                    <option value="Tan Tan">Tan Tan</option>
                                    <option value="Ouazzane">Ouazzane</option>
                                    <option value="Sidi Slimane">Sidi Slimane</option>
                                    <option value="Errachidia">Errachidia</option>
                                    <option value="Guercif">Guercif</option>
                                    <option value="Oued Zem">Oued Zem</option>
                                    <option value="Sefrou">Sefrou</option>
                                    <option value="Youssoufia">Youssoufia</option>
                                    <option value="Tiznit">Tiznit</option>
                                    <option value="Figuig">Figuig</option>
                                    <option value="Tinghir">Tinghir</option>
                                    <option value="Taroudant">Taroudant</option>
                                    <option value="Sidi Bennour">Sidi Bennour</option>
                                  </select> 
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label
                              className="text-sm font-medium text-gray-900 dark:text-gray-300"
                              htmlFor="avatar"
                            >
                             Avatar:
                            </label>
                            <input
                              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                              id="avatar"
                              type="file"
                              name="avatar"
                              accept='image/*' // accept only image files
                              onChange={(event) => setAvatar(event.target.files[0])} // Update the state when a file is selected
                            />
                          </div>
                        </div>
                          <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="email"
                                >
                                email address: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)} // Update the state when the input changes
                                    placeholder="email@example.com"
                                    required=""
                                />
                                </div>
                            </div>
                          </div>
                            <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                data-testid="flowbite-label"
                                htmlFor="password"
                                >
                                Password: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)} // Update the state when the input changes
                                    placeholder='password'
                                    required=""
                                />
                                </div>
                            </div>
                            </div>
                            <div>
                            <div className="mb-2">
                                <label
                                className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor="password_confirmation"
                                >
                                Confirm password: &nbsp;<span style={{color: 'red'}}>*</span>
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                <input
                                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    id="password_confirmation"
                                    type="password"
                                    name="password"
                                    value={passwordConfirmation}
                                    onChange={(event) => setPasswordConfirmation(event.target.value)} // Update the state when the input changes
                                    placeholder='confirm password'
                                    required=""
                                />
                                </div>
                            </div>
                            </div>
                            <div className="flex flex-col gap-2">
                            <button
                                type="submit"
                                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                            >
                                <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                Register
                                </span>
                            </button>
                            </div>
                            {errorMessage && <p className='text-red-500 bg-red-100 border border-red-400 rounded px-4 py-3 mt-2'>{errorMessage}</p>} {/* Display the error message if it exists */}
                            {successMessage && <p className='text-green-500 bg-green-100 border border-green-400 rounded px-4 py-3 mt-2'>{successMessage}</p>} {/* Display the success message if it exists */}
                        </form>
                        <div className="min-w-[270px]">
                            <div className="mt-4 text-center dark:text-gray-200">
                            Already have an account?
                            <a
                                className="text-blue-500 underline hover:text-blue-600"
                                href="../login"
                            >
                                login
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
  