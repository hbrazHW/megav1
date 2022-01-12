import axios from "axios";
import { Entidad, UrlApiDynamics } from "../Keys";

const dataInicial = {

  loading: false,
  busquedaPersonal: [],
  puesto: [],
  cuentas: [],
  areas: [],
  sucursales: [],
  autorizadoPor: [],
  evaluaciones: [],
  ticket: '',
  resultadoCaso: '',
  evaluacionId: '',
  busquedaId: '',
  archivos: [],
  resultadoCaso2: '',
  ticket2: '',
  archivos2: []
};

//types
const CARGA_DATOS2_EXITO = 'CARGA_DATOS2_EXITO'
const ADJUNTOS_EXITO = 'ADJUNTOS_EXITO'
const BUSQUEDAID_EXITO = 'BUSQUEDAID_EXITO'
const OBTENER_EVALUACION_ID_EXITO = 'OBTENER_EVALUACION_ID_EXITO'
const OBTENER_EVALUACIONES = 'OBTENER_EVALUACIONES'
const CARGA_DATOS_EXITO = 'CARGA_DATOS_EXITO'
const OBTENER_AUTORIZADO_POR = 'OBTENER_AUTORIZADO_POR'
const OBTENER_SUCURSALES = 'OBTENER_SUCURSALES'
const OBTENER_AREAS = 'OBTENER_AREAS'
const OBTENER_CUENTA = 'OBTENER_CUENTA'
const OBTENER_PUESTO = 'OBTENER_PUESTO';
const OBTENER_BUSQUEDA_ABIERTA = "OBTENER_BUSQUEDA_ABIERTA";
const LOADING = "LOADING";
const ERROR = "ERROR";

//reducers
export default function recursosHumanosReducers(state = dataInicial, action) {
  switch (action.type) {
    case CARGA_DATOS2_EXITO:
      return { ...state, resultadoCaso2: action.resultadoCaso, ticket2: action.ticket}
    case ADJUNTOS_EXITO:
      return { ...state, archivos: action.payload };
    case BUSQUEDAID_EXITO:
      return  { ...state, busquedaId: action.busquedaId, loading: false };
    case OBTENER_EVALUACION_ID_EXITO:
      return { ...state, evaluacionId: action.evaluacionId }
    case OBTENER_EVALUACIONES:
      return { ...state, evaluaciones: action.payload, loading: false}
    case CARGA_DATOS_EXITO:
      return { ...state, resultadoCaso: action.resultadoCaso, ticket: action.ticket }
    case OBTENER_AUTORIZADO_POR:
      return { ...state, autorizadoPor: action.payload, loading: false }
    case OBTENER_SUCURSALES:
      return { ...state, sucursales: action.payload, loading: false }
    case OBTENER_AREAS:
      return { ...state, areas: action.payload, loading: false }
    case OBTENER_CUENTA:
      return { ...state, cuentas: action.payload, loading: false };
    case OBTENER_PUESTO:
      return { ...state, puesto: action.payload, loading: false };
    case OBTENER_BUSQUEDA_ABIERTA:
      return { ...state, busquedaPersonal: action.payload, loading: false };
    case ERROR:
      return { ...dataInicial };
    case LOADING:
      return { ...state, loading: true, resultadoCaso: action.resultadoCaso };
    default:
      return { ...state };
  }

}

