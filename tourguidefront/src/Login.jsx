import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import usericon from './assets/user-icon.png';
import passicon from './assets/eye.png';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username: username,
        password: password,
      });
      const {token} = response.data; 
       localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', token);
      setErrorMessage('');
      navigate('/');
    }
    catch (error) {
      console.error(error); 
      setErrorMessage('Wrong Username Or Password');
    }
  };
   
  return (
    <>
      <Header />
      <div className="form-container-login">
        <div className="top-nav">
          <span className="active">Sign in</span> | <Link to="/signup">Sign up</Link>
        </div>

        <h2>Sign in to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="input-icon-container">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <img className="input-icon" src={usericon} alt="User Icon" />
          </div>
          <div className="input-icon-container">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img className="input-icon" src={passicon} alt="Password Icon" />
          </div>
          <button type="submit" className="btn-login">Log in</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="toggle-container-login">
          <span>Don't have an account?</span>
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </>
  );
}

export default Login;