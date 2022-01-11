import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { obtenerCasosId } from '../Redux/Casos'
import { obtenerResolucion } from '../Redux/ResolucionCaso'


const SeleccionarCR = ({value}) => {
    const dispatch = useDispatch()
    const[resolucionCaso, setResolucionCaso] = React.useState('')
    const resolucionSelector = useSelector(store => store.resolucionCaso.resolucionCaso)

    React.useEffect( () => {
        
        if(resolucionSelector.length > 0){
         if(value !== null){
             resolucionSelector.filter(item => item._incidentid_value == value).map(item => {
                setResolucionCaso(item.subject)
             })
         }

      
        }else if(resolucionSelector.length === 0 ){
            obtenerResolu()
        }

    }, [resolucionSelector])

    const obtenerResolu = () =>{
        dispatch(obtenerResolucion())
    } 

    const obtenerId = (id) => {
        dispatch(obtenerCasosId(id));
        console.log(id)
    }

    return (
       <div className="dropdown m-0">
            <button className="btn p-0 h-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* {<FontAwesomeIcon id={value} icon={faEye} className="fs-5 text-dark upload-file atras" /> } */}
                <a href="" className="link-info text-decoration-none justify-content-right">
                    {resolucionCaso}    
                </a> 
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                <button className="btn border-0 adeltante dropdown-item text-light"
                    id={value}
                    data-bs-toggle="modal"
                    data-bs-target="#modalCR"
                    onClick={e => obtenerId(e.target.id)}
                >
                    Ver caso resuelto
                </button>
            </ul>
        </div>
    )
}

export default SeleccionarCR