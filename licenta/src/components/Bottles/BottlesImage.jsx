import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./BottlesImage.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserAuth } from "../../context/AuthContext";

const BottlesImage = ({ products }) => {
  const [bottles, setBottles] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = UserAuth();

  const fetchUserFavorites = async () => {
    const favoritesCollection = await getDocs(collection(firestore, "favorites"));
    const promises = favoritesCollection.docs
      .filter((doc) => doc.data().category === "bottles" && doc.data().userId === user.uid)
      .map(async (doc) => {
        return { id: doc.id, data: doc.data()};
      });

    const favoritesItems = await Promise.all(promises);

    const updatedProducts = products.map((product) => {
      const foundFavoriteItem = favoritesItems.find(
        (favoriteItem) => favoriteItem.data.itemId === product.id
      );
    
      if (foundFavoriteItem) {
        return { ...product, favoriteId: foundFavoriteItem.id };
      }
    
      return product;
    });
    
    setBottles(updatedProducts)

    const favoriteItemIds = favoritesItems.map(f => f.data.itemId)
    setFavorites(favoriteItemIds);
    
  };

  useEffect(() => {
    setBottles(products);
    fetchUserFavorites();
  }, [products]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  

  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleNavigateToProductOnClick = (product) => {
    navigate("/bottlespage", { state: product });
  };

  const handleHeartButtonClick = async (product) => {
    if (favorites.includes(product.id)) {
      await deleteDoc(doc(firestore, "favorites", product.favoriteId));
      setFavorites(favorites.filter((fav) => fav !== product.id));
    } else {
      try {
        const docRef = await addDoc(collection(firestore, "favorites"), {
          userId: user.uid,
          itemId: product.id,
          category: "bottles",
        });

        const updatedBottles = bottles.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              favoriteId: docRef.id,
            };
          }
          return item;
        });
        setBottles(updatedBottles);
      } catch (error) {
        console.error("Error adding product: ", error);
      }
      setFavorites([...favorites, product.id]);
    }
  };

  return (
    <div className="image-list-container" style={{ padding: "200px 250px" }}>
      {bottles.map((product) => (
        <Card
          className={"image-card"}
          key={product.id}
          onMouseEnter={() => handleMouseEnter(product)}
          onMouseLeave={handleMouseLeave}
        >
          <div style={{ position: "relative" }}>
            <img src={product.image} alt={""} className="image" />
            <Button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "1",
              }}
              onClick={() => handleHeartButtonClick(product)}
            >
              {favorites.includes(product.id) ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Button>
          </div>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {product.data.productName}
            </Typography>
          </CardContent>
          <Button
            onClick={() => handleNavigateToProductOnClick(product)}
            color="secondary"
          >
            View product
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default BottlesImage;
