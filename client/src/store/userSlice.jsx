import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: '',
    name:'',
    email: '',
    avatar: '',
    mobile: '',
    verify_email: false,
    last_login_date: '',
    status: false,
    address_details:[],
    shopping_cart:[],
    orderHistory:[],
    role:'',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        state._id = action.payload?._id;
        state.name = action.payload?.name;
        state.email = action.payload?.email;
        state.avatar = action.payload?.avatar;
        state.mobile = action.payload?.mobile;
        state.verify_email = action.payload?.verify_email;
        state.last_login_date = action.payload?.last_login_date;
        state.status = action.payload?.status;
        state.address_details = action.payload?.address_details;
        state.shopping_cart = action.payload?.shopping_cart;
        state.orderHistory = action.payload?.orderHistory;
        state.role = action.payload?.role;
      },
      logout: (state) => {
        state._id = '';
        state.name = '';
        state.email = '';
        state.avatar = '';
        state.mobile = '';
        state.verify_email = false;
        state.last_login_date = '';
        state.status = false;
        state.address_details = [];
        state.shopping_cart = [];
        state.orderHistory = [];
        state.role = '';
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserDetails, logout } = userSlice.actions;
  
  export default userSlice.reducer;