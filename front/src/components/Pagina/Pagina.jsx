import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonPage, IonRouterOutlet, IonSelect, IonSelectOption, IonSplitPane, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { format, isAfter, isDate, parseISO } from 'date-fns';
import { exitOutline, settingsOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { aviso } from '../../components/Aviso/Aviso';
import usuarioController from '../../services/Usuario';
import TabPanel from '../TabPanel/TabPanel';
import TabPanelButton from '../TabPanel/TabPanelButton';

const Pagina = function ({ children, title, isUserLogged, setUserLogged }) {
    const history = useHistory(),
        modalAlterarUsuario = useRef(),
        [isModalAlterarUsuarioOpen, setIsModalAlterarUsuarioOpen] = useState(false),
        [altura, setAltura] = useState(0.0),
        [peso, setPeso] = useState(0.0),
        [tipoMeta, setTipoMeta] = useState(0),
        [pesoMetaGanhar, setPesoMetaGanhar] = useState(0),
        [pesoMetaPerder, setPesoMetaPerder] = useState(0),
        [nivelAtividade, setNivelAtividade] = useState(null),
        [dataNasc, setDataNasc] = useState(),
        [usuarioId, setUsuarioId] = useState(),
        [usuarioActiveTabIndex, setUsuarioActiveTabIndex] = useState(0),
        [showLoading, setShowLoading] = useState(false),
        [sexo, setSexo] = useState(),
        dateTimeDataNasc = useRef(),
        [alerta] = useIonAlert();

    function recuperarInfoUsuarioLogado(e) {
        setShowLoading(true);
        setDataNasc(new Date().toISOString());
        usuarioController.recuperarInfoUsuarioLogado(function (content, message, success) {
            setShowLoading(false);
            if (!success) alerta(aviso(message));
            e.preventDefault();

            setUsuarioId(content.id);
            setPeso(content.peso);
            setAltura(content.altura);
            setSexo(content.sexo);
            setDataNasc(content.data_nasc);
            setTipoMeta(content.anamnese.meta);
            setNivelAtividade(content.anamnese.nivel_atividade);
            setPesoMetaGanhar(content.anamnese.peso_ganhar);
            setPesoMetaPerder(content.anamnese.peso_perder);
        });
    }

    async function alterarUsuario(e) {
        if (altura === 0) return alerta(aviso('A altura não deve ser igual a 0'));
        if (peso === 0) return alerta(aviso('O peso não deve ser igual a 0'));
        if (!dataNasc) return alerta(aviso('É necessário informar uma data de nascimento'));
        if (!isDate(new Date(dataNasc))) return alerta(aviso('Informe uma data válida'));

        const usuario = {}
        usuario.id = usuarioId;
        usuario.altura = altura;
        usuario.peso = peso;
        usuario.data_nasc = new Date(dataNasc);
        usuario.data_nasc.setHours(0, 0, 0, 0);
        usuario.sexo = sexo;
        usuario.anamnese = {};
        usuario.anamnese.meta = tipoMeta;
        usuario.anamnese.nivel_atividade = nivelAtividade;
        usuario.anamnese.peso_ganhar = pesoMetaGanhar || 0;
        usuario.anamnese.peso_perder = pesoMetaPerder || 0;

        setShowLoading(true);
        usuarioController.alterarUsuario(usuario, function (content, message, success) {
            setShowLoading(false);
            if (!success) return;
            e.preventDefault();

            modalAlterarUsuario.current.dismiss();
            alerta('Alterações realizadas com sucesso, é necessário realizar o login novamente após essa mensagem',[{
                text: 'OK',
                handler: (e) => doLogout(e, setUserLogged)
            }]);
        });
    }

    useEffect(() => {
        if (dateTimeDataNasc.current) dateTimeDataNasc.current.processValue(dataNasc);
    }, [dataNasc]);

    function doLogout(e, setUserLogged) {
        usuarioController.logout({}, function (content, message, success) {
            if (!success) alerta(aviso(message));
            if(e) e.preventDefault();
            sessionStorage.clear();
            setUserLogged(false);
            history.push('/login');
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton hidden={!isUserLogged} onClick={(e) => { setUsuarioActiveTabIndex(0); setIsModalAlterarUsuarioOpen(true)}}>
                            <IonIcon slot="icon-only" icon={settingsOutline} />
                        </IonButton>
                        <IonButton hidden={!isUserLogged} onClick={(e) => doLogout(e, setUserLogged)}>
                            <IonIcon slot="icon-only" icon={exitOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading isOpen={showLoading} message={'Aguarde...'} />
                <IonModal ref={modalAlterarUsuario} className='modal-fullscreen' isOpen={isModalAlterarUsuarioOpen} onDidPresent={(e) => recuperarInfoUsuarioLogado(e)} onDidDismiss={() => { setIsModalAlterarUsuarioOpen(false); }}>
                    <TabPanel slot='fixed' setActiveTab={setUsuarioActiveTabIndex} name='tabPanelAlterarUsuario'>
                        <TabPanelButton active={true}>Usuário</TabPanelButton>
                        <TabPanelButton>Anamnese</TabPanelButton>
                    </TabPanel>
                    <IonContent hidden={usuarioActiveTabIndex !== 0}>
                        <IonItem>
                            <IonLabel position="floating">Peso (Kg)</IonLabel>
                            <IonInput type="number" value={peso} onIonChange={e => setPeso(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Altura (Cm)</IonLabel>
                            <IonInput type="number" value={altura} onIonChange={e => setAltura(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Gênero</IonLabel>
                            <IonSelect value={sexo} onIonChange={e => setSexo(e.detail.value)} placeholder="Selecione">
                                <IonSelectOption value="f">Feminino</IonSelectOption>
                                <IonSelectOption value="m">Masculino</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Data de nascimento</IonLabel>
                        </IonItem>
                        <IonDatetime size="cover" presentation='date' ref={dateTimeDataNasc} onIonChange={e => {
                            const parsedDate = parseISO(e.detail.value);
                            if (isAfter(parsedDate, new Date())) return alert(aviso('A data de nascimento não deve ser após hoje.'));
                            setDataNasc(parsedDate.toISOString());
                        }} />
                    </IonContent>
                    <IonContent hidden={usuarioActiveTabIndex !== 1}>
                        <IonItem>
                            <IonLabel>Meta:</IonLabel>
                            <IonSelect value={tipoMeta} onIonChange={e => setTipoMeta(e.detail.value)} placeholder="Selecione">
                                <IonSelectOption value={0}>Perder Peso</IonSelectOption>
                                <IonSelectOption value={1}>Manter Peso</IonSelectOption>
                                <IonSelectOption value={2}>Ganhar Peso</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={tipoMeta === 1}>
                            <IonLabel position="floating">Meta de peso a {tipoMeta === 2 ? 'perder' : 'ganhar'} (Kg)</IonLabel>
                            <IonInput hidden={tipoMeta === 0} type="number" value={pesoMetaGanhar} onIonChange={e => setPesoMetaGanhar(e.detail.value)}></IonInput>
                            <IonInput hidden={tipoMeta === 2} type="number" value={pesoMetaPerder} onIonChange={e => setPesoMetaPerder(e.detail.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Nivel de Atividade Fisica:</IonLabel>
                            <IonSelect value={nivelAtividade} onIonChange={e => setNivelAtividade(e.detail.value)} placeholder="Selecione">
                                <IonSelectOption value={0}>Sedentário</IonSelectOption>
                                <IonSelectOption value={1}>Pouco ativo</IonSelectOption>
                                <IonSelectOption value={2}>Ativo</IonSelectOption>
                                <IonSelectOption value={3}>Muito ativo</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonContent>
                    <IonButton slot='fixed' fill='clear' onClick={(e) => alterarUsuario(e)}>OK</IonButton>
                </IonModal>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {[children]}
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Pagina;