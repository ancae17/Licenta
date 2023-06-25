import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import TshirtsImage from "./TshirtsImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import backgroundImage from '../../Images/background4.jpg'

const TshirtsMain = () => {
  const [tshirts, setTshirts] = useState([]);

  const fetchTshirts = async () => {
    const tshirtsCollection = await getDocs(collection(firestore, "items"));
    const promises = tshirtsCollection.docs
    .filter((doc) => doc.data().category === "tshirts")
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const tshirtsData = await Promise.all(promises);
    setTshirts(tshirtsData);
  };

  useEffect(() => {
    fetchTshirts();
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
      <TshirtsImage products={tshirts} />
    </div>
  );
};
export default TshirtsMain;
