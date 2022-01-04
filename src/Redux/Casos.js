import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    misCasosActivos: [],
    casosResueltos: [],
    casosFm:[],
    asuntos: [],
    archivos: [],
    casoid: '',
    ticket: '',
    resultadoCaso: '',
};


//types
const CARGA_CASOS_EXITO = "CARGA_CASOS_EXITO"
const OBTENER_CASO_EXITO = "OBTENER_CASO_EXITO"
const OBTENER_NOMBRE_ASUNTOS = "OBTENER_NOMBRE_ASUNTOS"
const OBTENER_MIS_CASOS_ACTIVOS = "OBTENER_MIS_CASOS_ACTIVOS";
const OBTENER_CASOS_RESUELTOS = 'OBTENER_CASOS_RESUELTOS'
const OBTENER_CASOS_FM = 'OBTNER_CASOS_FM'
const ADJUNTOS_EXITO = 'ADJUNTOS_EXITO'
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducer
export default function casosReducers(state = dataInicial, action) {
    switch (action.type) {
        case CARGA_CASOS_EXITO:
            return { ...state, resultadoCaso: action.resultadoCaso, ticket: action.ticket }
        case OBTENER_CASO_EXITO:
            return { ...state, casoid: action.casoid }
        case OBTENER_NOMBRE_ASUNTOS:
            return { ...state, asuntos: action.payload, loading: false };
        case OBTENER_MIS_CASOS_ACTIVOS:
            return { ...state, misCasosActivos: action.payload, loading: false };
        case OBTENER_CASOS_RESUELTOS:
            return { ...state, casosResueltos: action.payload, loading: false };
        case OBTENER_CASOS_FM:
            return { ...state, casosFm: action.payload, loading: false };
        case ERROR:
            return { ...dataInicial };
        case LOADING:
            return { ...state, loading: true };
        case ADJUNTOS_EXITO:
            return { ...state, archivos: action.payload };
        default:
            return { ...state };
    }
}

//actions
//"MIS CASOS ACTIVOS"
export const consultaFETCHmisCasosActivos = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "incidents";
    var fetch = "<fetch  mapping='logical' distinct='false'>" +
        "<entity name='incident'>" +
        "<attribute name='prioritycode' />" +
        "<attribute name='ticketnumber' />" +
        "<attribute name='new_vencimiento' />" +
        "<attribute name='subjectid' />" +
        "<attribute name='createdon' />" +
        "<attribute name='incidentid' />" +
        "<attribute name='statuscode' />" +
        "<attribute name='new_comentarios' />" +
        "<order attribute='ticketnumber' descending='false' />" +
        "<filter type='and'>" +
        "<condition attribute='ownerid' operator='eq-userteams' />" +
        "<condition attribute='statecode' operator='eq' value='0' />" +
        "</filter>" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_MIS_CASOS_ACTIVOS,
            payload: response.data,
            resultadoCaso: 'PENDING'
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};

//"CASOS RESUELTOS"
export const consultaFETCHcasosResueltos = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "incidents";
    var fetch = "<fetch mapping='logical' distinct='false'>" +
        "<entity name='incident'>" +
        "<attribute name='ticketnumber' />" +
        "<attribute name='new_fechaalta' />" +
        "<attribute name='statuscode' />" +
        "<attribute name='new_cliente' />" +
        "<attribute name='subjectid' />" +
        "<attribute name='customerid' />" +
        "<attribute name='new_vencimiento' />" +
        "<attribute name='incidentid' />" +
        "<attribute name='new_comentarios' />" +
        "<attribute name='new_sede' />" +
        "<attribute name='new_asuntoprimario' />" +
        "<order attribute='ticketnumber' descending='false' />" +
        "<filter type='and'>" +
        "<condition attribute='statecode' operator='eq' value='1' />" +
        "</filter>" +
        "<link-entity name='systemuser' from='systemuserid' to='owninguser' visible='false' link-type='outer' alias='incidentowningusersystemusersystemuserid'>" +
        "<attribute name='businessunitid' />" +
        "</link-entity>" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_CASOS_RESUELTOS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};
/// caso de FM
export const consultaFETCHcasosFm = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "incidents";
    var fetch = "<fetch mapping='logical' distinct='false'>" +
    "<entity name='incident'>" +
      "<attribute name='incidentid' />" +
      "<attribute name='prioritycode' />" +
      "<attribute name='productserialnumber' />" +
      "<attribute name='new_instalacionporsede' />" +
      "<attribute name='new_equipodetenido' />" +
      "<attribute name='new_alaesperaderepuestos' />" +
      "<order attribute='new_equipodetenido' descending='true' />" +
    "</entity>" +
  "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_CASOS_FM,
            payload: response.data,
            
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};


/// nombre Asuntos

export const consultaFETCHnombresAsuntos = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "subjects";
    var fetch = "<fetch  mapping='logical' distinct='false'>" +
        "<entity name='subject'>" +
        "<attribute name='title' />" +
        "<attribute name='subjectid' />" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_NOMBRE_ASUNTOS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};

export const obtenerCasosId = (id) => (dispatch) => {
    if (id !== undefined) {
        dispatch({
            type: OBTENER_CASO_EXITO,
            casoid: id
        })
    }
}

export const cargarForm = (contactid, asunto, fechaAlta, asuntoPrimario, solicitante, puestoSolicitante, tipoCaso, comentarios, sucursal, file, config) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultadoCaso: 'LOADING'
    })
    try {
        const response = await axios.post(`${UrlApiDynamics}Casos?contactid=${contactid}&asunto=${asunto}&fechaAlta=${fechaAlta}&asuntoPrimario=${asuntoPrimario}&solicitante=${solicitante}&puestoSolicitante=${puestoSolicitante}&tipoCaso=${tipoCaso}&comentarios=${comentarios}&sucursal=${sucursal}&cuit=${Entidad}`, file, config)
        console.log("response", response)
        dispatch({
            type: CARGA_CASOS_EXITO,
            ticket: response.data,
            resultadoCaso: 'EXITO',

        })
    } catch (error) {
        dispatch({
            type: ERROR,
            resultadoCaso: 'ERROR'
        })
    }
}

export const cargarArchivos = (casoid, file, config, tipo) => (dispatch) => {
    try {
        debugger
        const id = casoid.split(';')
        const resp = axios.post(`${UrlApiDynamics}Notas?id=${id[1]}&cuit=${Entidad}&tipo=${tipo}`, file, config)
        dispatch({
            type: ADJUNTOS_EXITO,
            payload: resp.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

