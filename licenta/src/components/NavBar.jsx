import React, { useState, useEffect } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { BrushTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase authentication module
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Tooltip } from '@mui/material';


function NavBar() {
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
    navigate("/BottlesMain");
  };

  const handleTshirtsClick = () => {
    navigate("/TshirtsMain");
  };

  const handleGlassesClick = () => {
    navigate("/GlassesMain");
  };

  const handlePackagesClick = () => {
    navigate("/PackagesMain");
  };

  const handleCartClick = () => {
    navigate("/CartPage");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  const handleMyOrdersClick = () => {
    navigate("/myorders");
  };

  const handleBrushClick = () => {
    navigate("/");
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
      <AppBar sx={{ background: "#83219B" }}>
        <Toolbar>
          <BrushTwoTone sx={{ fontSize: 40 }} onClick={handleBrushClick} />
          <Typography onClick={handleBrushClick}>GiftLand</Typography>
          <Tabs
            sx={{ marginLeft: "auto" }}
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="secondary"
          >
            <Tab label="Bottles" onClick={handleBottlesClick} />
            <Tab label="T-shirts" onClick={handleTshirtsClick} />
            <Tab label="Glasses" onClick={handleGlassesClick} />
            <Tab label="Packages" onClick={handlePackagesClick} />
          </Tabs>

          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center" }}>
                            <Tab
                label="My orders"
                onClick={handleMyOrdersClick}
                style={{marginRight: "5px"}}
              />

            <Tooltip title="Go to favorites" placement="bottom">
              <Tab
                onClick={handleFavoritesClick}
                icon={<FavoriteIcon color="inherit" sx={{ fontSize: 28 }} />}
                style={{ margin: "-20px" }}
                />
            </Tooltip>

            <Tooltip title="Go to cart" placement="bottom">
              <Tab
                onClick={handleCartClick}
                icon={<ShoppingCartIcon color="inherit" sx={{ fontSize: 28 }} />}
                style={{ margin: "-15px" }}
              />
            </Tooltip>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogoutClick}
                style={{ margin: "5px" }}
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

export default NavBar;
