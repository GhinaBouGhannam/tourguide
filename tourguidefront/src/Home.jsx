import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';
import guesthouse from './assets/bookguesthouse.png';
import rest from './assets/findrestaurant.png';
import infor from './assets/infoandsupport.png';
import act from './assets/activity-discoverbaladi.png';
import grotto from './assets/images.jpeg';
import mountain from './assets/mountain-discoverbaladi.jpeg';

function Home(){
    const images = [
        'https://harindabama.com/wp-content/uploads/2019/05/cd09.jpg','https://w.temotours.com/public/public/6mWR1qYT3NM5JaSTdQ9l7aHvBG71zb6YXXzhRSyI.jpg',
        'https://c4.wallpaperflare.com/wallpaper/866/537/64/raouche-rocks-beirut-lebanon-sea-wallpaper-preview.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxzfrfyTWZz1IOnyYTGZmMni8-ZqX49pSIw&s',
    
    ]; // Array of images
    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index
  
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop to the first image after the last one
    };
  
    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Loop to the last image if going backwards from the first one
    };
  
    // Automatically move to the next image every 10 seconds
    useEffect(() => {
      const interval = setInterval(nextImage, 10000); // 10 seconds (10000 ms)
      return () => clearInterval(interval); // Cleanup the interval on unmount
    }, [images.length]); // Re-run if the number of images changes
  
    return(
    <>
    <Header/>
 <div className="holiday-message">
  <h2 className="moving-text">🎄🎉 Happy New Year! Plan your New Year Eve now! 🎉🎄      Use NEWYEAR2025 to get 20% discount on your booking</h2>
</div>
<div className="carousel">
      <button className="carousel-control left" onClick={prevImage}>
        &#10094; {/* Left arrow */}
      </button>

      <img
        className="detail-image"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />

      <button className="carousel-control right" onClick={nextImage}>
        &#10095; {/* Right arrow */}
      </button>
    </div>
<div className="image-grid">
    <a href="/guesthouses">
    <img src={guesthouse}/>
</a>
<a href="/restaurants">
    <img src={rest}/>
</a>
<a href="/about">
    <img src={infor}/>
</a>
<a href="/activities">
    <img src={act}/>
</a>

</div>
<Footer/>
    </>)
}
export default Home;