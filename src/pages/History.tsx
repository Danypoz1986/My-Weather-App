import { useEffect } from "react";
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { X } from "lucide-react";
import { useHistory } from "react-router";
import { fetchHistory, deleteSearchHistory, clearUserHistory } from "../historyFunctions";

const History: React.FC = () => {
    const searchHistory = useSelector((state: RootState) => state.history.searches);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (userId) {
            fetchHistory(userId, dispatch);
        }
    }, [userId, dispatch, history]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{ textAlign: "center", "--background": "#1e1e2f", color: "#A0C4FF" }}>
                    <IonTitle>Search History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {searchHistory.length === 0 ? (
                    <p style={{"color":"#A0C4FF"}}>No search history available.</p>
                ) : (
                    <IonList style={{ marginTop: "30px", background: "#1e1e2f" }}>
                        {searchHistory.map((entry, index) => (
                            <IonItem 
                                key={index} 
                                style={{
                                    "--background": "#1e1e2f",
                                    "--border-color": "#A0C4FF",
                                    "--color": "#A0C4FF",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <span 
                                    style={{ cursor: "pointer", color: "#A0C4FF", textDecoration: "none" }}
                                    onClick={() => history.push(`/results/${entry.city}`)}
                                >
                                    {entry.city 
                                    ? entry.city.split(",")[0].trim().split(" ").map(word => word.charAt(0).toUpperCase() + 
                                    word.slice(1).toLowerCase()).join(" ") 
                                    : "Unknown City"}, {entry.country}
                                </span>

                                <X 
                                    color="red" 
                                    size={20} 
                                    style={{ cursor: "pointer", marginLeft: "auto" }}
                                    onClick={() => deleteSearchHistory(userId!, entry, dispatch)} // ✅ Use Redux functions
                                />
                            </IonItem>
                        ))}
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                            <IonButton color="danger" onClick={() => clearUserHistory(userId!, dispatch)} style={{ fontWeight: "bold" }}>
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

