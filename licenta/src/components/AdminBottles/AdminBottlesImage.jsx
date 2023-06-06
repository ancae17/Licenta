import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./AdminBottlesImage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const AdminBottlesImage = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleAddBottleClick = () => {
    navigate("/AddBottle");
  };

  return (
    <div>
      <div className="add-button">
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleAddBottleClick}
        >
          Add Product
        </Button>
      </div>
      <div className="image-list-container">
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
    </div>
  );
};

export default AdminBottlesImage;
