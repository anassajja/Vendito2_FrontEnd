'use client';
'use strict'; // React and Tailwind CSS

import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import SelectedOfferDetails from './SelectedOfferDetails'; // Import the SelectedOfferDetails component

// Create a context
const OffersContext = createContext();

export default function Offers({ initialOffers, selectedCategory, error, selectedCity, searchResults}) { // Rename the prop to initialOffers
  const [offers, setOffers] = useState(initialOffers || []); // Use initialOffers as the initial state
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // Define the error state
  const [cityFilteredOffers, setCityFilteredOffers] = useState([]); // Define a new state for cityFilteredOffers
  const [categoryFilteredOffers, setCategoryFilteredOffers] = useState([]); // Define a new state for categoryFilteredOffers
  const [selectedOfferId, setSelectedOfferId] = useState(null); // Define a new state for selectedOfferId
  const [isDetailsViewShown, setIsDetailsViewShown] = useState(false); // Define a new state for isDetailsViewShown

  useEffect(() => {
    if (!initialOffers) {
      axios.get('http://localhost:8000/api/offers')
        .then((response) => {
          console.log('Offer fetched successfully', response.data);
            setOffers(response.data.offers);
            setErrorMessage(null);
            setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) { // Check if the error status is 404
              setErrorMessage('No offers found!'); // Set the error message to "No offers found!"
          } else {
              console.error('Error fetching offers:', error);
              setErrorMessage(error.message);
          }
          setIsLoading(false);
      });
    } else {
      setOffers(initialOffers);
      setIsLoading(false);
    }
  }, [initialOffers, selectedCity]); // Add selectedCity as a dependency
 
  useEffect(() => { // Filter the offers based on the selectedCity
    if (selectedCity !== null && selectedCity !== undefined && selectedCity !== '') { // If a city is selected, filter the offers by city
      console.log('Selected city:', selectedCity); // Log the selected city
      setCityFilteredOffers(offers.filter(offer => offer.location === selectedCity)); // Filter the offers by city
    } else {
      setCityFilteredOffers(offers); // If no city is selected, show all offers
    }
  }, [offers, selectedCity]); // Add offers and selectedCity as dependencies

  useEffect(() => { // Filter the offers based on the selectedCategory
    if (selectedCategory && selectedCategory !== "All Categories") { // If a category is selected, filter the offers by category
      console.log('Selected category:', selectedCategory); // Log the selected category
      setCategoryFilteredOffers(offers.filter(offer => offer.category === selectedCategory)); // Filter the offers by category
    } else {
      setCategoryFilteredOffers(offers); // If no category is selected, show all offers
    }
  }, [offers, selectedCategory]); // Add offers and selectedCategory as dependencies

  // Use the intersection of cityFilteredOffers and categoryFilteredOffers to display the offers
  const filteredOffers = cityFilteredOffers.filter(offer => categoryFilteredOffers.includes(offer));

  // Use the Provider to pass the current value down the tree
  return (
    <OffersContext.Provider value={{ offers, setOffers, selectedOfferId, setIsDetailsViewShown }}> {/* Provide both offers and setOffers */}
      {/* rest of your component */}
      {isLoading ? ( // If the data is loading, display a loading message
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
      ) : error || errorMessage ? ( // If there's an error, display the error message
        <div className="mt-4 p-2 text-left text-white bg-red-500 rounded flex items-center"> 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3l-5.732-9.667a2 2 0 00-3.464 0L5.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Error: {error} {errorMessage && `${errorMessage}`}
        </div> // If there's an error, display the error message
      ) : searchResults.length > 0 ? ( // If there are search results, display them
        // Render searchResults
        searchResults.map((offer) => (
          // Use the same mapping function you used for filteredOffers
          <div key={offer.id} className="offer-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <h2 className="text-lg font-bold mb-2 text-blue-500">{offer.title}</h2>
          <Image src={`http://localhost:8000/offers/images/${offer.image}`} alt={offer.title} width={200} height={200} />
          <p className="text-gray-500 text-center">{offer.description}</p>
          <p className="text-green-500 font-bold">{offer.price} DH</p>
          <p className="text-gray-500">{offer.location}</p>
          <p className="font-bold text-gray-500">{offer.category}</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 mt-4 mb-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              setSelectedOfferId(offer.id);
              setIsDetailsViewShown(true);
            }}
          >
            View Offer Details
          </button>
        </div>
        )) 
      ) : ( // If there's no error, display the offers
        <div className="flex flex-col items-center justify-center">
          {isDetailsViewShown ? ( // If the details view is shown, display the SelectedOfferDetails component
            <SelectedOfferDetails />
          ) : (
            <div className="grid grid-cols-3 gap-4 ">
            {filteredOffers && filteredOffers.map((offer) => ( // Map over the filteredOffers
              console.log(`Image URL: http://localhost:8000/offers/images/${offer.image}`), // Log the image URL
              <div key={offer.id} className="offer-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center space-y-4 transform transition duration-500 hover:scale-105 hover:shadow-xl">
                <h2 className="text-lg font-bold mb-2 text-blue-500">{offer.title}</h2>
                <Image src={`http://localhost:8000/offers/images/${offer.image}`} alt={offer.title} width={200} height={200} />
                <p className="text-gray-500 text-center">{offer.description}</p>
                <p className="text-green-500 font-bold">{offer.price} DH</p>
                <p className="text-gray-500">{offer.location}</p>
                <p className="font-bold text-gray-500">{offer.category}</p>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 mt-4 mb-4 rounded-md hover:bg-blue-600"
                  onClick={() => {
                    setSelectedOfferId(offer.id);
                    setIsDetailsViewShown(true);
                  }}
                >
                  View Offer Details
                </button>
              </div>
            ))}
            </div>
          )}
        </div>
      )}
    </OffersContext.Provider>
  );
}

// Export the context so other components can use it
export { OffersContext };