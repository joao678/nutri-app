import { IonRouterLink } from '@ionic/react';
import Pagina from '../../../components/Pagina/Pagina';

const CadastroEmailConfirmacao = function ({ isUserLogged, setUserLogged, email }) {
    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px', placeItems: 'center' }}>
                    <h1>O email de confirmação do usuario foi enviado para <b>{email}</b>!</h1>
                    <IonRouterLink href="/" class="underline align-middle" >Voltar</IonRouterLink>
                </div>
            </div>
        </Pagina>
    );
};

export default CadastroEmailConfirmacao;