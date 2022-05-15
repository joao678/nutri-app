import { IonButton, IonIcon, IonText, useIonAlert } from '@ionic/react';
import { arrowForwardOutline, man, woman } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import usuarioController from '../../services/Usuario';
import './Etapas.css';

const PerguntarNivelAtividade = function ({ usuario, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        [nivelAtividade, setNivelAtividade] = useState(null),
        [textoNivelAtividade, setTextoNivelAtividade] = useState(null),
        [alerta] = useIonAlert();

    function proxEtapa(e, setUserLogged) {
        if (nivelAtividade === null) return alerta(aviso('Informe um nível de atividade física'));

        usuario.etapa += 1;
        usuario.anamnese.nivel_atividade = nivelAtividade;
        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            if (!success) return;
            e.preventDefault();

            history.push(`/home`, { usuario: usuario });
        });
    }

    return (
        <Pagina title="Questionário" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <div style={{ display: 'grid', height: '100%' }} className="ion-align-items-center">
                <div className='vbox vbox-informativo' style={{ width: '100%', gridTemplateRows: 'unset' }}>
                    <h1 className='ion-text-center'>Infome seu nível de atividade física</h1>
                    <div className='hbox' style={{ gap: '5px', placeItems: 'center' }}>
                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-4' onClick={() => { setTextoNivelAtividade('Sedentário'); setNivelAtividade(0)}}>
                            <span>Sedentário</span>
                        </div>
                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-4' onClick={() => { setTextoNivelAtividade('Pouco ativo'); setNivelAtividade(1)}}>
                            <span>Pouco ativo</span>
                        </div>
                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-4' onClick={() => { setTextoNivelAtividade('Ativo'); setNivelAtividade(2)}}>
                            <span>Ativo</span>
                        </div>
                        <div className='botoes-centrais botao-primary botoes-centrais-grid-num-4' onClick={() => { setTextoNivelAtividade('Muito ativo'); setNivelAtividade(3)}}>
                            <span>Muito ativo</span>
                        </div>
                    </div>
                    <div>
                        <IonText color="dark" hidden={nivelAtividade === null}>
                            <p className='escolha-informativo'>Gênero escolhido: {textoNivelAtividade}</p>
                        </IonText>
                        <IonButton expand='full' onClick={(e) => proxEtapa(e, setUserLogged)}> <IonIcon slot="end" icon={arrowForwardOutline} /> </IonButton>
                    </div>
                </div>
            </div>
        </Pagina>
    );
};

export default PerguntarNivelAtividade;