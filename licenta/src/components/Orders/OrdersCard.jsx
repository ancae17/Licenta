import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import "./Orders.css"; // Import the CSS file for styling
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";

const OrdersCard = ({ products, setProducts }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleSend = async (documentId) => {
    await updateOrder(documentId);
    setProducts((products) =>
      products.filter((item) => item.id !== documentId)
    );
  };

  const updateOrder = async (orderId) => {
    try {
      const orderRef = doc(firestore, "orders", orderId);
      debugger;
      await updateDoc(orderRef, {
        status: "Sent"
      });
      
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div style ={{marginTop:"100px"}}>
      <div className="image-list-container">
        {products.map((product) => (
          <Card
            className={"image-card"}
            key={product.id}
            onMouseEnter={() => handleMouseEnter(product)}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {product.data.clientName}
              </Typography>
              <Typography variant="body2">
                {product.data.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSend(product.id)}
              >
                Send
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersCard;
