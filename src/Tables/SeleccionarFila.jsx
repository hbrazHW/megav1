import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { obtenerLegalesId , obtenerLegales } from '../Redux/DocumentosLegales'


const SeleccionarFila = ({value}) => {
    const dispatch = useDispatch()


    const obtenerId = (id) => {
        dispatch(obtenerLegalesId(id))
        console.log(id)
        setTimeout(() => {
            obtenerLegalesporId(id)
          
        }, 500);
    }

    const obtenerLegalesporId = (id) =>{
        dispatch(obtenerLegalesId(id))
    }

    

    return (
        <div className="dropdown m-0">
            <button className="btn p-0 h-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon id={value} icon={faEye} className="fs-5 text-dark upload-file atras" />  
            </button>

            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                <button className="btn border-0 adeltante dropdown-item text-light"
                    id={value}
                    data-bs-toggle="modal"
                    data-bs-target="#ModalDocLegales"
                    onClick={e => obtenerId(e.target.id)}
                >
                    Ver Legales
                </button>
            </ul>
        </div>
    )
}

export default SeleccionarFila
