import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

<div className="footer-links">
<Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/guesthouses">GuestHouses</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/about">About Us</Link>
        </div>

<div className="footer-contact">
  <p>© 2024 Discover Baladi. All Rights Reserved.</p>
  <p>Contact us: info@discoverBaladi.com | Phone: (+961) 71 234 567</p>
</div>
</div>
</footer>
);
};

export default Footer;
