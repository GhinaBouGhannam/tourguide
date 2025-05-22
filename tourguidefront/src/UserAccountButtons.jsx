import bookingicon from './assets/mybooking.png';
import accounticon from './assets/myaccount.png';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
function UserAccountButtons() {
 const location = useLocation();
 const navigate = useNavigate();

 const handleNavigate = (path) => {
   navigate(path); // Navigate to the specified path
 };
     return(
<div className="button-group">
<button
  className={location.pathname === '/myaccount' ? 'button--account button--account--active' : 'button--account'}
  onClick={() => handleNavigate('/myaccount')}
> <img src={accounticon} alt="img of account" />
  My Account
</button>
<button
  className={location.pathname === '/mybookings' ? 'button--account button--account--active' : 'button--account'}
  onClick={() => handleNavigate('/mybookings')}
> <img src={bookingicon} alt="image of list"/>
  My Bookings
</button>

<button
  className={location.pathname === '/myguesthouse' ? 'button--account button--account--active' : 'button--account'}
  onClick={() => handleNavigate('/myguesthouse')}
> <img src={bookingicon} alt="image of list"/>
  My Guesthouse
</button>
</div>
)}
export default UserAccountButtons;