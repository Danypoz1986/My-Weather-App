import { IonContent, 
         IonHeader, 
         IonIcon, 
         IonPage, 
         IonTitle,
         IonToolbar, 
         IonButton} from '@ionic/react';


import { cloud } from 'ionicons/icons'
import { useHistory } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Home: React.FC = () => {

  const history = useHistory();

  const toLogin = () => {
    history.push('/login');
  }

  const toRegister = () => {
    history.push('/register');
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#1e1e2f", textAlign:"center", height:"150px", "justify-content":"center", display:"flex" }}>
          <IonTitle style={{color:"#A0C4FF", fontSize:"40px"}}>My Weather App <IonIcon icon={cloud} style={{ verticalAlign: "middle" }}  /> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{marginTop:"150px", textAlign:"center"}}>
          <IonButton onClick={toLogin}>LOGIN</IonButton>
          <p style={{color:"#A0C4FF"}}>OR</p>
          <IonButton color="secondary" onClick={toRegister}>Register</IonButton>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
};

export default Home;
