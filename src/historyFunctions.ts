import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, deleteField } from "firebase/firestore";
import { AppDispatch } from "./redux/store";
import { setHistory, addToHistory, removeFromHistory, clearHistory } from "./redux/historySlice";

// ✅ Fetch Search History from Firestore and Update Redux
export const fetchHistory = async (userId: string, dispatch: AppDispatch) => {
    if (!userId) return;

    try {
        const userRef = doc(db, "userHistory", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const searches = docSnap.data()?.searches || [];

            // ✅ Sort by most recent
            searches.sort((a: { timestamp: number }, b: { timestamp: number }) => b.timestamp - a.timestamp);

            dispatch(setHistory(searches)); // ✅ Update Redux
        } else {
            dispatch(setHistory([]));
        }
    } catch (error) {
        console.error("Error fetching history:", error);
    }
};

// ✅ Add Search Entry to Firestore & Redux
export const addSearchHistory = async (userId: string, entry: { city: string; country: string; timestamp: number }, dispatch: AppDispatch) => {
    if (!userId) return;

    try {
        const userRef = doc(db, "userHistory", userId);
        await updateDoc(userRef, {
            searches: arrayUnion(entry),
        });

        dispatch(addToHistory(entry)); // ✅ Update Redux Store
    } catch (error) {
        console.error("Error adding search history:", error);
    }
};

// ✅ Remove a Single Search Entry from Firestore & Redux
export const deleteSearchHistory = async (userId: string, entry: { city: string; country: string; timestamp: number }, dispatch: AppDispatch) => {
    if (!userId) return;

    try {
        const userRef = doc(db, "userHistory", userId);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) return;

        const currentSearches = docSnap.data()?.searches || [];
        const updatedSearches = currentSearches.filter(
            (item: { city: string; country: string; timestamp: number }) =>
                item.timestamp !== entry.timestamp // ✅ Deletes only the selected row
        );

        await updateDoc(userRef, { searches: updatedSearches });
        dispatch(removeFromHistory(entry)); // ✅ Remove from Redux
    } catch (error) {
        console.error("Error deleting history item:", error);
    }
};


// ✅ Clear Entire History
export const clearUserHistory = async (userId: string, dispatch: AppDispatch) => {
    if (!userId) return;

    try {
        const userRef = doc(db, "userHistory", userId);
        await updateDoc(userRef, { searches: deleteField() });
        dispatch(clearHistory()); // ✅ Update Redux Store
    } catch (error) {
        console.error("Error clearing history:", error);
    }
};
