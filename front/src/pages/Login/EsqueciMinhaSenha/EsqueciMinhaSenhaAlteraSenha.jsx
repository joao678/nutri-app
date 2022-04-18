import { IonButton, IonInput, IonItem, IonLabel, IonRouterLink, IonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../../components/Pagina/Pagina';
import usuarioController from '../../../services/Usuario';

const EsqueciMinhaSenhaAlteraSenha = function ({ isUserLogged, setUserLogged, id }) {
    const history = useHistory(),
        [password, setPassword] = useState(''),
        [passwordComparacao, setPasswordComparacao] = useState(''),
        [loginErro, setLoginErro] = useState({ temErro: false, mensagem: '' });

    function doAlterarSenha(e, setUserLogged) {
        if(password !== passwordComparacao)
            return setLoginErro({ temErro: true, mensagem: 'As senhas não são iguais' });

        usuarioController.alterarSenha({ id: id, senha: password }, function (content, message, success) {
            setLoginErro({ temErro: !success, mensagem: message });

            if (!success) return;
            e.preventDefault();

            history.push('/esqueci-minha-senha-senha-alterada-confirmacao');
        });
    }

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <IonText hidden={!loginErro.temErro} color="danger">{loginErro.mensagem}</IonText>
                    <IonItem>
                    <IonLabel position="floating">Nova senha</IonLabel>
                        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Confirmar senha</IonLabel>
                        <IonInput type="password" value={passwordComparacao} onIonChange={e => setPasswordComparacao(e.detail.value)}></IonInput>
                    </IonItem>
                    <div className='hbox'>
                        <IonButton onClick={(e) => doAlterarSenha(e, setUserLogged)}>Alterar senha</IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default EsqueciMinhaSenhaAlteraSenha;
