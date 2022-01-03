import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { obtenerCasosId } from '../Redux/Casos'

const SeleccionarCR = ({value}) => {
    const dispatch = useDispatch()

    const obtenerId = (id) => {
        dispatch(obtenerCasosId(id));
        console.log(id)
    }

    return (
        <div className="dropdown m-0">
            <button className="btn p-0 h-auto" type="button" id="dropdownMenuButton1"  data-bs-toggle="dropdown" data-bs-target="#modalOperacion" aria-expanded="false">
                <FontAwesomeIcon id={value} icon={faEye} className="fs-5 text-dark upload-file atras" />
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