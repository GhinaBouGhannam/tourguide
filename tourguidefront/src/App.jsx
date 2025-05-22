import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Home'
import Restaurants from './Restaurants';
import GuestHouses from './GuestHouses';
import RestaurantDetail from './RestaurantDetail';
import Login from './Login';
import Signup from './Signup';
import PrivacyPolicy from './PrivacyPolicy';
import About from './About';
import GuesthouseDetail from './GuesthouseDetail';
import MyBookings from './MyBooking';
import MyBookingsDetail from './MyBookingDetail';
import MyAccount from './MyAccount';
import MyGuesthouse from './MyGuesthouse';
import AddGuesthouse from './AddGuesthouse';
import MyUserBookingGuesthouse from './MyUserBookingGuesthouse';
import ChangePassword from './ChangePassword';
import GuesthouseUpdate from './GuesthouseUpdate';
import Activities from './Activities';
import ActivityDetail from './ActivityDetail';
import { AnimatePresence } from "framer-motion";

function App() {

  return (
    <>
     <AnimatePresence mode="wait">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/guesthouses" element={<GuestHouses />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/guesthouse/:id" element={<GuesthouseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path ="/mybookings" element={<MyBookings/>}/>
        <Route path="/booking/:id" element={<MyBookingsDetail/>}/>
        <Route path ="/myaccount" element={<MyAccount/>}/>
        <Route path ="/myguesthouse" element={<MyGuesthouse/>}/>
        <Route path="/addguesthouse" element={<AddGuesthouse />} />
        <Route path ="/guesthouse/booking/:guesthouseId" element={<MyUserBookingGuesthouse/>}/>
        <Route path="/myaccount/changepass" element={<ChangePassword />}/>
        <Route path="/myguesthouse/update/:guesthouseId" element={<GuesthouseUpdate />}/>
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        
        </Routes>
    </Router>
    </AnimatePresence>
    </>
  )
}

export default App
