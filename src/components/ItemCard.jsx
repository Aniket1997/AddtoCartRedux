import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";

const ItemCard = ({ id, title, description, qty, price, img }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 shadow-md rounded-lg p-4 mb-4" style={{ minHeight: '160px' }}>
      <img src={img} alt={title} className="w-30 h-30 lg:w-20 lg:h-20 rounded" />
      <div className="flex flex-col flex-1">
        <h2 className="font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 hidden lg:block">{description.slice(0,200)}...</p>
        <div className="flex justify-start items-center mt-2">
          <span className="text-blue-500 font-bold mr-3">₹{price}</span>
          <div className="flex items-center gap-2">
            <AiOutlineMinus
              onClick={() => dispatch(decrementQty({ id }))}
              size={20}
              color="#333"
              className="cursor-pointer"
            />
            <span>{qty}</span>
            <AiOutlinePlus
              onClick={() => dispatch(incrementQty({ id }))}
              size={20}
              color="#333"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <MdDelete
        onClick={() => {
          dispatch(removeFromCart({ id, img, description, title, price, qty }));
          toast(`${title} Removed!`, {
            icon: "👋",
          });
        }}
        size={30}
        color="#C70039"
        className="text-gray-600 cursor-pointer lg:self-auto"
      />
    </div>
  );
};

export default ItemCard;
