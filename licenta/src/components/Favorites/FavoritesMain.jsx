import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import FavoritesImage from "./FavoritesImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../../context/AuthContext";
import backgroundImage from '../../Images/background4.jpg'

const FavoritesMain = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { user } = UserAuth();

  const fetchFavorites = async () => {
    const favoritesCollection = await getDocs(collection(firestore, "favorites"));
    const favPromises = favoritesCollection.docs
    .filter((doc) => doc.data().userId === user.uid)
    .map(async (doc) => {
      return { id: doc.id, data: doc.data() };
    });

    const favoritesData = await Promise.all(favPromises);
    const favoriteIds = favoritesData.map(f => f.data.itemId)

    const itemsCollection = await getDocs(collection(firestore, "items"));
    const itemPromises = itemsCollection.docs
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const itemsData = await Promise.all(itemPromises);
    var favoriteItems = itemsData.filter(x => favoriteIds.includes(x.id))
    setFavoriteItems(favoriteItems);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRetrieveFile = async (id) => {
    try {
      const storageRef = ref(storage, `images/${id}`);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };
  return (
    <div style={{ position: 'relative' }}>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.8,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
      <NavBar />
      <FavoritesImage products={favoriteItems} />
    </div>
  );
};
export default FavoritesMain;

