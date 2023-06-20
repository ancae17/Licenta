import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import MyOrdersCard from "./MyOrdersCard";
import NavBar from "../NavBar";
import { UserAuth } from '../../context/AuthContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = UserAuth();

  const fetchOrders = async () => {
    const ordersCollection = await getDocs(collection(firestore, "orders"));
    const promises = ordersCollection.docs
    .filter((doc) => doc.data().clientId === user.uid)
    .map(async (doc) => {
      return { id: doc.id, data: doc.data()};
    });

    const ordersData = await Promise.all(promises);
    setOrders(ordersData);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
    <NavBar/>
    <MyOrdersCard products={orders} setProducts={setOrders}/>
    </div>
  );
}
export default MyOrders;