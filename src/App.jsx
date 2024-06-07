import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import Login from "./components/Login";
import Profile from "./components/Profile";
import OrderDetails from "./components/OrderDetails";
import ViewProductDetail from "./components/ViewProductDetail"; // Import ViewProductDetail component
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Dashboard/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/orderDetails" element={<OrderDetails/>} />
        <Route path="/product/:id" element={<ViewProductDetail />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<ProtectedRoute element={<Success />} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
