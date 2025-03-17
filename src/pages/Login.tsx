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
    IonFooter,
  } from "@ionic/react";

import { Link, useHistory } from "react-router-dom";
import {loginUser} from '../firebaseConfig'
import { useState } from "react";
import { setUserState } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { User } from 'firebase/auth'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
  
  
  
  const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [hover, setHover] = useState(false);

    const notify = () => {
        toast.success('Mannaggia a gesu cristo', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    async function login() {
        setBusy(true);
        try {
            const user: User | null = await loginUser(email, password);
            setBusy(false);
    
            if (user && user.email) {
                dispatch(setUserState(user.email));
                history.replace('/dashboard');
                toast("you ve logged in")
            } 
        } catch (error) {
            console.error("Login error:", error);
            toast("Login failed!");
            setBusy(false);
        }
    }
    
    
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
                   <IonCardContent>
                       <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput type="email" placeholder="Enter your email" 
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin:"0" }} required 
                            onIonChange={(e: InputCustomEvent) => setEmail(e.detail.value || '')}
                            />
                       </IonItem>
                       <br />
                       <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput type="password" placeholder="Enter your password" required 
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin:"0" }}  
                            onIonChange={(e: InputCustomEvent) => setPassword(e.detail.value || '')}
                            />
                       </IonItem>
                       <br /> <br />
                       <IonButton expand="full" color="primary" onClick={() => { login(); notify(); }}>
                        <p style={{color:"#1e1e2f"}}>LOGIN</p></IonButton>
                       <br />
                       <p style={{textAlign:"center"}}>Don't have an account yet?&nbsp; &nbsp;<Link to = "/register">Register Now!</Link></p>
                       <p style={{textAlign:"center", marginTop:"50px"}}><Link to = "/Home" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
                       style={{textDecoration: "none", 
                        color: "white", 
                        display: "inline-block", 
                        transform: hover ? "scale(1.1)" : "scale(1)", 
                        transition: "transform 0.2s ease-in-out" }}>🏠 Home</Link></p>
                   </IonCardContent>
               </IonCard>   
           </IonContent>
           <IonFooter>
           <ToastContainer/>
           </IonFooter>
       </IonPage>
    );
    };
     
     
     
  
  export default Login;
  