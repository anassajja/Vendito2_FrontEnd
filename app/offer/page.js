'use client'; 
'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

const CreateOffer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('');
    const [delivery, setDelivery] = useState('');
    const [negotiable, setNegotiable] = useState(false);
    const [phone, setPhone] = useState(''); 
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = Cookies.get('token');
    const { user } = useContext(AuthContext);

    useEffect(() => { 
        if (!user) { // If the user is not logged in, redirect to the login page
            router.push('/login');
        }
    }, [user]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset the error message
        setSuccess(''); // Reset the success message

        if (!title || !description || !price || !category || !location || !condition || !delivery || !phone) {
            setError('Please fill in all the fields!');
            return;
        }

        const formData = new FormData(); // Create a new form data object
        formData.append('title', title); // Append the data to the form data object
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);
        formData.append('location', location);
        formData.append('condition', condition);
        formData.append('delivery', delivery);
        formData.append('negotiable', negotiable ? 1 : 0); // Convert boolean to integer
        formData.append('phone', phone);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/createOffer', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            if (response.status === 201) {
                console.log(response.data); // If the offer is created successfully, display the success message
                setSuccess('Offer created successfully');
                setError('');
                setTimeout(() => {
                    router.push('/home'); // Redirect to the home page
                }, 1000);
            }
            else if (response.status === 500) {
                console.log(response.error); // If there is an error in the response, display the error message
                setError(response.error);
                setSuccess('');
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
                setSuccess('');
            }
        };
    };

    return (
        <>
            <div className="py-20">
                <div className="flex h-full items-center justify-center">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
                        <div className="flex h-full flex-col justify-center gap-4 p-6">
                            <h1 className="mb-4 text-2xl font-bold text-center dark:text-white">Create Offer</h1>
                            <form className="flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="title"
                                    >
                                        Title: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="title"
                                        type="text"
                                        name="title"
                                        placeholder="Offer title"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="description"
                                    >
                                        Description: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="description"
                                        name="description"
                                        placeholder="Offer description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="price"
                                    >
                                        Price: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="price"
                                        type="number"
                                        name="price"
                                        placeholder="Offer price"
                                        value={price}   
                                        onChange={(event) => setPrice(event.target.value)}
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="image"
                                    >
                                        Image: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="image"
                                        type="file"
                                        name="image"
                                        placeholder="Offer image"
                                        accept='image/*' // accept only image files
                                        required=""
                                        onChange={(event) => setImage(event.target.files[0])} // Set the value of the input element to the value of the state
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="category"
                                    >
                                        Category: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="category"
                                        name="category"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        required=""
                                    >
                                        <option value="" >Select a category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Motorcycles">Motorcycles</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Books">Books</option>
                                        <option value="Services">Services</option>
                                        <option value="Food">Food</option>
                                        <option value="Sport&Leisure">Sport&Leisure</option>
                                        <option value="Health">Health</option>
                                        <option value="Beauty">Beauty</option>
                                        <option value="Automotive">Automotive</option>
                                        <option value="Toys">Toys</option>
                                        <option value="Tools">Tools</option>
                                        <option value="Garden">Garden</option>
                                        <option value="Music">Music</option>
                                        <option value="Video Games">Video Games</option>
                                        <option value="Movies">Movies</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="location"
                                    >
                                        Location: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id = "location"
                                        name="location"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        required=""

                                    >
                                        <option value="" >Select a location</option>
                                        <option value="Casablanca">Casablanca</option>
                                        <option value="Rabat">Rabat</option>
                                        <option value="Marrakech">Marrakech</option>
                                        <option value="Tanger">Tanger</option>
                                        <option value="Fes">Fes</option>
                                        <option value="Agadir">Agadir</option>
                                        <option value="Oujda">Oujda</option>
                                        <option value="Kenitra">Kenitra</option>
                                        <option value="Tetouan">Tetouan</option>
                                        <option value="Safi">Safi</option>
                                        <option value="El Jadida">El Jadida</option>
                                        <option value="Nador">Nador</option>
                                        <option value="Settat">Settat</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="condition"
                                    >
                                        Condition: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                <select 
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="condition"
                                        name="condition"
                                        value={condition}
                                        onChange={(event) => setCondition(event.target.value)}
                                        required=""
                                    >
                                        <option value="" >Select a condition</option>
                                        <option value="New">New</option>
                                        <option value="Used">Used</option>
                                        <option value="Refurbished">Refurbished</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="delivery"
                                    >
                                        Delivery: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id = "delivery"
                                        name="delivery"
                                        value={delivery} // Set the value of the select element to the value of the state
                                        onChange={(event) => setDelivery(event.target.value)}
                                        required=""
                                        >
                                        <option value="" >Select a delivery method</option>
                                        <option value="Pickup">Pickup</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Meet">Meet</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                    Negotiable:
                                    </label>
                                    &nbsp;
                                        <input
                                            type="checkbox"
                                            name="negotiable"
                                            className="mr-2"
                                            checked={negotiable} // Check the checkbox if the value is true
                                            onChange={(event) => setNegotiable(event.target.checked)}
                                        />
                                </div>
                                <div>
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="phone"
                                    >
                                        Phone: &nbsp;<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="+212"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                      
                                        required=""
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                                    >
                                        <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                            Submit Offer
                                        </span>
                                    </button>
                                </div>
                                {error && <p className='text-red-500 bg-red-100 border border-red-400 rounded px-4 py-3 mt-2'>{error}</p>} {/* Display the error message if it exists */}
                                {success && <p className='text-green-500 bg-green-100 border border-green-400 rounded px-4 py-3 mt-2'>{success}</p>} {/* Display the success message if it exists */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default CreateOffer;