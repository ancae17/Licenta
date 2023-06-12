import React, { useEffect, useState } from "react";
import AdminNavBar from '../AdminNavBar';
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import OrdersCard from "./OrdersCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const ordersCollection = await getDocs(collection(firestore, "orders"));
    const promises = ordersCollection.docs
    .filter((doc) => doc.data().status === "In process")
    .map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const ordersData = await Promise.all(promises);
    setOrders(ordersData);
  };

  useEffect(() => {
    fetchOrders();
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
    <OrdersCard products={orders} setProducts={setOrders}/>
    </div>
  );
}
export default Orders;