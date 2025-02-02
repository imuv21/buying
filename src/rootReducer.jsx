
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import adminSlice from './slices/adminSlice';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  product: productSlice
});

export default rootReducer;