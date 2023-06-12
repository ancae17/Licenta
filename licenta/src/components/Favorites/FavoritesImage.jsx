import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import "./FavoritesImage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const BottlesImage = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleNavigateToProductOnClick = (product) => {
    debugger;
    switch (product.data.category) {
      case "bottles":
        navigate("/bottlespage", { state: product });
        break;
      case "glasses":
        navigate("/glassespage", { state: product });
        break;
      case "packages":
        navigate("/packagespage", { state: product });
        break;
      case "tshirts":
        navigate("/tshirtspage", { state: product });
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="image-list-container" style={{ padding: "200px 250px" }}>
      {products.map((product) => (
        <Card
          className={"image-card"}
          key={product.id}
          onMouseEnter={() => handleMouseEnter(product)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={product.image} alt={""} className="image" />
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {product.data.productName}
            </Typography>
          </CardContent>
          <Button
            onClick={() => handleNavigateToProductOnClick(product)}
            color="secondary"
          >
            View product
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default BottlesImage;
