import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    InputCustomEvent,
    IonLoading,
} from "@ionic/react";

import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { setShowRegisterToast } from "../redux/userSlice";
import { toast, Toaster } from "sonner";


const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [busy, setBusy] = useState<boolean>(false);
    const [hover, setHover] = useState(false);
    const history = useHistory();  
    const dispatch = useDispatch();  

    async function register() {
        setBusy(true);
    
        // ✅ Validate Passwords Match
        if (password !== cpassword) {
            toast.info("Passwords do not match", {
                position: "top-center",
                duration: 4000,
            });
            setBusy(false);
            return;
        }
    
        // ✅ Ensure Email & Password Are Not Empty
        if (email.trim() === "" || password.trim() === "") {
            toast.info("Email and password are required", {
                position: "top-center",
                duration: 4000,
            });
            setBusy(false);
            return;
        }
    
        // ✅ Ensure Password Length is at Least 6 Characters
        if (password.length < 6) {
            toast.info("Password must be at least 6 characters long", {
                position: "top-center",
                duration: 4000,
            });
            setBusy(false);
            return;
        }
    
        // ✅ Call Firebase to Register User
        const res = await registerUser(email, password);
    
        if (res) {
            console.log("✅ User registered successfully!");
            dispatch(setShowRegisterToast(true)); // ✅ Set toast flag in Redux
            history.replace("/home"); // ✅ Navigate to Home
        } else {
            // ✅ Handle Firebase Registration Errors
            const registerError = localStorage.getItem("showRegisterErrorToast");
            if (registerError) {
                toast.error(registerError, {
                    position: "top-center",
                    duration: 4000,
                });
    
                // ✅ Remove error after showing it
                localStorage.removeItem("showRegisterErrorToast");
            }
        }
    
        setBusy(false);
    }
    


    return (
       <IonPage>
        <Toaster richColors />
           <IonHeader>
               <IonToolbar style={{ "--background":"#1e1e2f" }}>
                   <IonTitle style={{textAlign:"center", color:"#A0C4FF"}}>Registration Page</IonTitle>
               </IonToolbar>
           </IonHeader>
           <IonContent className="ion-padding">
               <IonLoading message="Registration in progress..." duration={0} isOpen={busy} />
               <IonCard style={{ backgroundColor: "#1e1e2f", marginTop:"30px" }}>
                   <IonCardContent>
                        <IonItem style={{ "--background": "#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput 
                                type="email" 
                                placeholder="Enter your email" 
                                style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", "margin": "0" }}
                                required 
                                onIonChange={(e: InputCustomEvent) => setEmail(e.detail.value || '')}
                            />
                        </IonItem>
                        <br />
                        <IonItem style={{ "--background": "#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput 
                                type="password" 
                                placeholder="Create a password" 
                                required 
                                style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", "margin": "0" }}  
                                onIonChange={(e: InputCustomEvent) => setPassword(e.detail.value || '')}
                            />
                        </IonItem>
                        <br />
                        <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput 
                                type="password" 
                                placeholder="Confirm your password" 
                                required 
                                style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin:"0" }}  
                                onIonChange={(e: InputCustomEvent) => setCpassword(e.detail.value || '')}
                            />
                        </IonItem>
                        <br /> <br />
                        <IonButton expand="full" color="primary" onClick={register}>
                            <p style={{color:"#1e1e2f"}}>REGISTER</p>
                        </IonButton>
                        <br />
                        <p style={{textAlign:"center"}}>Already have an account? &nbsp;<Link to='/login'>LOGIN</Link></p>
                        <p style={{textAlign:"center", marginTop:"50px"}}>
                            <Link to = "/Home" 
                                onMouseEnter={() => setHover(true)} 
                                onMouseLeave={() => setHover(false)} 
                                style={{ 
                                    textDecoration: "none", 
                                    color: "#A0C4FF", 
                                    display: "inline-block", 
                                    transform: hover ? "scale(1.1)" : "scale(1)", 
                                    transition: "transform 0.2s ease-in-out" 
                                }}>🏠 Home</Link>
                        </p>
                   </IonCardContent>
               </IonCard>   
           </IonContent>
       </IonPage>
    );
};

export default Register;
