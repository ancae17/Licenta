import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { TextField, Button } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

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
          {/* <label className='py-2 font-medium'>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' /> */}
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
          {/* <label className='py-2 font-medium'>Password</label> */}
          {/* <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' /> */}
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
        {/* <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign In
        </button> */}
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Sign In
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGoogleLogin}>
          Sign In With Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
