import { IonLoading, IonRouterLink } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Pagina from '../../../components/Pagina/Pagina';
import usuarioController from '../../../services/Usuario';

const ConfirmarUsuario = function ({ isUserLogged, setUserLogged, id }) {
    const history = useHistory(),
        [mensagem, setMensagem] = useState(''),
        [showLoading, setShowLoading] = useState(true);

    useEffect(()=>{
        usuarioController.confirmar({ id: id }, function(content, message, success) {
            setShowLoading(false);
            
            if(!success) {
                setMensagem(message);    
                return;
            }
    
            setMensagem('Usuario confirmado com sucesso!');
    
            setTimeout(() => {
                history.push('/');
            }, 5000);
        });
    }, []);

    return (
        <Pagina title="Login" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonLoading
                isOpen={showLoading}
                message={'Aguarde...'}
            />
            <div style={{ display: 'grid', height: '100%' }} className="ion-justify-content-center ion-align-items-center">
                <div className="vbox" style={{ gap: '5px' }}>
                    <h1>{mensagem}</h1>
                </div>
            </div>
        </Pagina>
    );
};

export default ConfirmarUsuario;