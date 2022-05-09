import { IonButton, IonInput, IonItem, IonLabel, IonRouterLink, IonText } from '@ionic/react';
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
        usuarioController.login({ email: email, senha: password }, function (content, message, success) {
            setLoginErro({ temErro: !success, mensagem: message });

            if (!success) return;
            const usuario = content;

            e.preventDefault();
            sessionStorage.setItem('logged', true);
            sessionStorage.setItem('email', usuario.email);
            sessionStorage.setItem('etapa', usuario.etapa);
            setUserLogged(true);

            if(usuario.etapa === 8) return history.push('/home', { usuario: usuario });
            history.push(`/etapas/${usuario.etapa}`, { usuario: usuario });
        });
    }

    function doCadastro(e) {
        e.preventDefault();
        history.push('/cadastrar-se');
    }

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
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
                        <IonRouterLink href="/esqueci-minha-senha" class="underline align-middle" >Esqueci minha senha...</IonRouterLink>
                        <IonButton color="success" onClick={(e) => doLogin(e, setUserLogged)}>Login</IonButton>
                    </div>
                    <IonButton onClick={(e) => doCadastro(e, setUserLogged)}>Não possui cadstro? clique aqui</IonButton>
                </div>
            </div>
        </Pagina>
    );
};

export default Login;
