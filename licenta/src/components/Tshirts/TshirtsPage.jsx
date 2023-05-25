import React, { useState } from 'react';
import './TshirtsPage.css';

const TshirtsPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [favoriteElements, setFavoriteElements] = useState('');
  
  const handleAddToCart = () => {
    // Logic for adding the product to the cart
  };
  
  return (
    <div className="product-page">
      <div className="product-info">
        <div className="product-image">
          <img src="https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg" alt="Product" />
        </div>
        <h1>Product Name</h1>
      </div>
      <form className="product-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Telephone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="favoriteElements">Favorite Elements</label>
          <input
            type="text"
            id="favoriteElements"
            value={favoriteElements}
            onChange={(e) => setFavoriteElements(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </form>
    </div>
  );
};

export default TshirtsPage;