export const consultaFETCHbusquedaPersonal = () => async (dispatch) => {
  dispatch({
    type: LOADING,

  });
  var entidad = "new_busquedadepersonals";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
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
      resultadoCaso: 'EXITO'
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const consultaFETCHpuesto = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "new_cargos";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
    "<entity name='new_cargo'>" +
    "<attribute name='new_cargoid' />" +
    "<attribute name='new_name' />" +
    "<attribute name='createdon' />" +
    "<order attribute='new_name' descending='false' />" +
    "</entity>" +
    "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_PUESTO,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const consultaFETCHcuentas = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "accounts";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
    "<entity name='account'>" +
    "<attribute name='name' />" +
    "<attribute name='accountid' />" +
    "<order attribute='name' descending='false' />" +
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
      type: OBTENER_CUENTA,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const consultaFETCHareas = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  var entidad = "new_areas";
  var fetch =
    "<fetch mapping='logical' distinct='false'>" +
    "<entity name='new_area'>" +
    "<attribute name='new_areaid' />" +
    "<attribute name='new_name' />" +
    "<order attribute='new_name' descending='false' />" +
    "</entity>" +
    "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_AREAS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

//una consulta diferente ya que en el tenant filtra sucursales como este fetch
export const consultaFETCHsedesRH = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  var entidad = "accounts";
  var fetch =
    "<fetch mapping='logical' distinct='true'>" +
    "<entity name='account'>" +
    "<attribute name='name' />" +
    "<attribute name='primarycontactid' />" +
    "<attribute name='telephone1' />" +
    "<attribute name='accountid' />" +
    "<attribute name='new_sedeclienteinterno' />" +
    "<order attribute='name' descending='false' />" +
    "<link-entity name='contact' from='parentcustomerid' to='accountid' link-type='inner' alias='af' />" +
    "</entity>" +
    "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_SUCURSALES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const consultaFETCHautorizadoPor = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  var entidad = "contacts";
  var fetch = "<fetch mapping='logical' distinct='false'>" +
    "<entity name='contact'>" +
    "<attribute name='fullname' />" +
    "<attribute name='parentcustomerid' />" +
    "<attribute name='telephone1' />" +
    "<attribute name='emailaddress1' />" +
    "<attribute name='contactid' />" +
    "<order attribute='fullname' descending='false' />" +
    "<filter type='and'>" +
    "<condition attribute='statecode' operator='eq' value='0' />" +
    "<condition attribute='new_tipodecliente' operator='eq' value='100000000' />" +
    "</filter>" +
    "</entity>" +
    "</fetch>";

  try {
    const response = await axios.get(
      `${UrlApiDynamics}ConsultaFetch?Entidad=${entidad}&fetch=${fetch}&cuit=${Entidad}`
    );
    dispatch({
      type: OBTENER_AUTORIZADO_POR,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
}

export const cargarForm = (puesto, motivoBusqueda, motivoReemplazo, sucursal, area, reporta, jornada, observaciones, tipoDeBusqueda, autorizadoPor, file, config) => async (dispatch) => {
  dispatch({
    type: LOADING,
    resultadoCaso: 'LOADING'
  })
  try {
    const response = await axios.post(`${UrlApiDynamics}Busquedadepersonal?puesto=${puesto}&motivoBusqueda=${motivoBusqueda}&motivoReemplazo=${motivoReemplazo}&sucursal=${sucursal}&area=${area}&reporta=${reporta}&jornada=${jornada}&observaciones=${observaciones}&tipoDeBusqueda=${tipoDeBusqueda}&autorizadoPor=${autorizadoPor}&cuit=${Entidad}`, file, config)
    console.log("response", response)
    dispatch({
      type: CARGA_DATOS_EXITO,
      tiket: response.data,
      resultadoCaso: 'EXITO',

    })
  } catch (error) {
    dispatch({
      type: ERROR,
      resultadoCaso: 'ERROR'
    })
  }
}

export const cargarForm2 = (empleado, puesto, sucursal, evaluador, nombre, fechaIngreso, area, referido, referente, comentarios30, comentarios60, comentarios90, puestoevaluador, periodoprueba, participocurso, file, config) => async (dispatch) => {
  dispatch({
    type: LOADING,
    resultadoCaso2: 'LOADING'
  })
  try {
    const response = await axios.post(`${UrlApiDynamics}Evaluacionperiodoprueba?empleado=${empleado}&puesto=${puesto}&sucursal=${sucursal}&evaluador=${evaluador}&nombre=${nombre}&fechaIngreso=${fechaIngreso}&area=${area}&referido=${referido}&referente=${referente}&comentarios30=${comentarios30}&comentarios60=${comentarios60}&comentarios90=${comentarios90}&puestoevaluador=${puestoevaluador}&periodoprueba=${periodoprueba}&participocurso=${participocurso}&cuit=${Entidad}`, file, config)
    console.log("response", response)
    dispatch({
      type: CARGA_DATOS2_EXITO,
      ticket2: response.data,
      resultadoCaso2: 'EXITO',

    })
  } catch (error) {
    dispatch({
      type: ERROR,
      resultadoCaso2: 'ERROR'
    })
  }
}

export const cargarArchivos = (busquedaId, file, config, tipo) => (dispatch) => {
  try {
      debugger
      const id = busquedaId
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

export const obtenerBusquedaPersonalId = (id) => (dispatch) => {
  if (id !== undefined) {
      dispatch({
          type: BUSQUEDAID_EXITO,
          busquedaId: id    
      });

  }
}

export const consultaFETCHevaluaciones = () => async (dispatch) => {
  dispatch({
    type: LOADING
  })

  var entidad = 'new_evaluaciondeperiododepruebas'
  var fetch = "<fetch mapping='logical' distinct='false'>" +
    "<entity name='new_evaluaciondeperiododeprueba'>" +
    "<attribute name='createdon' />" +
    "<attribute name='new_evaluador' />" +
    "<attribute name='new_empleado' />" +
    "<attribute name='new_80dias' />" +
    "<attribute name='new_60dias' />" +
    "<attribute name='new_30dias' />" +
    "<attribute name='new_name' />" +
    "<attribute name='new_pasaperiododeprueba' />" +
    "<attribute name='new_fechadeingreso' />" +
    "<attribute name='new_puesto' />" +
    "<attribute name='new_sucursal' />" +
    "<attribute name='new_evaluaciondeperiododepruebaid' />" +
    "<attribute name='new_esreferido' />"+
    "<attribute name='new_elempleadoparticipodelcursodeinduccion' />"+
    "<order attribute='createdon' descending='false' />" +
    "<order attribute='new_empleado' descending='false' />" +
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
      type: OBTENER_EVALUACIONES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
}

export const obtenerEvaluacionId = (id) => (dispatch) => {
  if (id !== undefined) {
      dispatch({
          type: OBTENER_EVALUACION_ID_EXITO,
          evaluacionId: id
      })
  }
}