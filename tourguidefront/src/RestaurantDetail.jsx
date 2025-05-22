import React, { useState, useEffect } from 'react';
import axios from 'axios';
import yesIcon from './assets/yes-icon.png';
import noIcon from './assets/cancel-icon.webp';
import Header from './Header';

import { useParams } from 'react-router-dom';

const RestaurantDetail = () => {
  const { id } = useParams();  // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/restaurants/details/${id}`);
        setRestaurant(response.data);
      } catch (err) {
        setError('Error fetching restaurant details');
      }
    };

    fetchRestaurantDetails(); 
  }, [id]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!restaurant) {
    return <div>Loading...</div>;
  }
  const totalImages = restaurant.pics.length;


  const handleCall = (phone) => {
    const whatsappLink = `https://wa.me/${phone}`;
    window.open(whatsappLink, '_blank'); // Open in a new tab
};

const handleMenu = (menu) => {
    window.open(menu, '_blank'); // Open in a new tab
};
const handleDirections = (loc) => {
    window.open(loc, '_blank'); // Open in a new tab
};

const nextImage = () => {
    if (currentIndex < totalImages - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }
};

const prevImage = () => {
    if (currentIndex > 0) {
        setCurrentIndex(prevIndex => prevIndex - 1);
    }
};

const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px'
};
const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
};

  return (
    <>
    <Header/>
    <div className="carousel">
               <button className="carousel-control left" onClick={prevImage}>
                   &#10094;
               </button>
   
               <img
                   className="detail-image"
                   src={restaurant.pics[currentIndex]}
                   alt={restaurant.alt}
               />
   
               <button className="carousel-control right" onClick={nextImage}>
                   &#10095;
               </button>
           </div>
           <h1>{restaurant.title}</h1>
           <hr/>
           <div>
           <div className="price">
             {restaurant.price} <br/></div>
              <div className='location-button-container'>
              &nbsp; {restaurant.city} </div>   
            </div>
            <h4 >Description: </h4>
            <p>{restaurant.description}</p>
    
            <div className="services">
                <h4> Available Services:</h4>
                <div style={rowStyle}>
                    <div className="service">
                        <img src={restaurant.dinein ? yesIcon : noIcon} alt={restaurant.dinein ? 'Yes' : 'No'} style={iconStyle} />
                        <span>Dine-In</span>
                    </div>
                    <div className="service">
                        <img src={restaurant.takeaway ? yesIcon : noIcon} alt={restaurant.takeaway ? 'Yes' : 'No'} style={iconStyle} />
                        <span>Takeaway</span>
                    </div>
                    <div className="service">
                        <img src={restaurant.delivery ? yesIcon : noIcon} alt={restaurant.delivery ? 'Yes' : 'No'} style={iconStyle} />
                        <span>Delivery</span>
                    </div>
                    <div className="service">
                        <img src={restaurant.reservation ? yesIcon : noIcon} alt={restaurant.reservation ? 'Yes' : 'No'} style={iconStyle} />
                        <span>Reservation Needed</span>
                    </div>
                </div>
                </div>
        <div className="button-container">
            <button className="call-button" onClick={() => handleCall(restaurant.phone)}>Call</button>
            <button className="menu-button" onClick={() => handleMenu(restaurant.menuPDF)}>Menu</button>
        </div>   
        </>  
    );    
}

export default RestaurantDetail;