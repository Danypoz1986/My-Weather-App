import { IonContent, 
         IonHeader, 
         IonButton, 
         IonPage, 
         IonTitle, 
         IonToolbar, 
         IonInput, 
         IonLoading,
         IonIcon,
         IonRadioGroup,
         IonRadio,
         IonItem, 
         IonFooter,
         IonModal,
         IonLabel,
         IonList,
         IonPopover,} from '@ionic/react';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";
import { useHistory, useLocation } from 'react-router';
import { logoutUser, db, deleteUserData, deleteCurrentUser } from '../firebaseConfig';
import { searchOutline, timeOutline, informationCircleOutline, chevronDownOutline } from 'ionicons/icons';
import { setSearchType } from "../redux/userSlice";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { addToHistory } from '../redux/historySlice';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast, Toaster } from 'sonner';


const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const Dashboard: React.FC = () => {

    const email = useSelector((state: RootState) => state.user.email);
    const history = useHistory();
    const [busy, setBusy] = useState<boolean>(false)
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const searchType = useSelector((state: RootState) => state.user.searchType) || "city";
    const dispatch = useDispatch();
    const location = useLocation();
    const [userId, setUserId] = useState<string | null>(null);
    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent | undefined>(undefined);
    const [deleting, setDeleting] = useState<boolean>(false);


    const logout = useCallback(async () => {
        setBusy(true);
        
        // ✅ Pass dispatch as argument
        await logoutUser(dispatch); 
        
        localStorage.setItem("showLogoutToast", "true"); // ✅ Set flag for Home page
        
        setBusy(false);
        history.replace('/');
    }, [history, dispatch]);
    
    
      

    async function deleteUser(){
        const userResponse = confirm("Are you sure to delete the account?");
        if (userResponse){
            setDeleting(true);
            if(userId){
            try{    
            await deleteUserData(userId); 
            await deleteCurrentUser(); 
            history.replace("/");
            }catch (error){
                if(error instanceof Error){
                //toast error
                }else 
                {
                    //toast error
                }

        }
    }   setDeleting(false);
        }
    }

    const getWeather = async () => {
        if (city.trim() === '') {
            toast.info("Please enter a city name before searching!", {
                position: "top-center",
                duration: 4000,
            });
            return;
        }
    
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
    
            if (!res.ok) throw new Error("Failed to fetch location data!");
    
            const data = await res.json();
            const country = data.sys?.country || "Unknown";
    
            if (userId) {
                const userRef = doc(db, "userHistory", userId);
                const userSnap = await getDoc(userRef);
    
                const searchEntry = { city, country, timestamp: Date.now() };
    
                if (userSnap.exists()) {
                    await updateDoc(userRef, {
                        searches: arrayUnion(searchEntry),
                    });
                } else {
                    await setDoc(userRef, {
                        searches: [searchEntry],
                    });
                }
    
                dispatch(addToHistory(searchEntry)); // ✅ Update Redux instantly
            }
    
            // Navigate to results page
            history.push(`/results/${city}`);
        } catch (error) {
            console.error("Error fetching country:", error);
            toast.error("Could not fetch weather data.", {
                position: "top-center",
                duration: 4000,
            });
        }
    };
    
    
    useEffect(() => {
    
        if (localStorage.getItem("showLoginToast") === "true") {
            const loginToastId = toast.success("You've logged in!", {
                position: "top-center",
                duration: 4000,
            })
    
            // ✅ Remove login toast flag after delay and dismiss toast
            setTimeout(() => {
                localStorage.removeItem("showLoginToast");
                toast.dismiss(loginToastId); // ✅ Force toast to disappear
            }, 50);
        }
    }, []);
    
    


    useEffect(() => {
        let inactivityTimer: NodeJS.Timeout;
    
        const resetTimer = () => {
            if (userId) {
                clearTimeout(inactivityTimer);
                inactivityTimer = setTimeout(() => {
                    console.log("User inactive for 10 minutes, logging out...");
                    logout();
                }, 10 * 60 * 1000); // 10 minutes in milliseconds
            }
        };

        // Events that reset the timer
        const events = ["mousemove", "keydown", "touchstart"];
    
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });
    
        // Start the timer initially
        resetTimer();
    
        return () => {
            clearTimeout(inactivityTimer);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [userId, logout]); // Run only when userId changes
    
    

    useEffect(() => {
        dispatch(setSearchType("city")); // ✅ Set default searchType on page load

        if (searchType === "gps") {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const geoRes = await fetch(
                            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
                        );
                        const geoData = await geoRes.json();

                        if (geoData.length > 0) {
                            const cityName = geoData[0].name;
                            history.push(`/results/${cityName}`);
                        }
                    } catch (error) {
                        console.error("Error fetching location:", error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLoading(false);
                }
            );
        }
    }, [history, searchType, dispatch]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid); // ✅ Set userId from Firebase
            } else {
                setUserId(null);
            }
        });
    
        return () => unsubscribe(); // Cleanup listener
    }, []);

    useEffect(() => {
        setShowModal(false);
    }, [location] )

    
        

    return (
        <IonPage>
            <Toaster richColors />
            <IonHeader>
                <IonToolbar style={{"--background":"#1e1e2f", color:"#A0C4FF"}}>
                <IonItem 
                    lines="none" 
                    style={{"--background":"#1e1e2f"}}
                >
                    <IonLabel style={{ fontSize: "16px", fontWeight: "bold", color: "#A0C4FF", "--highlight-color-focused": "none" }}>
                        <b style={{fontSize:"18px"}}>{email?.split('@')[0]} <IonIcon icon={chevronDownOutline} style={{ cursor: "pointer", verticalAlign: "middle" }} 
                        onClick={(e) => { 
                        setPopoverEvent(e.nativeEvent); 
                        setShowPopover(true);
                        }} 
                    /></b>
                    </IonLabel>
                </IonItem>

                    <IonButton expand="block" slot='end' style={{ marginRight:"20px", fontWeight:"bold", "--border-radius":"6px" } } onClick={logout}>LOGOUT</IonButton>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
            <IonPopover 
                isOpen={!!showPopover} 
                event={popoverEvent} 
                onDidDismiss={() => setShowPopover(false)}
            >
                <IonList lines='none' style={{background:"#1e1e2f"}}>
                    <IonItem onClick={() => deleteUser()} style={{"--background": "#1e1e2f"}}>
                        <IonLabel style={{ color:"#A0C4FF"}} ><span style={{"cursor":"pointer"}}>🗑️ Delete account</span></IonLabel>
                    </IonItem>
                </IonList>
            </IonPopover>
                <IonLoading message="Logging out..." duration={0} isOpen={busy} />
                <IonLoading message="Fetching your location..." duration={0} isOpen={loading} />
                <IonLoading message="Deleting sccount..." duration={0} isOpen={deleting} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop:"80px"}}>
                    <IonItem style={{ width: "80%", maxWidth: "350px", "--background": "#1e1e2f", alignItems: "center", border: "2px solid #A0C4FF", borderRadius:"6px"  }}>
                        <IonIcon icon={searchOutline} slot="start" style={{ color: "#A0C4FF", marginRight:"10px" }} />
                        <IonInput 
                            placeholder="Enter city name (e.g., Rome or Rome, IT)"
                            style={{ color: "#A0C4FF", paddingLeft: "8px", textAlign:"left", fontSize:"15px" }}
                            onIonChange={(e) => setCity(e.detail.value!)}
                        />
                    </IonItem>
                    <IonButton expand="block" style={{ marginTop: "20px", fontWeight:"bold", "--color":"#1e1e2f", "--border-radius":"6px" }} onClick={getWeather} >Get Weather</IonButton>
                </div>

                <IonRadioGroup
                value={searchType} // ✅ Set value from Redux
                onIonChange={(e) => dispatch(setSearchType(e.detail.value))}
                >
                    <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "80px" }}>
                        
                            <IonRadio value="city" /> <IonLabel style={{ whiteSpace: "nowrap", color: "#A0C4FF", marginRight:"40px", marginLeft:"-15px" }}>Search by City</IonLabel>
                            <IonRadio value="gps" /> <IonLabel style={{ whiteSpace: "nowrap", color: "#A0C4FF", marginLeft:"-15px" }}>Use Current Location</IonLabel>
                        
                    </div>
                </IonRadioGroup>

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} initialBreakpoint={0.25} breakpoints={[0, 0.25]} style={{"--background":"#1e1e2f"}}>
                            <IonContent style={{"--background":"#1e1e2f"}}>
                
                                <IonItem lines='none' style={{"--background":"#1e1e2f", "--color-hover":"#A0C4FF", "--background-hover":"aqua",  color:"#A0C4FF", marginTop:"30px"}} 
                                    routerLink='/history' onClick={() => setShowModal(false)}
                                >
                                    <IonIcon icon={timeOutline} style={{marginRight:"10px", color:"#A0C4FF"}} />
                                    <IonLabel>History</IonLabel>
                                </IonItem>
                
                                <IonItem lines='none' style={{"--background":"#1e1e2f", "--color-hover":"#A0C4FF", "--background-hover":"aqua",  color:"#A0C4FF"}} 
                                    routerLink='/about' onClick={() => setShowModal(false)}
                                >
                                    <IonIcon icon={informationCircleOutline} style={{marginRight:"10px", color:"#A0C4FF"}} />
                                    <IonLabel>About</IonLabel>
                                </IonItem>
                
                            </IonContent>
                
                </IonModal>
                
                
            </IonContent>

            <IonFooter style={{backgroundColor:"#1e1e2f"}}>
                        <p onClick={() => setShowModal(true)} style={{ cursor: "pointer", textAlign: "center", color:"#A0C4FF"}}>
                            <IonTitle>Menu</IonTitle>
                        </p>
            </IonFooter>

        </IonPage>
    );
};

export default Dashboard;