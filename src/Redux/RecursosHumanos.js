import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    busquedaPersonal: [],
};

//types
const OBTENER_BUSQUEDA_ABIERTA = "OBTENER_BUSQUEDA_ABIERTA";
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function recursosHumanosReducers(state = dataInicial, action) {
    switch (action.type) {
        case ERROR:
            return { ...dataInicial };
        case LOADING:
            return { ...state, loading: true };
        case OBTENER_BUSQUEDA_ABIERTA:
            return { ...state, busquedaPersonal: action.payload, loading: false };
        default:
            return { ...state };
    }
}

export const consultaFETCHbusquedaPersonal = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    var entidad = "new_busquedadepersonals";
    var fetch = "<fetch mapping='logical' distinct='false'>" +
        "<entity name='new_busquedadepersonal'>" +
        "<attribute name='createdon' />" +
        "<attribute name='new_puesto' />" +
        "<attribute name='statuscode' />" +
        "<attribute name='new_autorizadopor' />" +
        "<attribute name='new_sucursal' />" +
        "<attribute name='new_reportaraa' />" +
        "<attribute name='new_personasacargosino' />" +
        "<attribute name='new_jornadalaboral' />" +
        "<attribute name='new_descripciongeneraldelpuesto' />" +
        "<attribute name='new_tipodepuesto' />" +
        "<attribute name='new_busquedadepersonalid' />" +
        "<order attribute='createdon' descending='true' />" +
        "<filter type='and'>" +
        "<condition attribute='statecode' operator='eq' value='0' />" +
        "</filter>" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_BUSQUEDA_ABIERTA,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};