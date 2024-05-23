import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import { addToWishList } from "../redux/slices/WishListSlice";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import '../CSS/FoodCard.css'

const ProductCard = ({ id, title, price, description, img, rating, handleToast }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const location = 'cart';
    dispatch(addToCart({ id, title, description, price,location, img, qty: 1 }));
    handleToast(title, 'added to cart');
  };

  const addToWishlistHandler = () => {
    const location = 'wishlist';
    dispatch(addToWishList({ id, title, description, price,location, img }));
    handleToast(title, 'added to wishlist');
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
          onClick={addToCartHandler}
          className="p-1 text-white bg-blue-500 hover:bg-blue-600 text-sm add_to_cart_btn"
        >
          <CiShoppingCart size={30}/>
        </button>
        <button
          onClick={addToWishlistHandler}
          className="p-1 text-white bg-blue-500 hover:bg-blue-600 text-sm add_to_cart_btn"
        >
          <IoIosHeartEmpty size={30}/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
