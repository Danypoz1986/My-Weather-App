import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import History from './pages/History';
import About from './pages/About';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode support */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import { useEffect, useState } from 'react';
import { getCurrentUser } from './firebaseConfig';  // Ensure this is correctly typed
import { useDispatch } from 'react-redux';
import { setUserState } from "./redux/userSlice";
import { User } from "firebase/auth"; // ✅ Use Firebase's User type
import { toast } from "./toast";

setupIonicReact();

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/results/:city" component={Results} />
        <Route exact path="/history" component={History} />
        <Route exact path="/about" component={About} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  const [busy, setBusy] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.toast = toast;
    }
    getCurrentUser()
      .then((user: User | null) => {
        if (user?.email) {
          dispatch(setUserState(user.email));
          window.history.replaceState({}, '', '/dashboard');
        } else {
          window.history.replaceState({}, '', '/');
        }
        setBusy(false);
      })
      .catch((error) => {
        console.error("Error checking user:", error);
        setBusy(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.toast = toast;  // ✅ This will now be recognized by TypeScript
    }
  }, []);

  return (
    <IonApp>
      {busy ? <IonSpinner /> : <RoutingSystem />}
    </IonApp>
  );
};

export default App;
