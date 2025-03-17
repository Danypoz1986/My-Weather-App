import { useEffect, useState } from "react";
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { doc, getDoc, deleteField, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ✅ Import Firestore DB
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // ✅ Get logged-in user

const History: React.FC = () => {
    const [searchHistory, setSearchHistory] = useState<{ city: string; country: string }[]>([]);
    const userId = useSelector((state: RootState) => state.auth.userId); // ✅ Get logged-in user


    const clearHistory = async () => {
        if (userId) {
            const userRef = doc(db, "userHistory", userId);
            await updateDoc(userRef, {
                searches: deleteField(), // Deletes search history
            });
            setSearchHistory([]); // Clear from UI
        }
    };

    useEffect(() => {
        if (!userId) return;  // Ensure user is logged in
    
        const fetchHistory = async () => {
            try {
                const userRef = doc(db, "userHistory", userId);
                const docSnap = await getDoc(userRef);
    
                if (docSnap.exists()) {
                    console.log("Fetched history data:", docSnap.data());
                    setSearchHistory(docSnap.data().searches || []);
                } else {
                    console.log("No history found for user.");
                    setSearchHistory([]);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };
    
        fetchHistory();
    }, [userId]);  // Runs when userId is available
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{textAlign:"center", "--background":"#1e1e2f", color:"#A0C4FF", marginTop:"30px"}}>
                    <IonTitle>Search History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {searchHistory.length === 0 ? (
                    <p>No search history available.</p>
                ) : (
                    <IonList style={{marginTop:"30px", background:"#1e1e2f"}}>
                        {searchHistory.map((entry, index) => (
                            <IonItem key={index} routerLink={`/results/${entry.city}`}
                                style={{"--background":"#1e1e2f", "--border-color":"#A0C4FF", "--color":"#A0C4FF", "--background-hover":"none"}}>
                                {entry.city 
                                    ? entry.city.split(",")[0].trim().split(" ").map(word => word.charAt(0).toUpperCase() + 
                                    word.slice(1).toLowerCase()).join(" ") 
                                    : "Unknown City"}, {entry.country}
                            </IonItem>
                        ))}
                <div style={{textAlign:"center", marginTop:"10px"}}>
                    <IonButton color="danger" onClick={clearHistory} style={{"font-weight":"bold"}}>
                        Clear History
                    </IonButton>
                </div>                
                    </IonList>
                )}
            </IonContent>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <IonButton routerLink="/dashboard" style={{"--border-radius":"6px", "font-weight":"bold"}}>
                        Back to Dashboard
                    </IonButton>
            </div>
        </IonPage>
    );
};

export default History;
