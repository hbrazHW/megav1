import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    actividades:[]
}

//Types
const OBTENER_ACTIVIDADES_EXITO = 'OBTENER_ACTIVIDADES_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function actividadesReducers(state = dataInicial, action){
    switch (action.type) {
        case OBTENER_ACTIVIDADES_EXITO:
            return {...state, actividades: action.payload}
        default:
            return{ ...dataInicial }
    }
}

//Actions
export const obtenerActividades = (id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
//     var entidad = "activitypointers";
//   var fetch =
//   "<fetch mapping='logical' distinct='false'>" +
//   "<entity name='activitypointer'>" +
//     "<attribute name='activitytypecode' />" +
//     "<attribute name='subject' />" +
//     "<attribute name='statecode' />" +
//     "<attribute name='prioritycode' />" +
//     "<attribute name='modifiedon' />" +
//     "<attribute name='activityid' />" +
//     "<attribute name='instancetypecode' />" +
//     "<attribute name='community' />" +
//     "<attribute name='regardingobjectid' />" +
//     "<order attribute='modifiedon' descending='false' />" +
//   "</entity>" +
// "</fetch>";
    try {
        if (id != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Actividad?filter=_regardingobjectid_value eq ${id}&cuit=${Entidad}`)
            dispatch({
                type: OBTENER_ACTIVIDADES_EXITO,
                payload: response.data
            })      
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}