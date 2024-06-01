import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/CartSlice";
import { setOrderDetailsAndMethod } from "../redux/slices/OrderDetailSlice"; // Import the action
import { toast } from "react-hot-toast";
import "../CSS/Cart.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Navbar from "./Navbar";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const locations = cartItems.map((item) => item.location);
  const uniqueLocations = [...new Set(locations)];
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <div className="flex items-center mb-5" style={{ gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 font-bold px-1 text-white py-1 rounded-lg"
          >
            <KeyboardBackspaceIcon />
          </button>
          <h1 className="text-xl font-bold">My Cart</h1>
        </div>
        <div className="cart_items">
          {cartItems &&
            cartItems.map((food) => {
              if (food.location === uniqueLocations[0]) {
                return (
                  <ItemCard
                    key={food.id}
                    id={food.id}
                    title={food.title}
                    price={food.price}
                    description={food.description}
                    location={food.location}
                    img={food.img}
                    qty={food.qty}
                    increment={() => dispatch(incrementQty({ id: food.id }))}
                    decrement={() => dispatch(decrementQty({ id: food.id }))}
                    remove={() => {
                      dispatch(removeFromCart({ id: food.id }));
                      toast(`${food.title} Removed!`, { icon: "👋" });
                    }}
                  />
                );
              }
              return null; // Return null if the condition is not met
            })}

          <div className="mt-5">
            <h3 className="text-xl font-semibold">Items: {totalQty}</h3>
            <h3 className="text-xl font-semibold">
              Total Amount: ₹{totalPrice}
            </h3>
            <div className="cart_checkout_actions">
              <button
                onClick={() => {
                  dispatch(setOrderDetailsAndMethod({
                    method: 'COD', // Default payment method, can be changed later in the order process
                    order: cartItems,
                    total: totalPrice
                  }));
                  navigate("/orderDetails");
                }}
                className="bg-blue-500 font-bold px-3 text-white py-2 rounded-lg mt-3"
              >
                Checkout
              </button>
              {totalPrice === 0 ? (
                <>
                  <button
                    onClick={() => navigate("/")}
                    style={{backgroundColor:'rgb(210 210 210)'}}
                    className="bg-grey-500 font-bold px-3 text-black py-2 rounded-lg mt-3"
                  >
                    Continue Shopping
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
