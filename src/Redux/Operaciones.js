import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Constantes
const dataInicial = {
    loading: false,
    operaciones: [],
    operacionIdSeleccionada: '',
}

//Tipos
const OPERACIONES_EXITO = 'OPERACIONES_EXITO'
const OPERACION_ID_SELECCIONADA_EXITO = 'OPERACION_ID_SELECCIONADA_EXITO'
const LOADING = 'LOADING'
const ERROR = 'ERROR'

//Reducers
export default function operacionesReducers(state = dataInicial, action){
    switch (action.type) {
        case OPERACION_ID_SELECCIONADA_EXITO:
            return { ...state, operacionIdSeleccionada: action.operacionId }
        case ERROR:
            return { ...dataInicial }
        case OPERACIONES_EXITO:
            return { ...state, loading: false, operaciones: action.operaciones }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerOperaciones = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const resp = await axios.get(`${UrlApiDynamics}Operaciones?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
        console.log(resp)
        dispatch({
            type: OPERACIONES_EXITO,
            operaciones: resp.data
        })
    } catch (error) {
        dispatch({
            type : ERROR
        })
    }
}

export const cargarDocumentacionPorOperacion = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const resp = await axios.get(`${UrlApiDynamics}Operaciones?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
        console.log(resp)
        dispatch({
            type: OPERACIONES_EXITO,
            operaciones: resp.data
        })
    } catch (error) {
        dispatch({
            type : ERROR
        })
    }
}

export const obtenerOperacionIdSeleccionada = (id) => (dispatch) => {
    if(id !== undefined){
        dispatch({
            type: OPERACION_ID_SELECCIONADA_EXITO,
            operacionId : id
        })
    }
}