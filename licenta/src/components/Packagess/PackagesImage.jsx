import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './PackagesImage.css'; // Import the CSS file for styling

const PackagesImage = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="image-list-container">
      {products.map((product) => (
        <Card
          key={product.id}
          className={`image-card ${hoveredProduct === product ? 'hovered' : ''}`}
          onMouseEnter={() => handleMouseEnter(product)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={product.image} alt={product.title} className="image" />
          <CardContent>
            <Typography variant="h5" component="div" className="card-title">
              {product.title}
            </Typography>
            {hoveredProduct === product && (
              <div className="favorite-icon-container">
                <FavoriteIcon className="favorite-icon" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PackagesImage;
