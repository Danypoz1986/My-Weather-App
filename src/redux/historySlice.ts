import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchEntry {
    city: string;
    country: string;
    timestamp: number;
}

interface HistoryState {
    searches: SearchEntry[];
}

const initialState: HistoryState = {
    searches: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        // ✅ Set entire history (Used in fetchHistory)
        setHistory: (state, action: PayloadAction<SearchEntry[]>) => {
            state.searches = action.payload;
        },

        // ✅ Add new entry to history
        addToHistory: (state, action: PayloadAction<SearchEntry>) => {
            state.searches = [action.payload, ...state.searches]; // ✅ Most recent first
        },

        // ✅ Remove one entry from history
        removeFromHistory: (state, action: PayloadAction<SearchEntry>) => {
            state.searches = state.searches.filter(
                item => !(item.city === action.payload.city && 
                          item.country === action.payload.country && 
                          item.timestamp === action.payload.timestamp)
            );
        },

        // ✅ Clear all history
        clearHistory: (state) => {
            state.searches = [];
        }
    }
});

export const { setHistory, addToHistory, removeFromHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
