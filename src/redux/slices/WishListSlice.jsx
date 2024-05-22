import { createSlice } from "@reduxjs/toolkit";

const WishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishList: [],
  },
  reducers: {
    addToWishList: (state, action) => {
      const existingItem = state.wishList.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Item already exists in the wishlist
        // You can show a toast message here
        return;
      }
      state.wishList.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishList, removeFromWishList } = WishListSlice.actions;
export default WishListSlice.reducer;
