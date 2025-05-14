import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Details from "./components/Details";
import Type from "./components/Type";
import Product from "./components/Product";
import Pd from "./components/Pd"; // Product detail component
import Tuto from "./components/Tuto";
import Track from "./components/Track";
import PersonalizedRecommendations from "./components/PersonalizedRecommendations";
import Cart from "./components/Cart"; // Import Cart page
import { Button } from "@mui/material";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("recommendations");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Welcome Page */}
          <Route path="/" element={<Welcome/>} />
          <Route path="/Details" element={<Details />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        
          <Route path="/hair-type" element={<Type />} />q

          {/* Home Page with Menu Buttons */}
          <Route
            path="/home"
            element={
              <div style={{ padding: "20px", marginTop: "30px" }}>
                <h1 style={{ textAlign: "center" }}>HairFlow</h1>

                {/* Navigation Buttons */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  {["recommendations", "products", "tutorials", "progress"].map((menu) => (
                    <Button
                      key={menu}
                      variant={activeMenu === menu ? "contained" : "outlined"}
                      onClick={() => setActiveMenu(menu)}
                      style={{ margin: "0 10px" }}
                    >
                      {menu.charAt(0).toUpperCase() + menu.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Dynamic Content Based on Active Menu */}
                {activeMenu === "recommendations" && <PersonalizedRecommendations/>}
                {activeMenu === "products" && <Product />}
                {activeMenu === "tutorials" && <Tuto />}
                {activeMenu === "progress" && <Track />}
              </div>
            }
          />

          {/* Product Details Page */}
          <Route path="/product/:id" element={<Pd />} />
          <Route path="/rec" element={<PersonalizedRecommendations/>} />

          {/* Shopping Cart Page */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

