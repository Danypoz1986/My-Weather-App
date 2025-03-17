import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  searchType: string; // ✅ Add searchType to Redux state
}

const initialState: UserState = {
  email: null,
  searchType: "city", // ✅ Default to "city" on page load
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    clearUserState: (state) => {
      state.email = null;
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload; // ✅ Update search type
    },
  },
});

export const { setUserState, clearUserState, setSearchType } = userSlice.actions;
export default userSlice.reducer;
