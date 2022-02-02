import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { consultaFETCHcasosResueltos, consultaFETCHmisCasosActivos, consultaFETCHnombresAsuntos, consultaFETCHcasosFm, consultaFETCHinstalacionSede, consultaFETCHareaAderivar, consultaFETCHcasosPayroll } from "../Redux/Casos";
import { consultaFETCHcorreoEletronico } from '../Redux/CorreoEletronico';
import Tabla from '../Components/Tabla';
import { COLUMNASMCA } from '../Tables/ColumnasMCA';
import { COLUMNASCR } from '../Tables/ColumnasCR';
import { COLUMNASCFM } from '../Tables/ColumnasCFM';
import MultiStepProgressBar from './MultiStepProgressBar'
import Moment from 'moment'
import { consultaFETCHcontacts } from '../Redux/Contact';
import { COLUMNASCPR } from '../Tables/ColumnasCPR';
import { obtenerActividades } from '../Redux/Actividad'

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
    const [casosFm, setCasosFm] = React.useState([])
    const [llamadaCasosFm, setLlamadaCasosFm] = React.useState(false)
    const [correoEletronico, setCorreoEletronico] = React.useState([])
    const [llamadaCorreoEletronico, setLlamadaCorreoEletronico] = React.useState(false)
    const [casosPayroll, setCasosPayroll] = React.useState([])
    const [llamadaCasosPr, setLlamadaCasosPr] = React.useState(false)
    const [actividades, setActividades] = React.useState([])


    //selectores
    const misCasosActivosSelector = useSelector(store => store.casos.misCasosActivos)
    const casosResueltosSelector = useSelector(store => store.casos.casosResueltos)
    const casoIdSelector = useSelector(store => store.casos.casoid)
    const contactSelector = useSelector(store => store.contacts.contacts)
    const casosFmSelector = useSelector(store => store.casos.casosFm)
    const correoEletronicoSelector = useSelector(store => store.correoEletronico.correoEletronico)
    const casosPayrollSelector = useSelector(store => store.casos.casosPayroll)
    const actividadesSelector = useSelector(store => store.actividades.actividades)

    //Columnas
    const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState([])
    const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState([])
    const [columnasCFM, setColumnasCFM] = React.useState([])
    const [columnasCPR, setColumnasCPR] = React.useState([])

    //hooks para obtener nombres de asuntos
    const [asuntos, setAsuntos] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)
    const asuntosSelector = useSelector(store => store.casos.asuntos)

    //Hooks para obtener nombres de las instlaciones por sucursal
    const [instalaSede, setInstalaSede] = React.useState([])
    const [llamadaInstaSede, setLlamdaInstaSede] = React.useState(false)
    const instalacionSedeSelector = useSelector(store => store.casos.instalacionSede)

    //Hooks para obtener mnombres de area a derivar
    const [areaAderivar, setAreaAderivar] = React.useState([])
    const [llamadaAreaAderivar, setLlamadaAreaAderivar] = React.useState(false)
    const areaAderivarSelector = useSelector(store => store.casos.areaAderivar)


    //hooks modal caso resuelto
    const [asuntoCasoResuelto, setAsuntoCasoResuelto] = React.useState([]);
    const [razonEstado, setRazonEstado] = React.useState([]);
    const [numCasoResuelto, setNumCasoResuelto] = React.useState([]);
    const [comentarioCasoResuelto, setComentarioCasoResuelto] = React.useState([]);
    const [asuntoPrimario, setAsuntoPrimario] = React.useState("")
    const [cliente, setCliente] = React.useState([])
    const [email, setEmail] = React.useState([])

    //hooks modal mis casos activos
    const [numCaso, setNumCaso] = React.useState([]);
    const [asuntoPrim, setAsuntoPrim] = React.useState([])
    const [asuntoCaso, setAsuntoCaso] = React.useState([]);
    const [fechaAltaCaso, setFechaAltaCaso] = React.useState([]);
    const [razonParaElEstado, setRazonParaElEstado] = React.useState([])
    const [comentarioCasoActivo, setComentarioCasoActivo] = React.useState("")
    const [step, setStep] = React.useState(0);

    //Hooks modal casos de FM
    const [instalacionSede, SetInstalacionSede] = React.useState([]);
    const [equipoDetenido, setEquipoDetenido] = React.useState([]);
    const [prioridad, setPrioridad] = React.useState([]);
    const [esperaRepuesto, setEsperaRepuesto] = React.useState([]);
    const [areaDeriva, setAreaDeriva] = React.useState([]);

  const labelArray=['step1','step2','step3','step4','step5','step6','step7','step8','step9','step10','step11'];

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

        if (casosFm.length === 0) {
            if (casosFmSelector.length > 0 && llamadaCasosFm === true) {
                setCasosFm(casosFmSelector);
                setColumnasCFM(COLUMNASCFM);
                setTimeout(() => {
                    if (document.getElementById("spinner-serie") !== null) {
                        document.getElementById("spinner-serie").hidden = true;
                    }
                }, 50);
            } else if (llamadaCasosFm === false) {
                obtenerCasosFm();
                setColumnasCFM(COLUMNASCFM);
                setLlamadaCasosFm(true);
            }
        }

        if (correoEletronico.lenght === 0) {
            if (correoEletronicoSelector.lenght > 0 && llamadaCorreoEletronico === true) {
                setCorreoEletronico(correoEletronicoSelector);
            } else if (llamadaCorreoEletronico === false) {
                ObtenerCorreoEletronico();
                setLlamadaCorreoEletronico(true);
            }
        }

        if (casoIdSelector !== undefined) {
            if (casoIdSelector !== '') {
                completarCasoResuelto(casoIdSelector)
                completarCaso(casoIdSelector)
                completarCasoFm(casoIdSelector)
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

        if (instalaSede.length === 0) {
            if (instalacionSedeSelector.length > 0 && llamadaInstaSede === true) {
                setInstalaSede(instalacionSedeSelector)
            } else if (llamadaInstaSede === false) {
                obtenerInstalacionporSede()
                setLlamdaInstaSede(true)
            }

        }

        if (areaAderivar.length === 0) {
            if(areaAderivarSelector.length > 0 && llamadaAreaAderivar === true){
                setAreaAderivar(areaAderivarSelector)
            }else if (llamadaAreaAderivar === false) {
                obtenerAreaAderivar()
                setLlamadaAreaAderivar(true)
            }

        }



        if (contacts.length === 0) {
            if (contactSelector.length > 0 && llamadaContacts === true) {
                setContacts(contactSelector)
            } else if (llamadaContacts === false) {
                obtenerContacts()
                setLlamadaContacts(true)
            }
        }

        if (casosPayroll.length === 0) {
            if (casosPayrollSelector.length > 0 && llamadaCasosPr === true) {
                setCasosPayroll(casosPayrollSelector)
                setColumnasCPR(COLUMNASCPR)
            } else if (llamadaCasosPr === false) {
                obtenerCasosPr()
                setColumnasCPR(COLUMNASCPR)
                setLlamadaCasosPr(true)
            }
        }
        if (actividadesSelector.length > 0) {
            setActividades(actividadesSelector)
            // if (document.getElementById("spinner4") !== null) {
            //     document.getElementById("spinner4").hidden = true;
            // }
            document.getElementById("spinner4").style.display = 'none';
        }

    }, [misCasosActivosSelector, casosResueltosSelector, casoIdSelector, asuntosSelector, contactSelector, casosFmSelector, instalacionSedeSelector, correoEletronicoSelector, areaAderivarSelector, casosPayrollSelector,actividades, actividadesSelector])

    console.log("hook:", casosPayroll)

    const obtenerCasosPr = () => {
        dispatch(consultaFETCHcasosPayroll())
    }

    const obtenerContacts = () => {
        dispatch(consultaFETCHcontacts())
    }

    const obtenerAsuntos = () => {
        dispatch(consultaFETCHnombresAsuntos())
    }

    const obtenerInstalacionporSede = () => {
        dispatch(consultaFETCHinstalacionSede())
    }

    const obtenerAreaAderivar = () => {
        dispatch(consultaFETCHareaAderivar())
    }

    const obtenerCasosResueltos = () => {
        dispatch(consultaFETCHcasosResueltos());
    };

    const obtenerCasosFm = () => {
        dispatch(consultaFETCHcasosFm());
    };

    const ObtenerCorreoEletronico = () => {
        dispatch(consultaFETCHcorreoEletronico());
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


    const obtenerNombreInstaSede = (instalacion) => {
        let nombreInstaSede = ''
        instalaSede.filter(item => item.new_instalacionesporsedeid == instalacion).map(item => {
            nombreInstaSede = item.new_name
        })
        return nombreInstaSede
    }

    const obtenerNombreAreaAderivar = (area) => {
        let nombreArea = ''
        areaAderivar.filter(item => item.new_areaid == area).map(item => {
            nombreArea = item.new_name
        })
        return nombreArea
    }

    const obtenerTodasActividades = async () => {
        dispatch(obtenerActividades())
    }


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

    const completarCasoFm = (id) => {
        casosFm.filter(item => item.incidentid == id).map(item => {
            SetInstalacionSede(item._new_instalacionporsede_value)
            setEquipoDetenido(detenido(item.new_equipodetenido))
            setPrioridad(prioridadFm(item.prioritycode))
            setEsperaRepuesto(repuesto(item.new_alaesperaderepuestos))
            setAreaAderivar(item._new_areaaescalar_value)

        })
    }

    const repuesto = (valor) => {
        switch (valor) {
            case true:
                return "Si"
            case false:
                return "No"
            default:
                return '---'
        }
    }

    const detenido = (valor) => {
        switch (valor) {
            case true:
                return "Si"
            case false:
                return "No"
            default:
                return '---'
        }
    }


    const prioridadFm = (value) => {
        switch (value) {
            case 0:
                return 'Baja'
            case 1:
                return 'Media'
            case 2:
                return 'Alta'
            case 3:
                return 'Urgente'
        }

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
                return setStep(1);
            case 100000001:
                return setStep(2)
            case 100000002:
                return setStep(3)
            case 100000003:
                return setStep(4)
            case 1:
                return setStep(5)
            case 4:
                return setStep(6)
            case 2:
                return setStep(7)
            case 3:
                return setStep(8)
            case 100000005:
                return setStep(9)
            case 100000006:
                return setStep(10)
            case 100000007:
                return setStep(11)
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

  console.log(actividadesSelector)

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
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark" id="cfm-tab" data-bs-toggle="tab" data-bs-target="#cfm" type="button" role="tab" aria-controls="cfm" aria-selected="false">
                            Casos FM
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link fw-bolder text-dark" id="cpr-tab" data-bs-toggle="tab" data-bs-target="#cpr" type="button" role="tab" aria-controls="cpr" aria-selected="false">
                            Casos Payroll
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
                    <div className="tab-pane fade show p-3" id="cfm" role="tabpanel" aria-labelledby="cfm-tab">
                        <div className="col-sm-12 p-2 mt-3">
                            <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">

                                <div className="card pad borde-none">
                                    <div className="lista-header color-header pad">
                                        {casosFm.length > 0 ? (
                                            <Tabla
                                                lineas={casosFm}
                                                columnas={columnasCFM}
                                                titulo={"Casos-FM"}
                                                header={false}
                                            />
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade show p-3" id="cpr" role="tabpanel" aria-labelledby="cpr-tab">
                        <div className="col-sm-12 p-2 mt-3">
                            <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                                <div className="card pad borde-none">
                                    <div className="lista-header color-header pad">
                                        {casosPayroll.length > 0 ? (
                                            <Tabla
                                                lineas={casosPayroll}
                                                columnas={columnasCPR}
                                                titulo={"Casos-Payroll"}
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

                            <div className="col-sm-12">
                                <h6 className="fw-bolder">Detalles del caso resuelto</h6>
                                <div className="row">
                                    <div className="col-sm-4">
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
                                    <div className="col-sm-4">
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
                                    </div>
                                    <div className="col-sm-4">
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

                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
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
                                    </div>

                                    <div className="col-sm-6">
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
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="mb-2 p-2">
                                            <h6 className="fw-bolder">Comentarios:</h6>
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
                                {/* <div className="col-4">
                                        <h6 className="fw-bolder">Actividades</h6>
                                        <div className="contenedor-spinner" id="spinner4">
                                            <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div>
                                        <ul className="list-group">
                                            {
                                                actividadesSelector.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex align-items-center">
                                                            <p className="fw-bolder"><FontAwesomeIcon icon={faEnvelope} className="fs-6 upload-file atras mx-1" color="#000" /></p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div> */}
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
                                        <MultiStepProgressBar labelArray={labelArray} currentStep={step} />
                                    </div>
                                </div>
                            </div>

                            <div className="row w-auto d-flex justify-content-center">
                                <div className="col-12">
                                    <h6 className="fw-bolder">Detalles del caso activo</h6>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="mb-2 p-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion required">
                                                            Numero de Caso
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="numberticket"
                                                            name="numberticket"
                                                            value={numCaso}
                                                            className="form-control desabilitado "
                                                            required
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-4">
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

                                                <div className="col-sm-4">
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
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-6">
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

                                                <div className="col-sm-6">
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
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12">
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
                                        <div className="col-4">
                                        <h6 className="fw-bolder">Actividades</h6>
                                        <div className="contenedor-spinner" id="spinner4">
                                            <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div>
                                        <ul className="list-group">
                                            {
                                                actividadesSelector.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex align-items-center">
                                                            <p className="fw-bolder"><FontAwesomeIcon icon={faEnvelope} className="fs-6 upload-file atras mx-1" color="#000" />{item.subject}</p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade bd-example-modal-xl"
                id="modalCFM"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h6 className="fw-bolder">Casos de FM</h6>
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

                            {/* <div className="w-100 d-flex justify-content-center">
                                <div className="card p-4 border-0 h-auto pad w-100 mb-4">
                                    <div >
                                        <MultiStepProgressBar currentStep={step} />
                                    </div>
                                </div>
                            </div> */}

                            <div className="row w-auto d-flex justify-content-center">
                                <div className="col-12">
                                    <h6 className="fw-bolder">Detalles del caso FM</h6>
                                    <div className="row">
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion ">
                                                    Instalación por Sede
                                                </label>
                                                <input
                                                    type="text"
                                                    id="isntasede"
                                                    name="instasede"
                                                    value={obtenerNombreInstaSede(instalacionSede)}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion ">
                                                    Equipo Detenido ?
                                                </label>
                                                <input
                                                    type="text"
                                                    id="eqdetenido"
                                                    value={equipoDetenido}
                                                    name="eqdetenido"
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Prioridad
                                                </label>
                                                <input
                                                    type="text"
                                                    id="Priority"
                                                    value={prioridad}
                                                    name="prioridad"
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-md-12">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    A la espera de Repuestos ?
                                                </label>
                                                <input
                                                    type="text"
                                                    id="alaesperarepuestos"
                                                    name="alaesperarepuestos"
                                                    className="form-control desabilitado"
                                                    value={esperaRepuesto}
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
        </animated.div>

    )
}

export default VistaCasos
