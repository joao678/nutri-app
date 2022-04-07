import { useHistory } from 'react-router';
import Pagina from '../../components/Pagina/Pagina';

const Logout = function ({setUserLogged}) {
    const history = useHistory();
    
    /*if (sessionStorage.getItem("logged")) {
        sessionStorage.clear();
        history.push('/login');
    }*/

    return (
        <Pagina title="Logout" setUserLogged={setUserLogged}>
            
        </Pagina>
    );
};

export default Logout;
