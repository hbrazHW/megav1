import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

//constantes

const dataInicial = {
  loading: false,
  asunto: [],
};

//types
const OBTENER_ASUNTO_EXITO = "OBTENER_ASUNTO_EXITO";
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function asuntoCasoReducers(state = dataInicial, action) {
  switch (action.type) {
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true };
    case OBTENER_ASUNTO_EXITO:
      return { ...state, asunto: action.payload, loading: false };
    default:
      return { ...state };
  }
}

// actions
export const obtenerAsunto = () => async (dispatch) => {
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
    "<order attribute='title' descending='false' />" +
    "<filter type='and'>" +
      "<condition attribute='subjectid' operator='not-null' />" +
    "</filter>" +
  "</entity>" +
"</fetch>";
  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_ASUNTO_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};
