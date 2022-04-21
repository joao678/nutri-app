import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import usuarioController from '../../services/Usuario';
import { aviso } from '../Aviso/Aviso';

const Pagina = function ({ children, title, isUserLogged, setUserLogged}) {
    const history = useHistory(),
        [alert] = useIonAlert();

    function doLogout(e, setUserLogged) {
        usuarioController.logout({}, function(content, message, success) {
            if(!success) alert(aviso(message));
            e.preventDefault();
            sessionStorage.clear();
            setUserLogged(false);
            history.push('/login');
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton hidden={!isUserLogged} onClick={(e) => doLogout(e, setUserLogged)}>
                            <IonIcon slot="icon-only" icon={exitOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {[children]}
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Pagina;