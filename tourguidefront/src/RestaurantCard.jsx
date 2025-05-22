import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
function RestaurantCard(props) {
    const navigate = useNavigate();
    const restaurants = props.restaurants;

    const [currentIndexes, setCurrentIndexes] = useState([]);

    // Update the state when restaurants data is loaded or changed
    useEffect(() => {
        if (restaurants && restaurants.length > 0) {
            setCurrentIndexes(restaurants.map(() => 0)); // Initialize indexes when restaurants data is available
        }
    }, [restaurants]); // Only re-run when restaurants data changes

    const handleCall = (phone) => {
        const whatsappLink = `https://wa.me/${phone}`;
        window.open(whatsappLink, '_blank'); // Open in a new tab
    };

    const handleMenu = (menu) => {
        window.open(menu, '_blank'); // Open in a new tab
    };

    const nextImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] + 1) % restaurants[index].pics.length; 
            return newIndexes;
        });
    };

    const prevImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] - 1 + restaurants[index].pics.length) % restaurants[index].pics.length; 
            return newIndexes;
        });
    };

    const handleCardClick = (restaurant) => {
        const id = restaurant._id;
        navigate(`/restaurant/${id}`, { state: { id } });
    };
    
    return (
        <>
            <div className="card-container">
                {restaurants.map((restaurant, index) => (
                    <div className="card" key={restaurant.id} onClick={() => handleCardClick(restaurant)}>
                        <div className="image-gallery">
                        <img
          className="card-image"
          src={restaurant.pics[currentIndexes[index]]}
          alt={restaurant.alt}
        />
        <button className="carousel-control left" onClick={(e) => { e.stopPropagation(); prevImage(index); }}>
          &#10094;
        </button>
        <button className="carousel-control right" onClick={(e) => { e.stopPropagation(); nextImage(index); }}>
          &#10095;
        </button>
                        </div>
                        <h2 className="card-title">{restaurant.title}</h2>
                      <p className="card-text">{restaurant.description}</p>
                        <div className="button-container">
                            <button className="call-button" onClick={(e) => { e.stopPropagation(); handleCall(restaurant.phone); }}>Call</button>
                            <button className="menu-button" onClick={(e) => { e.stopPropagation(); handleMenu(restaurant.menuPDF); }}>Menu</button>
                        </div>
                       
                    </div>
                ))}
            </div>
        </>
    );
}

export default RestaurantCard;