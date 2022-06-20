import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonText, useIonAlert } from '@ionic/react';
import { arrowDown, arrowForwardOutline, arrowUp, remove } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const PerguntarMeta = function ({ usuario, isUserLogged, setUserLogged, etapa }) {
    const history = useHistory(),
        [modalAberto, setModalAberto] = useState(false),
        [tipoMeta, setTipoMeta] = useState('perder'),
        [pesoMeta, setPesoMeta] = useState(0),
        [alerta] = useIonAlert(),
        modalMeta = useRef();

    function proxEtapa(e) {
        if (pesoMeta === 0 && tipoMeta !== 'manter') return alerta(aviso('A meta de peso não deve ser igual a 0'));

        switch (tipoMeta) {
            case 'perder':
                usuario.anamnese.peso_perder = pesoMeta;
                break;
            case 'ganhar':
                usuario.anamnese.peso_ganhar = pesoMeta;
                break;
        }

        usuario.etapa += 1;

        switch (tipoMeta) {
            case 'perder':
                usuario.anamnese.meta = 0;
                break;
            case 'manter':
                usuario.anamnese.meta = 1;
                break;
            case 'ganhar':
                usuario.anamnese.meta = 2;
                break;
        }

        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            if (!success) return;
            e.preventDefault();

            history.push(`/etapas/${usuario.etapa}`, { usuario: usuario });
        });
    }

    return (
        <Pagina title="Questionário" isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={etapa}>
            <IonModal ref={modalMeta} className='modal-meta' isOpen={modalAberto} onDidDismiss={() => { setModalAberto(false) }}>
                <IonContent>
                    <div className='vbox' style={{ height: '100%', alignContent: 'space-between' }}>
                        <IonItem>
                            <IonLabel position="floating">Meta de peso a {tipoMeta === 'perder' ? 'perder' : 'ganhar'} (Kg)</IonLabel>
                            <IonInput type="number" value={pesoMeta} onIonChange={e => setPesoMeta(e.detail.value)}></IonInput>
                        </IonItem>
                        <div className='hbox'>
                            <IonButton fill='clear' onClick={(e) => modalMeta.current.dismiss()}>OK</IonButton>
                        </div>
                    </div>
                </IonContent>
            </IonModal>

            <div style={{ display: 'grid', height: '100%' }} className="ion-align-items-center">
                <div className='vbox vbox-informativo' style={{ width: '100%', gridTemplateRows: 'unset' }}>
                    <h1 className='ion-text-center'>Informe sua meta de peso</h1>
                    <div className='hbox' style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', placeItems: 'center' }}>
                        <div className='botoes-centrais botao-danger botoes-centrais-grid-num-3' onClick={(e) => { setPesoMeta(0); setTipoMeta('perder'); setModalAberto(true) }}>
                            <IonIcon icon={arrowDown} />
                            <span>Perder peso</span>
                        </div>

                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-3' onClick={(e) => { setPesoMeta(0); setTipoMeta('manter'); }}>
                            <IonIcon icon={remove} />
                            <span>Manter peso</span>
                        </div>

                        <div className='botoes-centrais botao-success botoes-centrais-grid-num-3' onClick={(e) => { setPesoMeta(0); setTipoMeta('ganhar'); setModalAberto(true) }} >
                            <IonIcon icon={arrowUp} />
                            <span>Ganhar peso</span>
                        </div>
                    </div>
                    <div>
                        <IonText color="dark" hidden={tipoMeta !== 'manter'}>
                            <p className='escolha-informativo'>Meta escolhida: manter o peso</p>
                        </IonText>
                        <IonText color="dark" hidden={!parseInt(pesoMeta)}>
                            <p className='escolha-informativo'>Meta escolhida: {tipoMeta === 'perder' ? 'perder' : 'ganhar'} {pesoMeta}Kg</p>
                        </IonText>
                        <IonButton expand='full' onClick={(e) => proxEtapa(e, setUserLogged)}> <IonIcon slot="end" icon={arrowForwardOutline} /> </IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default PerguntarMeta;