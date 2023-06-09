import React, { useEffect, useState } from "react";
import AdminNavBar from '../AdminNavBar';
import AdminTshirtsImage from './AdminTshirtsImage';
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const AdminTshirtsMain = () => {
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
    <div>
    <AdminNavBar/>
    <AdminTshirtsImage products={tshirts} setProducts={setTshirts}/>
    </div>
  );
}
export default AdminTshirtsMain;