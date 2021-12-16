import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usuariosReducer from '../Redux/usuarios'
import notificacionReducer from '../Redux/notificacion'
import limitesReducers from '../Redux/LimitePorLinea'
import garantiasReducers from '../Redux/Garantia'
import operacionesReducers from '../Redux/Operaciones'
import documentosPorCuentaReducers from '../Redux/CarpetaDigital'
import notificacionesReducers from '../Redux/Notificaciones'
import documentosOperacionReducers from '../Redux/DocumentacionPorOperacion'
import documentosReducers from '../Redux/Documentacion'
import cuentaReducers from '../Redux/Cuenta'
import tipoDocumentosReducers from '../Redux/TipoDeDocumento'
import PrecalificacionReducers from '../Redux/PrecalificacionCrediticia'
import divisasReducers from '../Redux/Divisa'
import clienteCasoReducers from '../Redux/ClienteCaso'
import asuntoCasoReducers from '../Redux/AsuntoCaso'
import casosReducers from '../Redux/Casos'
import  documentosLegalesReducers  from '../Redux/DocumentosLegales'


const rootReducer = combineReducers({
   usuarios: usuariosReducer,
   notificaciones: notificacionReducer,
   limiteporlinea: limitesReducers,
   garantias: garantiasReducers,
   operaciones: operacionesReducers,
   documentosPorCuenta: documentosPorCuentaReducers,
   notificaciones: notificacionesReducers,
   documentosOperacion: documentosOperacionReducers,
   documentos: documentosReducers,
   cuenta: cuentaReducers,
   tiposDocumentos: tipoDocumentosReducers,
   precalificacion: PrecalificacionReducers,
   divisas: divisasReducers,
   cliente: clienteCasoReducers,
   asunto: asuntoCasoReducers,
   casos: casosReducers,
   legales: documentosLegalesReducers,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}
  