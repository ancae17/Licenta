import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import BottlesImage from "./BottlesImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import backgroundImage from '../../Images/background4.jpg'

const BottlesMain = () => {
  const [bottles, setBottles] = useState([]);

  const fetchBottles = async () => {
    const bottlesCollection = await getDocs(collection(firestore, "items"));
    const promises = bottlesCollection.docs
    .filter((doc) => doc.data().category === "bottles")
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const bottlesData = await Promise.all(promises);
    setBottles(bottlesData);
  };

  useEffect(() => {
    fetchBottles();
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
    // <div style={{ background: 'linear-gradient(#FFFFFF, #F8DFFF, #D6B3DF, #E27CFC )' }}>
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
    <BottlesImage products={bottles} />
  </div>
  );
};
export default BottlesMain;

