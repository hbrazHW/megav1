import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    contacts: [],
    rolAdmin: [],

};

//types
const OBTENER_ROL_ADMIN = 'OBTENER_ROL_ADMIN'
const OBTENER_CONTACTS = 'OBTENER_CONTACTS'
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducer
export default function contactsReducers(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_ROL_ADMIN:
            return { ...state, rolAdmin: action.payload, loading: false };
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
        "<attribute name='parentcustomerid' />" +
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


//actions tieneRol traen los contactos bajo un rol en particular

export const tieneRolAdmin = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "contacts";
    var fetch = "<fetch mapping='logical' distinct='true'>" +
        "<entity name='contact'>" +
        "<attribute name='fullname' />" +
        "<attribute name='telephone1' />" +
        "<attribute name='contactid' />" +
        "<order attribute='fullname' descending='false' />" +
        "<link-entity name='new_contact_new_rolportal' from='contactid' to='contactid' visible='false' intersect='true'>" +
        "<link-entity name='new_rolportal' from='new_rolportalid' to='new_rolportalid' alias='ac'>" +
        "<filter type='and'>" +
        "<condition attribute='new_rolportalid' operator='eq' uiname='Administración' uitype='new_rolportal' value='{ED52E303-AE7A-EC11-8D21-000D3A88F475}' />" +
        "</filter>" +
        "</link-entity>" +
        "</link-entity>" +
        "</entity>" +
        "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_ROL_ADMIN,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
}