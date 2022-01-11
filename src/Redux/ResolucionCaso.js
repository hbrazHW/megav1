import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'

//constantes

const dataInicial = {
    loading: false,
    resolucionCaso: []
}
//types
const OBTENER_RESOLUCION_CASO = 'OBTENER_RESOLUCION_CASO'
const LOADING = 'LOADING'
const ERROR = 'ERROR'
//reducers
export default function resolucionCasoReducers(state = dataInicial, action){
    switch(action.type){
        case ERROR:
             return{...dataInicial}
        case LOADING:
             return{...state,loading: true }
        case OBTENER_RESOLUCION_CASO:
            return {...state,resolucionCaso: action.payload, loading: false }   
            default:
                return{ ...state }  
    }
}
//actions
 export const obtenerResolucion = () => async (dispatch) => {
     dispatch({
         type:LOADING
     })

  try{
      const response = await axios.get(`${UrlApiDynamics}Resolucioncaso?filter=&cuit=${Entidad}`)
     
      dispatch ({
          type: OBTENER_RESOLUCION_CASO,
          payload: response.data
      })
  } catch (error) {
      dispatch({
          type:ERROR
      })
  }

 }