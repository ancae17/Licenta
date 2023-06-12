import React, { useState } from 'react';
import './TshirtsPage.css';
import { Button, Typography } from "@mui/material";
import { useLocation } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase"; 
import ReactImageMagnify from "react-image-magnify";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const TshirtsPage = (props) => {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [favoriteElements, setFavoriteElements] = useState("");
  const { user } = UserAuth();

  const handleAddToCart = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "cartItems"), {

        userId: user.uid,
        itemId: item.id,
        cartDescription: description,
        favoriteElements,
      });
      
      console.log("Item added with ID: ", docRef.id);

    } catch (error) {
      console.error("Error adding product: ", error);
    }
    navigate("/CartPage")
  };

  const handleGoToLoginClick = () => {
    navigate("/login");
  };
  
  return (
    <div><NavBar />
    <div className="product-page" style={{marginTop: "100px"}}>
      <div className="product-info">
        <div className="product-image">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: item.image,
              },
              largeImage: {
                src: item.image,
                width: 700,
                height: 700,
              },
            }}
          />
        </div>
        <h1>{item.data.productName}</h1>
      </div>
      <div>
        <Typography marginBottom={10} maxWidth={500}>
          {item.data.description}
        </Typography>
      </div>
      {user && (
        <form
          className="product-form"
          onSubmit={(e) => e.preventDefault()}
          style={{ width: "500px" }}
        >
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrieti cum ati dori sa arate sticla dumneavoastra"
              style={{ width: "500px" }}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="favoriteElements">Favorite Elements</label>
            <input
              type="text"
              id="favoriteElements"
              value={favoriteElements}
              onChange={(e) => setFavoriteElements(e.target.value)}
              placeholder="In ce limba ati dori scrisul"
              style={{ width: "500px" }}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </form>
      )}
      {!user && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoToLoginClick}
        >
          Please log in to add this to your cart
        </Button>
      )}
    </div>
    </div>
  );
};

export default TshirtsPage;
