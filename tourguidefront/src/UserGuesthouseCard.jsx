import React from 'react';
import {useNavigate } from 'react-router-dom';
import './UserGuesthouseCard.css';
import { useState } from 'react';

function UserGuesthouseCard({ guesthouses }) {
    const navigate = useNavigate();

    const [activeGuesthouseId, setActiveGuesthouseId] = useState(null);
        const [showOptions, setShowOptions] = useState(false);
      
        // Toggle options display
        const handleCardClick = (guesthouseId) => {
            setActiveGuesthouseId(prevId => prevId === guesthouseId ? null : guesthouseId);
          setShowOptions((prev) => !prev);
        };
      
        const handleBookingsClick = (guesthouse) => {

            const guesthouseId = guesthouse._id;
          navigate(`/guesthouse/booking/${guesthouseId}`);
        };
      
        const handleDetailsClick = (guesthouse) => {
            const guesthouseId = guesthouse._id;
          navigate(`/myguesthouse/update/${guesthouseId}`);
        };
    return (
        <div className="guesthouses-row">
            {guesthouses.map((guesthouse) => (
                <div
                    className="guesthouse-card"
                    key={guesthouse._id}
                    onClick={() => handleCardClick(guesthouse._id)}
                >
                    <div className="guesthouse-image-container">
                        <img
                            className="guesthouse-card-image"
                            src={guesthouse.pics[0]} 
                            alt={`Image of ${guesthouse.title}`} 
                        />
                    </div>
                    <div className="guesthouse-details">
                        <h2 className="guesthouse-card-title">{guesthouse.title}</h2>
                        <p className="guesthouse-card-city"><strong>City:</strong> {guesthouse.city}</p>
                        <p className="guesthouse-price"><strong>Price:</strong> ${guesthouse.price}</p>
     { activeGuesthouseId === guesthouse._id && (
        <div className='options-dropdown'>
          <button onClick={() =>handleBookingsClick(guesthouse)} style={{ display: 'block', marginBottom: '0.5rem', backgroundColor:'green' }}>
            Bookings
          </button>
          <button onClick={() =>handleDetailsClick(guesthouse)} style={{ display: 'block', backgroundColor:'green' }}>
            Details
          </button>
        </div>
      )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserGuesthouseCard;
