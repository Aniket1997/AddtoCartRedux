import React from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import "../CSS/WishList.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.wishlist.wishList);
  console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-5">My Wish Lists</h1>
      <div className="wishlist_items">
        {cartItems &&
          cartItems.map((food) => (
            <div key={food.id} className="wishlist_item">
              <ItemCard
                id={food.id}
                title={food.title}
                price={food.price}
                description={food.description}
                img={food.img}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
