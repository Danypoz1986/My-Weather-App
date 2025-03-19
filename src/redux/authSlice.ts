import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, deleteUser } from "firebase/auth";


interface AuthState {
  userId: string | null;
  logoutMessage: boolean;
}

const initialState: AuthState = {
  userId: null,
  logoutMessage: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Set the user ID when logging in
    setUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      if (!action.payload) {
        state.logoutMessage = true; // ✅ Show logout message when user logs out
      }
    },

    // ✅ Clears the logout message after displaying it
    clearLogoutMessage: (state) => {
      state.logoutMessage = false;
    },

    // ✅ Logout user (clears the user ID and shows logout message)

    logoutUser: (state) => {
      if (state.userId !== null) {
        state.userId = null;
        state.logoutMessage = true;
      }
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
export const { setUser, logoutUser, deleteUserAccount, clearLogoutMessage } = authSlice.actions;
export default authSlice.reducer;
