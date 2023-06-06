import React, { useEffect, useState } from "react";
import AdminNavBar from '../AdminNavBar';
import AdminBottlesImage from './AdminBottlesImage';
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const AdminBottlesMain = () => {
  const [bottles, setBottles] = useState([]);

  const fetchBottles = async () => {
    const bottlesCollection = await getDocs(collection(firestore, "bottles"));
    const promises = bottlesCollection.docs.map(async (doc) => {
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
      const storageRef = ref(storage, `images/bottles/${id}`);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      return downloadURL;
      
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };
  return (
    <div>
    <AdminNavBar/>
    <AdminBottlesImage products={bottles} />
    </div>
  );
}
export default AdminBottlesMain;