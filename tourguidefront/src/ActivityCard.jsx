import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import locicon from './assets/location-icon.png';
function ActivityCard(props) {
    const navigate = useNavigate();
    const activities = props.activities;

    const [currentIndexes, setCurrentIndexes] = useState([]);

    // Update the state when activities data is loaded or changed
    useEffect(() => {
        if (activities && activities.length > 0) {
            setCurrentIndexes(activities.map(() => 0)); // Initialize indexes when activities data is available
        }
    }, [activities]); // Only re-run when activities data changes

    const handleCardClick = (activity) => {
        const id = activity._id;
        navigate(`/activities/${id}`, { state: { id } });
    };

    const nextImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] + 1) % activities[index].pics.length; 
            return newIndexes;
        });
    };

    const prevImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] - 1 + activities[index].pics.length) % activities[index].pics.length; 
            return newIndexes;
        });
    };

    const handleCall = (phone) => {
        const whatsappLink = `https://wa.me/${phone}`;
        window.open(whatsappLink, '_blank'); // Open in a new tab
    };


    return (
        <div className="card-container">
            {activities.map((activity, index) => (
                <div className="card" key={activity._id} onClick={() => handleCardClick(activity)}>
                    <div className="image-gallery">
                        <img
                            className="card-image"
                            src={activity.pics[currentIndexes[index]]}
                            alt={activity.alt}
                        />
                        <button className="carousel-control left" onClick={(e) => { e.stopPropagation(); prevImage(index); }}>&#10094;</button>
                        <button className="carousel-control right" onClick={(e) => { e.stopPropagation(); nextImage(index); }}>&#10095;</button>
                    </div>
                    <h2 className="card-title">{activity.title}</h2>
                    <p className="card-text">{activity.description}</p>
                  <div className="button-container">
                            <button className="call-button" onClick={(e) => { e.stopPropagation(); handleCall(activity.contact); }}>Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ActivityCard;
