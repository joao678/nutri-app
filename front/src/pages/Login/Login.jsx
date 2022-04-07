import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import Pagina from '../../components/Pagina/Pagina';
import './Login.css';

const Login = function ({setUserLogged}) {
    const history = useHistory();
    
    return (
        <Pagina title="Login" setUserLogged={setUserLogged}>
            <div>
                <IonButton onClick={(e) => {
                    e.preventDefault();
                    sessionStorage.setItem('logged', true);
                    setUserLogged(true);
                    history.push('/home');
                }}>Login</IonButton>
            </div>
        </Pagina>
    );
};

export default Login;
