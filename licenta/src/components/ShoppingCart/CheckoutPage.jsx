import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [plataRamburs, setPlataRamburs] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Do something with the form data
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Address:', address);
    console.log('Phone Number:', phoneNumber);
    console.log('Plata Ramburs:', plataRamburs);

    // Clear form fields after submission
    setName('');
    setSurname('');
    setAddress('');
    setPhoneNumber('');
    setPlataRamburs(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "500px", marginLeft: "550px", marginTop: "100px"}}>
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
          />
        }
        label="Plata Ramburs"
      />

      <Button  
        variant="contained"
        color="secondary" 
        type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CheckoutPage;
