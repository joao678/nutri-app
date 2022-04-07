import { IonCol, IonGrid, IonItem, IonRow, IonSelect, IonSelectOption, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { aviso } from '../../components/Aviso/Aviso';
import Pagina from '../../components/Pagina/Pagina';
import { Alimento } from '../../models/Alimento';
import { Categoria } from '../../models/Categoria';
import { getAllAlimentosFromCategoria, getAllCategorias } from '../../services/Categorias';
import './TabelaAlimentos.css';

const filtrarAlimentosPorCategoria = function(event: CustomEvent, setgridListData: Function) {
    getAllAlimentosFromCategoria(event.detail.value, (data: Alimento[], message: string, success: boolean) => {
        if (!success) return alert(aviso(message));

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

const TabelaAlimentos: React.FC<{setUserLogged: any}> = ({setUserLogged}) => {
    const [categoryList, setCategoryList] = useState([<IonSelectOption key={0}></IonSelectOption>]);
    const [gridListData, setgridListData] = useState([<div key={-1}></div>]);
    const [alert] = useIonAlert();

    useEffect(() => {
        getAllCategorias((data: Categoria[], message: string, success: boolean) => {
            if (!success) return alert(aviso(message));

            setCategoryList(data.map((item: Categoria) => {
                return <IonSelectOption key={item.id} value={item.id}>{item.category}</IonSelectOption>
            }))
        });
    }, []);

    return (
        <Pagina title="teste" setUserLogged={setUserLogged}>
            <IonItem>
                <IonSelect interface="popover" placeholder="Select One" onIonChange={(e) => { filtrarAlimentosPorCategoria(e, setgridListData) }} >
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