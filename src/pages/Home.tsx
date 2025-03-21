import { IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle,
  IonToolbar, 
  IonButton} from '@ionic/react';


import { cloud } from 'ionicons/icons'
import { useHistory, useLocation } from 'react-router';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';



const Home: React.FC = () => {

  interface LocationState {
    logoutType?: string;
  }

const history = useHistory();
const location = useLocation<LocationState>();


const toLogin = () => {
history.push('/login');
}

const toRegister = () => {
history.push('/register');
}


useEffect(() => {
  const logoutType = location.state?.logoutType || localStorage.getItem("logoutType");

  if (!logoutType || history.location.pathname !== '/') return;

  console.log(`🔄 Detected logoutType: ${logoutType}`);

  if (logoutType === "manual") {
    setTimeout(() => {
      toast.success("You've logged out successfully!", {
        position: "top-center",
        duration: 4000,
      });
    }, 300);
  } else if (logoutType === "auto") {
    toast.info("Session expired due to inactivity. You have been logged out!", {
      position: "top-center",
      duration: 4000,
    });
  }

  setTimeout(() => {
    localStorage.removeItem("logoutType");
  }, 100);
}, [location.state, history.location.pathname]);








return (
<IonPage>
<Toaster richColors
/>
<IonHeader>
 <IonToolbar style={{ "--background": "#1e1e2f", textAlign:"center", height:"150px", "justify-content":"center", display:"flex" }}>
   <IonTitle style={{color:"#A0C4FF", fontSize:"40px"}}>My Weather App <IonIcon icon={cloud} style={{ verticalAlign: "middle" }}  /> </IonTitle>
 </IonToolbar>
</IonHeader>
<IonContent fullscreen>
 <div style={{marginTop:"150px", textAlign:"center"}}>
   <IonButton onClick={toLogin}><b style={{color:"#1e1e2f"}}>LOGIN</b></IonButton>
   <p style={{color:"#A0C4FF"}}><b>OR</b></p>
   <IonButton color="secondary" onClick={toRegister}><b style={{color:"#1e1e2f"}}>Register</b></IonButton>
 </div>
</IonContent>
</IonPage>
);
};

export default Home;