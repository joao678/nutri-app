import { Redirect, Route } from "react-router";
import Informativo from "../../pages/Etapas/Informativo";
import Home from "../../pages/Home/Home";
import Cadastro from "../../pages/Login/Cadastro/Cadastro";
import CadastroEmailConfirmacao from "../../pages/Login/Cadastro/CadastroEmailConfirmacao";
import ConfirmarUsuario from "../../pages/Login/Cadastro/ConfirmarUsuario";
import EsqueciMinhaSenha from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenha";
import EsqueciMinhaSenhaAlteraSenha from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaAlteraSenha";
import EsqueciMinhaSenhaAlteraSenhaConfirmacao from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaAlteraSenhaConfirmacao";
import EsqueciMinhaSenhaRedefinicao from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaConfirmacao";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import TabelaAlimentos from "../../pages/TabelaAlimentos/TabelaAlimentos";

const BaseRoutes = function ({ isUserLogged, setUserLogged, etapa, setEtapa }) {
    return (
        <>
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

            <Route exact path="/esqueci-minha-senha" render={function () {
                return <EsqueciMinhaSenha isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/esqueci-minha-senha-confirmacao" render={function () {
                return <EsqueciMinhaSenhaRedefinicao isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route path="/alterar-senha/:id" render={function ({ match }) {
                return <EsqueciMinhaSenhaAlteraSenha id={match.params.id} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route path="/esqueci-minha-senha-senha-alterada-confirmacao" render={function ({ match }) {
                return <EsqueciMinhaSenhaAlteraSenhaConfirmacao isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route path="/cadastrar-se" render={function ({ match }) {
                return <Cadastro isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route path="/confirmacao-cadastro-usuario" render={function ({ match, location }) {
                return <CadastroEmailConfirmacao email={location.state.email} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route path="/confirmar-usuario/:id" render={function ({ match, location }) {
                return <ConfirmarUsuario id={match.params.id} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            
            { /* Etapas */}
            <Route exact path="/etapas/1" render={() => {
                return <Informativo isUserLogged={isUserLogged} setUserLogged={setUserLogged} etapa={etapa} setEtapa={setEtapa} />
            }} />
            { /* Etapas */}

            <Route exact path="/" render={() => {
                return isUserLogged ? <Home isUserLogged={isUserLogged} setUserLogged={setUserLogged} /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged} />;
            }}
            />
        </>
    );
};

export default BaseRoutes;