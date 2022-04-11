import { Redirect, Route } from "react-router";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Logout from "../../pages/Logout/Logout";
import TabelaAlimentos from "../../pages/TabelaAlimentos/TabelaAlimentos";

const BaseRoutes = function ({ isUserLogged, setUserLogged }) {
    return (
        <>
            <Route path="/" render={() => {
                    if(!isUserLogged) return <Redirect to="/" />
                }}
            />

            <Route exact path="/tabela-alimentos">
                <TabelaAlimentos isUserLogged={isUserLogged} setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/logout">
                <Logout isUserLogged={isUserLogged} setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/home">
                <Home isUserLogged={isUserLogged} setUserLogged={setUserLogged}/>
            </Route>
            <Route exact path="/login">
                {isUserLogged ? <Redirect to="/home" /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged}/>} 
            </Route>
            <Route exact path="/" render={() => {
                    return isUserLogged ? <Home isUserLogged={isUserLogged} setUserLogged={setUserLogged} /> : <Login isUserLogged={isUserLogged} setUserLogged={setUserLogged}/>;
                }}
            />
        </>
    );
};

export default BaseRoutes;