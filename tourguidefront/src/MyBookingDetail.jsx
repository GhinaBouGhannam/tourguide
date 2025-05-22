import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import locicon from './assets/location-icon.png';
import Header from './Header';

function MyBookingsDetail() {
    const location = useLocation();
    const { booking } = location.state; // Access the passed booking data

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = booking ? booking.guesthouseId.pics.length : 0;

    if (!booking) {
        return <div>Booking not found</div>;
    }

    const nextImage = () => {
        if (currentIndex < totalImages - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleDirections = (loc) => {
        window.open(loc, '_blank'); // Open location in a new tab
    };

    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 1); // Add 1 day

    return (
        <>
            <Header />
            <div className="booking-detail-container">
                <div className="booking-header">
                    <h1>{booking.guesthouseId.title}</h1>
                    <div className="location">
                        <img 
                            src={locicon} 
                            alt="Location Icon" 
                            className="location-icon" 
                            onClick={() => handleDirections(booking.guesthouseId.location)} 
                        />
                        <span>{booking.guesthouseId.city}</span>
                    </div>
                </div>

                <div className="booking-info">
                    <div className="info-details">
                        <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()} {booking.guesthouseId.checkInTime}</p>
                        <p><strong>Check-out:</strong> {checkOutDate.toLocaleDateString()} {booking.guesthouseId.checkOutTime}</p>
                        <p><strong>Guests:</strong> {booking.nbOfguests}</p>
                    </div>
                    <div className="price-box">
                        <p>Total price</p>
                        <div>${booking.totalPrice.toFixed(2)}</div>
                    </div>
                </div>

                <div className="carousel">
                    <button className="carousel-control left" onClick={prevImage}>
                        &#10094;
                    </button>

                    <img
                        className="detail-image"
                        src={booking.guesthouseId.pics[currentIndex]}
                        alt={booking.guesthouseId.description}
                    />

                    <button className="carousel-control right" onClick={nextImage}>
                        &#10095;
                    </button>
                </div>
            </div>
        </>
    );
}

export default MyBookingsDetail;
