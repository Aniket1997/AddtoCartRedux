import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';
import { addToWishList } from '../redux/slices/WishListSlice';
import { CiShoppingCart } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';
import '../CSS/FoodCard.css';

const ProductCard = ({ id, title, price, description, img, handleToast }) => {
  const userDetails = useSelector((state)=>state.auth.user)
  console.log(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    const location = 'cart';
    if(userDetails)
      {
        dispatch(addToCart({ id, title, description, price, location, img, qty: 1 }));
        handleToast(title, 'added to cart');
      }
    else{
      navigate('/login')
    }
  };

  const addToWishlistHandler = () => {
    const location = 'wishlist';
    if(userDetails)
      {
        dispatch(addToWishList({ id, title, description, price, location, img }));
        handleToast(title, 'added to wishlist');
      }
    else{
      navigate('/login')
    }
  };

  return (
    <Card style={{ width: '18rem', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardImg variant="top" src={img} alt={title} />
      <CardBody>
        <CardTitle>{title.slice(0,20)}...</CardTitle>
        <CardText>{description.slice(0,20)}...</CardText>
        <div className="d-flex justify-content-between align-items-center">
          <CardText className="mb-0">₹{price}</CardText>
          <div>
            <Button variant="light" onClick={addToCartHandler} className="me-2">
              <CiShoppingCart size={24} />
            </Button>
            <Button variant="light" onClick={addToWishlistHandler}>
              <IoIosHeartEmpty size={24} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
