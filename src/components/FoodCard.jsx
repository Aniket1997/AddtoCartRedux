import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';
import { addToWishList } from '../redux/slices/WishListSlice';
import { CiShoppingCart } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Card, Button } from 'react-bootstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../CSS/FoodCard.css';

const ProductCard = ({ id, title, price, description, img, handleToast }) => {
  const userDetails = useSelector((state) => state.auth.user);
  console.log(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const addToCartHandler = () => {
    const location = 'cart';
    if (userDetails) {
      dispatch(addToCart({ id, title, description, price, location, img, qty: 1 }));
      handleToast(title, 'added to cart');
    } else {
      navigate('/login');
    }
  };

  const addToWishlistHandler = () => {
    const location = 'wishlist';
    if (userDetails) {
      dispatch(addToWishList({ id, title, description, price, location, img }));
      handleToast(title, 'added to wishlist');
    } else {
      navigate('/login');
    }
  };

  const viewProductDetailsHandler = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card className="mb-3">
      <div className="img-wrapper" style={{ padding: '10px' }}>
        <Card.Img 
          variant="top" 
          src={img} 
          alt={title} 
          style={{ width: '100%', height: '275px', objectFit: 'cover' }}  // Adjust width and object fit as needed
        />
      </div>
      <Card.Body>
        <Card.Title className="mb-0">
          <span className="title-text">
            {title.slice(0, 30)}...
          </span>
        </Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="mb-0">₹{price}</Card.Text>
          <div className="d-flex">
            <Button variant="light" onClick={addToCartHandler} className="me-2">
              <CiShoppingCart size={24} />
            </Button>
            <Button variant="light" onClick={addToWishlistHandler} className="me-2">
              <IoIosHeartEmpty size={24} />
            </Button>
            <Button variant="light" onClick={viewProductDetailsHandler}>
              <VisibilityIcon />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
