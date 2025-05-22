import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
function GuesthousesFilter(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/guesthousescategory/all');
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
      event.target.checked ? [...prev, event.target.value] : prev.filter((cat) => cat !== event.target.value)
    );
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handlePriceChange = (event) => {
    if (event.target.name === "minPrice") {
      setMinPrice(Number(event.target.value));
    } else {
      setMaxPrice(Number(event.target.value));
    }
  };
  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedLocation('all');
    setMinPrice(1);
    setMaxPrice(1000);
  };

  const handleApply = () => {
    props.onApplyFilters({
      selectedCategories: selectedCategories,
      city: selectedLocation,
      minPrice, maxPrice ,
    });
    handleClearAll();
    props.onClose();
  };

  if (!props.isOpen) return null;  // Don't render if not open

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
            <option value="Bhamdoun">Bhamdoun</option>
            <option value="Chouf">Chouf</option>
            <option value="Aley">Aley</option>
            <option value="Beit Mery">Beit Mery</option>
            <option value="Ehden">Ehden</option>
            <option value="Fakra">Fakra</option>
            <option value="Batroun">Batroun</option>
          </select>
        </div>

        <hr />

        <div className="filter-group categories">
          <label>Categories:</label>
          <div className="checkbox-grid">
            {categories.map((category) => (
              <div key={category.ghcategoryName}>
                <input
                  type="checkbox"
                  value={category.ghcategoryName}
                  checked={selectedCategories.includes(category.ghcategoryName)}
                  onChange={handleCategoryChange}
                />{" "}
                {category.ghcategoryName}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Filter Price</label>
          <div>
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              onChange={handlePriceChange}
              min="1"
              step="10"
            />
            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              onChange={handlePriceChange}
              min="1"
              step="10"
            />
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

export default GuesthousesFilter;