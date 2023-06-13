import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { TextField, Button, Typography } from '@mui/material';
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setRegisterError("Email invalid/ parola are mai putin de 6 caractere");
    }
  };

  return (
    <div className='register-page'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account yet?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          {/* <label className='py-2 font-medium'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border p-3'
            type='email'
          /> */}
      <TextField 
            id="email" 
            label="Email" 
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)} 
            className='input-email' 
            type='email' />
        </div>
        <div className='flex flex-col py-2'>
          {/* <label className='py-2 font-medium'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border p-3'
            type='password'
          /> */}
          <TextField 
            id="password" 
            label="Password" 
            variant="outlined"
            margin='normal' 
            onChange={(e) => setPassword(e.target.value)} 
            className='input-password' 
            type='password' />
        </div>
        {registerError && (
            <Typography variant="body2" color="error">
              {registerError}
            </Typography>)}
        <Button 
          variant="contained"
          color="secondary"
          onClick={handleSubmit}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
