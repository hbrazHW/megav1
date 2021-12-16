import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerLimitePorLinea,
  obtenerTodosLimitesPorLineas,
} from "../Redux/LimitePorLinea";
import { obtenerTodasGarantiasInicio } from "../Redux/Garantia";
import {
  obtenerDocumentosPorCuenta,
  cargarDocumentacionPorCuenta,
} from "../Redux/CarpetaDigital";
import { obtenerNotificaciones } from "../Redux/Notificaciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import GoogleMap from "./GoogleMap";

const Inicio = (props) => {
  //Constantes
  const dispatch = useDispatch();
  // const {} =
  const [show, setShow] = React.useState(false);
  const [limites, setLimites] = React.useState([]);
  const [garantia, setGarantia] = React.useState({});
  const [garantias, setGarantias] = React.useState([]);
  const [limite, setLimite] = React.useState({});
  const [carpetas, setCarpetas] = React.useState([]);
  const [notificaciones, setNotificaciones] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const [documentoId, setDocumentoId] = React.useState("");
  const [documento, setDocumento] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
  const [llamadaLimites, setLlamadaLimites] = React.useState(false);
  const [llamadaDocumentos, setLlamadaDocumentos] = React.useState(false);
  const [llamadaGarantias, setLlamadaGarantias] = React.useState(false);

  let docPendiente = [];

  //Reducers
  const activo = useSelector((store) => store.usuarios.activo);
  const accountid = useSelector((store) => store.usuarios.accountid);
  const garantiaSelector = useSelector((store) => store.garantias.garantia);
  const garanitasSelector = useSelector((store) => store.garantias.garantias);
  const limitesSelector = useSelector((store) => store.limiteporlinea.limites);
  const limiteSelector = useSelector((store) => store.limiteporlinea.limite);
  const documentosSelector = useSelector(
    (store) => store.documentosPorCuenta.documentos
  );
  const notificacionesSelector = useSelector(
    (store) => store.notificaciones.notificaciones
  );

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
    if (activo) {
      debugger;
      if (
        garantiaSelector !== undefined &&
        Object.keys(garantiaSelector).length > 0
      ) {
        setGarantia(garantiaSelector);
        setGarantias(garanitasSelector.sort((a, b) => b - a).slice(0, 4));
        if (document.getElementById("spinner1") !== null) {
          document.getElementById("spinner1").hidden = true;
        }
      } else if (garantiaSelector !== undefined && llamadaGarantias === false) {
        const respG = await obtenerGarantia();
        setLlamadaGarantias(true);
        setTimeout(() => {
          if (document.getElementById("spinner1") !== null) {
            document.getElementById("spinner1").hidden = true;
          }
        }, 3000);
      }

      if (
        limiteSelector !== undefined &&
        Object.keys(limiteSelector).length > 0
      ) {
        setLimite(limiteSelector);
      } else if (limiteSelector !== undefined) {
        const respL = await obtenerLimite();
      }

      if (limitesSelector !== undefined && limitesSelector.length > 0) {
        setLimites(limitesSelector);
        if (document.getElementById("spinner2") !== null) {
          document.getElementById("spinner2").hidden = true;
        }
      } else if (limitesSelector !== undefined && llamadaLimites == false) {
        const resLim = await obtenerTodosLimites();
        setLlamadaLimites(true);
        setTimeout(() => {
          if (document.getElementById("spinner2") !== null) {
            document.getElementById("spinner2").hidden = true;
          }
        }, 3000);
      }

      if (documentosSelector !== undefined && documentosSelector.length > 0) {
        setCarpetas(documentosSelector);
        if (document.getElementById("spinner3") !== null) {
          document.getElementById("spinner3").hidden = true;
        }
      } else if (
        documentosSelector !== undefined &&
        llamadaDocumentos === false
      ) {
        const resDoc = await obtenerDocumentos();
        setLlamadaDocumentos(true);
        setTimeout(() => {
          if (document.getElementById("spinner3") !== null) {
            document.getElementById("spinner3").hidden = true;
          }
        }, 3000);
      }
    } else {
      props.history.push("/login");
    }
  }, [activo, limitesSelector, garantiaSelector, documentosSelector]);

  const obtenerNotificacionesPorCuenta = async () => {
    dispatch(obtenerNotificaciones(accountid));
  };

  const obtenerGarantia = async () => {
    dispatch(obtenerTodasGarantiasInicio(accountid));
  };

  const obtenerLimite = async () => {
    dispatch(obtenerLimitePorLinea(accountid));
  };

  const obtenerTodosLimites = async () => {
    dispatch(obtenerTodosLimitesPorLineas(accountid));
  };

  const obtenerDocumentos = async () => {
    dispatch(obtenerDocumentosPorCuenta(accountid));
  };

  const obtenerDocumentoSelect = async (e) => {
    setDocumentoId(e);
    carpetas
      .filter((elemento) => elemento.new_documentacionporcuentaid === e)
      .map((item) => {
        setDocumento(item);
      });
  };

  const changeHandler = (event) => {
    setSelectedFiles(event.target.files);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    if (documentoId === "") {
      document.getElementById("documento").classList.add("is-invalid");
      setMensaje("El documento es requerido!");
      setError(true);
      setShow(true);
      return;
    } else {
      document.getElementById("documento").classList.remove("is-invalid");
      document.getElementById("documento").classList.add("is-valid");
    }
    if (selectedFiles.length === 0) {
      document.getElementById("adjunto").classList.add("is-invalid");
      setMensaje("El archivo adjunto es requerido!");
      setError(true);
      setShow(true);
      return;
    } else {
      document.getElementById("adjunto").classList.remove("is-invalid");
      document.getElementById("adjunto").classList.add("is-valid");
    }

    const formData = new FormData();
    for (let index = 0; index < selectedFiles.length; index++) {
      let element = selectedFiles[index];
      formData.append(`body${index}`, element);
    }
    // formData.append('body', selectedFiles);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    dispatch(
      cargarDocumentacionPorCuenta(formData, config, documentoId, documento)
    );
    setMensaje("La subida del archivo fue exitosa!");
    setError(false);
    setShow(true);
    limpiar();
  };

  const limpiar = async () =>
    setTimeout(() => {
      document.getElementById("documento").classList.remove("is-valid");
      document.getElementById("adjunto").classList.remove("is-valid");
      setDocumentoId("");
      setSelectedFiles([]);
      document.getElementById("adjunto").value = "";
      document.docXcuenta.btnSubmit.blur();
    }, 2500);

  return (
    <animated.div className="container" style={fade}>
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="card shadow borde-none pad w-100 mb-4 pt-3 pb-3">
            <div className="col-sm-12 m-0">
              <span className="separador-titulo float-start m-0"></span>
              <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">Casos</p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-5 mt-2 pad"></div>
        <div className="col-sm-12 col-md-2"></div>
      </div>

      <div className="row pb-5">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Mis Casos Activos</h6>
              <hr className="hr-width hr-principal" />
            </div>
            <div className="card doc-cards pad borde-none">
              <div className="lista-header color-header pad">
                {/* inserir tabla  */}
                <div className="contenedor-spinner" id="spinner1">
                  {/* <div
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
                  </div> */}
                </div>

                <div className="row p-3">
                  <div className="col-12 color-header text-center c-black fw-bolder">
                    <NavLink
                      className="fuente nav-link text-center padd-menu-link"
                      to="/casos"
                    >
                      Ver más
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Mis Casos Resueltos</h6>
              <hr className="hr-width hr-principal" />
            </div>
            <div className="card doc-cards pad borde-none">
              <div className="lista-header color-header pad">
                {/* inserir tabla */}
                <div className="contenedor-spinner" id="spinner2">
                  {/* <div
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
                  </div> */}
                </div>

                <div className="row p-3">
                  <div className="col-sm-12 text-center c-azul fw-bolder">
                    <NavLink
                      className="fuente nav-link text-center padd-menu-link"
                      to="/casos"
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
      <div className="col-sm-12">
        <div className="card shadow borde-none pad w-100 mb-4 pt-3 pb-3">
          <div className="col-sm-12 m-0">
            <span className="separador-titulo float-start m-0"></span>
            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">
              Documentos Legales
            </p>
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
                {/* inserir tabla  */}
                <div className="contenedor-spinner" id="spinner1">
                  {/* <div
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
                  </div> */}
                </div>

                <div className="row p-3">
                  <div className="col-12 color-header text-center c-black fw-bolder">
                    <NavLink
                      className="fuente nav-link text-center padd-menu-link"
                      to="/Legales"
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
      <div className="col-sm-12">
        <div className="card shadow borde-none pad w-100 mb-4 pt-3 pb-3">
          <div className="col-sm-12 m-0">
            <span className="separador-titulo float-start m-0"></span>
            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">
              Recursos Humanos
            </p>
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
      </div>
    </animated.div>
  );
};

export default withRouter(Inicio);
