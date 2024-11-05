import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import addressReducer from "./slices/AddressSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    address: addressReducer
  },
});

export default store;