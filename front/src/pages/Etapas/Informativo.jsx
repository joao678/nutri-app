import { IonButton, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const Informativo = function ({ usuario, isUserLogged, setUserLogged }) {
    const history = useHistory();

    function proxEtapa(e, setUserLogged) {
        usuario.etapa += 1;
        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            //setLoginErro({ temErro: !success, mensagem: message });

            if (!success) return;
            e.preventDefault();

            history.push(`/etapas/${usuario.etapa}`, { usuario: usuario });
        });
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
                    <IonText color='warning'>
                        <p className='aviso-informativo'>Lembrando que a utilização desta aplicação não substitui o acompanhamento com um Nutricionista !</p>
                    </IonText>
                    <IonButton onClick={(e) => proxEtapa(e, setUserLogged)}>Concordo e desejo prosseguir</IonButton>
                </div>
            </div>
        </Pagina>
    );
};

export default Informativo;