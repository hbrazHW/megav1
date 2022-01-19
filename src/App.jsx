import React from 'react'
import Navbar from './Components/Navbar';
import {auth} from './Firebase'
import {useDispatch} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom"
import Footer from './Components/Footer';
import Inicio from './Components/Inicio';
import Login from './Components/Login';
import Garantias from './Components/Garantias';
import Operaciones from './Components/Operaciones';
import Registro from './Components/Registro';
import {leerUsuarioActivo, actualizarAccountid} from './Redux/usuarios'
import { Lineas } from './Components/Lineas';
import { CarpetaDigital } from './Components/CarpetaDigital';
import Notificacion from './Components/Notificacion';
import Cuenta from './Components/Cuenta';
import PrecalificacionCrediticia from './Components/PrecalificacionCrediticia';
import { useSpring } from 'react-spring'
import RecuperoContrasena from './Components/RecuperoContrasena';
import Legales from './Components/Legales';
import Casos from './Components/Casos'
import RecursosHumanos from './Components/RecursosHumanos';
import AdjuntarArchivo from './Components/AdjuntarArchivo';
import PastePrint from './Components/PastePrint';
import Cover from './Components/Cover';
import VistaCasos from './Components/VistaCasos';
import VistaDocumentos from './Components/VistaDocumentos';
import VistaRh from './Components/VistaRh';

function App() {
  //Consantes
  const dispatch = useDispatch()
  const [loggedUser, setLoggedUser] = React.useState(false)

  React.useEffect(() => { 
    const fetchUser = () => {
      auth.onAuthStateChanged(user =>{
        if(user){
            if(localStorage.getItem('usuario')){
              dispatch(leerUsuarioActivo())
            }else{
              dispatch(actualizarAccountid(user.uid))
            }
            setLoggedUser(true)
        }else{
          setLoggedUser(false)
        }
      })
    }
    fetchUser()
  }, []);

  return  (
    <Router>
      <div>
      <Navbar loggedUser={loggedUser} />
          <Switch>
            {/* <Route component={Inicio} path="/inicio"  /> */}
            <Route component={Cover} path="/Cover" exact />
            <Route component={Login} path="/" exact/>
            <Route component={VistaCasos} path="/vista-casos" exact />
            <Route component={VistaDocumentos} path="/vista-documentos" exact />
            <Route component={VistaRh} path="/vista-recursoshumanos" exact  />
            {/* <Route component={CarpetaDigital} path="/carpetadigital" exact /> 
            <Route component={Lineas} path="/lineas" exact /> 
            <Route component={Garantias} path="/garantias" exact/> */}
            {/* <Route component={Operaciones} path="/operaciones"/> 
            <Route component={Notificacion} path="/notificacion" /> */}
            <Route component={Cuenta} path="/cuenta" exact /> 
            {/* <Route component={PrecalificacionCrediticia} path="/precalificacion-crediticia" /> */}
            <Route component={RecuperoContrasena} path="/recupero" exact />
            <Route component={Registro} path="/registro" exact /> 
            <Route component={Legales} path="/Legales" exact />
            <Route component={Casos} path="/Casos" exact/>
            <Route component={RecursosHumanos} path="/RecursosHumanos" exact/>
            {/* <Route component={AdjuntarArchivo} path="/AdjuntarArchivo" exact /> */}
            <Route component={PastePrint} path="/PastePrint" exact />
          </Switch>
        <Footer loggedUser={loggedUser} />
      </div>
    </Router>
  ) 
}

export default App;
