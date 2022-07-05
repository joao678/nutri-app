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
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import { add, bicycle, pizza, search, water } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import aguaController from '../../services/Agua';
import alimentoController from '../../services/Alimentos';
import exercicioController from '../../services/Exercicio';
import GraficoHomeOptions from './Graficos/GraficoHomeOptions.js';
import './Home.css';
import './ModalHome.css';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

Highcharts.setOptions({
    lang: {
        numericSymbols: null,
    }
});

const Home = function ({ isUserLogged, setUserLogged, usuario, etapa }) {
    const [options, setOptions] = useState(GraficoHomeOptions),
        [isAguaModalOpen, setIsAguaModalOpen] = useState(false),
        [isExercicioModalOpen, setIsExercicioModalOpen] = useState(false),
        [isAlimentoModalOpen, setIsAlimentoModalOpen] = useState(false),
        [isExercicioDataPraticadaModalOpen, setIsExercicioDataPraticadaModalOpen] = useState(false),
        [quantidadeAgua, setQuantidadeAgua] = useState(0),
        [quantidadeAlimento, setQuantidadeAlimento] = useState(0),
        [pesquisaExercicio, setPesquisaExercicio] = useState(''),
        [pesquisaAlimentos, setPesquisaAlimentos] = useState(''),
        [tempoPraticado, setTempoPraticado] = useState(formatISO(startOfToday())),
        [showLoading, setShowLoading] = useState(false),
        [styleCopoLiquido1, setStyleCopoLiquido1] = useState({}),
        [styleCopoLiquido2, setStyleCopoLiquido2] = useState({}),
        [styleCopoLiquido3, setStyleCopoLiquido3] = useState({}),
        [styleCopoLiquido4, setStyleCopoLiquido4] = useState({}),
        [listaExerciciosBase, setListaExerciciosBase] = useState([]),
        [listaAlimentosBase, setListaAlimentosBase] = useState([]),
        [listaExercicios, setlistaExercicios] = useState([]),
        [listaAlimentos, setlistaAlimentos] = useState([]),
        [metaCarb, setMetaCarb] = useState(0),
        [metaProt, setMetaProt] = useState(0),
        [metaGord, setMetaGord] = useState(0),
        [alerta] = useIonAlert(),
        modalAgua = useRef(),
        modalExercicio = useRef(),
        modalAlimento = useRef(),
        modalDataExercicioTempoPraticado = useRef(),
        dateTimeTempoPraticado = useRef(),
        refTempoPraticado = useRef(tempoPraticado),
        refQuantidadeAlimento = useRef(quantidadeAlimento),
        [mostrarActionSheetAdicionarOpcoes] = useIonActionSheet();

    function calcularMetaAlimentosGrafico() {
        let quantKcal = usuario.anamnese.alimento_diarios.reduce((acumuladorCaloria, alimento) => {
            return acumuladorCaloria + ((parseFloat(alimento.calorias) * parseFloat(alimento.quantidade)) / 100);
        }, 0);

        const quantKcalExercicios = usuario.anamnese.exercicio_diarios.reduce((acumuladorExercicio, exercicio) => {
            const horas = parseInt(exercicio.tempo.split(':')[0]);
            const minutos = parseInt(exercicio.tempo.split(':')[1]) / 60;
            return acumuladorExercicio + parseFloat(exercicio.met) * parseFloat(usuario.peso) * (horas + minutos);
        }, 0);

        quantKcal = quantKcal - quantKcalExercicios;

        setOptions((prevState) => {
            prevState.series.data = [quantKcal];
            return {...prevState};
        });
    }

    function calcularMetaCarbProtGord() {
        setMetaCarb(usuario.anamnese.alimento_diarios.reduce((prev, atual) => prev + parseFloat(atual.carboidratos), 0).toFixed(2));
        setMetaProt(usuario.anamnese.alimento_diarios.reduce((prev, atual) => prev + parseFloat(atual.proteinas), 0).toFixed(2));
        setMetaGord(usuario.anamnese.alimento_diarios.reduce((prev, atual) => prev + parseFloat(atual.gorduras), 0).toFixed(2));
    }

    function atualizarCoposAgua() {
        if (!usuario) return;
        let quantidadeAgua = usuario.anamnese.agua_diarios.reduce((valorAnterior, valorAtual) => valorAnterior + parseInt(valorAtual.quantidade), 0);
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
        exercicioController.recuperarExercicios(function (content, message, success) {
            if (!success) return alerta(aviso(message));
            setListaExerciciosBase(content);
            setlistaExercicios(content.map((exercicio) => (
                <ListaExercicioItem key={exercicio.id} met={exercicio.met} descricao={exercicio.descricao} id={exercicio.id} />
            )));
        });
    }

    function recuperarAlimentos(e) {
        alimentoController.getAllAlimentos(function (content, message, success) {
            if (!success) return alerta(aviso(message));

            const alimentos = content.map((alimento) => {
                return ({
                    id: alimento.id,
                    descricao: alimento.description,
                    carboidratos: alimento.attributes?.carbohydrate?.qty,
                    proteinas: alimento.attributes?.protein?.qty,
                    gorduras: alimento.attributes?.fatty_acids?.saturated?.qty,
                    calorias: alimento.attributes?.energy?.kcal,
                });
            });

            setListaAlimentosBase(alimentos);
            setlistaAlimentos(alimentos.map((alimento) => (
                <ListaAlimentoItem key={alimento.id} carboidratos={alimento.carboidratos} proteinas={alimento.proteinas} gorduras={alimento.gorduras} calorias={alimento.calorias} descricao={alimento.descricao} id={alimento.id} />
            )));
        });
    }

    function onClickActionSheetOpcoesAdicionar(e) {
        mostrarActionSheetAdicionarOpcoes({
            buttons: [
                { text: 'Adicionar água', icon: water, handler: () => setIsAguaModalOpen(true) },
                { text: 'Adicionar alimentação', icon: pizza, handler: function () { recuperarAlimentos(); setIsAlimentoModalOpen(true); } },
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

    function ListaExercicioItem({ id, descricao, met }) {
        return (
            <IonItem button onClick={function () { adicionarExercicio(id, descricao, met); }}>
                <IonLabel>{descricao}</IonLabel>
            </IonItem>
        );
    }

    function ListaAlimentoItem({ id, descricao, carboidratos, proteinas, gorduras, calorias }) {
        return (
            <IonItem button onClick={function () { adicionarAlimento(id, descricao, carboidratos, proteinas, gorduras, calorias); }}>
                <IonLabel>{descricao}</IonLabel>
            </IonItem>
        );
    }

    function adicionarExercicio(exercicioId, descricao, met) {
        const dto = {
            tempo: format(new Date(refTempoPraticado.current), 'HH:mm:ss'),
            descricao: descricao,
            codigo_exercicio: exercicioId,
            met: met
        };

        setShowLoading(true);
        exercicioController.adicionarExercicio(dto, function (content, message, success) {
            if (!success) alerta(aviso(message));
            setShowLoading(false);

            modalExercicio.current.dismiss();
            usuario.anamnese.exercicio_diarios.push(content);
            calcularMetaAlimentosGrafico();
            calcularMetaCarbProtGord();
        });
    }

    function adicionarAlimento(alimentoId, descricao, carboidratos, proteinas, gorduras, calorias) {
        const dto = {
            quantidade: refQuantidadeAlimento.current,
            descricao: descricao,
            codigo_alimento: alimentoId,
            carboidratos: carboidratos,
            proteinas: proteinas,
            gorduras: gorduras,
            calorias: calorias
        };

        setShowLoading(true);
        alimentoController.adicionarAlimento(dto, function (content, message, success) {
            if (!success) alerta(aviso(message));
            setShowLoading(false);
            setQuantidadeAlimento(0);

            modalAlimento.current.dismiss();
            usuario.anamnese.alimento_diarios.push(content);
            calcularMetaAlimentosGrafico();
            calcularMetaCarbProtGord();
        });
    }

    useEffect(() => {
        if(!usuario) return;
        atualizarCoposAgua();
        calcularMetaCarbProtGord();
        setOptions((prevState) => {
            switch (usuario.anamnese.meta) {
                case 0:
                    prevState.yAxis.max = parseFloat(usuario.anamnese._get) - 500;
                    break;
                case 2:
                    prevState.yAxis.max = parseFloat(usuario.anamnese._get) + 500;
                    break;
            }

            calcularMetaAlimentosGrafico();

            return { ...prevState };
        });
    }, []);

    useEffect(() => {
        refTempoPraticado.current = tempoPraticado;
        refQuantidadeAlimento.current = quantidadeAlimento;
    });

    useEffect(() => {
        if (!listaExercicios) return;

        if (!pesquisaExercicio) return setlistaExercicios(listaExerciciosBase.map((exercicio) => (
            <ListaExercicioItem key={exercicio.id} met={exercicio.met} descricao={exercicio.descricao} id={exercicio.id} />
        )));

        setlistaExercicios(listaExerciciosBase.filter((exercicioBase) => exercicioBase.descricao.toLowerCase().includes(pesquisaExercicio)).map((exercicio) => (
            <ListaExercicioItem key={exercicio.id} met={exercicio.met} descricao={exercicio.descricao} id={exercicio.id} />
        )));
    }, [pesquisaExercicio]);

    useEffect(() => {
        if (!listaAlimentos) return;

        if (!pesquisaAlimentos) return setlistaAlimentos(listaAlimentosBase.map((alimento) => (
            <ListaAlimentoItem key={alimento.id} carboidratos={alimento.carboidratos} proteinas={alimento.proteinas} gorduras={alimento.gorduras} calorias={alimento.calorias} descricao={alimento.descricao} id={alimento.id} />
        )));

        setlistaAlimentos(listaAlimentosBase.filter((alimentoBase) => alimentoBase.descricao.toLowerCase().includes(pesquisaAlimentos)).map((alimento) => (
            <ListaAlimentoItem key={alimento.id} carboidratos={alimento.carboidratos} proteinas={alimento.proteinas} gorduras={alimento.gorduras} calorias={alimento.calorias} descricao={alimento.descricao} id={alimento.id} />
        )));
    }, [pesquisaAlimentos]);

    return (
        <Pagina title="Home" isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={usuario.etapa}>

            <IonLoading isOpen={showLoading} message={'Aguarde...'} />

            <IonModal ref={modalAgua} className='modal-agua' isOpen={isAguaModalOpen} onDidDismiss={() => setIsAguaModalOpen(false)}>
                <IonContent force-overscroll="false">
                    <div className='vbox' style={{ height: '100%', alignContent: 'space-between' }}>
                        <IonItem>
                            <IonLabel position="floating">Informe a quantidade de água (ml)</IonLabel>
                            <IonInput inputMode='numeric' type='number' value={quantidadeAgua} onIonChange={e => setQuantidadeAgua(e.detail.value)}></IonInput>
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
                <IonDatetime className='ion-datetime-modal-exercicio' presentation='time' value={tempoPraticado} ref={dateTimeTempoPraticado} onIonChange={e => { setTempoPraticado(() => e.detail.value) }}></IonDatetime>
                <IonButton fill='clear' onClick={(e) => {
                    modalDataExercicioTempoPraticado.current.dismiss();
                }}>OK</IonButton>
            </IonModal>

            <IonModal ref={modalExercicio} className='modal-fullscreen' isOpen={isExercicioModalOpen} onDidDismiss={() => { setIsExercicioModalOpen(false); setPesquisaExercicio(''); }}>
                <div slot='fixed'>
                    <IonItem button onClick={() => setIsExercicioDataPraticadaModalOpen(true)}>
                        <IonLabel color='primary'>{format(new Date(tempoPraticado), 'HH:mm') !== '00:00' ? `Tempo praticado: ${format(new Date(tempoPraticado), "H 'horas e 'm' minutos'")}` : 'Informe o tempo...'}</IonLabel>
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

            <IonModal ref={modalAlimento} className='modal-fullscreen' isOpen={isAlimentoModalOpen} onDidDismiss={() => { setIsAlimentoModalOpen(false); setPesquisaAlimentos(''); }}>
                <div slot='fixed'>
                    <IonItem>
                        <IonLabel position="floating">Informe a quantidade consumida (g)</IonLabel>
                        <IonInput inputMode='numeric' type='number' value={quantidadeAlimento} onIonChange={e => setQuantidadeAlimento(e.detail.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput inputmode='search' inputMode='search' value={pesquisaAlimentos} onIonChange={e => setPesquisaAlimentos(e.detail.value)}></IonInput>
                        <IonIcon slot='end' icon={search}></IonIcon>
                    </IonItem>
                </div>
                <IonContent>
                    <IonList>
                        {listaAlimentos}
                    </IonList>
                </IonContent>
            </IonModal>

            <div className="vbox" style={{ height: '100%', gridTemplateRows: '1fr 1fr 0fr 1fr' }}>
                <HighchartsReact containerProps={{ className: 'grafico-home' }} highcharts={Highcharts} options={options} />
                <div className='hbox' style={{ placeItems: 'center' }}>
                    <div className='hbox panel-generico-home panel-nutrientes' style={{ placeItems: 'center' }}>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Carb.</h3>
                            <h5>{`${metaCarb}/g`}</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Prot.</h3>
                            <h5>{`${metaProt}/g`}</h5>
                        </div>
                        <div className='panel-nutrientes-item botoes-centrais-grid-num-3'>
                            <h3>Gord.</h3>
                            <h5>{`${metaGord}/g`}</h5>
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