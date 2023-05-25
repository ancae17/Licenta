import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './BottlesImage.css'; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const BottlesImage = ({ products }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextCard = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePreviousCard = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleBottlePageClick = () => {
    navigate("/BottlesPage");
  };

  const currentProduct = products[currentProductIndex];

  return (
    <div className="container">
      <Button onClick={handlePreviousCard} className="previous-button">
        <ArrowBackIosNewIcon sx={{ fontSize: 70 }} color='secondary'/>
      </Button>
      <Card
        sx={{ width: '90%', maxWidth: 900 }}
        className="image-card"
        onClick={handleBottlePageClick}
        
        
      >
        <img src={currentProduct.image} alt={currentProduct.title} className="image" />
        <CardContent>
          <Typography variant="h5" component="div" className="card-title">
            {currentProduct.title}
          </Typography>
          <div className="favorite-icon-container">
            <FavoriteIcon className="favorite-icon" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleNextCard} className="next-button">
        <ArrowForwardIosIcon sx={{ fontSize: 70 }} color='secondary'/>
      </Button>
    </div>
  );
};

export default BottlesImage;
