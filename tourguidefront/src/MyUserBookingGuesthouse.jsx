import Header from "./Header";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserAccountButtons from "./UserAccountButtons";
import axios from "axios";
import UserBookingGuesthouseCard from './UserBookingGuesthouseCard';
function MyUserBookingGuesthouse() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const { guesthouseId } = useParams(); // Get the guesthouseId from the URL
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/bookings/guesthouses/${guesthouseId}`);
                setBookings(response.data.bookings);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError(err);
            }
        };

        if (guesthouseId) {
            fetchBookings();
        } else {
            setError("No guesthouse ID provided.");
        }
    }, []);

    if (error) return <p>{error}</p>;

    if (!bookings.length) return (
        <>
            <Header />
            <UserAccountButtons />
            <p>No bookings </p>
        </>
    );

    return (
        <>
            <Header />
            <UserAccountButtons />
            <div className="my-bookings-container">
                <UserBookingGuesthouseCard bookings={bookings} />
            </div>
        </>
    );
}

export default MyUserBookingGuesthouse;
