import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    misCasosActivos: [],
    casosResueltos: [],
};


//types
const OBTENER_MIS_CASOS_ACTIVOS = "OBTENER_MIS_CASOS_ACTIVOS";
const OBTENER_CASOS_RESUELTOS = 'OBTENER_CASOS_RESUELTOS'
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducer
export default function casosReducers(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_MIS_CASOS_ACTIVOS:
            return { ...state, misCasosActivos: action.payload, loading: false };
        case OBTENER_CASOS_RESUELTOS:
            return { ...state, casosResueltos: action.payload, loading: false };
        case ERROR:
            return { ...dataInicial };
        case LOADING:
            return { ...state, loading: true };
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
        "<attribute name='new_fechaalta' />" +
        "<attribute name='incidentid' />" +
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