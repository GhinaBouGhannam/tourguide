import Header from "./Header";
import Footer from "./Footer";
import React from 'react';
import icon from './assets/filter-icon.jpg';
import { useState, useEffect } from "react";
import GuesthouseCard from "./GuesthouseCard"; 
import GuesthousesFilter from "./GuesthousesFilter";
import axios from "axios";

function GuestHouses() {
  const [guesthouses,setGuesthouses]= useState([]);
  const [filteredGuesthouses, setFilteredGuesthouses] = useState(guesthouses);

  useEffect(() => {
    const fetchGuesthouses = async () => {
  try{
 const response= await axios.get('http://localhost:3000/api/guesthouses');
 setGuesthouses(response.data);
 setFilteredGuesthouses(response.data);
} catch (err) {
  console.log(err.message)
}
    };
   fetchGuesthouses();
  },[])

  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filterGuesthousesByCategories =  async (filters) => {
    try {
      const response = await axios.get('http://localhost:3000/api/guesthouses/filtered', {
        params: {
          city: filters.city,
          categories: filters.selectedCategories,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        }
      });
      setFilteredGuesthouses(response.data);
      } catch (error) {
      console.error("Error fetching filtered guesthouses:", error);
    }
  };

  const handleApplyFilters = (filters) => {
     filterGuesthousesByCategories(filters);
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <button className="filter-button" onClick={handleOpenModal}>
        <img src={icon} className="filter-icon" alt="Filter Icon" />
        <span className="filter-text">Filters</span>
      </button>
      <GuesthouseCard guesthouses={filteredGuesthouses} />
      <GuesthousesFilter
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
      />
      <Footer />
    </>
  );
}

export default GuestHouses;