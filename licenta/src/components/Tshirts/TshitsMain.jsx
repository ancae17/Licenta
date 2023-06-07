import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import TshirtsImage from "./TshirtsImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const TshirtsMain = () => {
  const [tshirts, setTshirts] = useState([]);

  const fetchTshirts = async () => {
    const tshirtsCollection = await getDocs(collection(firestore, "tshirt"));
    const promises = tshirtsCollection.docs.map(async (doc) => {
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
      const storageRef = ref(storage, `images/tshirt/${id}`);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };
  return (
    <div>
      <NavBar />
      <TshirtsImage products={tshirts} />
    </div>
  );
};
export default TshirtsMain;
