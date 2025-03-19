import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         onAuthStateChanged, 
         User, 
         UserCredential, 
         deleteUser, 
         EmailAuthProvider, 
         reauthenticateWithCredential, 
        signOut} from 'firebase/auth'
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { setUser } from "./redux/authSlice";
import { AppDispatch } from "./redux/store";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

export async function loginUser(email: string, password: string): Promise<User | null> {
    try {
        const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return res.user; 
    } catch (error) {
        if (error instanceof Error) {
            localStorage.setItem("showLoginErrorsToast", error.message);
        } else {
            localStorage.setItem("showLoginErrorsToast", "An unknown error occurred.");
        }
        return null; 
    }
}

export const logoutUser = async (dispatch: AppDispatch) => {
    try {
        const auth = getAuth();
        await signOut(auth);
        if (dispatch) {
            dispatch(setUser(null)); // ✅ Update Redux state only if explicitly triggered
        }
        localStorage.setItem("logoutToast", "true"); // ✅ Set flag to show logout message in Home
    } catch (error) {
        console.error("Error logging out:", error);
    }
};


export async function registerUser(email: string, password: string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("showRegisterToast", "true");
        return true;
    } catch (error) {
        if (error instanceof Error) {
            localStorage.setItem("showRegisterErrorToast", error.message);
        } else {
            localStorage.setItem("showRegisterErrorToast", "An unknown error occurred.");
        }
        return false;
    }
}

export const deleteCurrentUser = async () => {
    const user = auth.currentUser;

    if (user) {
        try {
            await deleteUser(user);
            localStorage.setItem("showDeleteToast", "Account deleted successfully.");
        } catch (error) {
            if (error instanceof Error) {
                localStorage.setItem("showDeleteUserErrorToast", error.message); // ✅ Distinct error key
            } else {
                localStorage.setItem("showDeleteUserErrorToast", "Failed to delete user account.");
            }
        }
    } else {
        localStorage.setItem("showDeleteUserErrorToast", "No user is currently signed in.");
    }
};


export const deleteUserData = async (userId: string) => {
    try {
        const userRef = doc(db, "userHistory", userId);
        await deleteDoc(userRef);
        localStorage.setItem("showDeleteDataToast", "User data deleted successfully."); // ✅ Success message
    } catch (error) {
        if (error instanceof Error) {
            localStorage.setItem("showDeleteDataErrorToast", error.message); // ✅ Distinct error key
        } else {
            localStorage.setItem("showDeleteDataErrorToast", "Failed to delete user data.");
        }
    }
};


export const reauthenticateUser = async (email: string, password: string) => {
    const user = auth.currentUser;

    if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        try {
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            if (error instanceof Error) {
                localStorage.setItem("showReauthErrorToast", error.message);
            } else {
                localStorage.setItem("showReauthErrorToast", "Re-authentication failed.");
            }
        }
    }
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user ? user : null);
        });
    });
};

