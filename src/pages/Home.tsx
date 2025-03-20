import { IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle,
  IonToolbar, 
  IonButton} from '@ionic/react';


import { cloud } from 'ionicons/icons'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { setShowRegisterToast } from '../redux/userSlice';
import { toast, Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';



const Home: React.FC = () => {

const history = useHistory();
const showRegisterToast = useSelector((state: RootState) => state.user.showRegisterToast);
const dispatch = useDispatch();



const toLogin = () => {
history.push('/login');
}

const toRegister = () => {
history.push('/register');
}


useEffect(() => {
if (showRegisterToast) {
 toast.success("You have registered successfully!", {
   position: "top-center",
   duration: 4000,
 })
     dispatch(setShowRegisterToast(false)); // ✅ Reset Redux state
}
}, [showRegisterToast, dispatch]);


useEffect(() => {
  const logoutType = localStorage.getItem("logoutType");

  if (!logoutType) return; // ✅ No logoutType, no toast

  console.log(`🔄 Detected logoutType: ${logoutType}`);

  if (logoutType === "voluntary") {
      toast.success("You have logged out successfully!", {
          position: "top-center",
          duration: 4000,
          id: "logout-toast", // ✅ Prevent multiple toasts
      });
  } else if (logoutType === "auto") {
      toast.info("Session expired due to inactivity. You have been logged out!", {
          position: "top-center",
          duration: 4000,
          id: "logout-toast", // ✅ Prevent multiple toasts
      });
  }

  // ✅ Remove logoutType *immediately* after toast is set
  localStorage.removeItem("logoutType");

}, [history.location.state]); // ✅ Uses `history.location.state` to trigger only when needed





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
   <p style={{color:"#A0C4FF"}}>OR</p>
   <IonButton color="secondary" onClick={toRegister}><b style={{color:"#1e1e2f"}}>Register</b></IonButton>
 </div>
</IonContent>
</IonPage>
);
};

export default Home;