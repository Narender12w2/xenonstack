import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: localStorage.getItem("token") !== null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state){
      state.isAuthenticated=true;
    }, 
    logout(state){
      state.isAuthenticated=false;
    }
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer