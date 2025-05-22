import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import UserAccountButtons from './UserAccountButtons';
const ChangePassword = () => {
    const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.put(`http://localhost:3000/api/users/password/${userId}`, {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
        setErrorMessage('');
        setOldPassword('');
        setNewPassword('');
      }
    } catch (error) {
        if (error.response && error.response.data) {
            if (error.response.data.errors && Array.isArray(error.response.data.errors)) {

              const errorMessages = error.response.data.errors.map((err) => err.msg).join(', ');
              setErrorMessage(errorMessages);
            } else if (error.response.data.message) {
            
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage('Failed to change password. Please try again.');
            }
          } else {
            setErrorMessage('Server error. Please try again later.');
          }
      setSuccessMessage('');
    }
  };

  return (
   <>
    <Header/>
    <UserAccountButtons/>
    <div style={{ marginRight: '85%' }}>
        <Link to="/myaccount" style={{ textDecoration: 'none', fontSize: '1.2rem',color:'black', fontWeight:'bold'
         }}>
          &lt; Back
        </Link>
      </div>
      <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
    </>
  );
};

export default ChangePassword;