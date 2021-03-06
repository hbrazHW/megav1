import React from 'react'
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Tabla from '../Components/Tabla';
import { obtenerLegales } from "../Redux/DocumentosLegales";
import { COLUMNASLEGALES } from "../Tables/ColumnasLegales";
import Moment from 'moment'
import { consultaFETCHcontacts } from '../Redux/Contact';

const VistaDocumentos = () => {

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

    //hooks
    const [legales, setLegales] = React.useState([]);
    const [llamadaLegales, setlLlmadaLegales] = React.useState(false);

    //selectores
    const legalesIdSelector = useSelector(store => store.legales.legalesId)
    const legalesSelector = useSelector((store) => store.legales.legales);

    //columnas
    const [columnasLegales, setColumnasLegales] = React.useState([]);

    //hooks modal
    const [autor, setAutor] = React.useState("");
    const [personRecepciono, setPersonRecepciono] = React.useState("")
    const [descripcionDelDocumento, setDescripcionDelDocumento] = React.useState("")
    const [fechaCreacion, setFechaCreacion] = React.useState("")
    const [observaciones, setObservaciones] = React.useState("")

    //hooks para matches id
    const [contacts, setContacts] = React.useState([])
    const [llamadaContacts, setLlamadaContacts] = React.useState(false)
    const contactSelector = useSelector(store => store.contacts.contacts)

    React.useEffect(() => {
        if (legales.length === 0) {
            if (legalesSelector.length > 0 && llamadaLegales === true) {
                var documentos = []
                legalesSelector.forEach(item => {
                    var docuLegales = {
                        new_documentoslegalesid: item.new_documentoslegalesid,
                        new_name: item.new_name,
                        _new_personaquerecepcion_value: item["_new_personaquerecepcion_value@OData.Community.Display.V1.FormattedValue"],
                        new_descripcindeldocumento: item["new_descripcindeldocumento@OData.Community.Display.V1.FormattedValue"],
                        createdon: item.createdon,
                        _new_sede_value: item["_new_sede_value@OData.Community.Display.V1.FormattedValue"]
                    }
                    documentos.push(docuLegales)
                })
                setLegales(documentos);
                setColumnasLegales(COLUMNASLEGALES);
                setTimeout(() => {
                    if (document.getElementById("spinner-serie") !== null) {
                        document.getElementById("spinner-serie").hidden = true;
                    }
                }, 50);
            } else if (llamadaLegales === false) {
                obtenerlegal();
                setColumnasLegales(COLUMNASLEGALES);
                setlLlmadaLegales(true);
            }
        }

        if (legalesIdSelector !== undefined) {
            if (legalesIdSelector !== '') {
                completarLegales(legalesIdSelector)
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

    }, [legalesSelector, legalesIdSelector, contactSelector])

    console.log(legales)

    const obtenerContacts = () => {
        dispatch(consultaFETCHcontacts())
    }

    const obtenerlegal = () => {
        dispatch(obtenerLegales());
    };

    const obtenerNombreContacto = (contacto) => {
        let nombreContacto = ''
        contacts.filter(item => item.contactid == contacto).map(item => {
            nombreContacto = item.fullname
        })
        return nombreContacto
    }

    const completarLegales = (id) => {
        legales.filter(item => item.new_documentoslegalesid == id).map(item => {
            setAutor(item.new_name)
            setPersonRecepciono(item._new_personaquerecepcion_value)
            setDescripcionDelDocumento(item.new_descripcindeldocumento)
            setFechaCreacion(item.createdon)
            setObservaciones(item.new_observaciones)
        })
    }

    const descripcionDocumento = (value) => {
        switch (value) {
            case 100000000:
                return 'CARTA DOCUMENTO'
            case 100000001:
                return 'TELEGRAMA'
            case 100000002:
                return 'CONTRATO'
            case 100000003:
                return 'DENUNCIA'
            case 100000004:
                return 'MANDAMIENTO DE INTIMACI??N'
            case 100000005:
                return 'ACTA'
            case 100000006:
                return 'NOTA'
            case 100000007:
                return 'OTROS'
            case 100000008:
                return 'C??DULA'
            case 100000009:
                return 'OFICIO'
            case 100000010:
                return 'DEMANDA'
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
                                    <h4 className="fw-bold pt-2 mx-2 pb-2 fw-bolder m-0 ">Documentos Legales</h4>
                                </div>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faFile} className="fs-1 upload-file atras" color="rgb(245,130,32)" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pb-5">
                    <div className="col-sm-12 col-sm-6 col-md-6 col-lg-12 p-2 mt-3">
                        <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                            <div>
                                <h6 className="fw-bolder">Documetos Legales Creados</h6>
                                <hr className="hr-width hr-principal" />
                            </div>
                            <div className="card doc-cards pad borde-none">
                                <div className="lista-header color-header pad">
                                    <div className="contenedor-spinner" id="spinner-serie">
                                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    </div>
                                    {legales.length > 0 ? (
                                        <Tabla
                                            lineas={legales}
                                            columnas={columnasLegales}
                                            titulo={"legales"}
                                            header={false}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal documentos legales */}
                <div
                    className="modal fade bd-example-modal-xl"
                    id="ModalDocLegales"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h6 className="fw-bolder">Documentos legales</h6>
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
                                    <h6 className="fw-bolder">Detalles del documento Legal</h6>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Autor
                                                </label>
                                                <input
                                                    type="text"
                                                    id="autor"
                                                    value={autor}
                                                    name="autor"
                                                    className="form-control requerido"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion required">
                                                    Persona que Recepcion??
                                                </label>
                                                <input
                                                    type="text"
                                                    id="person"
                                                    value={personRecepciono}
                                                    name="person"
                                                    className="form-control desabilitado"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Descripci??n del Documento
                                                </label>
                                                <input
                                                    type="text"
                                                    id="descrip"
                                                    name="descrip"
                                                    value={descripcionDelDocumento}
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">
                                                    Fecha de creaci??n
                                                </label>
                                                <input
                                                    type="text"
                                                    value={Moment(fechaCreacion).format("DD-MM-YYYY")}
                                                    id="estado"
                                                    name="estado"
                                                    className="form-control desabilitado"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="mb-2 p-2">
                                                <h6 className="fw-bolder">Observaciones:</h6>
                                                <div class="form-group">
                                                    <textarea
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        value={observaciones}
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
            </div>

        </animated.div>
    )
}

export default VistaDocumentos
