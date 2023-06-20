import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserAuth } from "../../context/AuthContext";

const GlassesImage = ({ products }) => {
  const [glasses, setGlasses] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = UserAuth();

  const fetchUserFavorites = async () => {
    const favoritesCollection = await getDocs(collection(firestore, "favorites"));
    const promises = favoritesCollection.docs
      .filter((doc) => doc.data().category === "glasses" && doc.data().userId === user.uid)
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

    setGlasses(updatedProducts)

    const favoriteItemIds = favoritesItems.map(f => f.data.itemId)
    setFavorites(favoriteItemIds);
  };

  useEffect(() => {
    setGlasses(products);
    fetchUserFavorites();
  }, [products]);


  const handleMouseEnter = (product) => {
    setHoveredProduct(product);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleNavigateToProductOnClick = (product) => {
    navigate("/glassespage", { state: product });
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
          category: "glasses",
        });

        const updatedGlasses = glasses.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              favoriteId: docRef.id,
            };
          }
          return item;
        });
        setGlasses(updatedGlasses);
      } catch (error) {
        console.error("Error adding product: ", error);
      }
      setFavorites([...favorites, product.id]);
    }
  };


  return (
    <div className="image-list-container" style={{ padding: "150px 250px" }}>
      {glasses.map((product) => (
       <Card
        className={'image-card'}
        key={product.id}
        onMouseEnter={() => handleMouseEnter(product)}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ position: "relative" }}>
            <img style={{maxHeight:"300px"}} src={product.image} alt={""} className="image" />
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
            <div style={{ display: 'flex', alignItems: 'center', marginTop: "3px"}}>
                <hr style={{ flex: '1', borderTop: '1px solid black', width: '200px' }} />
            </div>
            <Typography variant="h6" component="div" align="center">
              {product.data.price} RON
            </Typography>
       </CardContent>
       <Button onClick={() => handleNavigateToProductOnClick(product)} color="secondary">
            View product
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default GlassesImage;
