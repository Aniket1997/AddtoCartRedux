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
import "../CSS/Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-5">My Cart</h1>
      <div className="cart_items">
        {cartItems.map((food) => (
          <ItemCard
            key={food.id}
            id={food.id}
            title={food.title}
            price={food.price}
            description={food.description}
            img={food.img}
            qty={food.qty}
            increment={() => dispatch(incrementQty({ id: food.id }))}
            decrement={() => dispatch(decrementQty({ id: food.id }))}
            remove={() => {
              dispatch(removeFromCart({ id: food.id }));
              toast(`${food.title} Removed!`, { icon: "👋" });
            }}
          />
        ))}
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Items: {totalQty}</h3>
          <h3 className="text-xl font-semibold">Total Amount: ₹{totalPrice}</h3>
          <button
            onClick={() => navigate("/success")}
            className="bg-blue-500 font-bold px-3 text-white py-2 rounded-lg mt-3"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
