import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { UserAuth } from "../../context/AuthContext";

const CheckoutPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plataRamburs, setPlataRamburs] = useState(false);
  const [plataCard, setPlataCard] = useState(false);
  const [openCardPayment, setOpenCardPayment] = useState(false);

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const { user } = UserAuth();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    // Remove any non-digit characters from the input
    const formattedValue = value.replace(/\D/g, "");
    // Restrict the length to 10 digits
    const truncatedValue = formattedValue.slice(0, 10);
    setPhoneNumber(truncatedValue);
  };

  const navigate = useNavigate();

  const location = useLocation();
  const { cartItems, totalCost } = location.state;

  const handleSubmit = async (e) => {
    try {
      const docRef = await addDoc(collection(firestore, "orders"), {
        cartItems,
        clientName: `${name} ${surname}`,
        address: address,
        phoneNumber: phoneNumber,
        ramburs: plataRamburs,
        status: "In process",
        totalCost,
        clientId: user.uid,
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

  const openCardPaymentModal = () => {
    setOpenCardPayment(true);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          plataCard ? openCardPaymentModal() : handleSubmit();
        }}
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
          onChange={handlePhoneNumberChange}
          fullWidth
          required
          margin="normal"
          InputProps={{
            inputProps: {
              pattern: "[0-9]*",
            },
          }}
        />

        <div>
          <label style={{ display: "flex", justifyContent: "center" }}>
            Modalitate de plata*
          </label>
          <br></br>
          <FormControlLabel
            control={
              <Checkbox
                required={!plataRamburs}
                checked={plataCard}
                onChange={(e) => {
                  setPlataCard(e.target.checked);
                  setPlataRamburs(false);
                }}
              />
            }
            label="Plata Card"
          />
          <FormControlLabel
            control={
              <Checkbox
                required={!plataCard}
                checked={plataRamburs}
                onChange={(e) => {
                  setPlataRamburs(e.target.checked);
                  setPlataCard(false);
                }}
              />
            }
            label="Plata Ramburs"
          />
        </div>
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
      </form>
      <Modal
        open={openCardPayment}
        onClose={() => setOpenCardPayment(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 500,
            border: "2px solid #000",
            p: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Plateste cu cardul
          </Typography>
          <div
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Cards
              number={cardData.number}
              expiry={cardData.expiry}
              cvc={cardData.cvc}
              name={cardData.name}
              focused={cardData.focus}
            />
            <form
              style={{ marginTop: "20px" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="form-control rounded-lg"
                  style={{ marginBottom: "10px", padding: "10px" }}
                  placeholder="Card Number"
                  pattern="[0-9]{16}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={16}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control rounded-lg"
                  style={{ marginBottom: "10px", padding: "10px" }}
                  placeholder="Name"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control rounded-lg"
                    style={{ marginBottom: "10px", padding: "10px" }}
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={5}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control rounded-lg"
                    style={{ marginBottom: "10px", padding: "10px" }}
                    placeholder="CVC"
                    pattern="[0-9]{3}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={3}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary btn-block">PAY</button>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
