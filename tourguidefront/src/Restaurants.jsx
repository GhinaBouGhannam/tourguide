import Header from "./Header";
import Footer from "./Footer";
import icon from './assets/filter-icon.jpg'
import React from 'react';
import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import RestaurantsFilter from "./RestaurantsFilter";
import axios from "axios";
function Restaurants() {

const [restaurants, setRestaurants] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
   useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants'); // Adjust the URL as necessary
        const {restaurants} = response.data;
        setRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      } catch (err) {
        console.log(err.message)
      }
    };

    fetchRestaurants();
  }, []);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const filterRestaurantsByCategories = async (filters) => {
    const { categories, city } = filters;
    
    try {
      // Create query string based on selected categories and city
      const categoryQuery = categories.length > 0 
        ? `&categories=${categories.join(',')}` 
        : '';

      const cityQuery = city && city !== 'all' ? `city=${city}` : 'city=all';

      const response = await axios.get(
        `http://localhost:3000/api/restaurants/filtered/?${cityQuery}${categoryQuery}`
      );
      
      const filteredRestaurants = response.data.restaurants;
      setFilteredRestaurants(filteredRestaurants);
  
    } catch (err) {
      console.error('Error fetching filtered restaurants:', err);
    }
  };
  
  const handleApplyFilters = (filters) => {
    filterRestaurantsByCategories(filters);
    setModalOpen(false);
  };

  
  return (
    <>
      <Header />
      <button className="filter-button" onClick={handleOpenModal}>
        <img src={icon} className="filter-icon" alt="Filter Icon" />
        <span className="filter-text">Filters</span>
      </button>
      <RestaurantCard restaurants={filteredRestaurants} />
      <RestaurantsFilter
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
      />
      
      <Footer />
    </>
  );
}
export default Restaurants;