import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useParams } from 'react-router-dom';

const ActivityDetail = () => {
  const { id } = useParams();  // Get the activity ID from the URL
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/activities/details/${id}`);
        setActivity(response.data);
      } catch (err) {
        setError('Error fetching activity details');
      }
    };

    fetchActivityDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>Loading...</div>;
  }

  const totalImages = activity.pics.length;

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

  const handleCall = (phone) => {
    const whatsappLink = `https://wa.me/${phone}`;
    window.open(whatsappLink, '_blank'); // Open in a new tab
};

  return (
    <>
      <Header />
      <div className="carousel">
        <button className="carousel-control left" onClick={prevImage}>
          &#10094;
        </button>

        <img
          className="detail-image"
          src={activity.pics[currentIndex]}
          alt={activity.alt}
        />

        <button className="carousel-control right" onClick={nextImage}>
          &#10095;
        </button>
      </div>
      <h1>{activity.title}</h1>
      <hr />
      <div>
        <div className="price">
         &nbsp; {activity.price} $ <br />
        </div>
        <div className="location-button-container">
          &nbsp; {activity.location}
        </div>
      </div>
      <div style={styles.descriptionContainer}>
  <h4 style={styles.sectionHeader}>Description:</h4>
  <p style={styles.description}>{activity.description}</p>
</div>
<div style={styles.descriptionContainer}>
  <h4 style={styles.sectionHeader}>Duration:</h4>
  <p style={styles.description}>{activity.duration}</p>
</div>
<div style={styles.descriptionContainer}>
  <h4 style={styles.sectionHeader}>Category:</h4>
  <p style={styles.description}>{activity.category}</p>
</div>
      <div className="button-container">
                            <button className="call-button" onClick={(e) => { e.stopPropagation(); handleCall(activity.contact); }}>Book Now</button>
                    </div>
     
    </>
  );
};

const styles = {
    sectionHeader: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: 'green', // Makes the word "Description" green
      marginTop: '20px',
    },
    descriptionContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: '10px',
      padding: '0 20px',
    },
    description: {
      fontSize: '1rem',
      color: '#333',
      lineHeight: '1.5',
      marginLeft: '10px', // Adds space between the label and the description text
    },
  };
export default ActivityDetail;
