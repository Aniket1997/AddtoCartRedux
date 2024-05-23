import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import "../CSS/WishList.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishList);
  console.log({ wishlistItems });
  const locations = wishlistItems.map((item) => item.location);
  console.log(locations);
  const uniqueLocations = [...new Set(locations)];
  console.log(uniqueLocations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
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
        {wishlistItems &&
          wishlistItems.map((food) => {
            if (food.location === uniqueLocations[0]) {
              return (
                <div key={food.id} className="wishlist_item">
                  <ItemCard
                    id={food.id}
                    title={food.title}
                    price={food.price}
                    description={food.description}
                    img={food.img}
                  />
                </div>
              );
            }
            return null; 
          })}
      </div>
    </div>
  );
};

export default WishList;
