import logowhite from './assets/logowhite.png'
import usericon from './assets/user-icon.png'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Header(){
const styles = {width: "26px", height:"26px"};
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userId, setUserId] = useState(null);
const navigate = useNavigate();

useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');

    if (loggedIn === 'true' && storedUserId) {
        setIsAuthenticated(true);
        setUserId(storedUserId);
    }
}, []);

const handleAccountClick = () => {
  if (isAuthenticated) {
      navigate(`/myaccount`);
  } else {
      navigate('/login');
  }
};

return(
    <div className="page">
<header className="navbar-container">
<div className="logo-container"> 
    <img src={logowhite} className="logo-icon" alt="Discover Baladi logo" /></div>
   <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/guesthouses">GuestHouses</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/about">About Us</Link>
          <div onClick={handleAccountClick}>
                    <img style={styles} src={usericon} alt="User Account" />
                </div> </div>

    </header>
    </div>
);
}

export default Header