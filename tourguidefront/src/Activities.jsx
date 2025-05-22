import Header from "./Header";
import Footer from "./Footer";
import React from 'react';
import { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard"; // Create an ActivityCard component
import axios from "axios";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For holding search query
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/activities'); // Adjust the URL to your API
        const { activities } = response.data;
        setActivities(activities);
        setFilteredActivities(activities); // Set filtered activities initially
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchActivities();
  }, []);

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter activities based on search term
  const filterActivitiesBySearch = () => {
    const filtered = activities.filter(activity => 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) // Add other fields to search if needed
    );
    setFilteredActivities(filtered);
  };

  // Trigger filtering when the search term changes
  useEffect(() => {
    filterActivitiesBySearch();
  }, [searchTerm]); // Will run whenever the searchTerm changes

  return (
    <>
      <Header />
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for activities..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <ActivityCard activities={filteredActivities} />

      <Footer />
    </>
  );
}

export default Activities;
