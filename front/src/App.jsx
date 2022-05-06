import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { home, serverOutline } from 'ionicons/icons';
import { useState } from 'react';
import BaseRoutes from './components/Routes/BaseRoutes';
import './theme/utils.css';
/* Theme variables */
import './theme/variables.css';
import './theme/charts.css';

setupIonicReact();

const App = function () {
    const [isUserLogged, setUserLogged] = useState(sessionStorage.getItem("logged") === "true");
    const etapa = sessionStorage.getItem("etapa");

    return (
        // <IonApp>
        //     <IonReactRouter>
        //         <IonTabs>
        //             <IonRouterOutlet>
        //                 <BaseRoutes isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={etapa} />
        //             </IonRouterOutlet>
        //             <IonTabBar slot="bottom" style={isUserLogged && parseInt(etapa) === 8 ? {} : { display: 'none' }}>
        //                 <IonTabButton tab="home" href="/home">
        //                     <IonIcon icon={home} />
        //                     <IonLabel>Home</IonLabel>
        //                 </IonTabButton>
        //                 <IonTabButton tab="tabela-alimentos" href="/tabela-alimentos">
        //                     <IonIcon icon={serverOutline} />
        //                     <IonLabel>Tabela de alimentos</IonLabel>
        //                 </IonTabButton>
        //             </IonTabBar>
        //         </IonTabs>
        //     </IonReactRouter>
        // </IonApp>
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <BaseRoutes isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={etapa} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
