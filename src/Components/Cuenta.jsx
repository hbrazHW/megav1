import React from "react";
import Moment from "moment";
import perfiRandom from "../img/foto-perfil-random.png";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerCertificadoPyme,
  obtenerSociedadesXsocio,
  obtenerSociedadeDeBolsa,
  obtenerProvincias,
  actualizarDatosCuenta,
} from "../Redux/Cuenta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import { Toast, Spinner } from "react-bootstrap";

const Cuenta = () => {
  //Constantes
  const dispatch = useDispatch();
  const [cuenta, setCuenta] = React.useState(null);
  const [certificados, setCertificados] = React.useState([]);
  const [sociedadXbolsa, setSociedadXbolsa] = React.useState({});
  const [nombreSociedad, setNombreSociedad] = React.useState("");
  const [nombreCuentaComitente, setNombreCuentaComitente] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
  const [localidad, setLocalidad] = React.useState("");
  const [calle, setCalle] = React.useState("");
  const [codigoPostal, setCodigoPostal] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [piso, setPiso] = React.useState("");
  const [depto, setDepto] = React.useState("");
  const [provincia, setProvincia] = React.useState("");
  const [provincias, setProvincias] = React.useState([]);
  const [municipio, setMunicipio] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [llamadaSociedad, setLlamadaSociedad] = React.useState(false);
  const [llamadaCertificados, setLlamadaCertificados] = React.useState(false);
  const [llamadaProvincias, setLlamadaProvincias] = React.useState(false);
  const [datosCompletados, setDatosCompletados] = React.useState(false);

  //Estados
  const activo = useSelector((store) => store.usuarios.activo);
  const accountid = useSelector((store) => store.usuarios.accountid);
  const cuentaSelector = useSelector((store) => store.cuenta.cuenta);
  const certificadosSelector = useSelector(
    (store) => store.cuenta.certificadosPymes
  );
  const sociedadesXsocioSelector = useSelector(
    (store) => store.cuenta.sociedadXsocio
  );
  const sociedadDebolsa = useSelector((store) => store.cuenta.sociedadDeBolsa);
  const provinciasSelector = useSelector((store) => store.cuenta.provincias);
  const actualizacionDatosSelector = useSelector(
    (store) => store.cuenta.actualizacionDatos
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
        Object.keys(cuentaSelector).length != 0 &&
        datosCompletados === false
      ) {
        setCuenta(cuentaSelector);
      }
      if (
        datosCompletados === false &&
        Object.keys(cuentaSelector).length > 0
      ) {
        completarDatos(cuentaSelector);
        setDatosCompletados(true);
      }
      if (Object.keys(sociedadesXsocioSelector).length != 0) {
        setSociedadXbolsa(sociedadesXsocioSelector);
      } else if (llamadaSociedad === false) {
        const respSXB = await obtenerSociedadXbolsa();
        setLlamadaSociedad(true);
      }
      if (certificadosSelector.length > 0) {
        setCertificados(certificadosSelector);
        document.getElementById("spinner1").style.display = "none";
      } else if (llamadaCertificados === false) {
        const resp = await obtenerTodosCertificadosPymes();
        setLlamadaCertificados(true);
        setTimeout(() => {
          document.getElementById("spinner1").style.display = "none";
        }, 3000);
      }
      if (Object.keys(sociedadXbolsa).length != 0) {
        if (Object.keys(sociedadDebolsa).length === 0) {
          obtenerSociedadDeBolsa(sociedadXbolsa[0]._new_sociedaddebolsa_value);
        }
        setNombreCuentaComitente(sociedadXbolsa[0].new_cuentacomitente);
        if (document.getElementById("spinner1") !== null) {
          document.getElementById("spinner1").hidden = true;
        }
      } else {
        setTimeout(() => {
          if (document.getElementById("spinner2") !== null) {
            document.getElementById("spinner2").hidden = true;
          }
        }, 3000);
      }
      if (sociedadDebolsa.length > 0) {
        setNombreSociedad(sociedadDebolsa[0].new_name);
        if (document.getElementById("spinner2") !== null) {
          document.getElementById("spinner2").hidden = true;
        }
      }
      if (
        provinciasSelector.length > 0 &&
        llamadaProvincias === true &&
        cuenta != undefined
      ) {
        setProvincias(provinciasSelector);
        completarProvincias(provinciasSelector, cuenta);
      } else {
        const resp = await obtenerTodasProvincias();
        setLlamadaProvincias(true);
      }

      if (actualizacionDatosSelector !== undefined) {
        if (actualizacionDatosSelector !== "") {
          actualizacionExito();
        }
      }
    }
  }, [activo, cuentaSelector, provinciasSelector, actualizacionDatosSelector]);

  const obtenerTodosCertificadosPymes = async () => {
    dispatch(obtenerCertificadoPyme(accountid));
  };

  const obtenerSociedadXbolsa = async () => {
    dispatch(obtenerSociedadesXsocio(accountid));
  };

  const obtenerSociedadDeBolsa = async (socioId) => {
    dispatch(obtenerSociedadeDeBolsa(socioId));
  };

  const obtenerNombreSociedad = async (id) => {};

  const obtenerTodasProvincias = async () => {
    dispatch(obtenerProvincias());
  };

  const completarDatos = (cuentas) => {
    debugger;
    if (cuentas != undefined) {
      setCuenta(cuentas);
      setCalle(cuentas.address1_line1);
      setNumero(cuentas.new_direccion1numero);
      setPiso(cuentas.address1_name);
      setDepto(cuentas.new_direccion1depto);
      setLocalidad(cuentas.new_localidad);
      setMunicipio(cuentas.address1_county);
      setCodigoPostal(cuentas.address1_postalcode);
      setTelefono(cuentas.telephone2);
      provincias
        .filter((prov) => prov.new_provinciaid === cuentas._new_provincia_value)
        .map((item) => {
          setProvincia(item.new_provinciaid);
        });
    }
  };

  const completarProvincias = (provinciasS, cuenta) => {
    provinciasS
      .filter((prov) => prov.new_provinciaid === cuenta._new_provincia_value)
      .map((item) => {
        setProvincia(item.new_provinciaid);
      });
  };

  const actualizarDatos = (e) => {
    e.preventDefault();
    if (localidad !== null) {
      if (!localidad.trim()) {
        setLocalidad(localidad);
      }
    }
    dispatch(
      actualizarDatosCuenta(
        accountid,
        telefono,
        calle,
        numero,
        piso,
        depto,
        provincia,
        localidad,
        municipio,
        codigoPostal
      )
    );
    setLoading(true);
    setMensaje("Cargando...");
    setShow(true);
  };

  const actualizacionExito = () => {
    debugger;
    if (actualizacionDatosSelector === "EXITO") {
      setMensaje("Datos actualizados con exito!");
      setError(false);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
      setTimeout(() => {
        document.getElementById("myInput").click();
      }, 2000);
    } else if (actualizacionDatosSelector === "ERROR") {
      setMensaje("Los datos no se actualizaron!");
      setError(true);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  const obtenerRazonParaElEstado = (razon) => {
    switch (razon) {
      case "1":
        return "Aprobado";
        break;
      case "100000000":
        return "Analisis";
        break;
      case "100000001":
        return "Inicio";
        break;
      case "100000002":
        return "Reprobado";
        break;
      default:
        return "Analisis";
        break;
    }
  };

  return (
    <animated.div className="container vh-auto vh-lg-100" style={fade}>
      <div className="row mt-5 mb-5">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow p-2 border-0 h-auto d-flex justify-content-start pad">
            <div className="w-100 ">
              <div className="dropdown float-end">
                <button
                  className="btn"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="fs-5 text-dark upload-file atras float-end"
                  />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      className="btn border-0 adeltante dropdown-item text-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Cambiar foto de Perfil
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn border-0 adeltante dropdown-item text-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Editar información
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row w-100 justify-content-center">
              <div className="col-12 ">
                <div className="w-100 d-flex justify-content-center">
                  <img
                    className="border-secondary padding-foto-perfil p-1 foto-mi-perfil rounded-circle"
                    src={perfiRandom}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="row w-auto d-flex justify-content-center">
                  <div className="col-12 ">
                    <div className="w-100 p-2 text-center">
                      <p className="fw-bolder">
                        {cuenta != undefined ? cuenta.Name : ""}
                      </p>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="w-100  p-2 text-start">
                      <p className="m-0">CUIT</p>
                      <p className="fw-bolder">
                        {(cuenta != undefined) != 0
                          ? cuenta.new_nmerodedocumento
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="w-100  p-2 text-end">
                      <p className="m-0">Ciudad</p>
                      <p className="fw-bolder">
                        {(localidad != undefined) != 0 ? localidad : ""}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="w-100  p-2 text-start">
                      <p className="m-0">Direccion</p>
                      <p className="fw-bolder">
                        {calle != undefined ? calle : ""}{" "}
                        {numero != undefined ? numero : ""}
                      </p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="w-100  p-2 text-end">
                      <p className="m-0">Codigo Postal</p>
                      <p className="fw-bolder">
                        {(codigoPostal != undefined) != 0 ? codigoPostal : ""}
                      </p>
                    </div>
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <div className="row pb-5">
            <div className="col-12 mt-3 mt-sm-0">
              <div className="card shadow p-2 border-0 h-auto d-flex justify-content-start pad">
                <div>
                  <h6 className="fw-bolder">Certificados Pymes</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="card doc-cards pad borde-none">
                  <div className="lista-header color-header pad ">
                    <div className="row p-3">
                      <div className="col-3">Número de Registro</div>
                      <div className="col-3">Vigencia Desde</div>
                      <div className="col-3">Vigencia Hasta</div>
                      <div className="col-3">Razón para el estado</div>
                    </div>
                    <div className="contenedor-spinner" id="spinner1">
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
                    <ul className="list-group overflow-scroll lista-body">
                      {certificados.map((item) => {
                        return (
                          <li
                            key={item.new_certificadopymeid}
                            className="list-group-item h-100 p-0 pt-2 pb-2"
                          >
                            <div className="row d-flex align-items-center">
                              <div className="col-3">
                                <p className="text-lowercase padding-lista-perfil m-0 fw-bolder">
                                  {item.new_numeroderegistro}
                                </p>
                              </div>
                              <div className="col-3 m-0 text-center">
                                <p className="text-lowercase m-0 fw-bolder">
                                  {item.new_vigenciadesde
                                    ? Moment(item.new_vigenciadesde).format("L")
                                    : "-"}
                                </p>
                              </div>
                              <div className="col-3 m-0 text-center">
                                <p className="text-lowercase m-0 fw-bolder">
                                  {item.new_vigenciahasta
                                    ? Moment(item.new_vigenciahasta).format("L")
                                    : "-"}
                                </p>
                              </div>
                              <div className="col-3 m-0 text-center">
                                <p className="text-lowercase m-0 fw-bolder">
                                  {obtenerRazonParaElEstado(item.statuscode)}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="row p-3">
                      <div className="col-12 color-header text-center c-azul fw-bolder">
                        {certificados.length} Certificados
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="card shadow p-2 border-0 h-auto d-flex justify-content-start pad">
                <div>
                  <h6 className="fw-bolder">Sociedad de Bolsa</h6>
                  <hr className="hr-width hr-principal" />
                </div>
                <div className="card doc-cards pad borde-none">
                  <div className="lista-header color-header pad ">
                    <div className="row p-3">
                      <div className="col-6">Sociedad de Bolsa</div>
                      <div className="col-6 text-end">Cuenta Comitente</div>
                    </div>
                    <div className="contenedor-spinner" id="spinner2">
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
                    <ul className="list-group lista-body">
                      <li className="list-group-item h-100 p-0 pt-2 pb-2">
                        <div className="row d-flex align-items-center">
                          <div className="col-8 ">
                            <p className="text-lowercase padding-lista-perfil m-0 fw-bolder">
                              {nombreSociedad}
                            </p>
                          </div>
                          <div className="col-4 m-0 ">
                            <p className="pl-3 text-center m-0 fw-bolder">
                              {nombreCuentaComitente}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
        <div
          className="modal fade bd-example-modal-lg"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered pad">
            <div className="modal-content pad borde-none">
              <div className="modal-body">
                <form name="docXcuenta" onSubmit={actualizarDatos}>
                  <div className="mb-3 h-100">
                    <div className="row">
                      <div className="col-8">
                        <h6 className="fw-bolder">Actualizar Datos </h6>
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
                    <div className="form-group">
                      <div class="mb-3">
                        <label className="form-label fw-bolder lbl-precalificacion">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          id="razon"
                          name="razon"
                          className="form-control"
                          onChange={(e) => setTelefono(e.target.value)}
                          value={telefono}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Provincia
                            </label>
                            <select
                              className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                              id="provincia"
                              aria-label="form-select-lg example"
                              onChange={(e) => setProvincia(e.target.value)}
                              value={provincia}
                            >
                              <option selected>Seleccionar</option>
                              {provincias.map((provincias) => {
                                return (
                                  <option
                                    key={provincias.new_provinciaid}
                                    className="subtitulo-notificacion p-2"
                                    data-id={provincias.new_provinciaid}
                                    value={provincias.new_provinciaid}
                                  >
                                    {provincias.new_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Localidad
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setLocalidad(e.target.value)}
                              value={localidad}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Calle
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setCalle(e.target.value)}
                              value={calle}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Número
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setNumero(e.target.value)}
                              value={numero}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Piso
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setPiso(e.target.value)}
                              value={piso}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Depto
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setDepto(e.target.value)}
                              value={depto}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Municipio / Partido / Comuna
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setMunicipio(e.target.value)}
                              value={municipio}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <div class="mb-3">
                            <label className="form-label fw-bolder lbl-precalificacion">
                              Código Postal
                            </label>
                            <input
                              type="text"
                              id="razon"
                              name="razon"
                              className="form-control"
                              onChange={(e) => setCodigoPostal(e.target.value)}
                              value={codigoPostal}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      name="btnSubmit"
                      className="btn btn-primary btn-lg mt-4"
                    >
                      Actualizar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
                <Toast className="half-black" show={show} autohide color="lime">
                  <Toast.Body className="text-white">
                    <div className="row p-2">
                      {loading ? (
                        <Spinner
                          animation="border"
                          role="status"
                          variant="primary"
                        >
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
        </div>
      </div>
    </animated.div>
  );
};

export default Cuenta;
