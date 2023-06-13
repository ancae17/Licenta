import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";



const CheckoutPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plataRamburs, setPlataRamburs] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { cartItems, totalCost } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "orders"), {
        cartItems,
        clientName: `${name} ${surname}`,
        address: address,
        phoneNumber: phoneNumber,
        ramburs: plataRamburs,
        status: "In process",
        totalCost,
      });
    } catch (error) {}

    cartItems.forEach(async (element) => {
      await deleteDoc(doc(firestore, "cartItems", element.id));
    });

    // Clear form fields after submission
    setName("");
    setSurname("");
    setAddress("");
    setPhoneNumber("");
    setPlataRamburs(false);

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "500px", marginLeft: "550px", marginTop: "100px" }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={plataRamburs}
            onChange={(e) => setPlataRamburs(e.target.checked)}
            required
          />
        }
        label="Plata Ramburs"
      />

      <Button variant="contained" color="secondary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CheckoutPage;
