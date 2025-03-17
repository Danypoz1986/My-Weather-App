import { IonButton, IonList, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from '../toast';
import Lottie from 'lottie-react'
import { getWeatherAnimation } from '../utils/getWeatherAnimation';


const apiKey = import.meta.env.APP_WEATHER_API_KEY



const Results: React.FC = () => {

    interface weatherData{
        name: string;
        sys: { country: string };
        main: { temp: number; humidity: number };
        weather: { description: string }[];
        wind: { speed: number };
    }

    const { city } = useParams<{ city: string }>();
    const [weather, setWeather] = useState<weatherData | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    
    useEffect(() => {
        if(!city){
            return
        }
        const fetchWeather = async () => {
            setLoading(true);
            try{
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                if(!res.ok){
                    throw new Error("Failed to fetch weather data!")
                }
                const data = await res.json();
                setWeather(data);
            }catch (err: unknown){
                if(err instanceof Error){
                    setError(err.message)
                    toast(err.message, 'danger', 4000);
                }else{
                    setError("An unknown error occurred")
                    toast("An unknown error occurred", 'danger', 4000);
                }
            }finally{
                setLoading(false);
            }
        }
        fetchWeather();
    }, [city] )


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar style={{"--background":"#1e1e2f", marginTop:"30px"}}>
                    <IonTitle style={{textAlign:"center", color:"#A0C4FF", height:"60px"}}>Weather in {weather?.name}, {weather?.sys.country}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonLoading message="Fetching weather data..." isOpen={loading}/>

                {error && (
                <div style={{textAlign:"center", color: "red", display: "grid", placeItems:"center", height: "100vh"}}>
                    <h3>Error: {error}</h3>
                    <IonList style={{textAlign: "center", background: "none", marginTop:"70px"}}>
                   <IonButton
                   shape='round'
                   routerLink='/dashboard'
                   >BACK TO DASHBOARD
                   </IonButton>
                </IonList>
                </div>
                
                )}
                
                {!error && weather && (
                <div style={{textAlign:"center", color:"#A0C4FF"}}>
                    <p><h1><b>{weather?.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}, {weather?.sys.country}</b></h1></p>
                    <p><h5>Weather: <b>{weather?.weather?.[0].description}</b></h5></p>
                    <p><h5>Temperature: <b>{weather?.main.temp.toFixed(1)}°C</b></h5></p>
                    <p><h5>Wind: <b>{weather?.wind.speed} Km/h</b></h5></p>
                    <p><h5>Humidity: <b>{weather?.main.humidity}%</b></h5></p>
                </div>
                )}

                {!error && weather && (
                <div style={{textAlign:"center", marginTop:"20px"}}>
                   <Lottie animationData={getWeatherAnimation(weather?.weather?.[0].description)} loop autoplay style={{ width: "300px", height: "300px", margin: "auto" }} />
                </div>
                )}

                

                
            </IonContent>
                
            {!error && weather && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <IonButton routerLink="/dashboard" style={{"--border-radius":"6px", "font-weight":"bold"}}>
                        Back to Dashboard
                    </IonButton>
                </div>
                )}

        </IonPage>
    );
};

export default Results;