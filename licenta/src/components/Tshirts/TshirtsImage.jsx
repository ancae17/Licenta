import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './TshirtsImage.css'; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const TshirtsImage = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleNavigateToProductOnClick = (product) => {
    navigate("/tshirtspage", { state: product });
  };

  return (
    <div className="image-list-container" style={{ padding: "200px 250px" }}>
      {products.map((product) => (
       <Card
       className={'image-card'}
       key={product.id}
       onMouseEnter={() => handleMouseEnter(product)}
       onMouseLeave={handleMouseLeave}
     >
       <img src={product.image} alt={""} className="image" />
       <CardContent>
         <Typography variant="h5" component="div">
           {product.data.productName}
         </Typography>
        </CardContent>
        <Button onClick={() => handleNavigateToProductOnClick(product)} color="secondary">
            View product
          </Button>
       </Card>
      ))}
    </div>
  );
};

export default TshirtsImage;
