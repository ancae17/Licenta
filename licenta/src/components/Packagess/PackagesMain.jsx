import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import PackagesImage from "./PackagesImage";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import backgroundImage from '../../Images/background4.jpg'

const PackagesMain = () => {
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
      <PackagesImage products={packages} />
    </div>
  );
};
export default PackagesMain;
