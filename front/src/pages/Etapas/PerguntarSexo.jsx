import { IonButton, IonIcon, IonText, useIonAlert } from '@ionic/react';
import { arrowForwardOutline, man, woman } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const PerguntarSexo = function ({ usuario, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [sexo, setSexo] = useState(null),
        [alert] = useIonAlert();

    function proxEtapa(e, setUserLogged) {
        if (!sexo) return alert(aviso('Escolha um gênero'));

        usuario.etapa += 1;
        usuario.sexo = sexo;
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
                    <h1 className='ion-text-center'>Informe seu sexo</h1>
                    <div className='hbox' style={{ gridTemplateColumns: '1fr 1fr', gap: '5px', placeItems: 'center' }}>
                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-2' onClick={(e) => { setSexo('m'); }}>
                            <IonIcon icon={man}/>
                            <span>Masculino</span>
                        </div>

                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-2' onClick={(e) => { setSexo('f'); }}>
                            <IonIcon icon={woman}/>
                            <span>Feminino</span>
                        </div>
                    </div>
                    <div>
                        <IonText color="dark" hidden={!sexo}>
                            <p className='escolha-informativo'>Gênero escolhido: {sexo === 'm' ? 'masculino' : 'feminino'}</p>
                        </IonText>
                        <IonButton expand='full' onClick={(e) => proxEtapa(e, setUserLogged)}> <IonIcon slot="end" icon={arrowForwardOutline} /> </IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default PerguntarSexo;