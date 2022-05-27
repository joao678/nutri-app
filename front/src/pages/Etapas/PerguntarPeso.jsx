import { IonButton, IonIcon, IonInput, IonItem, IonLabel, useIonAlert } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const PerguntarPeso = function ({ usuario, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [peso, setPeso] = useState(0.0),
        [alerta] = useIonAlert();

    function proxEtapa(e, setUserLogged) {
        if(peso === 0) return alerta(aviso('O peso não deve ser igual a 0'));

        usuario.etapa += 1;
        usuario.peso = peso;
        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            if (!success) return;
            e.preventDefault();

            history.push(`/etapas/${usuario.etapa}`, { usuario: usuario });
        });
    }

    return (
        <Pagina title="Questionário" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-align-items-center">
                <div className='vbox vbox-informativo' style={{ width: '100%', gridTemplateRows: 'unset' }}>
                    <h1 className='ion-text-center'>Informe seu peso</h1>
                    <div className='hbox' style={{ gridTemplateColumns: '1fr' }}>
                        <IonItem>
                            <IonLabel position="floating">Peso (Kg)</IonLabel>
                            <IonInput  type="number" value={peso} onIonChange={e => setPeso(e.detail.value)}></IonInput>
                        </IonItem>
                    </div>
                    <div>
                        <IonButton expand='full' onClick={(e) => proxEtapa(e, setUserLogged)}> <IonIcon slot="end" icon={arrowForwardOutline} /> </IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default PerguntarPeso;