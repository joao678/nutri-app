import { IonCol, IonGrid, IonItem, IonRow, IonSelect, IonSelectOption, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
/*import { Alimento } from '../../models/Alimento';
import { Categoria } from '../../models/Categoria';*/
import { getAllAlimentosFromCategoria, getAllCategorias } from '../../services/Categorias';
import './TabelaAlimentos.css';

const TabelaAlimentos = ({isUserLogged, setUserLogged}) => {
    const [categoryList, setCategoryList] = useState([<IonSelectOption key={0}></IonSelectOption>]);
    const [gridListData, setgridListData] = useState([<div key={-1}></div>]);
    const [alerta] = useIonAlert();

    useEffect(() => {
        getAllCategorias((data,  message, success) => {
            if (!success) return alerta(aviso(message));

            setCategoryList(data.map((item) => {
                return <IonSelectOption key={item.id} value={item.id}>{item.category}</IonSelectOption>
            }))
        });
    }, []);

    function filtrarAlimentosPorCategoria(event, setgridListData) {
        getAllAlimentosFromCategoria(event.detail.value, (data, message, success) => {
            if (!success) return alerta(aviso(message));
    
            const alimentosView = data.map((alimento) => {
                return {
                    id: alimento.id,
                    description: alimento.description,
                    base_qty: alimento.base_qty,
                    base_unit: alimento.base_unit,
                    category_id: alimento.category_id
                    //attributes: Atributos;
                }
            });
    
            const gridData = [(
                <IonRow key={0}>
                    {Object.keys(alimentosView[0]).map(key => <IonCol key={key}>{key}</IonCol>)}
                </IonRow>
            )];
    
            setgridListData(
                [...gridData, ...alimentosView.map((alimentoView, index) => {
                    return (
                        <IonRow key={index+1}>
                            {Object.values(alimentoView).map((value, colIndex) => <IonCol key={colIndex}>{value}</IonCol>)}
                        </IonRow>
                    )
                })]
            );
        });
    }

    return (
        <Pagina title="teste" isUserLogged={isUserLogged} setUserLogged={setUserLogged}>
            <IonItem>
                <IonSelect interface="popover" placeholder="Select One" onIonChange={(e) => filtrarAlimentosPorCategoria(e, setgridListData) } >
                    {[...categoryList]}
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonGrid>
                    {[...gridListData]}
                </IonGrid>
            </IonItem>
        </Pagina>
    )
};

export default TabelaAlimentos;