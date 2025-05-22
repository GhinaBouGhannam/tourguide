import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './AddGuesthouse.css';

const AddGuesthouse = () => {
    const [guesthouse, setGuesthouse] = useState({
        price: '',
        increaseperguest: '',
        location: '',
        city: '',
        pics: [''],
        title: '',
        description: '',
        bed: '',
        guests: '',
        instructions: '',
        facilities: [''],
        checkInTime: '',
        checkOutTime: '',
        userId: localStorage.getItem('userId')
    });

    const [error, setError] = useState('');
    const [inputErrors, setInputErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'price' || name === 'increaseperguest' || name === 'bed' || name === 'guests') && isNaN(value)) {
            setInputErrors({ ...inputErrors, [name]: 'Must be a number' });
        } else {
            setInputErrors({ ...inputErrors, [name]: '' });
        }

        if (name.includes('facility')) {
            const index = parseInt(name.split('-')[1]);
            const newFacilities = [...guesthouse.facilities];
            newFacilities[index] = value;
            setGuesthouse({ ...guesthouse, facilities: newFacilities });
        } else if (name.includes('pic')) {
            const index = parseInt(name.split('-')[1]);
            const newPics = [...guesthouse.pics];
            newPics[index] = value;
            setGuesthouse({ ...guesthouse, pics: newPics });
        } else {
            setGuesthouse({ ...guesthouse, [name]: value });
        }
    };

    const addFacility = () => {
        setGuesthouse({ ...guesthouse, facilities: [...guesthouse.facilities, ''] });
    };

    const addPic = () => {
        setGuesthouse({ ...guesthouse, pics: [...guesthouse.pics, ''] });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(inputErrors).some(err => err)) {
            setError('Please fix input errors before submitting.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/api/guesthouses/add', guesthouse);
            
            if (response.data && response.data.message) {
                setError(''); 
                setGuesthouse({
                    price: '',
                    increaseperguest: '',
                    location: '',
                    city: '',
                    pics: [''],
                    title: '',
                    description: '',
                    bed: '',
                    guests: '',
                    instructions: '',
                    facilities: [''],
                    checkInTime: '',
                    checkOutTime: '',
                    userId: localStorage.getItem('userId')
                });
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errorMessage = error.response.data.errors.map(err => err.msg).join(', ');
                setError(errorMessage);
            } else {
                setError('Failed to add guesthouse');
                console.error(error);
            }
        }
    };
    return (
        <>
 <Header />
  <div className="add-guesthouse-container">
   <form onSubmit={handleSubmit}>
    <h1>Add New Guesthouse</h1>
    <div className="input-container">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={guesthouse.title} onChange={handleChange} required />
    </div>

    <div className="input-container">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={guesthouse.price} onChange={handleChange} required />
        {inputErrors.price && <p className="error">{inputErrors.price}</p>}
    </div>

    <div className="input-container">
        <label htmlFor="increaseperguest">Increase per Guest</label>
        <input type="number" name="increaseperguest" value={guesthouse.increaseperguest} onChange={handleChange} required />
        {inputErrors.increaseperguest && <p className="error">{inputErrors.increaseperguest}</p>}
    </div>

    <div className="input-container">
        <label htmlFor="location">Location</label>
        <input type="text" name="location" value={guesthouse.location} onChange={handleChange} required />
    </div>

    <div className="input-container">
        <label htmlFor="city">City</label>
        <input type="text" name="city" value={guesthouse.city} onChange={handleChange} required />
    </div>

    <div className="input-container">
        <label htmlFor="bed">Number of Beds</label>
        <input type="number" name="bed" value={guesthouse.bed} onChange={handleChange} required />
        {inputErrors.bed && <p className="error">{inputErrors.bed}</p>}
    </div>

    <div className="input-container">
        <label htmlFor="guests">Number of Guests</label>
        <input type="number" name="guests" value={guesthouse.guests} onChange={handleChange} required />
        {inputErrors.guests && <p className="error">{inputErrors.guests}</p>}
    </div>

    <div className="input-container">
        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" value={guesthouse.instructions} onChange={handleChange} required></textarea>
    </div>

    <div className="input-container">
        <label htmlFor="description">Description</label>
        <textarea name="description" value={guesthouse.description} onChange={handleChange} required></textarea>
    </div>

    <div className="input-container">
        <label htmlFor="checkInTime">Check-in Time</label>
        <input type="time" name="checkInTime" value={guesthouse.checkInTime} onChange={handleChange} required />
    </div>

    <div className="input-container">
        <label htmlFor="checkOutTime">Check-out Time</label>
        <input type="time" name="checkOutTime" value={guesthouse.checkOutTime} onChange={handleChange} required />
    </div>
                    <h3>Facilities</h3>
                    {guesthouse.facilities.map((facility, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name={`facility-${index}`}
                                value={facility}
                                onChange={handleChange}
                                placeholder="Enter facility"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addFacility}>Add Facility</button>

                    <h3>Images</h3>
                    {guesthouse.pics.map((pic, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name={`pic-${index}`}
                                value={pic}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addPic}>Add Image</button>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddGuesthouse;
