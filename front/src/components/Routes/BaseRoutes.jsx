import { Redirect, Route } from "react-router";
import Informativo from "../../pages/Etapas/Informativo";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import TabelaAlimentos from "../../pages/TabelaAlimentos/TabelaAlimentos";

const BaseRoutes = function ({ isUserLogged, setUserLogged, etapa, setEtapa }) {
    return (
        <>
            <Route path="/" render={() => {
                if (!isUserLogged) return <Redirect to="/" />
            }} />

            <Route exact path="/tabela-alimentos" render={() => {
                return <TabelaAlimentos isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/logout" render={() => {
                return <Logout isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/home" render={() => {
                return <Home isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/login" render={() => {
                return isUserLogged ? <Redirect to="/home" /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            { /* Etapas */ }
            <Route exact path="/etapas/1" render={() => {
                return <Informativo isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={etapa} setEtapa={setEtapa} />
            }} />
            { /* Etapas */ }

            <Route exact path="/" render={() => {
                return isUserLogged ? <Home isUserLogged={isUserLogged} setUserLogged={setUserLogged} /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged} />;
            }}
            />
        </>
    );
};

export default BaseRoutes;