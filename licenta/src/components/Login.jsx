import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { TextField, Button, Typography } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Login.css";
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const [passwordError, setPasswordError] = useState("");

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = async (e) => {
    if (email === "admin@admin.com") {
      e.preventDefault();
      setError("");
      try {
        await signIn(email, password);
        navigate("/AdminBottlesMain");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
        setPasswordError("Credentiale gresite");
      }
    } else {
      e.preventDefault();
      setError("");
      try {
        await signIn(email, password);
        navigate("/");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
        setPasswordError("Credentiale gresite");
      }
    }
  };

  return (
    <div className="login-page">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        <p className="py-2">
          Don't have an account yet?{" "}
          <Link to="/register" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            className="input-email"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            className="input-password"
            type="password"
          />
        </div>
        {passwordError && (
            <Typography variant="body2" color="error">
              {passwordError}
            </Typography>)}
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Sign In
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: "10px"}}>
         <hr style={{ flex: '1', borderTop: '1px solid black', width: '200px' }} />
         <span style={{ margin: '0 10px' }}>or</span>
         <hr style={{ flex: '1', borderTop: '1px solid black', height: '1px' }} />
        </div>

        <Button variant="contained" color="secondary" style={{marginTop: "10px"}} onClick={handleGoogleLogin}>
         <GoogleIcon style={{marginLeft: "5px"}}></GoogleIcon> Sign In With Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
