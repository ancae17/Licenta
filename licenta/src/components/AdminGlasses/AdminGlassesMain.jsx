import React, { useEffect, useState } from "react";
import AdminNavBar from '../AdminNavBar';
import AdminGlassesImage from './AdminGlassesImage';
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const AdminGlassesMain = () => {
  const [glasses, setGlasses] = useState([]);

  const fetchGlasses = async () => {
    const glassesCollection = await getDocs(collection(firestore, "glasses"));
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
      const storageRef = ref(storage, `images/glasses/${id}`);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      return downloadURL;
      
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };
  return (
    <div>
    <AdminNavBar/>
    <AdminGlassesImage products={glasses} />
    </div>
  );
}
export default AdminGlassesMain;