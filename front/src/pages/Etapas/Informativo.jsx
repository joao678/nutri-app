import { IonButton, IonInput, IonItem, IonLabel, IonRouterLink, IonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const Informativo = function ({ isUserLogged, setUserLogged, etapa, setEtapa }) {
    const history = useHistory(),
        [email, setEmail] = useState('joao678@gmail.com'),
        [password, setPassword] = useState('v12fv452'),
        [loginErro, setLoginErro] = useState({ temErro: false, mensagem: '' });

    function doLogin(e, setUserLogged) {
        // usuarioController.login({ email: email, senha: password }, function(content, message, success) {
        //     setLoginErro({ temErro: !success, mensagem: message });

        //     if(!success) return;
        //     e.preventDefault();
        //     sessionStorage.setItem('logged', true);
        //     sessionStorage.setItem('email', content.email);
        //     setUserLogged(true);

        //     switch (content.etapa) {
        //         case 1:
        //             history.push('/etapas/1');
        //             break;

        //         case 2:
        //             history.push('/etapas/2');
        //             break;
        //     }
        // });
    }

    return (
        <Pagina title="Questionário" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className='vbox vbox-informativo'>
                    <div className='texto-informativo'>
                        <IonText>
                            Para que possamos lhe auxiliar a alcançar seus objetivos e calcular a quantidade de calorias necessárias para seu consumo diário iremos lhe realizar alguns questionamentos.
                        </IonText>
                    </div>
                    <IonText color="warning">
                        <p className='aviso-informativo'>Lembrando que a utilização desta aplicação não substitui o acompanhamento com um Nutricionista !</p>
                    </IonText>
                    <IonButton onClick={(e) => doLogin(e, setUserLogged)}>Concordo e desejo prosseguir</IonButton>
                </div>
            </div>
        </Pagina>
    );
};

export default Informativo;