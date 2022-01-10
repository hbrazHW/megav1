import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {
    loading: false,
    correoEletronico: [],
};

//types
const OBTENER_CORREO_ELETRONICO = 'OBTENER_CORREO_ELETRONICO'
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducer
export default function correoEletronicoReducers(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_CORREO_ELETRONICO:
            return { ...state, correoEletronico: action.payload, loading: false };
        case ERROR:
            return { ...dataInicial };
        case LOADING:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
}

export const consultaFETCHcorreoEletronico = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    var entidad = "emails";
    var fetch = "<fetch  mapping='logical' distinct='false'>" +
    "<entity name='email'>" +
      "<attribute name='subject' />" +
      "<attribute name='regardingobjectid' />" +
      "<attribute name='from' />" + 
      "<attribute name='to' />" +
      "<attribute name='prioritycode' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='modifiedon' />" +
      "<attribute name='activityid' />" +
      "<order attribute='subject' descending='false' />" +
   "</entity>" +
  "</fetch>";

    try {
        const response = await axios.get(
            `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
        );
        dispatch({
            type: OBTENER_CORREO_ELETRONICO,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
        });
    }
};