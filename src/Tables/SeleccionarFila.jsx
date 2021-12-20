import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import {obtenerLegales} from '../Redux/DocumentosLegales'
import {obtenerLegalesId} from "../Redux/DocumentosLegales"

const SeleccionarFila = ({value}) => {
    const dispatch = useDispatch()

    const obtenerId = (id) => {
        dispatch(obtenerLegales(id))
        setTimeout(()=> {
            obtenerLegalesId(id)
        },500);
    }

    return (
        <div className="dropdown m-0">
            <button className="btn p-0 h-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon id={value} icon={faEllipsisH} className="fs-5 text-dark upload-file atras" />
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                <button className="btn border-0 adeltante dropdown-item text-light"
                    id={value}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={e => obtenerId(e.target.id)}
                >
                    Ver Legales
                </button>
            </ul>
        </div>
    )
}

export default SeleccionarFila
