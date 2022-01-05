import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

//constantes

const dataInicial = {
  loading: false,
  legales: [],
  archivos: [],
  legalesId: '',
  ticket:'',
  resultadoCaso:''
};

//types
const ADJUNTOS_EXITO = 'ADJUNTOS_EXITO'
const OBTENER_LEGALES_EXITO = "OBTENER_LEGALES_EXITO";
const LEGALESID_EXITO = "LEGALESID_EXITO"
const CARGA_DATOS_EXITO = "CARGA_DATOS_EXITO"
const LOADING = "LOADING";
const ERROR = "ERROR";



//reducers
export default function documentosLegalesReducers(state = dataInicial, action) {
  switch (action.type) {
    case CARGA_DATOS_EXITO:
      return { ...state, resultadoCaso: action.resultadoCaso, ticket: action.ticket};
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true, resultadoCaso: action.resultadoCaso };
    case OBTENER_LEGALES_EXITO:
      return { ...state, legales: action.payload, loading: false };
    case LEGALESID_EXITO:
      return  { ...state, legalesId: action.legalesId, loading: false };
      case ADJUNTOS_EXITO:
        return { ...state, archivos: action.payload };
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
  "<attribute name='new_observaciones' />" +
  "<attribute name='new_personaquerecepcion' />" +
  "<attribute name='new_fechaderecepcin' />" +
  "<attribute name='overriddencreatedon' />" +
  "<attribute name='new_descripcindeldocumento' />" +
  "<attribute name='statecode' />" +
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
      resultadoCaso: 'PENDING'
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

export const cargarForm = ( autor, fechaRecepcion, descripcionDoc, sede, persona, observaciones, file, config ) => async (dispatch) => {
  dispatch({
      type: LOADING,
      resultadoCaso: 'LOADING'
  })
  try { 
      const response = await axios.post(`${UrlApiDynamics}Documentoslegales?autor=${autor}&fechaRecepcion=${fechaRecepcion}&descripcionDoc=${descripcionDoc}&sede=${sede}&persona=${persona}&observaciones=${observaciones}&cuit=${Entidad}`, file, config)
         console.log("response", response)
      dispatch({
          type: CARGA_DATOS_EXITO,
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

export const cargarArchivos = (legalesId, file, config, tipo) => (dispatch) => {
  try {
      debugger
      const id = legalesId
      const resp = axios.post(`${UrlApiDynamics}Notas?id=${id}&cuit=${Entidad}&tipo=${tipo}`, file, config)
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

// export const cargarArchivos = (legalesId, file, config, tipo) => (dispatch) => {
//   try {
//       debugger
//       const id = legalesId
//       const resp = axios.post(`${UrlApiDynamics}Notas?id=${id}&cuit=${Entidad}&tipo=${tipo}`, file, config)
//       dispatch({
//           type: ADJUNTOS_EXITO,
//           payload: resp.data
//       })
//   }
//   catch (error) {
//       dispatch({
//           type: ERROR
//       })
//   }
// }