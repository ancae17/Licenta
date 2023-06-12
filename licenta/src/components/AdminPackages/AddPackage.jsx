import React, { useState } from "react";
import { Button } from "@mui/material";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import AdminNavBar from "../AdminNavBar";
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase"; // Assuming you have a separate file for your Firebase configuration
import ImageUpload from "../ImageUpload/ImageUpload";

const AddPackage = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [possibleElements, setPossibleElements] = useState("");
  const [price, setPrice] = useState(0);

  const [productImage, setProductImage] = useState(null);

  const handleImageUpload = (image) => {
    setProductImage(image);
  };

  const handleFileUpload = async (file, id) => {
    const storageRef = ref(storage, `images/${id}`);

    await uploadBytes(storageRef, file);

    console.log("File uploaded successfully!");
  };

  const handleAddToPage = async () => {
    try {
      // Create a new document in the "packages" collection
      
      const docRef = await addDoc(collection(firestore, "items"), {
        productName,
        description,
        possibleElements,
        category: "packages",
        price
      });
      
      await handleFileUpload(productImage, docRef.id);

      console.log("Product added with ID: ", docRef.id);

      // Clear the form inputs
      setProductImage(null);
      setProductName("");
      setDescription("");
      setPossibleElements("");
      setPrice("0");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate(-1); // Go back to the previous page
  };

  const PreviousPageButton = styled(Button)({
    marginRight: "center", // Align the button to the right
    marginTop: "10px",
  });

  return (
    <div><AdminNavBar />
    <div className="product-page" style={{marginTop: "100px"}}>
      <div>
        {/* <Button onClick={handleAddPhotoClick} variant="outlined" color="secondary">
             <AddPhotoAlternateIcon sx={{ fontSize: 100 }}
             variant="outlined"
             color="secondary"/>
         </Button> */}
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
      <form className="product-form" onSubmit={(e) => e.preventDefault()}>
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
        <div className="form-group">
        <label htmlFor="price">Price</label>
          <input
             type="number"
             id="price"
             value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleAddToPage}
        >
          Add to Page
        </Button>
        <PreviousPageButton
          variant="contained"
          color="secondary"
          onClick={handlePreviousPage}
        >
          Previous Page
        </PreviousPageButton>
      </form>
    </div>
    </div>
  );
};

export default AddPackage;
