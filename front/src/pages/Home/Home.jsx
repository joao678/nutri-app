import { IonContent, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { add } from 'ionicons/icons';
import { useRef, useState } from 'react';
import Pagina from '../../components/Pagina/Pagina';
import GraficoHomeOptions from './Graficos/GraficoHomeOptions.js';
import './Home.css';

const Home = function ({ isUserLogged, setUserLogged }) {
    const [options, setOptions] = useState(GraficoHomeOptions),
        [modalAberto, setModalAberto] = useState(false),
        modalMeta = useRef();

    function onClickAdicionarAlimento(e) {
        setModalAberto(true);
    }

    return (
        <Pagina title="Home" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonModal ref={modalMeta} className='modal-meta' isOpen={modalAberto} onDidDismiss={() => { setModalAberto(false) }}>
                <IonContent>
                    <div className='vbox' style={{ height: '100%', alignContent: 'space-between' }}>
                        {/* <IonItem>
                            <IonLabel position="floating">Meta de peso a {tipoMeta === 'perder' ? 'perder' : 'ganhar'} (Kg)</IonLabel>
                            <IonInput autocomplete='cc-number' type="number" value={pesoMeta} onIonChange={e => setPesoMeta(e.detail.value)}></IonInput>
                        </IonItem>
                        <div className='hbox'>
                            <IonButton fill='clear' onClick={(e) => modalMeta.current.dismiss()}>OK</IonButton>
                        </div> */}
                    </div>
                </IonContent>
            </IonModal>


            <div className="vbox" style={{ height: '100%', gridTemplateRows: '1fr 1fr 0fr 1fr' }}>
                <HighchartsReact containerProps={{ className: 'grafico-home' }} highcharts={Highcharts} options={options} />
                <div className='hbox' style={{ placeItems: 'center' }}>
                    <div className='hbox panel-generico-home panel-nutrientes' style={{ placeItems: 'center' }}>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Carb.</h3>
                            <h5>Masculino</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Prot.</h3>
                            <h5>Masculino</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Gord.</h3>
                            <h5>Masculino</h5>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <h4>Monitor de consumo de água</h4>
                </div>
                <div className='vbox' style={{ placeItems: 'center', alignItems: 'start' }}>
                    <div className='hbox panel-generico-home panel-monitor-agua' style={{ gridTemplateColumns: '1fr 1fr', gap: '5px', placeItems: 'center', transform: 'scale(0.8)' }}>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido'></span>
                        </div>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido'></span>
                        </div>
                        <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                            <span className='copo-liquido'></span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className='botoes-centrais item-monitor-agua botoes-centrais-grid-num-4 copo' onClick={(e) => { }}>
                                <span className='copo-liquido'></span>
                            </div>
                            <IonFabButton className='fab-consumo-agua'><IonIcon icon={add}></IonIcon></IonFabButton>
                        </div>
                    </div>
                </div>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={onClickAdicionarAlimento}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
            </div>
        </Pagina>
    );
};

export default Home;