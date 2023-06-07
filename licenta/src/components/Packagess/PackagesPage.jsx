import React, { useState } from 'react';
import './PackagesPage.css';
import { Button, Typography} from "@mui/material";
import { useLocation } from 'react-router';

const PackagesPage = () => {
  const location = useLocation()
  const data = location.state

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
          <img src={data.image} alt="Product" />
        </div>
        <h1>{data.data.productName}</h1>
      </div>
      <div>
        <Typography marginBottom={10}>{data.data.description}</Typography>
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
        <Button variant="contained" color="secondary" type="submit" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </form>
    </div>
  );
};

export default PackagesPage;
