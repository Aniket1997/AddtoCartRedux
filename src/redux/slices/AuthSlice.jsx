import { createSlice } from '@reduxjs/toolkit';
import userData from '../../data/userData';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false, // Add isLoggedIn field to initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = userData.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.user = user;
        state.error = null;
        state.isLoggedIn = true; // Set isLoggedIn to true when user logs in
      } else {
        state.user = null;
        state.error = 'Invalid username or password';
        state.isLoggedIn = false; // Set isLoggedIn to false on failed login
      }
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false; // Set isLoggedIn to false when user logs out
    },
    updateProfile: (state, action) => {
      const updatedData = action.payload;
      state.user = {
        ...state.user,
        name: {
          firstname: updatedData.firstname,
          lastname: updatedData.lastname,
        },
        address: {
          ...state.user.address,
          street: updatedData.street,
          number: updatedData.number,
          city: updatedData.city,
          zipcode: updatedData.zipcode,
        },
        email: updatedData.email,
        phone: updatedData.phone,
      };
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
