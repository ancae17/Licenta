import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../../context/AuthContext";

const RootContainer = styled("div")({
  margin: "20px auto",
  maxWidth: 600,
  padding: 20,
});

const Title = styled(Typography)({
  marginBottom: 20,
});

const CartCard = styled(Card)({
  marginBottom: 10,
});

const CardContentContainer = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
});

const TotalContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20,
});

const CheckoutButton = styled(Button)({
  marginLeft: 10,
});

const PreviousPageButton = styled(Button)({
  marginRight: "250px",
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  const { user } = UserAuth();

  const fetchCartItems = async () => {
    const cartItemsCollection = await getDocs(
      collection(firestore, "cartItems")
    );
    const carItemsPromises = cartItemsCollection.docs
      .filter((doc) => doc.data().userId === user.uid)
      .map(async (doc) => {
        return { id: doc.id, data: doc.data() };
      });

    const carItemsData = await Promise.all(carItemsPromises);
    const itemsCollection = await getDocs(collection(firestore, "items"));
    const itemsPromises = itemsCollection.docs.map(async (doc) => {
      const image = await handleRetrieveFile(doc.id);
      return { id: doc.id, data: doc.data(), image };
    });

    const itemsData = await Promise.all(itemsPromises);

    const updatedCartItemsData = carItemsData.map((cartItem) => {
      const item = itemsData.find((item) => item.id === cartItem.data.itemId);
      if (item) {
        return {
          ...cartItem,
          data: {
            ...cartItem.data,
            ...item.data,
          },
          image: item.image,
        };
      }
      return cartItem;
    });
    setCartItems(updatedCartItemsData);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.data.price;
    });
    setCartTotal(total);
  };

  const handleRemove = async (documentId) => {
    await deleteDoc(doc(firestore, "cartItems", documentId));
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== documentId)
    );
    calculateTotal();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartItems();
      calculateTotal();
    };

    fetchData();
  });

  const handleRetrieveFile = async (id) => {
    try {
      const storageRef = ref(storage, `images/${id}`);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error retrieving file: ", error);
    }
  };

  const handleCheckout = () => {
    navigate("/CheckoutPage", { state: {cartItems, totalCost: cartTotal}});
  };

  const handlePreviousPage = () => {
    navigate(-1); // Go back to the previous page
  };


  return (
    <RootContainer>
      <Title variant="h4" color="secondary">
        Shopping Cart
      </Title>

      {cartItems.map((item) => (
        <CartCard key={item.id}>
          <CardContentContainer>
            <img
              src={item.image}
              alt={""}
              className="image"
              style={{ width: "100px", height: "130px" }}
            />
            <Typography variant="h6" style={{ marginTop: "40px" }}>
              {item.data.productName}
            </Typography>
            <Typography variant="h6" style={{ marginTop: "40px" }}>
              {item.data.price} Lei
            </Typography>
          </CardContentContainer>
          <div
            style={{
              marginTop: "3px",
              marginLeft: "15px",
              marginBottom: "10px",
            }}
          >
            <Typography>{item.data.cartDescription}</Typography>
          </div>
          <div>
            <Button
              onClick={() => handleRemove(item.id)}
              style={{ marginLeft: "510px" }}
            >
              Delete
            </Button>
          </div>
        </CartCard>
      ))}

      <TotalContainer>
        <PreviousPageButton
          variant="contained"
          color="secondary"
          onClick={handlePreviousPage}
        >
          Previous Page
        </PreviousPageButton>
        <Typography variant="h6">Total: {cartTotal} Lei</Typography>
        <CheckoutButton
          variant="contained"
          color="secondary"
          onClick={handleCheckout}
        >
          Checkout
        </CheckoutButton>
      </TotalContainer>
    </RootContainer>
  );
};

export default CartPage;
