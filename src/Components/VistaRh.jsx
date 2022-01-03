import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import Tabla from '../Components/Tabla'
import { consultaFETCHbusquedaPersonal } from "../Redux/RecursosHumanos";
import { COLUMNASBPA } from "../Tables/ColumnasBPA";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'


const VistaRh = () => {
    const dispatch = useDispatch();

    const fade = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            delay: 1500,
        },
    });

    //hooks
    const [busquedaPersonal, setBusquedaPersonal] = React.useState([])
    const [llamadaBusquedaP, setLlamadaBusquedaP] = React.useState(false)

    //Selectores
    const recursosHumanosSelector = useSelector(store => store.recursosHumanos.busquedaPersonal)

    //columnas
    const [columnasRrhh, setColumnasRrhh] = React.useState([])

    React.useEffect(() => {
        if (busquedaPersonal.length === 0) {
            if (recursosHumanosSelector.length > 0 && llamadaBusquedaP === true) {
                setBusquedaPersonal(recursosHumanosSelector)
                setColumnasRrhh(COLUMNASBPA)
                setTimeout(() => {
                    if (document.getElementById("spinner-serie") !== null) {
                        document.getElementById("spinner-serie").hidden = true;
                    }
                }, 50);
            } else if (llamadaBusquedaP === false) {
                obtenerPersonal()
                setColumnasRrhh(COLUMNASBPA)
                setLlamadaBusquedaP(true)
            }
        }
    }, [recursosHumanosSelector])

    const obtenerPersonal = () => {
        dispatch(consultaFETCHbusquedaPersonal())
    }

    return (
        <animated.div className="container" style={fade}>
            <div className="col-sm-12 mt-4">
                <div className="card p-2 shadow pad borde-none sgr mb-4">
                    <div className="card-body p-0 ">
                        <div className="row">
                            <div className="col-10">
                                <div className="p-2">
                                    <h4 className="fw-bold pt-2 mx-2 pb-2 fw-bolder m-0 ">Recursos Humanos</h4>
                                </div>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faIdBadge} className="fs-1 upload-file atras" color="rgb(245,130,32)" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row pb-5">
                    <div className="col-sm-12 p-2 mt-3">
                        <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                            <div>
                                <h6 className="fw-bolder">Busquedas de personal Abiertas</h6>
                                <hr className="hr-width hr-principal" />
                            </div>
                            <div className="card pad borde-none">

                                <div className="contenedor-spinner" id="spinner-serie">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                {busquedaPersonal.length > 0 ? (<Tabla lineas={busquedaPersonal} columnas={columnasRrhh} titulo={'rr-hh'} header={false} />) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default VistaRh
