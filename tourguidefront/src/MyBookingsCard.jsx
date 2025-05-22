import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyBookingsCard({ bookings }) {
    const navigate = useNavigate();

    const handleCardClick = (booking) => {
        // Navigate to the booking details page and pass the booking data in the state
        navigate(`/booking/${booking._id}`, { state: { booking } });
    };
    return (
        <div className="bookings-row">
            {bookings.map((booking) => (
                <div
                    className="booking-card-horizontal"
                    key={booking._id}
                    onClick={() => handleCardClick(booking)}
                >
                    <div className="booking-image-container-horizontal">
                        <img
                            className="booking-card-image-horizontal"
                            src={booking.guesthouseId.pics[0]} 
                            alt={`Image of ${booking.guesthouseId.title}`}
                        />
                    </div>
                    <div className="booking-details-horizontal">
                        <h2 className="booking-card-title-horizontal">{booking.guesthouseId.title}</h2>
                        <div className="booking-info-horizontal">
                            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p><strong>Check-out:</strong> {(new Date(new Date(booking.checkInDate).setDate(new Date(booking.checkInDate).getDate() + 1))).toLocaleDateString()}</p>
                      </div>
                      <p className="booking-price-horizontal"><strong>Price:</strong> ${booking.totalPrice.toFixed(2)}</p>  </div>
                </div>
            ))}
        </div>
    );
}

export default MyBookingsCard;
