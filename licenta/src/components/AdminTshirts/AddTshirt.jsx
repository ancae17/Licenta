import React, { useState } from 'react';
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const AddTshirt = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [possibleElements, setPossibleElements] = useState('');
  
  const handleAddToPage = () => {
    // Logic for adding the product to the page
  };

  const handleAddPhotoClick = () => {
    //Logic for add photo
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
     <Button onClick={handleAddPhotoClick} variant="outlined" color="secondary">
             <AddPhotoAlternateIcon sx={{ fontSize: 100 }}
             variant="outlined"
             color="secondary"/>
         </Button>
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

export default AddTshirt;
