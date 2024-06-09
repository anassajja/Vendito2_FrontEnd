// SelectedOfferDetails.jsx
import React, { useContext, useState, useEffect } from 'react';
import { OffersContext } from './Offers';
import Image from 'next/image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function SelectedOfferDetails() {
  const { offers, selectedOfferId, setIsDetailsViewShown } = useContext(OffersContext);
  const selectedOffer = offers.find(offer => offer.id === selectedOfferId);
  const [user, setUser] = useState(null);

 useEffect(() => {
    if (selectedOffer) { // If an offer is selected, fetch its user
        axios.get(`http://localhost:8000/api/users/${selectedOffer.user_id}`)
        .then((response) => {
            console.log('User fetched successfully', response.data);
            setUser(response.data.user);
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
        });
    }
}, [selectedOffer]);


  if (!selectedOffer) { // If no offer is selected, display a message
    return <div>Select an offer to view its details.</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
            <Image
                alt="Product Image"
                className="w-full h-full object-cover"
                src={`http://localhost:8000/offers/images/${selectedOffer.image}`}
                width={460}
                height={460}
            />
            </div>
            <div className="flex -mx-2 mb-4">
            <div className="w-1/2 px-2">
                <button 
                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white"
                onClick={() => setIsDetailsViewShown(false)}
                >
                Show More Offers
                </button>
            </div>
            <div className="w-1/2 px-2">
              <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                <FontAwesomeIcon icon={faHeart} className="mr-2 hover:text-red-500" size="lg" />
                Like Offer
              </button>
            </div>
            </div>
        </div>
        <div className="md:flex-1 px-4 text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {selectedOffer.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {user ? `${user.first_name} ${user.last_name}` : 'Loading user...'} 
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {selectedOffer.phone}
            </p>
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {selectedOffer.price} DH
                </span>
            </div>
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Delivery:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {selectedOffer.delivery}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Condition:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {selectedOffer.condition}
                </span>
            </div>
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Location:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {selectedOffer.location}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
            <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                Category:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                {selectedOffer.category}
                </span>
            </div>
            </div>
            <div className="flex mb-4">
                <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                    Negotiable:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                    {selectedOffer.negotiable ? 'Yes' : 'No'}
                    </span>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
                <div className="md:w-full px-3">
                <label className="block  tracking-wide font-bold text-gray-700 dark:text-gray-300">
                    Product Description
                </label>
                <div className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3">
                    {selectedOffer.description}
                </div>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                    Status:&nbsp;
                    </span>
                    {selectedOffer.status === 'accepted' ? (
                    <span className="text-green-500 dark:text-green-400">
                        {selectedOffer.status}
                    </span>
                    ) : (
                    <span className="text-red-500 dark:text-red-400">
                        {selectedOffer.status}
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
                    {new Date(selectedOffer.created_at).toLocaleDateString()}
                </span>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default SelectedOfferDetails;