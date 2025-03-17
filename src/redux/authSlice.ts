import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, deleteUser } from "firebase/auth";

interface AuthState {
  userId: string | null;
}

const initialState: AuthState = {
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Set the user ID when they log in
    setUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },

    // ✅ Logout user (clears the user ID)
    logoutUser: (state) => {
      state.userId = null;
    },

    // ✅ Delete user account (calls Firebase + clears state)
    deleteUserAccount: (state) => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        deleteUser(user)
          .then(() => {
            console.log("User deleted successfully");
            state.userId = null; // ✅ Remove from Redux state
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please re-authenticate and try again.");
          });
      } else {
        alert("No user is currently signed in.");
      }
    },
  },
});

// ✅ Export actions for use in components
export const { setUser, logoutUser, deleteUserAccount } = authSlice.actions;
export default authSlice.reducer;
