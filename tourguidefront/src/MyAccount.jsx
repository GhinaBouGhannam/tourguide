import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { Link, useLocation } from 'react-router-dom';
import UserAccountButtons from './UserAccountButtons';
function MyAccount() {
   const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber:'',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    } else {
      fetchUserData(userId);
    }
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/detail/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
      setErrorMessage('Failed to fetch user data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.put(`http://localhost:3000/api/users/update/${userId}`, userData);
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to update profile. Please try again.');
      } setSuccessMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/login');
  };


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Header/>
    <UserAccountButtons/>
    <div className="my-account-container">
      <form onSubmit={handleSubmit} className="my-account-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-update">Update Profile</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
  <Link to="/myaccount/changepass" style={{ textDecoration: 'none', fontSize: '1rem', color: 'black', fontWeight: 'bold' }}>
    Change Password?
  </Link>
  </div>
  <button className="btn-logout" onClick={handleLogout}>Log out</button>

</div>
    </>
  );
}

export default MyAccount;