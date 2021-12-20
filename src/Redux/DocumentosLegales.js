import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

//constantes

const dataInicial = {
  loading: false,
  legales: [],
  legalesId: ''
};

//types
const OBTENER_LEGALES_EXITO = "OBTENER_LEGALES_EXITO";
const LEGALESID_EXITO = "LEGALESID_EXITO"
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function documentosLegalesReducers(state = dataInicial, action) {
  switch (action.type) {
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true };
    case OBTENER_LEGALES_EXITO:
      return { ...state, legales: action.payload, loading: false };
    case LEGALESID_EXITO:
      return  { ...state, legalesId: action.payload, loading: false };
    default:
      return { ...state };
  }
}

// actions
export const obtenerLegales = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "new_documentoslegaleses";
  var fetch =
  "<fetch mapping='logical' distinct='false'>" +
  "<entity name='new_documentoslegales'>" +
  "<attribute name='new_documentoslegalesid' />" +
  "<attribute name='new_name' />" +
  "<attribute name='createdon' />" +
  "<attribute name='new_sede' />" +
  "<attribute name='new_personaquerecepcion' />" +
  "<attribute name='new_fechaderecepcin' />" +
  "<attribute name='overriddencreatedon' />" +
  "<attribute name='new_descripcindeldocumento' />" +
  "<attribute name='createdby' />" +
  "<order attribute='new_name' descending='false' />" +
"</entity>" +
"</fetch>";
  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_LEGALES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const obtenerLegalesId = (id) => (dispatch) => {
  if (id !== undefined) {
      dispatch({
          type: LEGALESID_EXITO,
          legalesId: id
          
      });

  }
}