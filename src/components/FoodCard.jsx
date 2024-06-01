import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";
import { addToWishList } from "../redux/slices/WishListSlice";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { Card, Button } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../CSS/FoodCard.css";

const ProductCard = ({ id, title, price, description, img, handleToast }) => {
  const userDetails = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const location = "cart";
    if (userDetails) {
      dispatch(
        addToCart({ id, title, description, price, location, img, qty: 1 })
      );
      handleToast(title, "added to cart");
    } else {
      navigate("/login");
    }
  };

  const addToWishlistHandler = () => {
    const location = "wishlist";
    if (userDetails) {
      dispatch(addToWishList({ id, title, description, price, location, img }));
      handleToast(title, "added to wishlist");
    } else {
      navigate("/login");
    }
  };

  const viewProductDetailsHandler = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card className="mb-3 card_food">
      <Card.Img variant="top" src={img} alt={title} className="card_image" />
        <Card.Title className="mb-0 px-2">
          <span className="title-text text-black-800 text-sm sm:text-base md:text-lg">
            {title.slice(0, 20)}...
          </span>
        </Card.Title>
      <Card.Footer>
        <div className="d-flex justify-between items-center mt-2 g-2">
          <Card.Text className="text-sm sm:text-base md:text-lg">
            ₹{price}
          </Card.Text>
          <div className="flex items-center space-x-2">
            <CiShoppingCart className="icon" onClick={addToCartHandler} cursor="pointer"/>

            <IoIosHeartEmpty className="icon" onClick={addToWishlistHandler} cursor="pointer"/>

            <VisibilityIcon
              className="icon"
              cursor="pointer"
              onClick={viewProductDetailsHandler}
            />
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
