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
    IonLoading,
  
  } from "@ionic/react";

import { Link, useHistory } from "react-router-dom";
import {loginUser} from '../firebaseConfig'
import { useState, useEffect, useRef } from "react";
import { setUserState } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { User } from 'firebase/auth'
import { toast, Toaster } from 'sonner';
import 'react-toastify/dist/ReactToastify.css'
  
  
  
  const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [hover, setHover] = useState(false);
    const emailRef = useRef<string>("");
    const passwordRef = useRef<string>("");

    
const login = async () => {
    setBusy(true);
    try {
        const user: User | null = await loginUser(emailRef.current, passwordRef.current);
        setBusy(false);

        if (!user || !user.email) {
            const errorMessage = localStorage.getItem("showLoginErrorsToast");
            if (errorMessage) {
                toast.error(errorMessage, {
                    position: "top-center",
                    duration: 4000,
                });

                setTimeout(() => {
                    localStorage.removeItem("showLoginErrorsToast");
                }, 4000);
            }
            return;
        }

        dispatch(setUserState(user.email));
        localStorage.setItem("showLoginToast", "true");
        history.replace('/dashboard');

        // ✅ Clear input fields after a delay
        setTimeout(() => {
            setEmail('');
            setPassword('');
            emailRef.current = "";
            passwordRef.current = "";
        }, 600);

    } catch (error) {
        console.error("Login error:", error);
        setBusy(false);
    }
};

    

    useEffect(() => {
        const errorMessage = localStorage.getItem("showLoginErrorsToast");
        if (errorMessage) {
            console.log(errorMessage?.length)
            toast.error(errorMessage, {
                position: "top-center",
                duration: 4000, // ✅ Toast disappears after 4s
            });
    
            // ✅ Remove the error message from localStorage after delay
            setTimeout(() => {
                localStorage.removeItem("showLoginErrorsToast");
            }, 4000); // 4.5s delay ensures the toast disappears first
        }
    }, []);

    
    
    

    
    return (
       <IonPage>
           <IonHeader>
               <IonToolbar style={{ "--background":"#1e1e2f" }}>
                   <IonTitle style={{textAlign:"center", color:"#A0C4FF"}}>Login Page</IonTitle>
               </IonToolbar>
           </IonHeader>
           <IonContent className="ion-padding">
               <IonLoading message="Logging in..." duration={0} isOpen={busy} />
               <IonCard style={{ backgroundColor: "#1e1e2f", marginTop:"30px" }}>
                <Toaster  richColors/>
                   <IonCardContent>
                       <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                       <IonInput
                            type="email"
                            placeholder="Enter your email"
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin: "0" }}
                            required
                            onIonChange={(e) => {
                                emailRef.current = e.detail.value!.trim();
                                setEmail(emailRef.current);
                            }}
                        />
                       </IonItem>
                       <br />
                       <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                       <IonInput
                            type="password"
                            placeholder="Enter your password"
                            required
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin: "0" }}
                            onIonChange={(e) => {
                                passwordRef.current = e.detail.value!.trim();
                                setPassword(passwordRef.current);
                            }}
                        />
                       </IonItem>
                       <br /> <br />
                       <IonButton expand="full" color="primary" onClick={login}>
                        <p style={{color:"#1e1e2f"}}>LOGIN</p></IonButton>
                       <br />
                       <p style={{textAlign:"center"}}>Don't have an account yet?&nbsp; &nbsp;<Link to = "/register">Register Now!</Link></p>
                       <p style={{textAlign:"center", marginTop:"50px"}}><Link to = "/Home" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
                       style={{textDecoration: "none", 
                        color: "#A0C4FF", 
                        display: "inline-block", 
                        transform: hover ? "scale(1.1)" : "scale(1)", 
                        transition: "transform 0.2s ease-in-out" }}>🏠 Home</Link></p>
                   </IonCardContent>
               </IonCard>   
           </IonContent>
       </IonPage>
    );
    };
     
     
     
  
  export default Login;
  