import React, { useState, useEffect } from "react";
import "./GlassesPage.css";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactImageMagnify from "react-image-magnify";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const GlassesPage = (props) => {
  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [favoriteElements, setFavoriteElements] = useState("");
  const [ratingDescription, setRatingDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const { user } = UserAuth();

  const fetchReviews = async () => {
    const reviewsCollection = await getDocs(collection(firestore, "reviews"));
    const reviewsPromises = reviewsCollection.docs
    .filter((doc) => doc.data().itemId === item.id)
    .map(async (doc) => {
      return { id: doc.id, data: doc.data() };
    });
    const reviewsData = await Promise.all(reviewsPromises);
    setReviews(reviewsData);
  };
  useEffect(() => {
    fetchReviews();
  },);

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
    navigate("/CartPage");
  };

  const handleSubmitReview = async () => {
    try {
      const reviewToBeAdded = {
        itemId: item.id,
        username: user.email,
        starRating: rating,
        description: ratingDescription,
      }
      const docRef = await addDoc(collection(firestore, "reviews"), reviewToBeAdded );

      setRating(0)
      setRatingDescription("")

      setReviews([...reviews, {id: docRef.id, data: reviewToBeAdded}])
      console.log("Item added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleGoToLoginClick = () => {
    navigate("/login");
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div>
      <NavBar />
      <div className="product-page">
        <div className="product-info">
          <div className="product-image">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
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
          <div>
            <h1>{item.data.productName}</h1>
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
            <Typography variant="h6" component="div">
              {item.data.price} RON
            </Typography>
          </div>
        </div>
        <div>
          <Typography marginBottom={3} maxWidth={500}>
            {item.data.description}
          </Typography>
          <Typography marginBottom={3} maxWidth={500}>
         Elemente: {item.data.possibleElements}
        </Typography>
        </div>
        {user && (
          <div>
            <div>
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
                    placeholder="Descrieti cum ati dori sa arate produsul dvs."
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
                    placeholder="Puteti alege din lista de mai sus sau puteti scrie altele similare"
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
            </div>
            <div>
              <form
                className="product-form"
                onSubmit={(e) => e.preventDefault()}
                style={{ width: "500px" }}
              >
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRatingChange(value)}
                        style={{
                          color: value <= rating ? "yellow" : "gray",
                          cursor: "pointer",
                          border: "none",
                          background: "none",
                          fontSize: "24px",
                          marginRight: "5px",
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="rating"
                      value={ratingDescription}
                      onChange={(e) => setRatingDescription(e.target.value)}
                      placeholder="Spuneti-va parerea"
                      style={{ width: "500px" }}
                    />
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleSubmitReview}
                >
                  Submit review
                </Button>
              </form>
              {reviews.map((review) => {
                return (
                  <div key={review.id}>
                    <div>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{
                            color: value <= review.data.starRating ? "yellow" : "gray",
                            fontSize: "24px",
                            marginRight: "5px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div>User: {review.data.username}</div>
                    <div>{review.data.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
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

export default GlassesPage;
