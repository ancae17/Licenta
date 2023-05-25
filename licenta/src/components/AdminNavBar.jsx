import React, { useState, useEffect } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { BrushTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase authentication module
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function AdminNavBar() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleBottlesClick = () => {
    navigate("/AdminBottlesMain");
  };

  const handleTshirtsClick = () => {
    navigate("/AdminTshirtsMain");
  };

  const handleGlassesClick = () => {
    navigate("/AdminGlassesMain");
  };

  const handlePackagesClick = () => {
    navigate("/AdminPackagesMain");
  };
  

  const handleLogoutClick = () => {
    auth
      .signOut() // Firebase sign-out method
      .then(() => {
        setIsLoggedIn(false); // Update login status
        navigate("/"); // Redirect to homepage or desired page after logout
      })
      .catch((error) => {
        console.log(error);
        // Handle any error that occurs during sign-out process
      });
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#290728" }}>
        <Toolbar>
          <BrushTwoTone sx={{ fontSize: 40 }} />
          <Typography>
            GiftLand
          </Typography>
          <Tabs
            sx={{ marginLeft: "auto" }}
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="secondary"
          >
            <Tab label="Bottles" onClick={handleBottlesClick} />
            <Tab label="T-shirts" onClick={handleTshirtsClick}/>
            <Tab label="Glasses" onClick={handleGlassesClick}/>
            <Tab label="Packages" onClick={handlePackagesClick}/>
          </Tabs>

       
          {isLoggedIn ? (
            <div>
              <Button
              sx={{ marginLeft: "auto" }}
              variant="outlined"
              color="inherit"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
         </div>
          ) : (
            <Button
              sx={{ marginLeft: "10px" }}
              variant="outlined"
              color="inherit"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default AdminNavBar;
