import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    contacts: [],
};

//types
const OBTENER_CONTACTS = 'OBTENER_CONTACTS'
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducer
export default function contactsReducers(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_CONTACTS:
            return { ...state, contacts: action.payload, loading: false };
        case ERROR:
            return { ...dataInicial };
        case LOADING:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
}

export const consultaFETCHcontacts = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "contacts";
    var fetch = "<fetch mapping='logical' distinct='false'>" +
        "<entity name='contact'>" +
        "<attribute name='fullname' />" +
        "<attribute name='contactid' />" +
        "<attribute name='parentcustomerid' />"+
        "<order attribute='fullname' descending='false' />" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_CONTACTS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};