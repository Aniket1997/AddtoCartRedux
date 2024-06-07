import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  addToCart,
} from "../redux/slices/CartSlice";
import {
  removeFromWishList,
  addToWishList,
} from "../redux/slices/WishListSlice";
import {
  setOrderDetailsAndMethod,
  removeFromOrder,
  clearOrders,
} from "../redux/slices/OrderDetailSlice";
import { toast } from "react-hot-toast";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../CSS/ItemCart.css";

const ItemCard = ({ id, title, description, location, qty, price, img }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row lg:flex-col sm:flex-col md:flex-col items-center md:gap-2 shadow-md rounded-lg sm:p-1 md:p-1 p-1 min-h-[90px]">
      <img
        src={img}
        alt={title}
        className="w-20 h-20 sm:w-13 sm:h-13 md:w-20 md:h-20 lg:w-25 lg:h-25 rounded"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-gray-800 text-sm sm:text-base md:text-lg">{title.slice(0,20)}.....</h2>
        {location === "cart" ? (
          <>
            <div className="flex mt-2 items-center">
              <span className="text-blue-500 font-bold mr-3">₹{price}</span>
              <div className="flex items-center gap-2">
                <AiOutlineMinus
                  onClick={() => dispatch(decrementQty({ id }))}
                  size={24}
                  color="#333"
                  className="cursor-pointer"
                />
                <span>{qty}</span>
                <AiOutlinePlus
                  onClick={() => dispatch(incrementQty({ id }))}
                  size={24}
                  color="#333"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      {location === "cart" ? (
        <div className="flex items-center gap-2">
          <MdDelete
            onClick={() => {
              dispatch(removeFromCart({ id, img, description, title, price, qty }));
              toast(`${title} Removed!`, { icon: "👋" });
            }}
            size={24}
            color="#C70039"
            className="cursor-pointer"
          />
          <VolunteerActivismIcon
            onClick={() => {
              dispatch(addToWishList({ id, title, description, price, img }));
              toast(`${title} Added to Wishlist!`, { icon: "🌟" });
              dispatch(removeFromCart({ id, img, description, title, price, qty }));
              toast(`${title} Removed!`, { icon: "👋" });
            }}
            style={{ fontSize: 24, color: "#3B82F6" }}
            className="cursor-pointer"
          />
        </div>
      ) : location === "order" ? (
        <div className="flex items-center gap-4">
          <MdDelete
            onClick={() => {
              dispatch(removeFromOrder({ id }));
              toast(`${title} Order Removed!`, { icon: "👋" });
            }}
            size={24}
            color="#C70039"
            className="cursor-pointer"
          />
          <VolunteerActivismIcon
            onClick={() => {
              dispatch(addToWishList({ id, title, description, price, img }));
              dispatch(removeFromOrder({ id }));
              toast(`${title} Added to Wishlist!`, { icon: "🌟" });
            }}
            style={{ fontSize: 24, color: "#3B82F6" }}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <MdDelete
            onClick={() => {
              dispatch(removeFromWishList({ id, img, description, title, price }));
              toast(`${title} Removed!`, { icon: "👋" });
            }}
            size={24}
            color="#C70039"
            className="cursor-pointer"
          />
          <AddShoppingCartIcon
            onClick={() => {
              dispatch(addToCart({ id, title, description, price, img, qty: 1 }));
              dispatch(removeFromWishList({ id, img, description, title, price }));
              toast(`${title} Added to Cart!`, { icon: "🛒" });
            }}
            style={{ fontSize: 24, color: "#3B82F6" }}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ItemCard;
