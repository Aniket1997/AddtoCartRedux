import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  method: '',
  orders: [], // Can be 'COD', 'Card', or 'UPI'
};

const OrderDetailSlice = createSlice({
  name: 'OrderSlice',
  initialState,
  reducers: {
    setOrderDetailsAndMethod: (state, action) => {
      state.method = action.payload.method;
      state.orders.push(action.payload.order);
        
    },
  },
});

export const { setOrderDetailsAndMethod } = OrderDetailSlice.actions;
export default OrderDetailSlice.reducer;
