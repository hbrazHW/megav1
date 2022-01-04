import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import Tabla from '../Components/Tabla'
import { consultaFETCHbusquedaPersonal, consultaFETCHcuentas, consultaFETCHevaluaciones, consultaFETCHpuesto } from "../Redux/RecursosHumanos";
import { COLUMNASBPA } from "../Tables/ColumnasBPA";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { COLUMNASEV } from '../Tables/ColumnasEvaluaciones';
import Moment from 'moment'
import { consultaFETCHcontacts } from '../Redux/Contact';

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
    const evaluacionesIdSelector = useSelector(store => store.recursosHumanos.evaluacionId)

    //columnas
    const [columnasRrhh, setColumnasRrhh] = React.useState([])
    const [columnasEvaluaciones, setColumnasEvaluaciones] = React.useState([])

    //hook modal evaluaciones
    const [empleado, setEmpleado] = React.useState("")
    const [puesto, setPuesto] = React.useState("")
    const [sucursal, setSucursal] = React.useState("")
    const [evaluador, setEvaluador] = React.useState("")
    const [nombre, setNombre] = React.useState("")
    const [comentarios30, setComentarios30] = React.useState("")
    const [comentarios60, setComentarios60] = React.useState("")
    const [comentarios80, setComentarios80] = React.useState("")
    const [periodo, setPeriodo] = React.useState("")


    //hooks para matches de id
    const [contacts, setContacts] = React.useState([])
    const [llamadaContacts, setLlamadaContacts] = React.useState(false)
    const contactSelector = useSelector(store => store.contacts.contacts)
    const [sucursales, setSucursales] = React.useState([])
    const [llamadaSucursales, setLlamadaSucursales] = React.useState(false)
    const sucursalesSelector = useSelector(store => store.recursosHumanos.cuentas)
    const [puestoNombre, setPuestoNombre] = React.useState([])
    const [llamadaPuestoNombre, setLlamadaPuestoNombre] = React.useState(false)
    const puestoNombreSelector = useSelector(store => store.recursosHumanos.puesto)


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

        if (evaluaciones.length === 0) {
            if (evaluacionesSelector.length > 0 && llamadaEvaluaciones === true) {
                setEvaluaciones(evaluacionesSelector)
                setColumnasEvaluaciones(COLUMNASEV)
            } else if (llamadaEvaluaciones === false) {
                obtenerEvaluaciones()
                setLlamadasEvaluaciones(true)
                setColumnasEvaluaciones(COLUMNASEV)
            }
        }

        if (evaluacionesIdSelector !== undefined) {
            if (evaluacionesIdSelector !== '') {
                completarEvaluaciones(evaluacionesIdSelector)
            }
        }

        if (contacts.length === 0) {
            if (contactSelector.length > 0 && llamadaContacts === true) {
                setContacts(contactSelector)
            } else if (llamadaContacts === false) {
                obtenerContactos()
                setLlamadaContacts(true)
            }
        }

        if (sucursales.length === 0) {
            if (sucursalesSelector.length > 0 && llamadaSucursales === true) {
                setSucursales(sucursalesSelector)
            } else if (llamadaSucursales === false) {
                obtenerCuentas()
                setLlamadaSucursales(true)
            }
        }

        if(puestoNombre.length === 0){
            if(puestoNombreSelector.length > 0 && llamadaPuestoNombre === true){
                setPuestoNombre(puestoNombreSelector)
            }else if(llamadaPuestoNombre === false){
                obtenerPuestos()
                setLlamadaPuestoNombre(true)
            }
        }

    }, [recursosHumanosSelector, evaluacionesSelector, evaluacionesIdSelector, contactSelector, sucursalesSelector, puestoNombreSelector])


    const obtenerPuestos = () => {
        dispatch(consultaFETCHpuesto())
    }

    const obtenerCuentas = () => {
        dispatch(consultaFETCHcuentas())
    }

    const obtenerContactos = () => {
        dispatch(consultaFETCHcontacts())
    }

    const obtenerEvaluaciones = () => {
        dispatch(consultaFETCHevaluaciones())
    }

    const obtenerPersonal = () => {
        dispatch(consultaFETCHbusquedaPersonal())
    }

    const obtenerNombrePuesto = (cargo) => {
        let puesto = ''
        puestoNombre.filter(item => item.new_cargoid == cargo).map(item => {
            puesto = item.new_name
        })
        return puesto
    }

    const obtenerNombreSucursal = (sucursal) => {
        let establecimiento = ''
        sucursales.filter(item => item.accountid == sucursal).map(item => {
            establecimiento = item.name
        })
        return establecimiento
    }

    const obtenerNombreEmpleado = (empleado) => {
        let contacto = ''
        contacts.filter(item => item.contactid == empleado).map(item => {
            contacto = item.fullname
        })
        return contacto
    }

    const completarEvaluaciones = (id) => {
        evaluaciones.filter(item => item.new_evaluaciondeperiododepruebaid == id).map(item => {
            setEmpleado(obtenerNombreEmpleado(item._new_empleado_value))
            setPuesto(obtenerNombrePuesto(item._new_puesto_value))
            setSucursal(obtenerNombreSucursal(item._new_sucursal_value))
            setEvaluador(obtenerNombreEmpleado(item._new_evaluador_value))
            setNombre(item.new_name)
            setComentarios30(item.new_30dias)
            setComentarios60(item.new_60dias)
            setComentarios80(item.new_80dias)
            setPeriodo(periodoPrueba(item.new_pasaperiododeprueba))
        })
    }

    const periodoPrueba = (valor) => {
        switch (valor) {
            case true:
                return "Si"
            case false:
                return "No"
            default:
                return '---'
        }
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

                <div
                    className="modal fade bd-example-modal-xl"
                    id="modalEV"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h6 className="fw-bolder">Evaluación Periodo de Prueba</h6>
                                        <hr className="hr-width hr-principal" />
                                    </div>
                                    <div className="col-sm-4">
                                        <button
                                            type="button"
                                            className="btn-close float-end"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            id="myInput"
                                        ></button>
                                    </div>
                                </div>

                                <div className="row w-auto d-flex justify-content-center">
                                    <div className="col-12">
                                        <h6 className="fw-bolder">Detalles de la evaluación</h6>
                                        <div className="row">
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Empleado
                                                    </label>
                                                    <input
                                                        value={empleado}
                                                        type="text"
                                                        id="numberticket"
                                                        name="numberticket"
                                                        // value={numCaso}
                                                        className="form-control desabilitado"
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Puesto
                                                    </label>
                                                    <input
                                                        value={puesto}
                                                        type="asunto"
                                                        id="asunto"
                                                        // value={obtenerNombreAsunto(asuntoCaso)}
                                                        name="asuntocaso"
                                                        className="form-control desabilitado"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Sucursal
                                                    </label>
                                                    <input
                                                        value={sucursal}
                                                        type="text"
                                                        id="fechaAlta"
                                                        name="fechaAlta"
                                                        // value={Moment(fechaAltaCaso).format("DD-MM-YYYY")}
                                                        className="form-control desabilitado"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Evaluador
                                                    </label>
                                                    <input
                                                        value={evaluador}
                                                        type="text"
                                                        id="estadoCaso"
                                                        name="estadoCaso"
                                                        className="form-control desabilitado"
                                                        // value={razonEstadoCaso(razonParaElEstado)}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Nombre
                                                    </label>
                                                    <textarea
                                                        value={nombre}
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        // value={comentarioCasoActivo}
                                                        rows="2"
                                                        disabled
                                                    ></textarea>
                                                </div>

                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Comentarios 30 dias
                                                    </label>
                                                    <textarea
                                                        value={comentarios30}
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        // value={comentarioCasoActivo}
                                                        rows="2"
                                                        disabled
                                                    ></textarea>
                                                </div>

                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Comentarios 60 dias
                                                    </label>
                                                    <textarea
                                                        value={comentarios60}
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        // value={comentarioCasoActivo}
                                                        rows="2"
                                                        disabled
                                                    ></textarea>
                                                </div>

                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Comentarios 90 dias
                                                    </label>
                                                    <textarea
                                                        value={comentarios80}
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        // value={comentarioCasoActivo}
                                                        rows="2"
                                                        disabled
                                                    ></textarea>
                                                </div>

                                            </div>
                                            <div className="col-sm-4 col-md-12">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">
                                                        Pasa Periodo de Prueba?
                                                    </label>
                                                    <input
                                                        value={periodo}
                                                        type="text"
                                                        id="estadoCaso"
                                                        name="estadoCaso"
                                                        className="form-control desabilitado"
                                                        // value={razonEstadoCaso(razonParaElEstado)}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
