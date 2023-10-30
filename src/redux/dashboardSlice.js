// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    KontaUser: {
      userInfo: []
    },

  },
  reducers: {
    handleUserInfo(state, action){
      state.KontaUser.userInfo = action.payload
    }
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const {
  handleUserInfo
} = dashboardSlice.actions;