import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import CategorySlice from "./slices/CategorySlice";
import SearchSlice from "./slices/SearchSlice";
import WishListSlice from "./slices/WishListSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist:WishListSlice,
    category: CategorySlice,
    search: SearchSlice,
  },
});
export default Store;
