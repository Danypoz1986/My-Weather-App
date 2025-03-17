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
import { toast } from "../toast"
import { useState } from "react";
import { registerUser } from "../firebaseConfig"


  const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [busy, setBusy] = useState<boolean>(false)
    const [hover, setHover] = useState(false);
    const history = useHistory();

    async function register(){
        setBusy(true)
        if(password !== cpassword){
            toast('Passwords do not match', 'warning', 4000)
            return
        }
        if(email.trim() === '' || password.trim() === '' ){
            toast('Username and password are required', 'warning', 4000)
            return
        }
        const res = await registerUser(email, password)
        if(res){
            toast("You have registered successfully!", 'success', 4000)
            history.push('/')
        }
        setBusy(false)
    } 

    return (
       <IonPage>
           <IonHeader>
               <IonToolbar style={{ "--background":"#1e1e2f" }}>
                   <IonTitle style={{textAlign:"center", color:"#A0C4FF"}}>Registration Page</IonTitle>
               </IonToolbar>
           </IonHeader>
           <IonContent className="ion-padding">
               <IonLoading message="Registration in progress..." duration={0} isOpen={busy} />
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
                            <IonInput type="password" placeholder="Create a password" required 
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin:"0" }}  
                            onIonChange={(e: InputCustomEvent) => setPassword(e.detail.value || '')}
                            />
                       </IonItem>
                       <br />
                       <IonItem style={{"--background":"#1e1e2f", borderBottom: "2px solid #A0C4FF" }}>
                            <IonInput type="password" placeholder="Confirm your password" required 
                            style={{ "--placeholder-color": "#A0C4FF", "--color": "#A0C4FF", margin:"0" }}  
                            onIonChange={(e: InputCustomEvent) => setCpassword(e.detail.value || '')}
                            />
                       </IonItem>
                       <br /> <br />
                       <IonButton expand="full" color="primary" onClick={register}><p style={{color:"#1e1e2f"}}>REGISTER</p></IonButton>
                       <br />
                       <p style={{textAlign:"center"}}>Already have an account? &nbsp;<Link to='/login'>LOGIN</Link></p>
                       <p style={{textAlign:"center", marginTop:"50px"}}><Link to = "/Home" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
                       style={{textDecoration: "none", 
                        color: "white", 
                        display: "inline-block", 
                        transform: hover ? "scale(1.1)" : "scale(1)", 
                        transition: "transform 0.2s ease-in-out" }}>🏠 Home</Link></p>
                   </IonCardContent>
               </IonCard>   
           </IonContent>
       </IonPage>
    );
    };

    export default Register