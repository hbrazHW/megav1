import React from "react";
import { Toast, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarPrecalificacionCrediticia,
  limpiarResultado,
} from "../Redux/PrecalificacionCrediticia";
import { obtenerTipoDeDocumentos } from "../Redux/TipoDeDocumento";
import { useSpring, animated } from "react-spring";
import ReCAPTCHA from "react-google-recaptcha";
import { RecaptchaKey } from "../Keys";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const PrecalificacionCrediticia = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [personeria, setPersoneria] = React.useState("");
  const [razonSocial, setRazonSocial] = React.useState("");
  const [cuit, setCuit] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [facturacion, setFacturacion] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
  const [robot, setRobot] = React.useState(false);
  const [tiposDocumentos, setTiposDocumentos] = React.useState([]);
  const [tipoDocumento, setTipoDocumento] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submits, setSubmits] = React.useState(0);

  const tipoDocumentoSelector = useSelector(
    (store) => store.tiposDocumentos.tiposDocumentos
  );
  const resultado = useSelector((store) => store.precalificacion.resultado);

  React.useEffect(async () => {
    if (tipoDocumentoSelector.length > 0) {
      CompletarOpcionesTipoDocumentos(tipoDocumentoSelector);
    } else {
      obtenerTiposDocumentos();
    }
    if (resultado !== undefined && submits === 1) {
      if (resultado !== "") {
        cargaExito();
      }
    }
  }, [tipoDocumentoSelector, resultado]);

  const obtenerTiposDocumentos = async () => {
    dispatch(obtenerTipoDeDocumentos());
  };

  const limpiarResultado = async () => {
    dispatch(limpiarResultado());
  };

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  const personeriaOnChange = (valor) => {
    setPersoneria(valor);
  };

  const personeriaOpciones = [
    { value: "100000000", label: "Jurídica" },
    { value: "100000001", label: "Humana" },
  ];

  const ProcesarPrecalificacion = (e) => {
    e.preventDefault();
    if (!personeria.value.trim()) {
      document.getElementById("personeria").classList.add("is-invalid");
      setMensaje("La personeria es requerida!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("personeria").classList.remove("is-invalid");
      // document.getElementById("personeria").classList.add("is-valid")
    }
    if (!razonSocial.trim()) {
      document.getElementById("razon").classList.add("is-invalid");
      setMensaje("La razón social es requerida!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("razon").classList.remove("is-invalid");
      // document.getElementById("razon").classList.add("is-valid")
    }
    if (!cuit.trim()) {
      document.getElementById("cuit").classList.add("is-invalid");
      setMensaje("El cuit es requerido!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else if (cuit.length > 11 || cuit.length < 11) {
      document.getElementById("cuit").classList.add("is-invalid");
      setMensaje("El cuit es incorrecto!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("cuit").classList.remove("is-invalid");
      // document.getElementById("cuit").classList.add("is-valid")
    }
    if (!tipoDocumento.value.trim()) {
      document.getElementById("tipoDocumento").classList.add("is-invalid");
      setMensaje("El nombre es requerido!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("tipoDocumento").classList.remove("is-invalid");
      // document.getElementById("nombre-contacto").classList.add("is-valid")
    }
    if (!telefono.trim()) {
      document.getElementById("tel").classList.add("is-invalid");
      setMensaje("El telefono es requerido!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("tel").classList.remove("is-invalid");
      // document.getElementById("tel").classList.add("is-valid")
    }
    if (!email.trim()) {
      document.getElementById("email").classList.add("is-invalid");
      setMensaje("El email es requerido!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("email").classList.remove("is-invalid");
      // document.getElementById("email").classList.add("is-valid")
    }
    if (!facturacion.trim()) {
      document.getElementById("price").classList.add("is-invalid");
      setMensaje("La facturación es requerida!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    } else {
      document.getElementById("price").classList.remove("is-invalid");
      // document.getElementById("price").classList.add("is-valid")
    }
    if (!robot) {
      setMensaje("Debes confirmar que no eres un robot!");
      setError(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      return;
    }

    dispatch(
      cargarPrecalificacionCrediticia(
        personeria,
        razonSocial,
        cuit,
        tipoDocumento,
        telefono,
        email,
        facturacion
      )
    );
    setLoading(true);
    setMensaje("Cargando...");
    setShow(true);
    setSubmits(1);
  };

  const cargaExito = () => {
    debugger;
    if (resultado === "EXITO") {
      setMensaje("La precalificación fue enviada con exito!");
      setError(false);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
      setTimeout(() => {
        history.push("/");
      }, 2000);
      limpiar();
      setSubmits(0);
    } else if (resultado === "ERROR") {
      setMensaje("La cuenta que intenta ingresar ya existe!");
      setError(true);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  const limpiar = async () =>
    setTimeout(() => {
      setPersoneria("");
      setRazonSocial("");
      setCuit("");
      setEmail("");
      setTipoDocumento("");
      setTelefono("");
      setFacturacion("");
    }, 1500);

  const onChange = () => {
    setRobot(true);
  };

  const tipoDocumentoOnChange = (valor) => {
    debugger;
    setTipoDocumento(valor);
  };

  const CompletarOpcionesTipoDocumentos = (tipos) => {
    const opcionesDocumentos = [];
    tipos.forEach((element) => {
      var tipo = {
        value: element.new_tipodedocumentoid,
        label: element.new_name,
      };
      opcionesDocumentos.push(tipo);
    });
    setTiposDocumentos(opcionesDocumentos);
  };

  return (
    <animated.div className="container" style={fade}>
      <div className="vh-100">
        <div className="card shadow borde-none pad w-100 mt-5 pt-3 pb-3">
          <div className="row">
            <div className="col-12 m-0">
              <span className="separador-titulo-precalificacion float-start m-0"></span>
              <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">
                Precalificación Crediticia. Los siguientes datos son
                obligatorios para la precalificación
              </p>
            </div>
          </div>
        </div>
        <div className="card shadow borde-none pad mt-5">
          <div className="row h-25">
            <div className="col-sm-12 p-4">
              <div className="p-4">
                <form onSubmit={ProcesarPrecalificacion}>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Personeria
                        </label>
                        {/* <select className="form-select"
                                                    id="personeria"
                                                    aria-label="Default select example"
                                                    onChange={e => setPersoneria(e.target.value)}
                                                    value={personeria}
                                                    required>
                                                    <option selected>-- Seleccionar --</option>
                                                    <option value="100000000">Jurídica</option>
                                                    <option value="100000001">Física</option>
                                                </select> */}
                        <Select
                          className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                          id="personeria"
                          onChange={(e) => personeriaOnChange(e)}
                          name="colors"
                          options={personeriaOpciones}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="BUSCAR PERSONERIA..."
                          value={personeria}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Nombre o Razón Social
                        </label>
                        <input
                          type="text"
                          id="razon"
                          name="razon"
                          className="form-control"
                          onChange={(e) => setRazonSocial(e.target.value)}
                          value={razonSocial}
                          placeholder="NOMBRE O RAZÓN SOCIAL"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Provincia
                        </label>
                        {/* <select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                    id="tipoDocumento"
                                                    aria-label="form-select-lg example"
                                                    onChange={e => setTipoDocumento(e.target.value)}
                                                    value={tipoDocumento}
                                                >
                                                    <option selected>Seleccionar</option>
                                                    {
                                                        tiposDocumentos.map(tipos => {
                                                            return (
                                                                <option key={tipos.new_tipodedocumentoid}
                                                                    className="subtitulo-notificacion p-2"
                                                                    data-id={tipos.new_tipodedocumentoid}
                                                                    value={tipos.new_tipodedocumentoid}>{tipos.new_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select> */}
                        <Select
                          className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                          id="tipoDocumento"
                          onChange={(e) => tipoDocumentoOnChange(e)}
                          name="colors"
                          options={tiposDocumentos}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="BUSCAR TIPO DE DOCUMENTO..."
                          value={tipoDocumento}
                        ></Select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          CUIT
                        </label>
                        <input
                          type="text"
                          id="cuit"
                          name="cuit"
                          className="form-control"
                          onChange={(e) => setCuit(e.target.value)}
                          value={cuit}
                          placeholder="CUIT"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Telefono
                        </label>
                        <input
                          type="tel"
                          id="tel"
                          name="tel"
                          className="form-control"
                          onChange={(e) => setTelefono(e.target.value)}
                          value={telefono}
                          placeholder="TELEFONO"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          placeholder="EMAIL"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                          Factuaración Último Año
                        </label>
                        <input
                          type="price"
                          name="price"
                          id="price"
                          className="form-control"
                          onChange={(e) => setFacturacion(e.target.value)}
                          value={facturacion}
                          placeholder="FACTURACIÓN ÚLTIMO AÑO"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <ReCAPTCHA
                        // ref={recaptchaRef}
                        className=""
                        render="explicit"
                        sitekey={RecaptchaKey}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-12 col-md-12 h-auto mt-2">
                      <button
                        type="submit"
                        className="btn btn-block btn-lg btn-primary float-start borde-check boton-ingresar"
                      >
                        Enviar
                      </button>
                      <div className="col-md-8"></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 col-lg-4 position-fixed bottom-0 end-0 p-5 noti">
          <Toast className="half-black" show={show} autohide color="lime">
            <Toast.Body className="text-white">
              <div className="row p-1 d-flex align-items-center">
                {loading ? (
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <div className="col-1 mx-1">
                    {error ? (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="fs-2 upload-file atras"
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

                <div className="col-10 mt-1 ml-5 mx-2">{mensaje}</div>
              </div>
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </animated.div>
  );
};

export default PrecalificacionCrediticia;
