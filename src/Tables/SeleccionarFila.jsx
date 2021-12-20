import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faEye } from '@fortawesome/free-solid-svg-icons'
import {obtenerLegales} from '../Redux/DocumentosLegales'
import {obtenerLegalesId} from "../Redux/DocumentosLegales"

const SeleccionarFila = ({value}) => {
    const dispatch = useDispatch()
    const [LegalesCreado, setLegalesCreado] = React.useState('')
    const legalesSelector = useSelector((store) => store.legales.legales)

    React.useEffect( () => {
        
        if(legalesSelector.length > 0){
         if(value !== null){
             legalesSelector.filter(item => item.new_documentoslegalesid == value).map(item => {
                setLegalesCreado(item.null)
             })
         }

      
        }else if(legalesSelector.length === 0 ){
            obtenerLegal()
        }

    }, [legalesSelector])

    const obtenerLegal = () =>{
        dispatch(obtenerLegales())
    } 




    const obtenerId = (id) => {
        dispatch(obtenerLegalesId(id))
        setTimeout(()=> {
            obtenerLegalesId(id)
        },500);
    }

    return (
        <div className="dropdown m-0">
            <button className="btn p-0 h-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon id={value} icon={faEye} className="fs-5 text-dark upload-file atras" />
                 {/* {<FontAwesomeIcon id={value} icon={faEye} className="fs-5 text-dark upload-file atras" /> } */}
                 <a href="" className="link-info text-decoration-none justify-content-right">
                    {LegalesCreado}    
                </a> 
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
