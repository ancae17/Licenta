import React, { useState } from 'react';
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase"; // Assuming you have a separate file for your Firebase configuration
import ImageUpload from './ImageUpload';


const AddBottle = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [possibleElements, setPossibleElements] = useState('');

  const [productImage, setProductImage] = useState(null);

  const handleImageUpload = (image) => {
    setProductImage(image);
  };
  
  const handleAddToPage = async () => {
	try {
	  // Create a new document in the "bottles" collection
	  const docRef = await addDoc(collection(firestore, "bottles"), {
		productImage,
		productName,
		description,
		possibleElements,
	  });
  
	  console.log("Product added with ID: ", docRef.id);
  
	  // Clear the form inputs
	  setProductImage(null);
	  setProductName("");
	  setDescription("");
	  setPossibleElements("");
	} catch (error) {
	  console.error("Error adding product: ", error);
	}
  };

  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate(-1); // Go back to the previous page
  };

  const PreviousPageButton = styled(Button)({
    marginRight: 'center', // Align the button to the right
    marginTop: '10px',
  });
  
  return (
    <div className="product-page">
     <div>
     {/* <Button onClick={handleAddPhotoClick} variant="outlined" color="secondary">
             <AddPhotoAlternateIcon sx={{ fontSize: 100 }}
             variant="outlined"
             color="secondary"/>
         </Button> */}
		 <ImageUpload onImageUpload={handleImageUpload} />
     </div>
      <form className="product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="possibleElements">Possible Elements</label>
          <input
            type="text"
            id="possibleElements"
            value={possibleElements}
            onChange={(e) => setPossibleElements(e.target.value)}
          />
        </div>
        <Button variant="contained" color="secondary" type="submit" onClick={handleAddToPage}>
          Add to Page
        </Button>
        <PreviousPageButton variant="contained" color="secondary" onClick={handlePreviousPage}>
          Previous Page
        </PreviousPageButton>
      </form>
    </div>
  );
};

export default AddBottle;