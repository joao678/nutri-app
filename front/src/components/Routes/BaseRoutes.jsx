import { Redirect, Route } from "react-router";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import TabelaAlimentos from "../../pages/TabelaAlimentos/TabelaAlimentos";

const BaseRoutes = function ({ isUserLogged, setUserLogged }) {
    return (
        <>
            <Route exact path="/tabela-alimentos">
                <TabelaAlimentos setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/logout">
                <Logout setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/home">
                <Home setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/login">
                {isUserLogged ? <Redirect to="/home" /> : <Login setUserLogged={setUserLogged}/>} 
            </Route>
            <Route exact path="/" render={() => {
                    return isUserLogged ? <Home setUserLogged={setUserLogged} /> : <Login setUserLogged={setUserLogged}/>;
                }}
            />
        </>
    );
};

export default BaseRoutes;