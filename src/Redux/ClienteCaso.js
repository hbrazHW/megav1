import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

//constantes

const dataInicial = {
  loading: false,
  cliente: [],
};

//types
const OBTENER_CLIENTE_EXITO = "OBTENER_CLIENTE_EXITO";
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function clienteCasoReducers(state = dataInicial, action) {
  switch (action.type) {
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true };
    case OBTENER_CLIENTE_EXITO:
      return { ...state, cliente: action.payload, loading: false };
    default:
      return { ...state };
  }
}

// actions
export const obtenerCliente = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "incidents";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
      "<entity name='incident'>" +
      "<attribute name='title' />" +
      "<attribute name='ticketnumber' />" +
      "<attribute name='createdon' />" +
      "<attribute name='incidentid' />" +
      "<attribute name='caseorigincode' />" +
      "<attribute name='new_cliente' />" +
      "<order attribute='title' descending='false' />" +
      "</entity>" +
      "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_CLIENTE_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};
