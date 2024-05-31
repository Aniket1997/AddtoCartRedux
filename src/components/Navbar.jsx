import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { Link,useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "../assets/logo.png";
import "../CSS/Navbar.css";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const wishListItem = useSelector((state) => state.wishlist.wishList);
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn; // Get isLoggedIn status
  const navigate = useNavigate();
  const cartItemSize = cartItems.length;
  const wishListItemSize = wishListItem.length;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout =()=>
  {
   dispatch(logout());
   navigate('/login')
  }
  const handleGoToProfileClick =()=>{
    navigate('/profile')
  }

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center py-3 mx-2 mb-10 navbar_main">
      <div className="brand flex items-center gap-2">
      
        <h1 className="brand_name">Shop Bee</h1>
        <Link to='/'><img src={Logo} alt="Logo" className="brand_img" /></Link>
      </div>
      <div className="flex items-center gap-2">
        
        <Link to="/cart">
          <Badge badgeContent={cartItemSize} color="primary">
            <ShoppingCartIcon color="action" style={{ color: "black" }} />
          </Badge>
        </Link>
        <Link to="/wishlist">
          <Badge badgeContent={wishListItemSize} color="primary">
            <FavoriteIcon size={25} className="cursor-pointer" />
          </Badge>
        </Link>
        {/* Conditional rendering based on isLoggedIn status */}
        {isLoggedIn ? (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleProfileClick}
            >
              <AccountCircleIcon/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleProfileClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleGoToProfileClick}>
              Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="login_btn"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="sign_up_btn"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
