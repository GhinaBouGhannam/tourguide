import React from 'react';
import './UserBookingGuesthouseCard.css'
function UserBookingGuesthouseCard({ bookings }) {
    return (
        <div className="bookings-row">
            {bookings.map((booking) => (
                <div
                    className="booking-card-horizontal"
                    key={booking._id}
                >
                    <div className="booking-details-horizontal">
                        <h2 className="booking-card-title-horizontal">
                            Booking for {booking.user.firstName} {booking.user.lastName}
                        </h2>
                        <p><strong>Email:</strong> {booking.user.email} &nbsp;<strong>Phone Number:</strong> {booking.user.phoneNumber || "N/A"}</p>
                        <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()} &nbsp;<strong>Number of Guests:</strong> {booking.nbOfguests}</p>
                          </div>
                    <div className="price-box">
                        <p>Total price</p>
                        <div>${booking.totalPrice}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserBookingGuesthouseCard;
