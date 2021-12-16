import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'

//Const
const dataInicial = {
    loading: false,
    cuenta: {},
    sociedadXsocio: {},
    sociedadDeBolsa: {},
    certificadosPymes: [],
    provincias: [],
    actualizacionDatos: ''
}

//Types
const CUENTA_EXITO = 'CUENTA_EXITO'
const ACTUALIZAR_CUENTA_EXITO = 'ACTUALIZAR_CUENTA_EXITO'
const PROVINCIA_EXITO = 'PROVINCIA_EXITO'
const CERTIFICADO_EXITO = 'CERTIFICADO_EXITO'
const SOCIEDADXSOCIO_EXITO = 'SOCIEDADXSOCIO_EXITO'
const SOCIEDADBOLSA_EXITO = 'SOCIEDADBOLSA_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function cuentaReducers(state = dataInicial, action) {
    switch (action.type) {
        case SOCIEDADBOLSA_EXITO:
            return { ...state, sociedadDeBolsa: action.payload, loading: false }
        case SOCIEDADXSOCIO_EXITO:
            return { ...state, sociedadXsocio: action.payload, loading: false }
        case CERTIFICADO_EXITO:
            return { ...state, certificadosPymes: action.payload, loading: false }
        case ERROR:
            return { ...dataInicial, actualizacionDatos: action.actualizacionDatos }
        case LOADING:
            return { ...state, actualizacionDatos: action.actualizacionDatos }
        case CUENTA_EXITO:
            return { ...state, cuenta: action.payload }
        case PROVINCIA_EXITO:
            return { ...state, provincias: action.payload }
        case ACTUALIZAR_CUENTA_EXITO:
            return { ...state, actualizacionDatos: action.actualizacionDatos }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerCuenta = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Account?filter=accountid eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: CUENTA_EXITO,
                payload: response.data[0]
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerCertificadoPyme = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Certificadopyme?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: CERTIFICADO_EXITO,
                payload: response.data
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerSociedadesXsocio = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Sociedaddebolsaporsocio/?filter=_new_socio_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: SOCIEDADXSOCIO_EXITO,
                payload: response.data
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerSociedadeDeBolsa = (sociedadId) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (sociedadId != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Sociedaddebolsa/?filter=new_sociedaddebolsaid eq ${sociedadId}&cuit=${Entidad}`)
            dispatch({
                type: SOCIEDADBOLSA_EXITO,
                payload: response.data
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerProvincias = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {

        const response = await axios.get(`${UrlApiDynamics}Provincias?filter=&cuit=${Entidad}`);
        dispatch({
            type: PROVINCIA_EXITO,
            payload: response.data
        })

    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const actualizarDatosCuenta = (accountid, telefono = "", calle = "", numero = "", piso = "", depto = "", provinciaId = "", localidad = "", municipio = "", codigoPostal = "" ) => async (dispatch) => {
    dispatch({
        type: LOADING,
        actualizacionDatos: 'LOADING'
    })

    try {
        const response = await axios.post(`${UrlApiDynamics}Account?accountId=${accountid}&telefono=${telefono}&calle=${calle}&numero=${numero}&piso=${piso}&depto=${depto}&provinciaId=${provinciaId}&localidad=${localidad}&municipio=${municipio}&codigoPostal=${codigoPostal}&cuit=${Entidad}`)
        dispatch({
            type: ACTUALIZAR_CUENTA_EXITO,
            payload: response.data,
            actualizacionDatos: 'EXITO'
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            actualizacionDatos: 'ERROR'
        })
    }
}