import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const RootContainer = styled('div')({
  margin: '20px auto',
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
  display: 'flex',
  justifyContent: 'space-between',
});

const TotalContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
});

const CheckoutButton = styled(Button)({
  marginLeft: 10,
});

const PreviousPageButton = styled(Button)({
  marginRight: '250px', // Align the button to the right
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 15 },
  ]);

  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  };

  useState(() => {
    calculateTotal();
  }, []);

  const handleCheckout = () => {
    // Perform the checkout logic here
    // You can remove the items from the cart, process the payment, etc.
  };

  const handlePreviousPage = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <RootContainer>
      <Title variant="h4" color="secondary">Shopping Cart</Title>

      {cartItems.map((item) => (
        <CartCard key={item.id}>
          <CardContentContainer>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="h6">${item.price}</Typography>
          </CardContentContainer>
        </CartCard>
      ))}

      <TotalContainer>
        <PreviousPageButton variant="contained" color="secondary" onClick={handlePreviousPage}>
          Previous Page
        </PreviousPageButton>
        <Typography variant="h6">Total: ${cartTotal}</Typography>
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
