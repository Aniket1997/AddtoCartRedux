// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  error: null,
  isLoggedIn: false,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      const { token, user } = response.data;
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue('Invalid username or password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
      
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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        console.log('User data:', state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export const { logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
