import Header from "./Header";
import React from 'react';
import { useEffect, useState } from 'react';
import MyBookingsCard from './MyBookingsCard';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAccountButtons from "./UserAccountButtons";
import axios from "axios";
function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
   
    useEffect(() => {
    
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/bookings/my/${userId}`);
                setBookings(response.data);
                if (!bookings.length) {return(
                    <>
                    <Header/>
                    <UserAccountButtons/> 
                 <p>No bookings found.</p>;
                 </>);};
            
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError(err);
            }
        };

        fetchBookings();
    }, []);

    if (error) return 
        <p>{error}</p>

  
    return (
        <>
        <Header/>
        <UserAccountButtons/>
        <div className="my-bookings-container">
            <MyBookingsCard bookings={bookings} />
        </div>
        </>
    );
}

export default MyBookings;