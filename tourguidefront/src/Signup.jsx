import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import usericon from './assets/user-icon.png'
import passicon from './assets/eye.png'
import emailicon from './assets/email-icon.png'
import axios  from 'axios';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber
    };
try{
    const response = await axios.post('http://localhost:3000/api/users/signup', newUser);
      setErrorMessage('');
      const {user} = response.data; 
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user);
      navigate('/');
  
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
    
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      setErrorMessage('');
      setErrorMessage(err.response.data.errors[0].msg);
    } else if (err.response && err.response.data && err.response.data.details) {
      setErrorMessage('');
      const errorDetails = err.response.data.details;

      if (errorDetails.includes("duplicate key error collection: tourguide.users index: username_1")) {
        setErrorMessage('Username already taken.');
      } else if (errorDetails.includes("duplicate key error collection: tourguide.users index: email_1")) {
        setErrorMessage('Email already taken.');
      } else {
        setErrorMessage('An error occurred during registration. Please try again.');
      }
    }
  }
};

  return (
    <>
      <Header /> 
      <div className="form-container-login">
        <div className="top-nav">
          <Link to="/login">Sign in</Link> | <span className="active">Sign up</span>
        </div>
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
           <div className="input-icon-container">
           <input
            type="text"
            placeholder="Username *"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> <img className="input-icon" src={usericon}/>
       </div>
          <div className="input-icon-container">
          <input
            type="email"
            placeholder="Email *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />  <img className="input-icon" src={emailicon}/>
         </div>
         <div className="input-icon-container">
         <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <img className="input-icon" src={passicon}/>
       </div>
       <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="checkbox-container-login">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I confirm that I have read and accepted the{' '}
              <a href="/privacypolicy">privacy policy</a>
            </label>
          </div>
          <button type="submit" className="btn-login">Register</button>
         
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="toggle-container-login">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </>
  );
};
export default Signup;