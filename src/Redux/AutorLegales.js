import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

//constantes

const dataInicial = {
  loading: false,
  autor: [],
};

//types
const OBTENER_AUTOR_EXITO = "OBTENER_AUTOR_EXITO";
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function autorLegalesReducers(state = dataInicial, action) {
  switch (action.type) {
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true };
    case OBTENER_AUTOR_EXITO:
      return { ...state, autor: action.payload, loading: false };
    default:
      return { ...state };
  }
}

// actions
export const obtenerAutor = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "contacts";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
    "<entity name='contact'>" +
    "<attribute name='fullname' />" +
    "<attribute name='telephone1' />" +
    "<attribute name='contactid' />" +
    "<attribute name='createdby' />" +
    "<order attribute='fullname' descending='false' />" +
    "</entity>" +
    "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_AUTOR_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};
