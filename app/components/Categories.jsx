'use strict'; // React and Tailwind CSS
'use client';
import React from 'react'; // Import the useState hook
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CategoryCard({category, icon, color, setOffers, setSelectedCategory, setError}) { // Destructure the props
  const filterByCategory = async (category) => { // Define the filterByCategory function
    try {
      let response;
      if (category === "All Categories") {
        response = await axios.get(`http://localhost:8000/api/offers`);
      } else {
        response = await axios.get(`http://localhost:8000/api/offers/filter/category/${category}`);
      }
      console.log('Offers fetched successfully', response.data);
      setOffers(response.data.offers); // Set the offers to state
      setSelectedCategory(category); // Set the selectedCategory to state
      setError(null); // Clear the error message
  
    } catch (error) {
      console.error('Failed to filter by category:', error);
      setError(error.message); // Set the error message to state
    }
  };

    return (
      <li className="list-none inline-block px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => filterByCategory(category)}>
      <FontAwesomeIcon icon={icon} size="1x" style={{ color: color }} className="pr-2"/>
      <span className="text-lg font-bold capitalize" style={{ color: color }}>{category}</span>
    </li>
    );
}

export default CategoryCard;
