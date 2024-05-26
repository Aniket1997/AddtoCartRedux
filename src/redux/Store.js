import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import CategorySlice from "./slices/CategorySlice";
import SearchSlice from "./slices/SearchSlice";
import WishListSlice from "./slices/WishListSlice";
import AuthSlice from "../redux/slices/authSlice";
import OrderDetailSlice from "./slices/OrderDetailSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist:WishListSlice,
    category: CategorySlice,
    search: SearchSlice,
    auth:AuthSlice,
    OrderSlice:OrderDetailSlice,
  },
});
export default Store;
