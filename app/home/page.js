'use strict'; // React and Tailwind CSS
'use client';

import React, { useState } from 'react'; // Import the useState hook
import Navbar from '../components/Navbar';
import CategoryCard from '../components/Categories';
import Offers from '../components/Offers';
import Profile from '../components/Profile';
import UserOffers from '../components/UserOffers';
import Settings from '../components/Settings';
import Footer from '../components/Footer';
import { faTshirt, faCar, faMobileAlt, faMotorcycle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios

const categories = [ // Define the categories
  { name: 'Automotive', icon: faCar, color: 'rgb(150, 150, 184)' },
  { name: 'Electronics', icon: faMobileAlt, color: 'green' },
  { name: 'Motorcycles', icon: faMotorcycle, color: 'brown' },
  { name: 'Clothes', icon: faTshirt, color: 'blue' },
  { name: 'All Categories', icon: faEllipsisH, color: 'black' }
]

export default function Home() {
  const [offers, setOffers] = useState([]); // Define the offers state and the setOffers function
  const [selectedCity, setSelectedCity] = useState(null); // Define the selectedCity state
  const [error, setError] = useState(null); // Define the error state'
  const [selectedCategory, setSelectedCategory] = useState(null); // Define the selectedCategory state
  const [isProfileVisible, setIsProfileVisible] = useState(false); // Define the isProfileVisible state
  const [isUserOffersVisible, setIsUserOffersVisible] = useState(false); // Define the isUserOffersVisible state
  const [isSettingsVisible, setIsSettingsVisible] = useState(false); // Define the isSettingsVisible state
  const [searchResults, setSearchResults] = useState([]); // Define the searchResults state
  // console.log(isProfileVisible); // Add this line to log the isProfileVisible state

  const handleHomeClick = () => {
    setIsProfileVisible(false);
    setIsUserOffersVisible(false);
    setIsSettingsVisible(false);
  };

  // Define the handleSearch function
  const handleSearch = (term) => {
    axios.get(`http://localhost:8000/api/search?searchTerm=${term}`)
      .then((response) => {
        console.log('Search results fetched successfully', response.data);
        setSearchResults(response.data.offers);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col text-center bg-gray-100 min-h-screen">
      <Navbar setOffers={setOffers} setError={setError} setSelectedCity={setSelectedCity} setIsProfileVisible={setIsProfileVisible} setIsUserOffersVisible={setIsUserOffersVisible} setIsSettingsVisible={setIsSettingsVisible} onHomeClick={handleHomeClick} handleSearch={handleSearch}/> {/* Pass the setSelectedCity function as a prop */}
      <main className="flex-1 p-4 overflow-auto flex items-center justify-center">
        <div className="m-auto">
          {isProfileVisible ? (
            <Profile /> // Render the Profile component if isProfileVisible is true
          ) : isUserOffersVisible ? (
              <UserOffers />
            ) : isSettingsVisible ? (
              <Settings />
            ) : ( // Add an else block to render the categories and offers
          <>
            <div className="bg-gray-100">
              <nav className="mx-auto flex justify-around bg-white rounded-lg shadow-md w-full">
                {categories.slice(0, 5).map((category, index) => ( // Slice the categories array to display only the first 5 categories
                  <CategoryCard
                    key={index}
                    category={category.name}
                    icon={category.icon}
                    color={category.color}
                    setOffers={setOffers}
                    setSelectedCategory={setSelectedCategory}
                    setError={setError}
                  />
                ))}
              </nav>
            </div>
            <br />
            <div className="bg-gray-100">
              <Offers offers={offers} selectedCategory={selectedCategory} error={error} selectedCity={selectedCity} searchResults={searchResults} />
            </div>
          </>
        )}
        </div>
      </main>
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
}