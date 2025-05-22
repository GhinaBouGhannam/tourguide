import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
function GuesthouseCard(props) {
    const navigate = useNavigate();
    const guesthouses = props.guesthouses;

    const [currentIndexes, setCurrentIndexes] = useState([]);

    useEffect(() => {
        if (guesthouses && guesthouses.length > 0) {
            setCurrentIndexes(guesthouses.map(() => 0));
        }
    }, [guesthouses]);

    const nextImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] + 1) % guesthouses[index].pics.length; 
            return newIndexes;
        });
    };

    const prevImage = (index) => {
        setCurrentIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = (newIndexes[index] - 1 + guesthouses[index].pics.length) % guesthouses[index].pics.length; 
            return newIndexes;
        });
    };

    const handleCardClick = (guesthouse) => {
        const id = guesthouse._id;
        navigate(`/guesthouse/${id}`,{state:{guesthouse}});
    };

    
    return (
        <div className="card-container">
            {guesthouses.map((guesthouse, index) => (
                <div className="card" key={guesthouse._id} onClick={() => handleCardClick(guesthouse)}>
                    <div className="image-gallery">
                        <img
                            className="card-image"
                            src={guesthouse.pics[currentIndexes[index]]}
                            alt={"images of guesthouse" }
                        />
                        <button className="carousel-control left" onClick={(e) => { e.stopPropagation(); prevImage(index); }}>
                            &#10094;
                        </button>
                        <button className="carousel-control right" onClick={(e) => { e.stopPropagation(); nextImage(index); }}>
                            &#10095;
                        </button>
                    </div>
                    <h2 className="card-title">{guesthouse.title}</h2>
                    <p className="card-text">{guesthouse.description}</p>
                    <p className="card-price">From: ${guesthouse.price} / night</p>
                </div>
            ))}
        </div>
    );
}

export default GuesthouseCard;
