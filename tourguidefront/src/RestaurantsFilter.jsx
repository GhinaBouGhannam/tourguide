import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantsFilter(props) {
  const [categories, setCategories] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/restaurantscategory/all');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategories((prev) =>
      event.target.checked 
        ? [...prev, event.target.value] 
        : prev.filter((cat) => cat !== event.target.value)
    );
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedLocation('all');
  };

  const handleApply = () => {
    props.onApplyFilters({
      categories: selectedCategories,
      city: selectedLocation,
    });
    setSelectedCategories([]);
    setSelectedLocation('all');
    props.onClose();
  };

  if (!props.isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Filters</h2>
          <button className="close-btn" onClick={props.onClose}>&times;</button>
        </div>

        <div className="filter-group">
          <label>Location &nbsp;</label>
          <select id="location" value={selectedLocation} onChange={handleLocationChange}>
            <option value="all">All Locations</option>
            <option value="Beirut">Beirut</option>
            <option value="Chanai">Chanai</option>
            <option value="Koura">Koura</option>
            <option value="Bhamdoun">Bhamdoun</option>
            <option value="Aley">Aley</option>
          </select>
        </div>

        <hr />

        <div className="filter-group categories">
          <label>Categories:</label>
          <div className="checkbox-grid">
            {categories.map((category) => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  value={category.categoryName} 
                  checked={selectedCategories.includes(category.categoryName)} 
                  onChange={handleCategoryChange}
                />
                {" "}{category.categoryName}
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className="modal-footer">
          <button className="clear-btn" onClick={handleClearAll}>Clear all</button>
          <button className="apply-btn" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantsFilter;