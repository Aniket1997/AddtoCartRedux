import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      console.log(state);
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    incrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    decrementQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          const newQty = item.qty - 1;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(item => item !== null); // Remove null items
    },
    removeAllFromCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  removeAllFromCart,
} = CartSlice.actions;
export default CartSlice.reducer;
