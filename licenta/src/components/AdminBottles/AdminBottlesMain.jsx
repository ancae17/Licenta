// import * as React from 'react';
// import AdminNavBar from '../AdminNavBar';
// import AdminBottlesImage from './AdminBottlesImage';

// const products = [
//     { id: 1, title: 'Product 1', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 2, title: 'Product 2', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 3, title: 'Product 3', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 4, title: 'Product 4', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 5, title: 'Product 5', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 6, title: 'Product 6', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 7, title: 'Product 7', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
// ];

// const AdminBottlesMain = () => {

//   return (
//     <div>
//     <AdminNavBar/>
//     <AdminBottlesImage products={products} />
//     </div>
//   );
// }
// export default AdminBottlesMain;

import React, { useEffect, useState } from 'react';
import AdminNavBar from '../AdminNavBar';
import AdminBottlesImage from './AdminBottlesImage';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './AdminBottlesMain.css'; // Import the CSS file for styling
import { firestore } from "../../firebase"; // Assuming you have a separate file for your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminBottlesMain = () => {
  const [bottles, setBottles] = useState([]);

  const fetchBottles = async () => {
    const bottlesCollection = await getDocs(collection(firestore, 'bottles'));
    const bottlesData = [];
    bottlesCollection.forEach((doc) => {
      bottlesData.push({ id: doc.id, data: doc.data() });
    });
    setBottles(bottlesData);
    console.log(bottlesData);
  };

  useEffect(() => {
    fetchBottles();
  }, []);

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
        <AdminNavBar/>
				<div style={{padding: "100px"}}>
				<Button variant="outlined"
              color="inherit"
              onClick={handleAddBottleClick}>
        Add Product
      </Button>
				</div>
    <div className="image-list-container" style={{padding: "0px 250px"}}>
      {bottles.map((bootle) => (
        <Card key={bootle.id}
        onMouseEnter={() => handleMouseEnter(bootle)}
        onMouseLeave={handleMouseLeave}>
        <CardContent>
          <Typography variant="h5" component="div">
            {bootle.data.productName}
          </Typography>
          <Typography variant="body2">
            {bootle.data.description}
          </Typography>
        </CardContent>
      </Card>
      ))}
    </div>
        </div>
  );
};

export default AdminBottlesMain;