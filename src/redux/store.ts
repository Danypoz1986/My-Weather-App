import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer, { setUser } from "./authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        user: userReducer, 
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

// ✅ Listen for Firebase Auth changes & update Redux state
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch(setUser(user.uid)); // ✅ Set userId in Redux
    } else {
        store.dispatch(setUser(null)); // ✅ Clear userId in Redux
    }
});

// ✅ Properly typed RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Correct way to use `useDispatch` in components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

