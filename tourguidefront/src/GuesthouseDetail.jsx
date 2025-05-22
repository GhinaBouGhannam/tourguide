import { useParams, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import ReservationModal from './ReservationModal';
import GuesthouseRulesModal from './GuesthouseRulesModal';
import locicon from './assets/location-icon.png';
import './GuesthouseRulesModal.css';
import axios from 'axios';
import React from 'react';
function GuesthouseDetail() {
    const{id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [guesthouse,setGuesthouse] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [rulesModalShow, setRulesModalShow] = useState(false);
 
    const guesthouseId = id;

  useEffect(() => {
    const fetchGuesthouse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/guesthouses/details/${guesthouseId}`);
        setGuesthouse(response.data);
      } catch (error) {
        setError("Could not fetch guesthouse data. Please try again later.");
        console.error("Error fetching guesthouse data:", error);
      }
    };

    fetchGuesthouse();
  }, []);

  if (error) return <p>{error}</p>;
  if (!guesthouse) return <p>Loading guesthouse details...</p>;

  
 const totalImages = guesthouse.pics.length ||0;
    
    const handleDirections = (loc) => {
        window.open(loc, '_blank');
    };

     const handleBookNow = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        } else {
            setModalShow(true);
        }
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

    return (
        <>
            <Header/>
            <div className="carousel">
                <button className="carousel-control left" onClick={prevImage}>
                    &#10094;
                </button>

                <img
                    className="detail-image"
                    src={guesthouse.pics[currentIndex]}
                    alt={guesthouse.alt}
                />

                <button className="carousel-control right" onClick={nextImage}>
                    &#10095;
                </button>
            </div>

            <h1>{guesthouse.title}</h1>
            <div className='beds-detail'>
            <p>{guesthouse.bed} beds • {guesthouse.guests} guests</p>
            </div>
           
            <div>
                <div className="price">
                    From ${guesthouse.price} / Night <br />
                </div>
            
                <div className='location-button-container'>
                    Directions:
                    <button className="directions-button" onClick={() => handleDirections(guesthouse.location)}>
                        <img className='directions-button' src={locicon} alt="Location Icon" />
                    </button>
                    &nbsp; {guesthouse.city}
                </div>
            </div>
            <hr/>
            <h4 className='description-text'>Description:</h4>
            <p className='description-par'>{guesthouse.description}</p>

            <div className="facilities-section">
  <h4>Guesthouse Facilities</h4>
  <div className="facilities-grid">
    {guesthouse.facilities.map((facility, index) => (
      <div className="facility-item" key={index}>
        {facility}
      </div>
    ))}
  </div>
</div>

<button className="rules-button" onClick={() => setRulesModalShow(true)}>Show Rules</button>
 
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>

            <ReservationModal isOpen={modalShow} guesthouse={guesthouse} onClose={() => setModalShow(false)} />
    
        <GuesthouseRulesModal
                show={rulesModalShow}
                onClose={() => setRulesModalShow(false)}
                instructions={guesthouse.instructions}
            />
            </>
    );
}
export default GuesthouseDetail;