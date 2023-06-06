import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './TshirtsImage.css'; // Import the CSS file for styling

const TshirtsImage = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
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
         <Typography variant="body2">{product.data.description}</Typography>
       </CardContent>
     </Card>
      ))}
    </div>
  );
};

export default TshirtsImage;
