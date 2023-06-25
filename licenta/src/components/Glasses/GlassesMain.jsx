import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import GlassesImage from "./GlassesImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import backgroundImage from '../../Images/background4.jpg'

const GlassesMain = () => {
  const [glasses, setGlasses] = useState([]);

  const fetchGlasses = async () => {
    const glassesCollection = await getDocs(collection(firestore, "items"));
    const promises = glassesCollection.docs
    .filter((doc) => doc.data().category === "glasses")
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const glassesData = await Promise.all(promises);
    setGlasses(glassesData);
  };

  useEffect(() => {
    fetchGlasses();
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
      <GlassesImage products={glasses} />
    </div>
  );
};
export default GlassesMain;
