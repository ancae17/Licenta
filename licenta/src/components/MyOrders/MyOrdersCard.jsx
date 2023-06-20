import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import "./MyOrders.css"; // Import the CSS file for styling
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const MyOrdersCard = ({ products, setProducts }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };
  return (
    <div style={{ marginTop: "100px", marginBottom: "30px" }}>
      <div className="image-list-container">
        {products.map((product) => (
          <Card
            className={"image-card2"}
            key={product.id}
            onMouseEnter={() => handleMouseEnter(product)}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold" }}
                component="div"
              >
                {product.data.clientName}
              </Typography>
              <Typography variant="subtitle1">
                Adresa: {product.data.address}
              </Typography>
              <Typography variant="subtitle1">
                Tel: {product.data.phoneNumber}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                <hr
                  style={{
                    flex: "1",
                    border: "none",
                    borderTop: "1px solid rgba(0, 0, 0, 0)",
                    width: "200px",
                    height: 0,
                  }}
                />
              </div>

              <Typography variant="button" style={{ fontWeight: "bold" }}>
                Produse comandate:
              </Typography>

              {product.data.cartItems.map((item, index) => (
                <div>
                  <Typography
                    key={index}
                    variant="subtitle2"
                    style={{ fontWeight: "bold" }}
                  >
                    {item.data.productName}
                  </Typography>
                  <Typography key={index} variant="body2">
                    {item.data.cartDescription}
                  </Typography>
                  <Typography key={index} variant="body2">
                    {item.data.favoriteElements}
                  </Typography>
                  <Typography key={index} variant="body2">
                    {item.data.price} RON
                  </Typography>
                  

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "3px",
                    }}
                  >
                    <hr
                      style={{
                        flex: "1",
                        borderTop: "1px solid black",
                        width: "200px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
            <div style={{ marginTop: "auto" }}>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography variant="h6">
                  {product.data.totalCost} RON
                </Typography>
                <Typography variant="h6">
                    {product.data.status}
                  </Typography>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersCard;
