import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';
import './AdminPackagesImage.css'; // Import the CSS file for styling
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPackagesImage = ({ products, setProducts }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleAddPackageClick = () => {
    navigate("/AddPackage");
  };

  const handleDelete = async (documentId) => {
    await deleteDoc(doc(firestore, "items", documentId));
    setProducts((products) =>
      products.filter((item) => item.id !== documentId)
    );
  };

  return (
    <div>
      <div className='add-button'>
      <Button variant="outlined"
              color="inherit"
              onClick={handleAddPackageClick}>
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
        <CardActions>
        <Button
                style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "1",
                }}
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(product.id)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
            </CardActions>
      </Card>
      ))}
    </div>
    </div>
  );
};

export default AdminPackagesImage;