import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRouterOutlet, IonSelect, IonSelectOption, IonSplitPane, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { format, isAfter, parseISO } from 'date-fns';
import { exitOutline, settingsOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import usuarioController from '../../services/Usuario';

const Pagina = function ({ children, title, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        modalAlterarUsuario = useRef(),
        [isModalAlterarUsuarioOpen, setIsModalAlterarUsuarioOpen] = useState(false),
        [altura, setAltura] = useState(0.0),
        [peso, setPeso] = useState(0.0),
        [dataNasc, setDataNasc] = useState(),
        [informarIdadeTexto, setInformarIdadeTexto] = useState(),
        [sexo, setSexo] = useState(),
        dateTimeDataNasc = useRef(),
        [alerta] = useIonAlert();

    function doLogout(e, setUserLogged) {
        usuarioController.logout({}, function (content, message, success) {
            if (!success) alerta(aviso(message));
            e.preventDefault();
            sessionStorage.clear();
            setUserLogged(false);
            history.push('/login');
        });
    }

    function formatDate(value) {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton hidden={!isUserLogged} onClick={(e) => setIsModalAlterarUsuarioOpen(true)}>
                            <IonIcon slot="icon-only" icon={settingsOutline} />
                        </IonButton>
                        <IonButton hidden={!isUserLogged} onClick={(e) => doLogout(e, setUserLogged)}>
                            <IonIcon slot="icon-only" icon={exitOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonModal ref={modalAlterarUsuario} className='modal-fullscreen' isOpen={isModalAlterarUsuarioOpen} onDidDismiss={() => { setIsModalAlterarUsuarioOpen(false); }}>
                    <IonContent>
                        <IonItem>
                            <IonLabel position="floating">Peso (Kg)</IonLabel>
                            <IonInput type="number" value={peso} onIonChange={e => setPeso(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Altura (Cm)</IonLabel>
                            <IonInput type="number" value={altura} onIonChange={e => setAltura(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Gênero</IonLabel>
                            <IonSelect value={sexo} onIonChange={e => setSexo(e.detail.value)} placeholder="Selecione">
                                <IonSelectOption value="f">Feminino</IonSelectOption>
                                <IonSelectOption value="m">Masculino</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Data de nascimento</IonLabel>
                        </IonItem>
                        <IonDatetime size="cover" presentation='date' ref={dateTimeDataNasc} onIonChange={e => {
                            const parsedDate = parseISO(e.detail.value);
                            if (isAfter(parsedDate, new Date())) return alert(aviso('A data de nascimento não deve ser após hoje.'));
                            setInformarIdadeTexto(formatDate(e.detail.value))
                            setDataNasc(parsedDate);
                            dateTimeDataNasc.current.confirm(false);
                        }} />
                    </IonContent>
                    <IonButton slot='fixed' fill='clear' onClick={(e) => {
                        //modalAgua.current.dismiss();
                        //salvarQuantidadeAgua();
                    }}>OK</IonButton>
                </IonModal>

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