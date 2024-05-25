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
import { removeFromWishList } from "../redux/slices/WishListSlice";
import { addToWishList } from "../redux/slices/WishListSlice"; // Import addToWishList action
import { toast } from "react-hot-toast";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../CSS/ItemCart.css";

const ItemCard = ({ id, title, description, location, qty, price, img }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col lg:flex-row items-center gap-4 shadow-md rounded-lg p-4 mb-4"
      style={{ minHeight: "160px" }}
    >
      <img
        src={img}
        alt={title}
        className="w-30 h-30 lg:w-20 lg:h-20 rounded"
      />
      <div className="flex flex-col flex-1">
        <h2 className="font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 hidden lg:block">
          {description.slice(0, 200)}...
        </p>
        {location === "cart" ? (
          <>
            <div className="flex mt-2 quantity_item_action">
              <span className="text-blue-500 font-bold mr-3 cart_item_price">
                ₹{price}
              </span>
              <div className="flex gap-2">
                <AiOutlineMinus
                  onClick={() => dispatch(decrementQty({ id }))}
                  size={30}
                  color="#333"
                  className="cursor-pointer increment_item"
                />
                <span>{qty}</span>
                <AiOutlinePlus
                  onClick={() => dispatch(incrementQty({ id }))}
                  size={30}
                  color="#333"
                  className="cursor-pointer decrement_item"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      {location === "cart" ? (
        <>
          <div className="cart_delete_add_wishlist">
            <MdDelete
              onClick={() => {
                dispatch(
                  removeFromCart({ id, img, description, title, price, qty })
                );
                toast(`${title} Removed!`, {
                  icon: "👋",
                });
              }}
              size={30}
              color="#C70039"
              className="text-gray-600 cursor-pointer lg:self-auto"
            />
            <VolunteerActivismIcon
              onClick={() => {
                dispatch(addToWishList({ id, title, description, price, img }));
                toast(`${title} Added to Wishlist!`, {
                  icon: "🌟",
                });
                dispatch(
                  removeFromCart({ id, img, description, title, price, qty })
                );
                toast(`${title} Removed!`, {
                  icon: "👋",
                });
              }}
              size={30}
              style={{ fontSize: 30, color: "#3B82F6" }}
              className="cursor-pointer lg:self-auto"
            />
          </div>
        </>
      ) : (
        <>
          <div className="wishList_actions">
            <MdDelete
              onClick={() => {
                dispatch(
                  removeFromWishList({ id, img, description, title, price })
                );
                toast(`${title} Removed!`, {
                  icon: "👋",
                });
              }}
              size={30}
              color="#C70039"
              className="text-gray-600 cursor-pointer lg:self-auto"
            />
            <AddShoppingCartIcon
              onClick={() => {
                dispatch(
                  addToCart({
                    id,
                    title,
                    description,
                    price,
                    location: "cart",
                    img,
                    qty: 1,
                  })
                );
                dispatch(
                  removeFromWishList({ id, img, description, title, price })
                );
                toast(`${title} Added`, {
                  icon: "👋",
                });
              }}
              size={30}
              color="#C70039"
              className="text-gray-600 cursor-pointer lg:self-auto"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
