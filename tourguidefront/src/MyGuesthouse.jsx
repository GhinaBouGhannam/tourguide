import React, { useEffect, useState } from 'react';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import UserAccountButtons from './UserAccountButtons';
import UserGuesthouseCard from './UserGuesthouseCard';
import axios from "axios";
import addIcon from './assets/addicon.png';

function MyGuesthouse() {
    const [guesthouses, setGuesthouses] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId'); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchGuesthouses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/guesthouses/my/${userId}`);
                setGuesthouses(response.data);
                if (!guesthouses.length) return (
                    <>
                        <Header />
                        <UserAccountButtons />
                        <p>No guesthouses found.</p>
                    </>
                );
            } catch (err) {
                console.error("Error fetching guesthouses:", err);
                setError(err);
            }
        };

        fetchGuesthouses();
    }, []);

    if (error) return <p>{ error.message} </p>;
    

    return (
        <>
            <Header />
            <UserAccountButtons />
            <div className="my-guesthouses-container">
            <img 
                    src={addIcon} 
                    alt="Add Guesthouse" 
                    onClick={() => navigate('/addguesthouse')} 
                    style={{
                        cursor: 'pointer',
                        marginTop: '20px',
                        width: '30px', 
                        height: '30px', 
                        float: 'right'
                    }} />
                <UserGuesthouseCard guesthouses={guesthouses} />
              
            </div>
        </>
    );
}

export default MyGuesthouse;
