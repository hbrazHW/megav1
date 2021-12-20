import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { Toast, Spinner } from "react-bootstrap";
import {
  faCheckCircle,
  faTimesCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultiStepProgressBar from "./MultiStepProgressBar";
import "react-step-progress-bar/styles.css";
import Select from "react-select";
import {
  consultaFETCHcasosResueltos,
  consultaFETCHmisCasosActivos,
} from "../Redux/Casos";
import { obtenerLegales } from "../Redux/DocumentosLegales";
import Tabla from "../Components/Tabla";
import { COLUMNASMCA } from "../Tables/ColumnasMCA";
import { COLUMNASCR } from "../Tables/ColumnasCR";
import { COLUMNASLEGALES } from "../Tables/ColumnasLegales";

const Inicio = () => {
  //Constantes
  const dispatch = useDispatch();

  //Hooks
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [misCasosActivos, setMisCasosActivos] = React.useState([]);
  const [llamadaMisCasosActivos, setLlamadaMisCasosActivos] =
    React.useState(false);
  const [casosResueltos, setCasosResueltos] = React.useState([]);
  const [llamadaCasosResueltos, setLlamadaCasosResueltos] =
    React.useState(false);
  const [legales, setLegales] = React.useState([]);
  const [llamadaLegales, setlLlmadaLegales] = React.useState(false);

  //Selectores
  const misCasosActivosSelector = useSelector(
    (store) => store.casos.misCasosActivos
  );
  const casosResueltosSelector = useSelector(
    (store) => store.casos.casosResueltos
  );
  const legalesSelector = useSelector((store) => store.legales.legales);

  //Columnas
  const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState(
    []
  );
  const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState(
    []
  );
  const [columnasLegales, setColumnasLegales] = React.useState([]);

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

    //legales
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
  }, [misCasosActivosSelector, casosResueltosSelector, legalesSelector]);

  const obtenerCasosResueltos = () => {
    dispatch(consultaFETCHcasosResueltos());
  };

  const obtenerMisCasosA = () => {
    dispatch(consultaFETCHmisCasosActivos());
  };

  const obtenerlegal = () => {
    dispatch(obtenerLegales());
  };

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card shadow borde-none pad mb-4 pt-3 pb-3">
          <div className="col-sm-12 m-0">
            <span className="separador-titulo float-start m-0"></span>
            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 ">Casos</p>
          </div>
        </div>
      </div>

      <div className="row pb-5">
        <div className="col-sm-8 p-2 mt-3">
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

        <div className="col-sm-4 p-2 mt-3">
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
        <div className="card shadow borde-none pad  mb-4 pt-3 pb-3">
          <div className="col-sm-12 m-0">
            <span className="separador-titulo float-start m-0"></span>
            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 ">Documentos Legales</p>
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
          <div className="card shadow borde-none pad  mb-4 pt-3 pb-3">
            <div className="col-sm-12 m-0">
              <span className="separador-titulo float-start m-0"></span>
              <p className="pt-2 mx-2 pb-2 fw-bolder m-0 ">Recursos Humanos</p>
            </div>
          </div>
          <div className="row pb-5">
            <div className="col-12 col-sm-6 col-md-6 col-lg-12 p-2 mt-3">
              <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                <div>
                  <h6 className="fw-bolder">Evaluación de Periodo de Prueba</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="card doc-cards pad borde-none">
                  <div className="lista-header color-header pad">
                    {/* inserir tabla  */}
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

                    <div className="row p-3">
                      <div className="col-12 color-header text-center c-black fw-bolder">
                        <NavLink
                          className="fuente nav-link text-center padd-menu-link"
                          to="/RecursosHumanos"
                        >
                          Ver más
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <div className="col-8">
                  <h6 className="fw-bolder">Documentos Legales</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="col-4">
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
                <div className="card shadow p-4 border-0 h-auto pad w-100 mb-4">
                  <div>
                    <MultiStepProgressBar currentStep={step} />
                  </div>
                </div>
              </div>
              <form name="Alyc">
                <div className="row w-auto d-flex justify-content-center">
                  <div className="col-8">
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
                            name="autor"
                            className="form-control requerido"
                            placeholder="---"
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
                        type="search"
                        id="search"
                        name="busqueda"
                        className="form-control requerido"
                        required
                      />
                    </div>
                      </div>

                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Ticket
                          </label>
                          <input
                            type="text"
                            id="ticket"
                            name="ticket"
                            className="form-control desabilitado"
                            // onChange={e => setTicket(e.target.value)}
                            // value={ticket}
                            // disabled
                          />
                        </div>
                      </div>
                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Estado
                          </label>
                          <input
                            type="text"
                            id="estado"
                            name="estado"
                            className="form-control desabilitado"
                            // onChange={e => setEstado(e.target.value)}
                            // value={estado}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <h6 className="fw-bolder requerido">Descripción</h6>
                    <div className="row">
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
                    <br />
                  </div>
                  <div className="col-4">
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
      </div>
    </animated.div>
  );
};

export default withRouter(Inicio);
