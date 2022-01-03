import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import Tabla from '../Components/Tabla'
import { consultaFETCHbusquedaPersonal, consultaFETCHevaluaciones } from "../Redux/RecursosHumanos";
import { COLUMNASBPA } from "../Tables/ColumnasBPA";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { COLUMNASEV } from '../Tables/ColumnasEvaluaciones';
import Moment from 'moment'

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
    const [evaluaciones, setEvaluaciones] = React.useState([])
    const [llamadaEvaluaciones, setLlamadasEvaluaciones] = React.useState(false)

    //Selectores
    const recursosHumanosSelector = useSelector(store => store.recursosHumanos.busquedaPersonal)
    const evaluacionesSelector = useSelector(store => store.recursosHumanos.evaluaciones)

    //columnas
    const [columnasRrhh, setColumnasRrhh] = React.useState([])
    const [columnasEvaluaciones, setColumnasEvaluaciones] = React.useState([])

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

        if(evaluaciones.length === 0){
            if(evaluacionesSelector.length > 0 && llamadaEvaluaciones === true){
                setEvaluaciones(evaluacionesSelector)
                setColumnasEvaluaciones(COLUMNASEV)
            }else if(llamadaEvaluaciones === false){
                obtenerEvaluaciones()
                setLlamadasEvaluaciones(true)
                setColumnasEvaluaciones(COLUMNASEV)
            }
        }
    }, [recursosHumanosSelector, evaluacionesSelector])

    console.log("hooks:", evaluaciones)

    const obtenerEvaluaciones = () => {
        dispatch(consultaFETCHevaluaciones())
    }

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


                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark active" id="bpa-tab" data-bs-toggle="tab" data-bs-target="#bpa" type="button" role="tab" aria-controls="bpa" aria-selected="true">
                            Busquedas de personal Abiertas
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark" id="evaluacion-tab" data-bs-toggle="tab" data-bs-target="#evaluacion" type="button" role="tab" aria-controls="evaluacion" aria-selected="false">
                            Evaluación periodo de prueba
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active p-3" id="bpa" role="tabpanel" aria-labelledby="bpa-tab">
                        <div className="row pb-5">
                            <div className="col-sm-12 p-2 mt-3">
                                <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
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

                    <div className="tab-pane fade show p-3" id="evaluacion" role="tabpanel" aria-labelledby="evaluacion-tab">
                    <div className="row pb-5">
                            <div className="col-sm-12 p-2 mt-3">
                                <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                                    <div className="card pad borde-none">

                                        {/* <div className="contenedor-spinner" id="spinner-serie">
                                            <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div> */}
                                        {evaluaciones.length > 0 ? (<Tabla lineas={evaluaciones} columnas={columnasEvaluaciones} titulo={'Evaluaciones'} header={false} />) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </animated.div>
    )
}

export default VistaRh
