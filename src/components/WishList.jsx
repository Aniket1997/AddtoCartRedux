import React from "react";
import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import "../CSS/WishList.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishList);
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-10 p-5">
        <div className="flex items-center mb-5" style={{ gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 font-bold px-3 text-white py-3 rounded-lg"
          >
            <KeyboardBackspaceIcon />
          </button>
          <h1 className="text-3xl font-bold">My WishList</h1>
        </div>
        <div className="wishlist_items">
          {wishlistItems.length === 0 ? (
            <>
            <h1 style={{
              fontSize:"100px"
            }}>Wish List Is Empty</h1>
            <button
                    onClick={() => navigate("/home")}
                    style={{backgroundColor:'rgb(210 210 210)'}}
                    className="bg-grey-500 font-bold px-3 text-black py-2 rounded-lg mt-3"
                  >
                    Continue Shopping
                  </button>
                  </>
          ) : (
            wishlistItems.map((food) => (
              <div key={food.id} className="wishlist_item">
                <ItemCard
                  id={food.id}
                  title={food.title}
                  price={food.price}
                  description={food.description}
                  img={food.img}
                  location={food.location} // Ensure to pass the location if needed in ItemCard
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
