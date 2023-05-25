import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import BottlesImage from './BottlesImage';
import { Card, CardContent, Typography } from '@mui/material';
import './BottlesMain.css'; // Import the CSS file for styling

// const products = [
//     { id: 1, title: 'Product 1', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 2, title: 'Product 2', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 3, title: 'Product 3', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 4, title: 'Product 4', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 5, title: 'Product 5', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 6, title: 'Product 6', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
//     { id: 7, title: 'Product 7', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
// ];

// const BottlesMain = () => {

//   return (
//     <div>
//     <NavBar/>
//     <BottlesImage products={products} />
//     </div>
//   );
// }
// export default BottlesMain;

import { firestore } from "../../firebase"; // Assuming you have a separate file for your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; 


// const BottlesMain = () => {
  
//     const fetchBottles = async () => {
//       const bottlesCollection = await getDocs(collection(firestore, "bottles"));
//       bottlesCollection.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);

//       });
//     }
  
//     useEffect(() => {
//         fetchBottles();
//     }, []);

//     return (
//           <div>
//           <NavBar/>

//           </div>
//         );
  
//   }

// export default BottlesMain;

const BottlesMain = () => {
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

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
        <div>
        <NavBar/>
    <div className="image-list-container" style={{padding: "200px 250px"}}>
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

export default BottlesMain;
