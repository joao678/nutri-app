import { IonButton, IonInput, IonItem, IonLabel, IonLoading, IonRouterLink, IonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../../components/Pagina/Pagina';
import usuarioController from '../../../services/Usuario';

const Cadastro = function ({ isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [email, setEmail] = useState('joao678@gmail.com'),
        [emailConfirmacao, setEmailConfirmacao] = useState('joao678@gmail.com'),
        [password, setPassword] = useState('v12fv452'),
        [erro, setErro] = useState({ temErro: false, mensagem: '' }),
        [showLoading, setShowLoading] = useState(false);

    function doCadastrar(e, setUserLogged) {
        if(email ===  '' && emailConfirmacao === '') return setErro({ temErro: true, mensagem: 'Por favor informe um email' });
        if(email !== emailConfirmacao) return setErro({ temErro: true, mensagem: 'Os emails informados não são iguais' });

        setShowLoading(true);
        usuarioController.cadastrar({ email: email, senha: password }, function(content, message, success) {
            setShowLoading(false);
            setErro({ temErro: !success, mensagem: message });

            if(!success) return;
            e.preventDefault();

            history.push('/confirmacao-cadastro-usuario', { email: email });
        });
    }

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonLoading
                isOpen={showLoading}
                message={'Aguarde...'}
            />
            <div style={{ display: 'grid', height: '100%'  }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <IonText hidden={!erro.temErro} color="danger">{erro.mensagem}</IonText>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput pattern="email" type="email" value={email} onIonChange={e => setEmail(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Confirmar email</IonLabel>
                        <IonInput pattern="email" type="email" value={emailConfirmacao} onIonChange={e => setEmailConfirmacao(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonButton onClick={(e) => doCadastrar(e, setUserLogged)}>Cadastrar-se</IonButton>
                </div>
            </div>
        </Pagina>
    );
};

export default Cadastro;
