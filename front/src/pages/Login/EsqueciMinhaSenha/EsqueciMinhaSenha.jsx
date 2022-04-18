import { IonButton, IonInput, IonItem, IonLabel, IonLoading, IonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../../components/Pagina/Pagina';
import usuarioController from '../../../services/Usuario';


const EsqueciMinhaSenha = function ({ isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [email, setEmail] = useState('joao678@gmail.com'),
        [password, setPassword] = useState('v12fv452'),
        [loginErro, setLoginErro] = useState({ temErro: false, mensagem: '' }),
        [showLoading, setShowLoading] = useState(false);

    function doLogin(e, setUserLogged) {
        setShowLoading(true);

        usuarioController.recuperarSenha({ email: email }, function (content, message, success) {
            setShowLoading(false);
            setLoginErro({ temErro: !success, mensagem: message });

            if (!success) return;
            e.preventDefault();
            
            history.push('/esqueci-minha-senha-confirmacao');
        });
    }

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonLoading
                isOpen={showLoading}
                message={'Aguarde...'}
            />
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <IonText hidden={!loginErro.temErro} color="danger">{loginErro.mensagem}</IonText>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput pattern="email" type="email" value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <div className='hbox'>
                        <IonButton onClick={(e) => doLogin(e, setUserLogged)}>Enviar email de recuperação da senha</IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default EsqueciMinhaSenha;
