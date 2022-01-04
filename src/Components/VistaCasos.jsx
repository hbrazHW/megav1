import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { consultaFETCHcasosResueltos, consultaFETCHmisCasosActivos, consultaFETCHnombresAsuntos } from "../Redux/Casos";
import Tabla from '../Components/Tabla';
import { COLUMNASMCA } from '../Tables/ColumnasMCA';
import { COLUMNASCR } from '../Tables/ColumnasCR';
import MultiStepProgressBar from './MultiStepProgressBar'
import Moment from 'moment'
import { consultaFETCHcontacts } from '../Redux/Contact';

const VistaCasos = () => {

    const fade = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            delay: 1500,
        },
    });

    const dispatch = useDispatch();

    //Hooks
    const [misCasosActivos, setMisCasosActivos] = React.useState([])
    const [llamadaMisCasosActivos, setLlamadaMisCasosActivos] = React.useState(false)
    const [casosResueltos, setCasosResueltos] = React.useState([])
    const [llamadaCasosResueltos, setLlamadaCasosResueltos] = React.useState(false)
    const [contacts, setContacts] = React.useState([])
    const [llamadaContacts, setLlamadaContacts] = React.useState(false)


    //selectores
    const misCasosActivosSelector = useSelector(store => store.casos.misCasosActivos)
    const casosResueltosSelector = useSelector(store => store.casos.casosResueltos)
    const casoIdSelector = useSelector(store => store.casos.casoid)
    const contactSelector = useSelector(store => store.contacts.contacts)

    //Columnas
    const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState([])
    const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState([])

    //hooks para obtener nombres de asuntos
    const [asuntos, setAsuntos] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const asuntosSelector = useSelector(store => store.casos.asuntos)


    //hooks modal caso resuelto
    const [asuntoCasoResuelto, setAsuntoCasoResuelto] = React.useState([]);
    const [razonEstado, setRazonEstado] = React.useState([]);
    const [numCasoResuelto, setNumCasoResuelto] = React.useState([]);
    const [comentarioCasoResuelto, setComentarioCasoResuelto] = React.useState([]);
    const [asuntoPrimario, setAsuntoPrimario] = React.useState("")
    const [cliente, setCliente] = React.useState("")

    //hooks modal mis casos activos
    const [numCaso, setNumCaso] = React.useState([]);
    const [asuntoPrim, setAsuntoPrim] = React.useState([])
    const [asuntoCaso, setAsuntoCaso] = React.useState([]);
    const [fechaAltaCaso, setFechaAltaCaso] = React.useState([]);
    const [razonParaElEstado, setRazonParaElEstado] = React.useState([])
    const [comentarioCasoActivo, setComentarioCasoActivo] = React.useState("")
    const [step, setStep] = React.useState(1);

    React.useEffect(() => {
        if (misCasosActivos.length === 0) {
            if (
                misCasosActivosSelector.length > 0 &&
                llamadaMisCasosActivos === true
            ) {
                setMisCasosActivos(misCasosActivosSelector);
                setColumnasMisCasosActivos(COLUMNASMCA);
                setTimeout(() => {
                    if (document.getElementById("spinner-serie") !== null) {
                        document.getElementById("spinner-serie").hidden = true;
                    }
                }, 50);
            } else if (llamadaMisCasosActivos === false) {
                setColumnasMisCasosActivos(COLUMNASMCA);
                obtenerMisCasosA();
                setLlamadaMisCasosActivos(true);
            }
        }

        if (casosResueltos.length === 0) {
            if (casosResueltosSelector.length > 0 && llamadaCasosResueltos === true) {
                setCasosResueltos(casosResueltosSelector);
                setColumnasCasosResueltos(COLUMNASCR);
                setTimeout(() => {
                    if (document.getElementById("spinner-serie") !== null) {
                        document.getElementById("spinner-serie").hidden = true;
                    }
                }, 50);
            } else if (llamadaCasosResueltos === false) {
                obtenerCasosResueltos();
                setColumnasCasosResueltos(COLUMNASCR);
                setLlamadaCasosResueltos(true);
            }
        }

        if (casoIdSelector !== undefined) {
            if (casoIdSelector !== '') {
                completarCasoResuelto(casoIdSelector)
                completarCaso(casoIdSelector)
            }
        }

        if (asuntos.length === 0) {
            if (asuntosSelector.length > 0 && llamada === true) {
                setAsuntos(asuntosSelector)
            } else if (llamada === false) {
                obtenerAsuntos()
                setLlamada(true)
            }
        }

        if(contacts.length === 0){
            if(contactSelector.length > 0 && llamadaContacts === true){
                setContacts(contactSelector)
            }else if(llamadaContacts === false){
                obtenerContacts()
                setLlamadaContacts(true)
            }
        }

    }, [misCasosActivosSelector, casosResueltosSelector, casoIdSelector, asuntosSelector, contactSelector])

    console.log("hook:", )


    const obtenerContacts = () => {
        dispatch(consultaFETCHcontacts())
    }

    const obtenerAsuntos = () => {
        dispatch(consultaFETCHnombresAsuntos())
    }

    const obtenerCasosResueltos = () => {
        dispatch(consultaFETCHcasosResueltos());
    };

    const obtenerMisCasosA = () => {
        dispatch(consultaFETCHmisCasosActivos());
    };
    const obtenerNombreContacto = (contacto) => {
        let nombreContacto = ''
        contacts.filter(item => item.contactid == contacto).map(item => {
            nombreContacto = item.fullname
        })
        return nombreContacto
    }

    const obtenerNombreAsunto = (asunto) => {
        let nombreAsunto = ''
        asuntos.filter(item => item.subjectid == asunto).map(item => {
            nombreAsunto = item.title
        })
        return nombreAsunto
    }
    // console.log("state:", misCasosActivos)
    const completarCaso = (id) => {
        misCasosActivos.filter(item => item.incidentid == id).map(item => {
            setNumCaso(item.ticketnumber)
            setAsuntoPrim(asuntoPrimarioNombre(item.new_asuntoprimario))
            setAsuntoCaso(item._subjectid_value)
            setFechaAltaCaso(item.new_fechaalta)
            setRazonParaElEstado(item.statuscode)
            razonEstadoStep(item.statuscode)
            setComentarioCasoActivo(item.new_comentarios)
        })
    }

    const completarCasoResuelto = (id) => {
        casosResueltos.filter(item => item.incidentid == id).map(item => {
            setAsuntoCasoResuelto(item._subjectid_value)
            setRazonEstado(descripcionRazonEstado(item.statuscode))
            setNumCasoResuelto(item.ticketnumber)
            setComentarioCasoResuelto(item.new_comentarios)
            setAsuntoPrimario(item.new_asuntoprimario)
            setCliente(obtenerNombreContacto(item._new_cliente_value))
        })
    }
    
    const descripcionRazonEstado = (value) => {
        switch (value) {
            case 5:
                return 'Cerrado'
            case 1000:
                return 'Información proporcionada '
        }

    }

    const razonEstadoCaso = (value) => {
        switch (value) {
            case 1:
                return "En curso"
            case 2:
                return "Retenido"
            case 3:
                return "Esperando detalles"
            case 4:
                return "Investigación"
            case 100000001:
                return "Pendiente"
            case 100000002:
                return "Pendiente Autorizacion"
            case 100000003:
                return "Autorizado"
            case 100000004:
                return "Pendiente de Revisión"
            case 100000005:
                return "Pendiente del Proveedor"
            case 100000006:
                return "En proceso de entrega"
            case 100000007:
                return "Enviado para OK"
            default:
                return '---'
        }

    }

    const razonEstadoStep = (value) => {
        switch (value) {
            case 100000004:
                setStep(1);
            case 100000001:
                setStep(2)
            case 100000002:
                setStep(3)
            case 100000003:
                setStep(4)
            case 1:
                setStep(5)
            case 4:
                setStep(6)
            case 2:
                setStep(7)
            case 3:
                setStep(8)
            case 100000005:
                setStep(9)
            case 100000006:
                setStep(10)
            case 100000007:
                setStep(11)
            default:
                return '---'
        }

    }

    const asuntoPrimarioNombre = (value) => {
        switch (value) {
            case 1:
                return "SISTEMAS"
            case 2:
                return "ADMINISTRACION"
            case 3:
                return "COMUNICACIONES"
            case 4:
                return "FM"
            case 5:
                return "PAYROLL"
            case 6:
                return "COMERCIAL"
            case 7:
                return "CORPORATIVO"
            case 8:
                return "DISEÑO"
            case 9:
                return "SEGURIDAD"
            case 10:
                return "FITER - MESA DE AYUDA"
            case 100000000:
                return "GESTION MEDICA"
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
                                    <h4 className="fw-bold pt-2 mx-2 pb-2 fw-bolder m-0 ">Casos</h4>
                                </div>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faClipboardList} className="fs-1 upload-file atras" color="rgb(245,130,32)" />
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark active" id="mca-tab" data-bs-toggle="tab" data-bs-target="#mca" type="button" role="tab" aria-controls="mca" aria-selected="true">
                            Mis Casos Activos
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark" id="cr-tab" data-bs-toggle="tab" data-bs-target="#cr" type="button" role="tab" aria-controls="cr" aria-selected="false">
                            Casos Resueltos
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active p-3" id="mca" role="tabpanel" aria-labelledby="mca-tab">
                        <div className="col-sm-12 p-2 mt-3">
                            <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">

                                <div className="card pad borde-none">
                                    <div className="">
                                        <div className="contenedor-spinner" id="spinner-serie">
                                            <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div>
                                        {misCasosActivos.length > 0 ? (
                                            <Tabla
                                                lineas={misCasosActivos}
                                                columnas={columnasMisCasosActivos}
                                                titulo={"Mis-Casos-Activos"}
                                                header={false}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade show p-3" id="cr" role="tabpanel" aria-labelledby="cr-tab">
                        <div className="col-sm-12 p-2 mt-3">
                            <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">

                                <div className="card pad borde-none">
                                    <div className="lista-header color-header pad">
                                        {casosResueltos.length > 0 ? (
                                            <Tabla
                                                lineas={casosResueltos}
                                                columnas={columnasCasosResueltos}
                                                titulo={"Casos-Resueltos"}
                                                header={false}
                                            />
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal casos resueltos */}
            <div
                className="modal fade bd-example-modal-xl"
                id="modalCR"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h6 className="fw-bolder">Casos Resueltos</h6>
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
                                <div className="col-sm-8">
                                    <h6 className="fw-bolder">Detalles del caso resuelto</h6>
                                    <div className="row">
                                        <div className="col-sm-4 col-md-12">
                                        <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Cliente
                                                </label>
                                                <input
                                                    type="text"
                                                    id="razonEstado"
                                                    name="razonEstado"
                                                    value={cliente}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Asunto Primario
                                                </label>
                                                <input
                                                    type="text"
                                                    id="razonEstado"
                                                    name="razonEstado"
                                                    value={asuntoPrimarioNombre(asuntoPrimario)}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Asunto
                                                </label>
                                                <input
                                                    type="asunto"
                                                    id="asunto"
                                                    value={obtenerNombreAsunto(asuntoCasoResuelto)}
                                                    name="asuntocaso"
                                                    className="form-control requerido"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Razón para el estado
                                                </label>
                                                <input
                                                    type="text"
                                                    id="razonEstado"
                                                    name="razonEstado"
                                                    value={razonEstado}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Número de caso
                                                </label>
                                                <input
                                                    type="text"
                                                    id="estadoCaso"
                                                    name="estadoCaso"
                                                    value={numCasoResuelto}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">

                                    <h6 className="fw-bolder">Resolucion:</h6>
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <textarea
                                                    className="form-control mt-2"
                                                    id="exampleFormControlTextarea1"
                                                    value={comentarioCasoResuelto}
                                                    rows="2"
                                                    disabled
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* modal mis casos activos */}

            <div
                className="modal fade bd-example-modal-xl"
                id="modalMCA"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h6 className="fw-bolder">Casos Activos</h6>
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

                            <div className="w-100 d-flex justify-content-center">
                                <div className="card p-4 border-0 h-auto pad w-100 mb-4">
                                    <div >
                                        <MultiStepProgressBar currentStep={step} />
                                    </div>
                                </div>
                            </div>

                            <div className="row w-auto d-flex justify-content-center">
                                <div className="col-12">
                                    <h6 className="fw-bolder">Detalles del caso activo</h6>
                                    <div className="row">
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Numero de Caso
                                                </label>
                                                <input
                                                    type="text"
                                                    id="numberticket"
                                                    name="numberticket"
                                                    value={numCaso}
                                                    className="form-control desabilitado"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Asunto Primario
                                                </label>
                                                <input
                                                    type="asunto"
                                                    id="asunto"
                                                    value={asuntoPrim}
                                                    name="asuntocaso"
                                                    className="form-control desabilitado"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Asunto
                                                </label>
                                                <input
                                                    type="asunto"
                                                    id="asunto"
                                                    value={obtenerNombreAsunto(asuntoCaso)}
                                                    name="asuntocaso"
                                                    className="form-control desabilitado"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Fecha de Alta
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fechaAlta"
                                                    name="fechaAlta"
                                                    value={Moment(fechaAltaCaso).format("DD-MM-YYYY")}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Estado del Caso
                                                </label>
                                                <input
                                                    type="text"
                                                    id="estadoCaso"
                                                    name="estadoCaso"
                                                    className="form-control desabilitado"
                                                    value={razonEstadoCaso(razonParaElEstado)}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Comentarios
                                                </label>
                                                <textarea
                                                    className="form-control mt-2"
                                                    id="exampleFormControlTextarea1"
                                                    value={comentarioCasoActivo}
                                                    rows="2"
                                                    disabled
                                                ></textarea>
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

export default VistaCasos
