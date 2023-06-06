import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import GlassesImage from "./GlassesImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const GlassesMain = () => {
  const [glasses, setGlasses] = useState([]);

  const fetchGlasses = async () => {
    const glassesCollection = await getDocs(collection(firestore, "glasses"));
    const promises = glassesCollection.docs.map(async (doc) => {
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
      const storageRef = ref(storage, `images/glasses/${id}`);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };
  return (
    <div>
      <NavBar />
      <GlassesImage products={glasses} />
    </div>
  );
};
export default GlassesMain;
