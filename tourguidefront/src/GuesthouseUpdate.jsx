import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import UserAccountButtons from './UserAccountButtons';

function GuesthouseUpdate() {
  const navigate = useNavigate();
  const { guesthouseId } = useParams();
  const [guesthouseData, setGuesthouseData] = useState({
    price: '',
    increaseperguest: '',
    location: '',
    city: '',
    title: '',
    description: '',
    bed: '',
    guests: '',
    instructions: '',
    facilities: [''],
    checkInTime: '',
    checkOutTime: '',
    pics: [''],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!guesthouseId) {
      navigate('/guesthouses');
    } else {
      fetchGuesthouseData(guesthouseId);
    }
  }, [guesthouseId, navigate]);

  const fetchGuesthouseData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/guesthouses/details/${id}`);
      setGuesthouseData(response.data);
    } catch (error) {
      console.error('Error fetching guesthouse data', error);
      setErrorMessage('Failed to fetch guesthouse data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/guesthouses/update/${guesthouseId}`, guesthouseData);
      if (response.status === 200) {
        setSuccessMessage('Guesthouse updated successfully');
        setErrorMessage('');
      }
    }  catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
         
            const validationErrors = error.response.data.errors.map(err => err.msg).join(', ');
            setErrorMessage(`Validation errors: ${validationErrors}`);
        } else if (error.response && error.response.data && error.response.data.message) {
            
            setErrorMessage(error.response.data.message);
        } else {
           
            setErrorMessage('Failed to update guesthouse. Please try again.');
        }

        setSuccessMessage('');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('facility-')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedFacilities = [...guesthouseData.facilities];
      updatedFacilities[index] = value;
      setGuesthouseData({ ...guesthouseData, facilities: updatedFacilities });
    } else if (name.startsWith('pic-')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedPics = [...guesthouseData.pics];
      updatedPics[index] = value;
      setGuesthouseData({ ...guesthouseData, pics: updatedPics });
    } else {
      setGuesthouseData({ ...guesthouseData, [name]: value });
    }
  };

  const addFacility = () => {
    setGuesthouseData(prevData => ({ ...prevData, facilities: [...prevData.facilities, ''] }));
  };

  const addPic = () => {
    setGuesthouseData(prevData => ({ ...prevData, pics: [...prevData.pics, ''] }));
  };
  const removeFacility = (index) => {
    const updatedFacilities = guesthouseData.facilities.filter((_, i) => i !== index);
    setGuesthouseData({ ...guesthouseData, facilities: updatedFacilities });
  };

  const removePic = (index) => {
    const updatedPics = guesthouseData.pics.filter((_, i) => i !== index);
    setGuesthouseData({ ...guesthouseData, pics: updatedPics });
  };

  return (
    <>
      <Header />
      <UserAccountButtons />
      <div className="guesthouse-update-container">
        <form onSubmit={handleSubmit} className="guesthouse-update-form">
        <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={guesthouseData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
             type="text"
              name="description"
              value={guesthouseData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={guesthouseData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Increase per Guest</label>
            <input
              type="number"
              name="increaseperguest"
              value={guesthouseData.increaseperguest}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={guesthouseData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={guesthouseData.city}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="form-group">
            <label>Bed Count</label>
            <input
              type="number"
              name="bed"
              value={guesthouseData.bed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Guest Capacity</label>
            <input
              type="number"
              name="guests"
              value={guesthouseData.guests}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Instructions</label>
            <input
             type="text"
              name="instructions"
              value={guesthouseData.instructions}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label>Check-In Time</label>
            <input
              type="text"
              name="checkInTime"
              value={guesthouseData.checkInTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-Out Time</label>
            <input
              type="text"
              name="checkOutTime"
              value={guesthouseData.checkOutTime}
              onChange={handleChange}
              required
            />
          </div>
          <label>Facilities</label>
{guesthouseData.facilities.map((facility, index) => (
  <div key={index} className="facility-item">
    <input
      type="text"
      name={`facility-${index}`}
      value={facility}
      onChange={handleChange}
      placeholder="Enter facility"
    />
    <button type="button" onClick={() => removeFacility(index)}>Remove</button>
  </div>
))}
<button type="button" onClick={addFacility}>Add Facility</button>

<label>Images</label>
{guesthouseData.pics.map((pic, index) => (
  <div key={index} className="image-item">
    <input
      type="text"
      name={`pic-${index}`}
      value={pic}
      onChange={handleChange}
      placeholder="Enter image URL"
    />
    <button type="button" onClick={() => removePic(index)}>Remove</button>
  </div>
))}
<button type="button" onClick={addPic}>Add Image</button>

          <button type="submit" className="btn-update">Update Guesthouse</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default GuesthouseUpdate;