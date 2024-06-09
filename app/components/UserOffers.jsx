'use client';
'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';

const UserOffers = () => {
  const { user } = useContext(AuthContext); // Get the user object from the AuthContext
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offerUpdate, setOfferUpdate] = useState('');
  const token = Cookies.get('token');
  const [error, setError] = useState(null);
  const [offerToUpdate, setOfferToUpdate] = useState(null);

  useEffect(() => {
      console.log(`Bearer ${token}`);
      axios.get(`http://localhost:8000/api/user/${user.id}/offers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Offers fetched successfully:', response.data);
        setOffers(response.data.offers);
        setLoading(false);
        setError(null); // Clear the error state
      })
      .catch(error => {
        console.error('Failed to fetch offers:', error); // Log the error
        console.log('Error details:', error.response); // Log the error details
        setLoading(false);
        setError('Failed to fetch offers. Please try again later.'); // Set the error state
      });
  }, [user]); // Add user as a dependency

  const handleUpdate = (offerId) => {
    const offer = offers.find(offer => offer.id === offerId); // Find the offer to update
    setOfferToUpdate(offer);
    console.log('offer', offer); // This should log the offer to be updated
  };
  
  const handleSubmitUpdate = async (e) => { // Add the async keyword
    e.preventDefault();

    // Merge the original offer and the updates into a new object
    const updatedOffer = {...offerToUpdate, ...offerUpdate};
    console.log('updatedOffer', updatedOffer);

    try {
        const response = await axios.put(`http://localhost:8000/api/updateOffer/${offerToUpdate.id}`, updatedOffer, {
            headers: {
                'Authorization': `Bearer ${token}` // Add the token to the headers
            }
        });

        if (response.data.message === 'Offer updated successfully') {
            console.log('Offers updated successfully:', response.data);
            // Handle success (e.g., show a success message, refresh the list of offers, etc.)
            setOffers(offers.map(offer => offer.id === offerToUpdate.id ? updatedOffer : offer));
            setOfferToUpdate(null);
            setOfferUpdate(''); // Clear the offerUpdate state
            setError(null); // Clear the error state
            window.alert('Offer updated successfully');
        } else {
            console.log('Error updating offer:', response.data.message);
            // Handle error (e.g., show an error message)
            setError(response.data.message);
            window.alert('Failed to update offer. Please try again later.');

        }
    } catch (error) {
        console.log('Error updating offer:', error);
        // Handle error (e.g., show an error message)
        setError('Failed to update offer. Please try again later.');
        window.alert('Failed to update offer. Please try again later.');
    }
  };

  return (
    <>
    {loading ? ( // If the data is loading, display a loading message
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    ) : error ? (
      <div className="text-2xl text-red-500 text-center">Error: {error} </div>
    ) : ( 
      <div className="container mx-auto px-4">
        {offers.map(offer => (
          <div key={offer.id} className="bg-white shadow rounded-lg p-6 mb-4 items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{offer.title}</h2>
            {offer.image && <Image src={`http://localhost:8000/offers/images/${offer.image}`} alt={offer.title || 'Offer image'} width={500} height={300} className="rounded-lg" />}
            <br />
            <div className="md:flex-1 px-4 text-left">
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {offer.price} DH
                </span>
            </div>
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Delivery:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {offer.delivery}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Condition:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {offer.condition}
                </span>
            </div>
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Location:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {offer.location}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Category:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {offer.category}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
                <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                    Negotiable:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                    {offer.negotiable ? 'Yes' : 'No'}
                    </span>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
                <div className="md:w-full px-3">
                <label className="block  tracking-wide font-bold text-gray-700 dark:text-gray-300">
                    Product Description
                </label>
                <div className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3">
                    {offer.description}
                </div>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                    Phone number
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                    {offer.phone}
                    </span>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                    Status:&nbsp;
                    </span>
                    {offer.status === 'accepted' ? (
                    <span className="text-green-500 dark:text-green-400">
                        {offer.status}
                    </span>
                    ) : (
                    <span className="text-red-500 dark:text-red-400">
                        {offer.status}
                    </span>
                    )}
                </div>
            </div>
            <div className="flex mt-4">
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Date:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                    {new Date(offer.created_at).toLocaleDateString()}
                </span>
            </div>
            </div>
        </div>
            <button 
                onClick={() => handleUpdate(offer.id)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Update
            </button>
            {offerToUpdate && (
                <form onSubmit={handleSubmitUpdate} className="offer-update-form text-left">
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Title
                        <input 
                        type="text" 
                        value={offerUpdate.title || offerToUpdate.title} 
                        onChange={(e) => setOfferUpdate({...offerUpdate, title: e.target.value})} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Price
                        <input 
                        type="number" 
                        value={offerUpdate.price || offerToUpdate.price} 
                        onChange={(e) => setOfferUpdate({...offerUpdate, price: e.target.value})} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Location
                        <select
                        value={offerUpdate.location || offerToUpdate.location}
                        onChange={(e) => setOfferUpdate({...offerUpdate, location: e.target.value})}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                        <option value={offer.location}>{offerToUpdate.location}</option>
                        {["Casablanca", "Rabat", "Tangier", "Marrakech", "Fes", "Agadir"].filter(option => option !== offer.location).map(option => ( // Filter the options
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Phone
                        <input 
                        type="tel" 
                        pattern="[0-9]{10}" // Add a pattern attribute to the input field
                        value={offerUpdate.phone || offerToUpdate.phone} 
                        onChange={(e) => setOfferUpdate({...offerUpdate, phone: e.target.value})} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Negotiable
                        <select 
                            value={offerUpdate.negotiable || offerToUpdate.negotiable} 
                            onChange={(e) => setOfferUpdate({...offerUpdate, negotiable: e.target.value})} 
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value={offer.negotiable}>{offer.negotiable === 1 ? 'Yes' : 'No'}</option>
                            {["Yes", "No"].filter(option => option !== (offer.negotiable === 1 ? 'Yes' : 'No')).map(option => (
                            <option key={option} value={option === 'Yes' ? 1 : 0}>{option}</option>
                            ))}
                        </select>
                        </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Description
                        <textarea 
                        value={offerUpdate.description || offerToUpdate.description} 
                        onChange={(e) => setOfferUpdate({...offerUpdate, description: e.target.value})} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Delivery
                        <select
                            value={offerUpdate.delivery || offerToUpdate.delivery}
                            onChange={(e) => setOfferUpdate({...offerUpdate, delivery: e.target.value})}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value={offer.delivery}>{offer.delivery}</option>
                            {["Shipping", "Pickup", "Meet"].filter(option => option !== offer.delivery).map(option => ( // Filter the options
                            <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Condition
                        <select
                        value={offerUpdate.condition || offerToUpdate.condition}
                        onChange={(e) => setOfferUpdate({...offerUpdate, condition: e.target.value})}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                        <option value={offer.condition}>{offerToUpdate.condition}</option>
                        {["New", "Used", "Refurbished"].filter(option => option !== offer.condition).map(option => ( // Filter the options
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Category
                        <select
                        value={offerUpdate.category || offerToUpdate.category}
                        onChange={(e) => setOfferUpdate({...offerUpdate, category: e.target.value})}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                        <option value={offer.category}>{offer.category}</option>
                        {["Electronics", "Clothing", "Books", "Furniture", "Automative", "Other"].filter(option => option !== offer.category).map(option => ( // Filter the options
                            <option key={option} value={option}>{option}</option>
                        ))}
                        </select>
                    </label>
                    <label className='font-bold text-gray-700 dark:text-gray-300'>
                        Image
                        <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setOfferUpdate({...offerUpdate, image: e.target.files[0]})} 
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </label>
                    <button 
                        type="submit"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit
                    </button>
                </form>
            )}
            </div>
        ))}
        </div>
    )}
    </>
    );
}

export default UserOffers;