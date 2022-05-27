import { IonButton, IonContent, IonDatetime, IonIcon, IonModal, IonText, useIonAlert } from '@ionic/react';
import { format, isAfter, isDate, parseISO } from 'date-fns';
import { arrowForwardOutline, calendar } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const PerguntarIdade = function ({ usuario, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [informarIdadeTexto, setInformarIdadeTexto] = useState(),
        [dataNasc, setDataNasc] = useState(),
        [alerta] = useIonAlert(),
        dateTimeDataNasc = useRef();

    function proxEtapa(e, setUserLogged) {
        if (!dataNasc) return alerta(aviso('É necessário informar uma data de nascimento'));
        if (!isDate(dataNasc)) return alerta(aviso('Informe uma data válida'));

        usuario.etapa += 1;
        usuario.data_nasc = dataNasc;
        usuario.data_nasc.setHours(0, 0, 0, 0);
        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            if (!success) return;
            e.preventDefault();

            history.push(`/etapas/${usuario.etapa}`, { usuario: usuario });
        });
    }

    function formatDate(value) {
        return format(parseISO(value), 'dd/MM/yyyy');
    };

    return (
        <Pagina title="Questionário" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonModal trigger="open-modal">
                <IonContent force-overscroll="false">
                    <IonDatetime className='perguntar-idade-iondatetime' presentation='date' ref={dateTimeDataNasc} onIonChange={e => {
                        const parsedDate = parseISO(e.detail.value);
                        if (isAfter(parsedDate, new Date())) return alerta(aviso('A data de nascimento não deve ser após hoje.'));
                        setInformarIdadeTexto(formatDate(e.detail.value))
                        setDataNasc(parsedDate);
                        dateTimeDataNasc.current.confirm(true);
                    }}></IonDatetime>
                </IonContent>
            </IonModal>
            <div style={{ display: 'grid', height: '100%' }} className="ion-align-items-center">
                <div className='vbox vbox-informativo' style={{ width: '100%', gridTemplateRows: 'unset' }}>
                    <h1 className='ion-text-center'>Informe sua data de nascimento clicando sob o calendário</h1>
                    <div className='hbox' style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', placeItems: 'center' }}>
                        <div></div>
                        <div className='botoes-centrais botao-calendario'>
                            <IonIcon id="open-modal" icon={calendar} />
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <IonText color="dark" hidden={!informarIdadeTexto}>
                            <p className='escolha-informativo'>Data escolhida: {informarIdadeTexto}</p>
                        </IonText>
                        <IonButton expand='full' onClick={(e) => proxEtapa(e, setUserLogged)}> <IonIcon slot="end" icon={arrowForwardOutline} /> </IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default PerguntarIdade;