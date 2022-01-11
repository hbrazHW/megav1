import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {obtenerResolucion} from '../Redux/ResolucionCaso'

const ResolucionCaso = ({id}) => {
    const dispatch = useDispatch ()
    const[resolucionCaso, setResolucionCaso] = React.useState('')
    const [llamada, setLlamada] = React.useState(false)
    const resolucionSelector = useSelector(store => store.resolucionCaso.resolucionCaso)
     
    React.useEffect( () => {
        
        if(resolucionSelector.length > 0){
         if(id !== null){

             resolucionSelector.filter(item => item._incidentid_value == id).map(item => {
                setResolucionCaso(item.subject)
             })
         
         }

      
        }else if(resolucionSelector.length === 0 ){
            obtenerResolu()
        }

    }, [resolucionSelector])
     
    //const 
    const obtenerResolu = () =>{
        dispatch(obtenerResolucion())
    } 
    
    return(
        <p className= "m-0 texto-tabla m-0">{resolucionCaso}</p>
    )

}    


export default ResolucionCaso
