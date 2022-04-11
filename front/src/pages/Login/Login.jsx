import { IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Login.css';

const Login = function ({ isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [email, setEmail] = useState('joao678@gmail.com'),
        [password, setPassword] = useState('v12fv452'),
        [loginErro, setLoginErro] = useState({ temErro: false, mensagem: '' });

    function doLogin(e, setUserLogged) {
        usuarioController.login({ email: email, senha: password }, function(content, message, success) {
            setLoginErro({ temErro: !success, mensagem: message });

            if(!success) return;
            e.preventDefault();
            sessionStorage.setItem('logged', true);
            sessionStorage.setItem('email', content.email);
            setUserLogged(true);
            history.push('/home');
        });
    }

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%'  }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <IonText hidden={!loginErro.temErro} color="danger">{loginErro.mensagem}</IonText>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput pattern="email" type="email" value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value)}></IonInput>
                    </IonItem>
                    <div className='hbox'>
                        <IonButton onClick={(e) => doLogin(e, setUserLogged)}>Login</IonButton>
                        <IonButton onClick={(e) => doLogin(e, setUserLogged)}>Login</IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default Login;
