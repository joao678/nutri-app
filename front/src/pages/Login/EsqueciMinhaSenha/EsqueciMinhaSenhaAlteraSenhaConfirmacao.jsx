import { useHistory } from 'react-router';
import Pagina from '../../../components/Pagina/Pagina';

const EsqueciMinhaSenhaAlteraSenhaConfirmacao = function ({ isUserLogged, setUserLogged }) {
    const history = useHistory();

    setTimeout(() => {
        history.push('/');
    }, 5000);

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <h1>Senha alterada com sucesso!</h1>
                </div>
            </div>
        </Pagina>
    );
};

export default EsqueciMinhaSenhaAlteraSenhaConfirmacao;