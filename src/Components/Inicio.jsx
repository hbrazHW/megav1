
import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { Toast, Spinner } from "react-bootstrap";
import MultiStepProgressBar from "./MultiStepProgressBar";
import "react-step-progress-bar/styles.css";
import Select from "react-select";
import { obtenerLegales } from "../Redux/DocumentosLegales";
import { COLUMNASLEGALES } from "../Tables/ColumnasLegales";
import { consultaFETCHcasosResueltos, consultaFETCHmisCasosActivos } from "../Redux/Casos";
import Tabla from '../Components/Tabla'
import { COLUMNASMCA } from '../Tables/ColumnasMCA'
import { COLUMNASCR } from '../Tables/ColumnasCR'
import { consultaFETCHbusquedaPersonal } from "../Redux/RecursosHumanos";
import { COLUMNASBPA } from "../Tables/ColumnasBPA";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile, faCheckCircle, faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Inicio = () => {
  //Constantes
  const dispatch = useDispatch();

  //Hooks
  const [misCasosActivos, setMisCasosActivos] = React.useState([])
  const [llamadaMisCasosActivos, setLlamadaMisCasosActivos] = React.useState(false)
  const [casosResueltos, setCasosResueltos] = React.useState([])
  const [llamadaCasosResueltos, setLlamadaCasosResueltos] = React.useState(false)
  const [busquedaPersonal, setBusquedaPersonal] = React.useState([])
  const [llamadaBusquedaP, setLlamadaBusquedaP] = React.useState(false)
  const [legales, setLegales] = React.useState([]);
  const [llamadaLegales, setlLlmadaLegales] = React.useState(false);
  const [numCaso, setNumCaso] = React.useState([]);
  const [fechaAltaCaso, setFechaAltaCaso] = React.useState([]);
  const [asuntoCaso, setAsuntoCaso] = React.useState([]);
  const [asuntoCasoResuelto, setAsuntoCasoResuelto] = React.useState([]);
  const [razonEstado, setRazonEstado] = React.useState([]);
  const [numCasoResuelto, setNumCasoResuelto] = React.useState([]);
  const [comentarioCasoResuelto, setComentarioCasoResuelto] = React.useState([]);
  const [autor, setAutor] = React.useState([]);
  const [personRecepciono, setPersonRecepciono] = React.useState([])
  const [descripcionDelDocumento, setDescripcionDelDocumento] = React.useState([])
  const [fechaCreacion, setFechaCreacion] = React.useState([])

  //Selectores
  const misCasosActivosSelector = useSelector(store => store.casos.misCasosActivos)
  const casosResueltosSelector = useSelector(store => store.casos.casosResueltos)
  const recursosHumanosSelector = useSelector(store => store.recursosHumanos.busquedaPersonal)
  const legalesSelector = useSelector((store) => store.legales.legales);
  const casoIdSelector = useSelector(store => store.casos.casoid)
  const legalesIdSelector = useSelector (store => store.legales.legalesId)

  //Columnas
  const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState([])
  const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState([])
  const [columnasRrhh, setColumnasRrhh] = React.useState([])
  const [columnasLegales, setColumnasLegales] = React.useState([]);

  //modalLegales
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const [idSeleccionado, setIdseleccionado] = React.useState("")
  const [legalesIdSeleccionado, setLegalesIdseleccionado] = React.useState("")

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  React.useEffect(async () => {
    if (misCasosActivos.length === 0) {
      if (
        misCasosActivosSelector.length > 0 &&
        llamadaMisCasosActivos === true
      ) {
        setMisCasosActivos(misCasosActivosSelector);
        setColumnasMisCasosActivos(COLUMNASMCA);
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
      } else if (llamadaCasosResueltos === false) {
        obtenerCasosResueltos();
        setColumnasCasosResueltos(COLUMNASCR);
        setLlamadaCasosResueltos(true);
      }
    }


    if (legales.length === 0) {
      if (legalesSelector.length > 0 && llamadaLegales === true) {
        setLegales(legalesSelector);
        setColumnasLegales(COLUMNASLEGALES);
      } else if (llamadaLegales === false) {
        obtenerlegal();
        setColumnasLegales(COLUMNASLEGALES);
        setlLlmadaLegales(true);
      }
    }

    if (busquedaPersonal.length === 0) {
      if (recursosHumanosSelector.length > 0 && llamadaBusquedaP === true) {
        setBusquedaPersonal(recursosHumanosSelector)
        setColumnasRrhh(COLUMNASBPA)
      } else if (llamadaBusquedaP === false) {
        obtenerPersonal()
        setColumnasRrhh(COLUMNASBPA)
        setLlamadaBusquedaP(true)
      }
    }

    if (casoIdSelector !== undefined) {
      if (casoIdSelector !== '') {
        completarCaso(casoIdSelector)
      }
    }
    

    if (casoIdSelector !== undefined) {
      if (casoIdSelector !== '') {
        completarCasoResuelto(casoIdSelector)
      }
    }
    

    if(legalesIdSelector !== undefined) {
      if(legalesIdSelector !== '') {
        completarLegales(legalesIdSelector)
      }
    }

    

  }, [misCasosActivosSelector, casosResueltosSelector, recursosHumanosSelector, legalesSelector, casoIdSelector, legalesIdSelector]);

  const obtenerPersonal = () => {
    dispatch(consultaFETCHbusquedaPersonal())
  }


  const obtenerCasosResueltos = () => {
    dispatch(consultaFETCHcasosResueltos());
  };

  const obtenerMisCasosA = () => {
    dispatch(consultaFETCHmisCasosActivos());
  };

  const obtenerlegal = () => {
    dispatch(obtenerLegales());
  };


  const completarLegales = (id) => {
    legales.filter(item => item.new_documentoslegalesid == id).map(item => {
        setAutor(item._createdby_value)
        setPersonRecepciono(item._new_personaquerecepcion_value)
        setDescripcionDelDocumento( descripcionDocumento (item.new_descripcindeldocumento))
        setFechaCreacion(item.createdon)  

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
      return 'MANDAMIENTO DE INTIMACIÓN'
  case 100000005:
      return 'ACTA'
  case 100000006:
      return 'NOTA'
  case 100000007:
      return 'OTROS'
  case 100000008:
      return 'CÉDULA'
  case 100000009:
      return 'OFICIO'
  case 100000010:
      return 'DEMANDA'  
  }
}


   const completarCaso = (id) => {
     misCasosActivos.filter(item => item.incidentid == id).map(item => {
       setNumCaso(item.ticketnumber)
       setAsuntoCaso(item._subjectid_value)
       setFechaAltaCaso(item.new_fechaalta)


     })
   }

   const completarCasoResuelto = (id) => {
    casosResueltos.filter(item => item.incidentid == id).map(item => {
      setAsuntoCasoResuelto(item._subjectid_value)
      setRazonEstado(descripcionRazonEstado (item.statuscode))
      setNumCasoResuelto(item.ticketnumber)
      setComentarioCasoResuelto(item.new_comentarios)

    })
  }


  const descripcionRazonEstado = (value) =>{
    switch (value) {
      case 5:
          return 'Cerrado'  
      case 1000:
          return 'Información proporcionada '
    }     

  }

 
console.log("resueltos", casosResueltos )

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

      </div>

      {/* <div className="bg-green d-flex justify-content-center pad-icon">
        <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
      </div> */}

      <div className="row pb-5">
        <div className="col-sm-12 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Mis Casos Activos</h6>
              <hr className="hr-width hr-principal" />
            </div>
            <div className="card pad borde-none">

              <div className="">
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

        <div className="col-sm-12 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Casos Resueltos</h6>
              <hr className="hr-width hr-principal" />
            </div>
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
      <div className="col-sm-12">
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
          <div className="col-12 col-sm-6 col-md-6 col-lg-12 p-2 mt-3">
            <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
              <div>
                <h6 className="fw-bolder">Documetos Legales Creados</h6>
                <hr className="hr-width hr-principal" />
              </div>
              <div className="card doc-cards pad borde-none">
                <div className="lista-header color-header pad">
                  {legales.length > 0 ? (
                    <Tabla
                      lineas={legales}
                      columnas={columnasLegales}
                      titulo={"legales"}
                      header={false}
                    />
                  ) : null}
                  <div className="contenedor-spinner" id="spinner1">
                    {/* <div
                    className="lds-roller float-none  d-flex justify-content-center mx--1"
                    id="spinner"
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div> */}
                  </div>

                  {/* <div className="row p-3">
                    <div className="col-12 color-header text-center c-black fw-bolder">
                      <NavLink
                        className="fuente nav-link text-center padd-menu-link"
                        to="/Legales"
                      >
                        Ver más
                      </NavLink>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
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

                  <div className="">
                    {busquedaPersonal.length > 0 ? (<Tabla lineas={busquedaPersonal} columnas={columnasRrhh} titulo={'rr-hh'} header={false} />) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
   {/* ////inicio del modal de mis casos activos      */}
        <div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                {/* <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}
                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div> */}
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
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
                <div className="col-12">
                  <h6 className="fw-bolder">Casos Activos</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="col-12">
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
                <div className="card shadow p-4 border-0 h-auto pad w-100 mb-4">
                  <div>
                    inserir la barra de flujo de Barrita de estados (flujo de proceso de negocio
                    Titulo del caso (cliente) | estado del caso | fecha de Alta 
                  </div>
                </div>
              </div> */}
              <form name="Alyc">
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
                          Asunto
                          </label>
                          <input
                            type="asunto"
                            id="asunto"
                            value={asuntoCaso}
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
                            value={fechaAltaCaso}
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
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {/* <h6 className="fw-bolder requerido">Comentarios</h6> */}
                    {/* <div className="row">
                      <div className="col-12">
                        <div class="form-group">
                          <textarea
                            className="form-control mt-2"
                            id="exampleFormControlTextarea1"
                            rows="7"
                            // onChange={e => setDescripcion(e.target.value)}
                            // value={descripcion}
                            placeholder="comentanos un poco más..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <br /> */}
                  </div>
                  {/* <div className="col-12">
                    <h6 className="fw-bolder">Actividades de los Casos realizado por:</h6>
                    <div className="contenedor-spinner" id="spinner4">
                      <div
                        className="lds-roller float-none w-100 d-flex justify-content-center mx--1"
                        id="spinner"
                      >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <ul className="list-group">
                      {legalesSelector.map((item) => {
                        return (
                          <li className="list-group-item d-flex align-items-center">
                            <p className="fw-bolder">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="fs-6 upload-file atras mx-1"
                                color="#000"
                              />
                              {item.null}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}

                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        </div>
{/* // fin del modal de Mis casos Activos */}
{/* //inicio de casos resueltos modal*/}
<div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}

                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
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
                <div className="col-8">
                  <h6 className="fw-bolder">Casos Resueltos</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="col-12">
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
                <div className="card shadow p-4 border-0 h-auto pad w-100 mb-4">
                  <div>
                  <MultiStepProgressBar currentStep={step} />
                  </div>
                </div>
              </div> */}
              <form name="Alyc">
                <div className="row w-auto d-flex justify-content-center">
                  <div className="col-8">
                    <h6 className="fw-bolder">Detalles del caso resuelto</h6>
                    <div className="row">
                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                          Asunto
                          </label>
                          <input
                            type="asunto"
                            id="asunto"
                            value={asuntoCasoResuelto}
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
                  <div className="col-4">
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


                    {/* <div className="contenedor-spinner" id="spinner4">
                      <div
                        className="lds-roller float-none w-100 d-flex justify-content-center mx--1"
                        id="spinner"
                      >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div> */}
                    <ul className="list-group">
                      {legalesSelector.map((item) => {
                        return (
                          <li className="list-group-item d-flex align-items-center">
                            <p className="fw-bolder">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="fs-6 upload-file atras mx-1"
                                color="#000"
                              />
                              {item.null}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}

                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        </div>
        {/* //fin de mis casos resueltos modal */}
{/* // inicio del modal de documentos legales */}
        <div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                {/* <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}
                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div> */}
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>
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
                <div className="col-12">
                  <h6 className="fw-bolder">Documentos Legales</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="col-12">
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
                {/* <div className="card shadow p-4 border-0 h-auto pad w-100 mb-4">
                  <div>
                    <MultiStepProgressBar currentStep={step} />
                  </div>
                </div> */}
              </div>
              <form name="Alyc">
                <div className="row w-auto d-flex justify-content-center">
                  <div className="col-12">
                    <h6 className="fw-bolder">Detalles del documento Legal</h6>
                    <div className="row">
                      <div className="col-sm-4 col-md-12">
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
                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Persona que Recepcionó
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

                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                          Descripción del Documento
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
                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                          Fecha de creación
                          </label>
                          <input
                            type="text"
                            value={fechaCreacion}
                            id="estado"
                            name="estado"
                            className="form-control desabilitado"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {/* <h6 className="fw-bolder requerido">Observaciones</h6> */}
                    {/* <div className="row">
                      <div className="col-12">
                        <div class="form-group">
                          <textarea
                            className="form-control mt-2"
                            id="exampleFormControlTextarea1"
                            rows="7"
                            placeholder="comentanos un poco más..."
                            disabled
                          ></textarea>
                        </div>
                      </div>
                    </div> */}
                    <br />
                  </div>
                  {/* <div className="col-4">
                    <h6 className="fw-bolder">Resolución:</h6>
                    <div className="contenedor-spinner" id="spinner4">
                      <div
                        className="lds-roller float-none w-100 d-flex justify-content-center mx--1"
                        id="spinner"
                      >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <ul className="list-group">
                      {legalesSelector.map((item) => {
                        return (
                          <li className="list-group-item d-flex align-items-center">
                            <p className="fw-bolder">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="fs-6 upload-file atras mx-1"
                                color="#000"
                              />
                              {item.null}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
            <Toast className="half-black" show={show} autohide color="lime">
              <Toast.Body className="text-white">
                <div className="row p-2">
                  {loading ? (
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="col-1 mx-2">
                      {error ? (
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="fs-3 upload-file atras"
                          color="#dc3545"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="fs-3 upload-file atras"
                          color="#198754"
                        />
                      )}
                    </div>
                  )}

                  <div className="col-10 mt-1 ml-5">{mensaje}</div>
                </div>
              </Toast.Body>
            </Toast>
          </div>
        </div>
      </div>


    </animated.div>
  );
};

export default withRouter(Inicio);
