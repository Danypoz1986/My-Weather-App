import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer, { setUser } from "./authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import historyReducer from "./historySlice";

const store = configureStore({
    reducer: {
        user: userReducer, 
        auth: authReducer,
        history: historyReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

// ✅ Listen for Firebase Auth changes & update Redux state
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    const currentUserId = store.getState().auth.userId;
    if (user && user.uid !== currentUserId) {
        store.dispatch(setUser(user.uid)); // ✅ Update only if changed
    } else if (!user && currentUserId !== null) {
        store.dispatch(setUser(null)); // ✅ Avoid redundant logout calls
    }
});


// ✅ Properly typed RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Correct way to use `useDispatch` in components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

