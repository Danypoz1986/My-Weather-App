import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon } from '@ionic/react';
import { FaCloudSun, FaCode, FaUser, FaMapMarkedAlt, FaBolt, FaStar, FaGlobe } from 'react-icons/fa';
import { cloud } from 'ionicons/icons';

const About: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{ "--background": "#1e1e2f", color: "#A0C4FF", textAlign:"center" }}>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
            <p style={{textAlign:"center", fontSize:"25px", marginTop:"0px", color:"#A0C4FF"}}><strong>My Weather App <IonIcon icon={cloud} style={{ verticalAlign: "middle" }}  /></strong></p>
                {/* App Info Section */}
                <IonList style={{"background": "#1e1e2f"}}>
                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaCloudSun size={22} color="#FFD700" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h2 style={{"color":"#A0C4FF"}}><strong>Weather App</strong></h2>
                            <p style={{color:"#D9E7FF"}}>A modern weather tracker built with Ionic & React.</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaCode size={22} color="#4CAF50" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h2 style={{"color":"#A0C4FF"}}><strong>Version 1.0</strong></h2>
                            <p style={{color:"#D9E7FF"}}>Initial release with city & GPS-based search.</p>
                        </IonLabel>
                    </IonItem >

                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaUser size={22} color="#2196F3" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h2 style={{"color":"#A0C4FF"}}><strong>Daniel Pozzoli</strong></h2>
                            <p style={{color:"#D9E7FF"}}>Developer & Creator</p>
                        </IonLabel>
                    </IonItem>

                </IonList>

                {/* Key Features Section */}
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h2 style={{ color: "#A0C4FF" }}>🌟 Key Features 🌟</h2>
                </div>

                <IonList style={{"background": "#1e1e2f"}}>
                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaMapMarkedAlt size={22} color="#8BC34A" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h3 style={{"color":"#A0C4FF"}}>City Search</h3>
                            <p style={{color:"#D9E7FF"}}>Get weather details for any city.</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaGlobe size={22} color="#00BCD4" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h3 style={{"color":"#A0C4FF"}}>GPS Location</h3>
                            <p style={{color:"#D9E7FF"}}>Auto-detect your weather location.</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaStar size={22} color="#FFEB3B" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h3 style={{"color":"#A0C4FF"}}>Favorites</h3>
                            <p style={{color:"#D9E7FF"}}>Save frequently searched cities.</p>
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="none" style={{"--background": "#1e1e2f"}}>
                        <FaBolt size={22} color="#FF9800" style={{ marginRight: "10px" }} />
                        <IonLabel>
                            <h3 style={{"color":"#A0C4FF"}}>Fast & Responsive</h3>
                            <p style={{color:"#D9E7FF"}}>Optimized UI with smooth performance.</p>
                        </IonLabel>
                    </IonItem>
                </IonList>


            </IonContent>
            {/* Back to Dashboard Button */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <IonButton routerLink="/dashboard" style={{"--border-radius":"6px", "font-weight":"bold"}}>
                        Back to Dashboard
                    </IonButton>
            </div>

        </IonPage>
    );
};

export default About;
