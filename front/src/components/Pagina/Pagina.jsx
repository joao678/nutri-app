import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Pagina = function ({ children, title, setUserLogged }) {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={(e) => {
                            e.preventDefault();
                            sessionStorage.clear();
                            setUserLogged(false);
                            history.push('/');
                        }}>
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