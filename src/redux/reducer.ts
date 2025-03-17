import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import userSlice

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
