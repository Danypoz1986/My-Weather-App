import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword, 
         onAuthStateChanged, 
         User, 
         UserCredential, 
         deleteUser, 
         EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { toast } from './toast';
import { getFirestore, deleteDoc, doc } from "firebase/firestore";


const firebaseConfig = {

    apiKey: import.meta.env.APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.APP_AUTH_DOMAIN,
    projectId: import.meta.env.APP_PROJECT_ID,
    storageBucket: import.meta.env.APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.APP_APP_ID,
    measurementId: import.meta.env.APP_MEASUREMENT_ID,
  
  };

  
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db };

export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
      const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return res.user; // ✅ Return Firebase User object
  } catch (error) {
      if (error instanceof Error) {
          toast(error.message, 'danger', 4000);
      } else {
          toast("An unknown error occurred", 'danger', 4000);
      }
      return null; // ✅ Return null if login fails
  }
}


export function logoutUser()  {
    return auth.signOut()
}

export async function registerUser(email:string, password:string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        return true
      }catch(error){
        if (error instanceof Error) {
            toast(error.message, 'danger', 4000)
        } else {
            toast("An unknown error occurred", 'danger', 4000);
        }
        return false
    }
}


export const deleteCurrentUser = async () => {

  const auth = getAuth();
  const user = auth.currentUser; 


  if (user) {
    try {
        await deleteUser(user);
        console.log(user.email + " deleted successfully!");
        toast(user.email?.split('@')[0] + " deleted successfully!", 'success', 4000)
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message, 'danger', 4000)
    } else {
        toast("An unknown error occurred", 'danger', 4000);
    }
    return false
    }
} else {
    toast("No user is currently signed in.", 'warning', 4000);
}
  return false
}


export const deleteUserData = async (userId: string) => {
  try {
      const userRef = doc(db, "userHistory", userId);
      await deleteDoc(userRef);
      console.log("User data deleted from Firestore");
  } catch (error) {
      console.error("Error deleting user data:", error);
  }
};
 


export const reauthenticateUser = async (email: string, password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        try {
            await reauthenticateWithCredential(user, credential);
            console.log("User re-authenticated");
        } catch (error) {
            console.error("Re-authentication failed:", error);
            alert("Re-authentication required before deleting the account.");
        }
    }
};
 



export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user); // Return the full user object
        } else {
          resolve(null);
        }
      });
    });
  };


