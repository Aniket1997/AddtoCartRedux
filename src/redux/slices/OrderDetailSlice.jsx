import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  method: '',
  orders: [],
};

const OrderDetailSlice = createSlice({
  name: 'OrderSlice',
  initialState,
  reducers: {
    setOrderDetailsAndMethod: (state, action) => {
      state.method = action.payload.method;
      state.orders = action.payload.order;
      state.total = action.payload.total;
    },
    removeFromOrder: (state, action) => {
      console.log(state);
      console.log('Removing Order with ID:', action.payload.id);
      state.orders = state.orders.filter(order => order.id !== action.payload.id);
      console.log('Updated Orders:', state.orders);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrderDetailsAndMethod, removeFromOrder, clearOrders } = OrderDetailSlice.actions;
export default OrderDetailSlice.reducer;
