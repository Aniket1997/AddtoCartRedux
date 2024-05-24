import React from "react";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import FoodItems from "../components/FoodItems";
import Cart from "../components/Cart";
import LandingPage from "../components/LandingPage";
const Home = () => {
  return (
    <>
      <Navbar />
      <LandingPage/>
      <CategoryMenu />
      <FoodItems /> 
    </>
  );
};

export default Home;
