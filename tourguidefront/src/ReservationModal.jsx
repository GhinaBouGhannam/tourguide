import React, { useState, useEffect } from 'react';
import axios from 'axios';
import correctImage from '../src/assets/correct.png';
import { Link } from 'react-router-dom';

function ReservationModal({ isOpen, onClose, guesthouse }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(guesthouse.price);
    const [message, setMessage] = useState('');
    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(guesthouse.price);
    const [discountCode, setDiscountCode] = useState('');
    
    const discountCodes = [
        { code: 'DISCOUNT10', percent: 10 },
        { code: 'NEWYEAR2025', percent: 20 },
        { code: 'WELCOME15', percent: 15 }
    ];
    const handleCheckInChange = (event) => {
        const selectedDate = event.target.value;
        setCheckInDate(selectedDate);
        
        if (selectedDate) {
            const checkOut = new Date(selectedDate);
            checkOut.setDate(checkOut.getDate() + 1);
            setCheckOutDate(checkOut.toISOString().split('T')[0]);
        } else {
            setCheckOutDate('');
        }
    };

    const handleGuestChange = (event) => {
        const chosenGuests = Number(event.target.value);
        setGuests(chosenGuests);
        if (chosenGuests > guesthouse.guests) {
            setMessage(`Maximum ${guesthouse.guests} guests allowed.`);
        } else {
            setMessage('');
        }
    };

    useEffect(() => {
        if (guests <= guesthouse.guests) {
            const calculatedPrice = (guests * guesthouse.increaseperguest - guesthouse.increaseperguest + 1) * guesthouse.price;
            setTotalPrice(calculatedPrice);
            if (discountCode) {
                handleDiscountCode(calculatedPrice);
            } else {
                setDiscountedPrice(calculatedPrice);
            }
        }
    }, [guests, guesthouse.guests, guesthouse.increaseperguest, guesthouse.price]);

    const handleReserve = async () => {
        if (guests > guesthouse.guests) return;

        try {
            const response = await axios.post('http://localhost:3000/api/bookings/add', {
                guesthouseId: guesthouse._id,
                checkInDate,
                userId: localStorage.getItem('userId'),
                nbOfguests: guests,
                totalPrice: discountedPrice,
            });

            const { message: apiMessage, booking } = response.data;

            if (booking && !booking.success) {
                setMessage(booking.message);
            } else {
                setMessage(apiMessage || 'Booking created successfully!');
                setIsBookingSuccessful(true);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    if (!isOpen) return null;
    const handleDiscountCode = (price) => {
        const discount = discountCodes.find(code => code.code === discountCode);
    
        if (discount) {
            const discountAmount = (price * discount.percent) / 100;
            const newPrice = price - discountAmount;
            setDiscountedPrice(newPrice);
            setMessage(`Discount applied! You saved ${discount.percent}%`);
        } else {
            setDiscountedPrice(price);  // If no discount, just return the original price
            setMessage('Invalid discount code. Please try again.');
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {isBookingSuccessful ? (
                        <div className="success-view">
                            <img src={correctImage} alt="Success" style={{ width: '50px', height: '50px' }} />
                            <p className="success-message">Booked Successfully!</p>
                            <button className="ok-button" onClick={onClose}>OK</button>
                            <Link to="/mybookings" className="my-bookings-link">Go to My Bookings</Link>
                        </div>
                    ) : (
                        <>
                            <div className="booking-field">
                                <label>Check In</label>
                                <input 
                                    type="date" 
                                    value={checkInDate} 
                                    onChange={handleCheckInChange} 
                                />
                            </div>
                            <div className="booking-field">
                                <label>Check Out</label>
                                <input 
                                    type="date" 
                                    value={checkOutDate} 
                                    readOnly 
                                />
                            </div>
                            <div className="booking-field">
                                <label>Guests</label>
                                <input
                                    type="number"
                                    value={guests}
                                    onChange={handleGuestChange}
                                    min="1"
                                    max={guesthouse.guests}
                                />
                            </div>
                            <div className="booking-field">
                                <label>Discount Code</label>
                                <div className="discount-code-wrapper">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter discount code"
                                    />
                                    <button 
                                        onClick={(e)=>handleDiscountCode(totalPrice)} 
                                        className="apply-discount-button"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div className="price-details">
                                <p><strong>Original Price:</strong> ${totalPrice.toFixed(2)}</p>
                                
                                    <p><strong>Discounted Price:</strong> ${discountedPrice.toFixed(2)}</p>
                            </div>
                            
                            <div className="modal-footer">
                                <button 
                                    className="reserve-button" 
                                    onClick={handleReserve} 
                                    disabled={guests > guesthouse.guests}
                                >
                                    RESERVE
                                </button>
                            </div>
                            {message && <p className="error-message">{message}</p>}
          
                        </>
                    )}
                </div>
                </div>
        </div>
    );
}

export default ReservationModal;

