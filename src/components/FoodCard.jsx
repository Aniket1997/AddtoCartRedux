import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { addToWishList } from "../redux/slices/WishListSlice";
import '../CSS/FoodCard.css'

const ProductCard = ({ id, title, price, description, img, rating, handleToast }) => {
  const dispatch = useDispatch();
  const addToWishlistHandler = () => {
    dispatch(addToWishList({ id, title,description, price, img }));
    // You can add additional functionality here, such as displaying a toast message
  };
  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={img}
        alt={title}
        className="w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      <div className="text-sm flex justify-between">
        <h2>{title.slice(0, 50)}...</h2>
        <span className="text-blue-500">₹{price}</span>
      </div>
      <p className="text-sm font-normal">{description.slice(0, 50)}...</p>
      <div className="flex justify-end gap-x-2.5">
        
        <button
          onClick={() => {
            dispatch(
              addToCart({ id, title,description, price, img, qty: 1 })
            );
            handleToast(title);
          }}
          className="p-1 text-white bg-blue-500 hover:bg-blue-600 text-sm add_to_cart_btn"
        >
          <CiShoppingCart size={30}/>
        </button>
        <button
          onClick={addToWishlistHandler} // Call addToWishlistHandler function when clicked
          className="p-1 text-white bg-blue-500 hover:bg-blue-600 text-sm add_to_cart_btn"
        >
          <IoIosHeartEmpty size={30}/>
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;
