import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    useIonActionSheet
} from '@ionic/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { add, bicycle, pizza, water } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import Pagina from '../../components/Pagina/Pagina';
import GraficoHomeOptions from './Graficos/GraficoHomeOptions.js';
import aguaController from '../../services/Agua';
import './Home.css';
import './ModalHome.css';
import { aviso } from '../../components/Aviso/Aviso';

const Home = function ({ isUserLogged, setUserLogged, usuario }) {
    const [options, setOptions] = useState(GraficoHomeOptions),
        [isAguaModalOpen, setIsAguaModalOpen] = useState(false),
        [quantidadeAgua, setQuantidadeAgua] = useState(0),
        [showLoading, setShowLoading] = useState(false),
        [styleCopoLiquido1, setStyleCopoLiquido1] = useState({}),
        [styleCopoLiquido2, setStyleCopoLiquido2] = useState({}),
        [styleCopoLiquido3, setStyleCopoLiquido3] = useState({}),
        [styleCopoLiquido4, setStyleCopoLiquido4] = useState({}),
        modalAgua = useRef(),
        [mostrarActionSheet] = useIonActionSheet();

    useEffect(()=>{
        atualizarCoposAgua();
    },[]);

    function atualizarCoposAgua() {
        if(!usuario) return;
        let quantidadeAgua = usuario.anamnese.agua_diarios.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.quantidade, 0);
        let numCopo = 1;
        while(numCopo <= 4) {
            let porcentagem = (100 * quantidadeAgua) / 150;
            if(porcentagem > 100) porcentagem = 100;
            switch (numCopo) {
                case 1:
                    setStyleCopoLiquido1({ clipPath: `polygon(0% ${100 - porcentagem}%, 100% ${100 - porcentagem}%, 100% 100%, 0 100%)` });
                    break;
                case 2:
                    setStyleCopoLiquido2({ clipPath: `polygon(0% ${100 - porcentagem}%, 100% ${100 - porcentagem}%, 100% 100%, 0 100%)` });
                    break;
                case 3:
                    setStyleCopoLiquido3({ clipPath: `polygon(0% ${100 - porcentagem}%, 100% ${100 - porcentagem}%, 100% 100%, 0 100%)` }) 
                    break;
                case 4:
                    setStyleCopoLiquido4({ clipPath: `polygon(0% ${100 - porcentagem}%, 100% ${100 - porcentagem}%, 100% 100%, 0 100%)` }) 
                    break;
            }

            quantidadeAgua -= 150;
            numCopo += 1;
        }
    }

    function onClickActionSheetOpcoesAdicionar(e) {
        mostrarActionSheet({
            buttons: [
                {
                    text: 'Adicionar água', icon: water, handler: () => setIsAguaModalOpen(true)
                },
                { text: 'Adicionar alimentação', icon: pizza },
                { text: 'Adicionar exercício', icon: bicycle },
            ]
        })
    }

    function salvarQuantidadeAgua() {
        const dto = {
            quantidade: quantidadeAgua
        };

        setShowLoading(true);
        aguaController.adicionarAgua(dto, function(content, message, success) {
            if(!success) alert(aviso(message));
            setShowLoading(false);
            setQuantidadeAgua(0);

            usuario.anamnese.agua_diarios.push(content);
            atualizarCoposAgua();
        });
    }

    return (
        <Pagina title="Home" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonLoading isOpen={showLoading} message={'Aguarde...'} />
            <IonModal ref={modalAgua} className='modal-agua' isOpen={isAguaModalOpen} onDidDismiss={() => setIsAguaModalOpen(false)}>
                <IonContent force-overscroll="false">
                    <div className='vbox' style={{ height: '100%', alignContent: 'space-between' }}>
                        <IonItem>
                            <IonLabel position="floating">Informe a quantidade de água (ml)</IonLabel>
                            <IonInput autocomplete='cc-number' type="number" value={quantidadeAgua} onIonChange={e => setQuantidadeAgua(e.detail.value)}></IonInput>
                        </IonItem>
                        <div className='hbox'>
                            <IonButton fill='clear' onClick={(e) => {
                                modalAgua.current.dismiss();
                                salvarQuantidadeAgua();
                            }}>OK</IonButton>
                        </div>
                    </div>
                </IonContent>
            </IonModal>

            <div className="vbox" style={{ height: '100%', gridTemplateRows: '1fr 1fr 0fr 1fr' }}>
                <HighchartsReact containerProps={{ className: 'grafico-home' }} highcharts={Highcharts} options={options} />
                <div className='hbox' style={{ placeItems: 'center' }}>
                    <div className='hbox panel-generico-home panel-nutrientes' style={{ placeItems: 'center' }}>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Carb.</h3>
                            <h5>0/27g</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Prot.</h3>
                            <h5>0/100g</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Gord.</h3>
                            <h5>0/10g</h5>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <h4>Monitor de consumo de água</h4>
                </div>
                <div className='vbox' style={{ placeItems: 'center', alignItems: 'start' }}>
                    <div className='hbox panel-generico-home panel-monitor-agua' style={{ gridTemplateColumns: '1fr 1fr', gap: '5px', placeItems: 'center', transform: 'scale(0.8)' }}>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido' style={styleCopoLiquido1}></span>
                        </div>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido' style={styleCopoLiquido2}></span>
                        </div>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido' style={styleCopoLiquido3}></span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                                <span className='copo-liquido' style={styleCopoLiquido4}></span>
                            </div>
                            <IonFabButton onClick={() => setIsAguaModalOpen(true)} className='fab-consumo-agua'><IonIcon icon={add}></IonIcon></IonFabButton>
                        </div>
                    </div>
                </div>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={onClickActionSheetOpcoesAdicionar}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </div>
        </Pagina>
    );
};

export default Home;