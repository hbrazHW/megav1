import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    id:{},
    resultado: ''
}

//Types
const CARGA_PRECALIFICACION = 'CARGA_PRECALIFICACION'
const CUENTA_EXISTENTE = 'CUENTA_EXISTENTE'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function PrecalificacionReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, resultado: action.resultado }
        case CARGA_PRECALIFICACION:
            return { ...state, id: action.payload, loading: false, resultado: action.resultado }
        case CUENTA_EXISTENTE:
            return { ...state, resultado: action.resultado}
        default:
            return { ...state }
    }
}


export const cargarPrecalificacionCrediticia = (personeria, razonSocial, cuit, tipoDocumento, telefono, email, facturacion) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultado: 'LOADING'
    })

    try {
        const comprobacionRazonSocial = await axios.get(`${UrlApiDynamics}Account?filter=name eq '${razonSocial}'&cuit=${Entidad}`)
        const comprobacionMail = await axios.get(`${UrlApiDynamics}Account?filter=emailaddress1 eq '${email}'&cuit=${Entidad}`)
        if(comprobacionMail.data.length === 0 && comprobacionRazonSocial.data.length === 0)
        {
            const response = await axios.post(`${UrlApiDynamics}Precalificacion?personeria=${personeria}&razonSocial=${razonSocial}&cuit=${cuit}&tipoDocumento=${tipoDocumento}&telefono=${telefono}&email=${email}&facturacion=${facturacion}&cuitSgr=${Entidad}`)
            dispatch({
                type: CARGA_PRECALIFICACION,
                resultado: 'EXITO',
                payload: response.data
            })
        }else{
            dispatch({
                type: CUENTA_EXISTENTE,
                resultado: 'ERROR'
            })
        }
        
    } catch (error) {
        dispatch({
            type : ERROR
        })
    }
}
