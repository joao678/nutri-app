import { Route } from "react-router";
import Informativo from "../../pages/Etapas/Informativo";
import PerguntarAltura from "../../pages/Etapas/PerguntarAltura";
import PerguntarIdade from "../../pages/Etapas/PerguntarIdade";
import PerguntarMeta from "../../pages/Etapas/PerguntarMeta";
import PerguntarNivelAtividade from "../../pages/Etapas/PerguntarNivelAtividade";
import PerguntarPeso from "../../pages/Etapas/PerguntarPeso";
import PerguntarSexo from "../../pages/Etapas/PerguntarSexo";
import Home from "../../pages/Home/Home";
import Cadastro from "../../pages/Login/Cadastro/Cadastro";
import CadastroEmailConfirmacao from "../../pages/Login/Cadastro/CadastroEmailConfirmacao";
import ConfirmarUsuario from "../../pages/Login/Cadastro/ConfirmarUsuario";
import EsqueciMinhaSenha from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenha";
import EsqueciMinhaSenhaAlteraSenha from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaAlteraSenha";
import EsqueciMinhaSenhaAlteraSenhaConfirmacao from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaAlteraSenhaConfirmacao";
import EsqueciMinhaSenhaRedefinicao from "../../pages/Login/EsqueciMinhaSenha/EsqueciMinhaSenhaConfirmacao";
import Login from "../../pages/Login/Login";
import TabelaAlimentos from "../../pages/TabelaAlimentos/TabelaAlimentos";

const BaseRoutes = function ({ isUserLogged, setUserLogged }) {
    return (
        <>
            <Route exact path="/tabela-alimentos" render={() => {
                return <TabelaAlimentos isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/home" render={function ({ match, location }) {
                return <Home usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/login" render={() => {
                return <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/esqueci-minha-senha" render={function () {
                return <EsqueciMinhaSenha isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/esqueci-minha-senha-confirmacao" render={function () {
                return <EsqueciMinhaSenhaRedefinicao isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/alterar-senha/:id" render={function ({ match }) {
                return <EsqueciMinhaSenhaAlteraSenha id={match.params.id} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/esqueci-minha-senha-senha-alterada-confirmacao" render={function ({ match }) {
                return <EsqueciMinhaSenhaAlteraSenhaConfirmacao isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/cadastrar-se" render={function ({ match }) {
                return <Cadastro isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/confirmacao-cadastro-usuario" render={function ({ match, location }) {
                return <CadastroEmailConfirmacao email={location.state.email} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />

            <Route exact path="/confirmar-usuario/:id" render={function ({ match, location }) {
                return <ConfirmarUsuario id={match.params.id} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            
            { /* Etapas */}
            <Route exact path="/etapas/1" render={({ match, location }) => {
                return <Informativo usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/2" render={({ match, location }) => {
                return <PerguntarIdade usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/3" render={({ match, location }) => {
                return <PerguntarPeso usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/4" render={({ match, location }) => {
                return <PerguntarAltura usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/5" render={({ match, location }) => {
                return <PerguntarMeta usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/6" render={({ match, location }) => {
                return <PerguntarSexo usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            <Route exact path="/etapas/7" render={({ match, location }) => {
                return <PerguntarNivelAtividade usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} />
            }} />
            { /* Etapas */}

            <Route exact path="/" render={({ match, location }) => {
                return isUserLogged ? <Home usuario={location.state.usuario} isUserLogged={isUserLogged} setUserLogged={setUserLogged} /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged} />;
            }}
            />
        </>
    );
};

export default BaseRoutes;