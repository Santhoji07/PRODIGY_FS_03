import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
export default App;