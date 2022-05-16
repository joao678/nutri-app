import {
    IonButton,
    IonContent,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonLoading,
    IonModal, useIonActionSheet,
    useIonAlert
} from '@ionic/react';
import { format, formatISO, startOfToday } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { add, bicycle, pizza, search, water } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import aguaController from '../../services/Agua';
import exercicioController from '../../services/Exercicio';
import GraficoHomeOptions from './Graficos/GraficoHomeOptions.js';
import './Home.css';
import './ModalHome.css';

const Home = function ({ isUserLogged, setUserLogged, usuario }) {
    const [options, setOptions] = useState(GraficoHomeOptions),
        [isAguaModalOpen, setIsAguaModalOpen] = useState(false),
        [isExercicioModalOpen, setIsExercicioModalOpen] = useState(false),
        [isExercicioDataPraticadaModalOpen, setIsExercicioDataPraticadaModalOpen] = useState(false),
        [quantidadeAgua, setQuantidadeAgua] = useState(0),
        [pesquisaExercicio, setPesquisaExercicio] = useState(''),
        [tempoPraticado, setTempoPraticado] = useState(formatISO(startOfToday())),
        [showLoading, setShowLoading] = useState(false),
        [styleCopoLiquido1, setStyleCopoLiquido1] = useState({}),
        [styleCopoLiquido2, setStyleCopoLiquido2] = useState({}),
        [styleCopoLiquido3, setStyleCopoLiquido3] = useState({}),
        [styleCopoLiquido4, setStyleCopoLiquido4] = useState({}),
        [listaExerciciosBase, setListaExerciciosBase] = useState([]),
        [listaExercicios, setlistaExercicios] = useState([]),
        [alerta] = useIonAlert(),
        modalAgua = useRef(),
        modalExercicio = useRef(),
        modalDataExercicioTempoPraticado = useRef(),
        dateTimeTempoPraticado = useRef(),
        [mostrarActionSheet] = useIonActionSheet();

    useEffect(() => {
        atualizarCoposAgua();
    }, []);

    useEffect(() => {
        if (!listaExercicios) return;

        if (!pesquisaExercicio) return setlistaExercicios(listaExerciciosBase.map((exercicio) => (
            <IonItem key={exercicio.id}>
                <IonLabel>{exercicio.descricao}</IonLabel>
            </IonItem>
        )));

        setlistaExercicios(listaExerciciosBase.filter((exercicioBase) => exercicioBase.descricao.toLowerCase().includes(pesquisaExercicio)).map((exercicio) => (
            <IonItem button key={exercicio.id}>
                <IonLabel>{exercicio.descricao}</IonLabel>
            </IonItem>
        )));
    }, [pesquisaExercicio]);

    function atualizarCoposAgua() {
        if (!usuario) return;
        let quantidadeAgua = usuario.anamnese.agua_diarios.reduce((valorAnterior, valorAtual) => valorAnterior + valorAtual.quantidade, 0);
        let numCopo = 1;
        while (numCopo <= 4) {
            let porcentagem = (100 * quantidadeAgua) / 150;
            if (porcentagem > 100) porcentagem = 100;
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

    function recuperarExercicios(e) {
        exercicioController.recuperarExercicios({}, function (content, message, success) {
            if (!success) return alerta(aviso(message));
            setListaExerciciosBase(content);
            setlistaExercicios(content.map((exercicio) => (
                <IonItem button key={exercicio.id} onClick={function () {
                    modalExercicio.current.dismiss();
                }}>
                    <IonLabel>{exercicio.descricao}</IonLabel>
                </IonItem>
            )));
        });
    }

    function onClickActionSheetOpcoesAdicionar(e) {
        mostrarActionSheet({
            buttons: [
                { text: 'Adicionar água', icon: water, handler: () => setIsAguaModalOpen(true) },
                { text: 'Adicionar alimentação', icon: pizza },
                { text: 'Adicionar exercício', icon: bicycle, handler: function () { recuperarExercicios(); setIsExercicioModalOpen(true); } },
            ]
        })
    }

    function salvarQuantidadeAgua() {
        const dto = {
            quantidade: quantidadeAgua
        };

        setShowLoading(true);
        aguaController.adicionarAgua(dto, function (content, message, success) {
            if (!success) alerta(aviso(message));
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

            <IonModal ref={modalDataExercicioTempoPraticado} className='modal-exercicio-informar-tempo' isOpen={isExercicioDataPraticadaModalOpen} onDidDismiss={() => setIsExercicioDataPraticadaModalOpen(false)}>
                <IonDatetime className='ion-datetime-modal-exercicio' presentation='time' value={tempoPraticado} ref={dateTimeTempoPraticado} onIonChange={e => setTempoPraticado(e.detail.value)}></IonDatetime>
                <IonButton fill='clear' onClick={(e) => {
                    modalDataExercicioTempoPraticado.current.dismiss();
                }}>OK</IonButton>
            </IonModal>

            <IonModal ref={modalExercicio} className='modal-exercicio' isOpen={isExercicioModalOpen} onDidDismiss={() => { setIsExercicioModalOpen(false); setPesquisaExercicio(''); setTempoPraticado(formatISO(startOfToday())) }}>
                <div slot='fixed'>
                    <IonItem button onClick={() => setIsExercicioDataPraticadaModalOpen(true)}>
                        <IonLabel color='primary'>{format(new Date(tempoPraticado), 'HH:mm') !== '00:00' ? `Tempo praticado: ${format(new Date(tempoPraticado), "H 'horas e ' m ' minutos'")}` : 'Informe o tempo...'}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonInput inputmode='search' inputMode='search' value={pesquisaExercicio} onIonChange={e => setPesquisaExercicio(e.detail.value)}></IonInput>
                        <IonIcon slot='end' icon={search}></IonIcon>
                    </IonItem>
                </div>
                <IonContent>
                    <IonList>
                        {listaExercicios}
                    </IonList>
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