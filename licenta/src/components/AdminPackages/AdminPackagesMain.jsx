import React, { useEffect, useState } from "react";
import AdminNavBar from '../AdminNavBar';
import AdminPackagesImage from './AdminPackagesImage';
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const AdminPackagesMain = () => {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    const packagesCollection = await getDocs(collection(firestore, "items"));
    const promises = packagesCollection.docs
    .filter((doc) => doc.data().category === "packages")
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const packagesData = await Promise.all(promises);
    setPackages(packagesData);
  };

  useEffect(() => {
    fetchPackages();
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
    <AdminPackagesImage products={packages} setProducts={setPackages} />
    </div>
  );
}
export default AdminPackagesMain;