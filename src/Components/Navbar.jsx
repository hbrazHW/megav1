import React from "react";
import Moment from "moment";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  withRouter,
} from "react-router-dom";
import { cerrarSesion } from "../Redux/usuarios";
import perfiRandom from "../img/foto-perfil-random.png";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNotificaciones } from "../Redux/Notificaciones";
import { obtenerCuenta } from "../Redux/Cuenta";
import { obtenerContacto } from "../Redux/Contacto";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faAlignCenter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../img/megablanco.png";
import { tieneRolAdmin } from "../Redux/Contact";
import RecursosHumanos from "./RecursosHumanos";

const Navbar = (props) => {
  //Constantes
  const dispatch = useDispatch();
  const [notificaciones, setNotificaciones] = React.useState([]);
  const [cuenta, setCuenta] = React.useState(null);
  const [menu, setMenu] = React.useState(false);
  const [llamadaNotificaciones, setLlamadaNotificaciones] =
    React.useState(false);
  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);

  //Estados
  const activo = useSelector((store) => store.usuarios.activo);
  const accountid = useSelector((store) => store.usuarios.accountid);
  const notificacionesSelector = useSelector(
    (store) => store.notificaciones.notificaciones
  );
  const cuentaSelector = useSelector((store) => store.cuenta.cuenta);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const contactid = useSelector((store) => store.usuarios.contactid);

  const [contactsAdmin, setContactsAdmin] = React.useState([]);
  const [llamadaContactsA, setLlamadaContactsA] = React.useState(false);
  const contactoRolAdmin = useSelector((store) => store.contacts.rolAdmin);
  const [rolAdmin, setRolAdmin] = React.useState("");

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
      if (notificacionesSelector.length > 0) {
        setNotificaciones(notificacionesSelector);
      } else if (
        notificacionesSelector.length === 0 &&
        llamadaNotificaciones === false
      ) {
        const res = await obtenerNotificacionesCuenta();
        setLlamadaNotificaciones(true);
      }
      if (
        Object.keys(contactoSelector).length > 0 &&
        llamadaContactos === true
      ) {
        setContacto(contactoSelector);
      } else if (
        Object.keys(contactoSelector).length === 0 &&
        llamadaContactos === false
      ) {
        obtenerMiContacto();
        setLlamadaContactos(true);
      }

      if (Object.keys(cuentaSelector).length != 0) {
        setCuenta(cuentaSelector);
      } else {
        const resCuenta = await obtenerMiCuenta();
      }
      if (contactsAdmin.length === 0) {
        if (contactoRolAdmin.length > 0 && llamadaContactsA === true) {
          setContactsAdmin(contactoRolAdmin);
        } else if (llamadaContactsA === false) {
          obtenerContactosRolAdmin();
          setLlamadaContactsA(true);
        }
      }
      // if (contacto.length === 0) {
      //   setRolAdmin(contacto);{
      // }setRolAdmin(rolAdmin.contactid == contactid);
        

      // }
      console.log("rol admin:", contactoRolAdmin);
    }
  }, [
    activo,
    notificacionesSelector,
    cuentaSelector,
    contactoSelector,
    contactoRolAdmin,
    rolAdmin,
  ]);

  const obtenerContactosRolAdmin = async () => {
    dispatch(tieneRolAdmin());
  };

  // console.log("contactos con rol admin:", contactsAdmin)

  if (rolAdmin.contactid == contactid) {
    return <RecursosHumanos />;
  }

  const obtenerNotificacionesCuenta = async () => {
    dispatch(obtenerNotificaciones(accountid));
  };

  const obtenerMiCuenta = async () => {
    dispatch(obtenerCuenta(accountid));
  };

  const obtenerMiContacto = async () => {
    dispatch(obtenerContacto(contactid));
  };

  const CerrarSesion = () => {
    dispatch(cerrarSesion());
    props.history.push("/");
  };

  const botonMenu = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };
  return props.loggedUser ? (
    <animated.div className="shadow" style={fade}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid container-lg">
          <div className="row align-items-center">
            <div className="col-3">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={botonMenu}
              >
                {menu ? (
                  <FontAwesomeIcon
                    icon={faAlignCenter}
                    className="fs-3 upload-file atras"
                    style={fade}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faAlignJustify}
                    className="fs-3 upload-file atras"
                    style={fade}
                  />
                )}
                {/* <span className="navbar-toggler-icon"></span> */}
              </button>
            </div>
            <div className="col-9">
              <div className="w-auto d-flex justify-content-center">
                <Link className="navbar-brand m-0" to="/">
                  <img className="logo-menu" src={logo} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="d-block d-lg-none">
            <div className="w-auto d-flex justify-content-start">
              <ul className="nav">
                <li className="nav-item dropdown dropdown-on-hover show mt-1">
                  <div className="btn-group ">
                    <button
                      className="btn boton-notificacion mt-2 "
                      data-bs-toggle="dropdown"
                      data-bs-trigger="hover"
                      aria-expanded="false"
                    >
                      <span className="container"></span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="fs-3 upload-file atras plus"
                        style={fade}
                      />
                    </button>
                    <div className="dropdown-menu shadow mt-3 dropdown-menu-end pad borde-none">
                      <div className="card card-notificacion pad borde-none">
                        <div className="card-header mt-0 p-2 bg-white pad border-none">
                          <h6 className="fw-bolder m-0">Formularios</h6>
                          <div className="col-sm-2 separador-notificacion"></div>
                        </div>
                        <div className="card-body p-0 bg-white  borde-none">
                          <ul className="list-group w-100 overflow-auto notificaciones-menu">
                            <div className="">
                              <div className="col-12 mt-2">
                                <Link
                                  className=" mr-5 text-decoration-none"
                                  to="/Casos"
                                >
                                  <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                    Crear Caso
                                  </button>
                                </Link>
                                <Link
                                  className=" mr-5 text-decoration-none"
                                  to="/legales"
                                >
                                  <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                    Crear Legal
                                  </button>
                                </Link>
                               
                                  <Link
                                    className=" mr-5 text-decoration-none"
                                    to="/RecursosHumanos"
                                  >
                                    <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                      Formulario RRHH
                                    </button>
                                  </Link>
                                
                              </div>
                            </div>
                          </ul>
                        </div>
                        {/* <div className="card-footer bg-white text-muted text-center border-none fw-bolder">
                          <p className="color-footer-notificacion pt-1  m-0">
                            Tienes {notificaciones.length}{" "}
                            {notificaciones.length === 1
                              ? "notificación"
                              : "notificaciones"}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="dropdown">
                    <button
                      className="btn boton-notificacion "
                      data-bs-toggle="dropdown"
                      data-bs-trigger="hover"
                      aria-expanded="false"
                    >
                      <img
                        className="border border-secondary bg-light p-1 foto-perfil rounded-circle"
                        src={perfiRandom}
                        alt=""
                      />
                    </button>
                    <div
                      className="dropdown-menu mt-3 dropdown-menu-end borde-none pad shadow"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <div className="card card-notificacion borde-none pad">
                        <div className="p-2">
                          <div className="border-bottom pb-1">
                            <div className="col-2">
                              <img
                                className="border-secondary padding-foto-perfil foto-perfil-notificacion rounded-circle"
                                src={perfiRandom}
                                alt=""
                              />
                            </div>
                            <div className="col-10">
                              {contacto.map((item) => (
                                <h5 className="perfil-nombre m-0 fw-bolder">
                                  {item.fullname}
                                </h5>
                              ))}

                              {contacto.map((item) => (
                                <p className="perfil-email m-0 ">
                                  {item.emailaddress1}
                                </p>
                              ))}
                            </div>
                          </div>
                          {/* <div className="row border-bottom pb-1">
                            <div className="col-12 mt-2">
                              <Link
                                className=" mr-5 text-decoration-none"
                                to="/cuenta"
                              >
                                <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                  Perfil y Cuenta
                                </button>
                              </Link>
                            </div>
                          </div> */}
                          <div className="col-12 mt-2">
                            <div className="mt-1">
                              <button
                                className="dropdown-item mb-1 p-3 rounded-3 perfil-link fw-bolder"
                                to="/login"
                                onClick={CerrarSesion}
                              >
                                Cerrar Sesión
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="collapse navbar-collapse"
            id="navbarToggleExternalContent"
          >
            <div className="w-100 d-flex align-items-center">
              <div className="m-auto">
                <ul className="navbar-nav">
                  {/* <li className="nav-item">
                    <NavLink className="casos-nav" to="/Casos">
                      Casos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="doc-legales" to="/legales">
                      Documentos Legales
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="recursos-humanos" to="/RecursosHumanos">
                      Recursos Humanos
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="d-none d-lg-block">
              <ul className="navbar-nav">
                <li className="nav-item dropdown dropdown-on-hover show mt-1">
                  <div className="btn-group h-auto d-flex align-items-center">
                    <button
                      className="btn boton-notificacion mt-2 "
                      data-bs-toggle="dropdown"
                      data-bs-trigger="hover"
                      aria-expanded="false"
                    >
                      <span className="container"></span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="fs-3 upload-file atras plus"
                        style={fade}
                      />
                    </button>
                    <div className="dropdown-menu shadow mt-3 dropdown-menu-end pad borde-none">
                      <div className="card card pad borde-none">
                        <div className="card-header mt-0 p-2 bg-white pad border-none">
                          <h6 className="fw-bolder m-0">Formularios</h6>
                          <div className="col-sm-2 separador-notificacion"></div>
                        </div>
                        <div className="card-body p-0 bg-white  borde-none">
                          <ul className="list-group w-100  ">
                            <div className="">
                              <div className="col-12 mt-2">
                                <Link
                                  className=" mr-5 text-decoration-none"
                                  to="/Casos"
                                >
                                  <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                    Crear Caso
                                  </button>
                                </Link>
                                <Link
                                  className=" mr-5 text-decoration-none"
                                  to="/legales"
                                >
                                  <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                    Crear Legal
                                  </button>
                                </Link>

                                
                                  <Link
                                    className=" mr-5 text-decoration-none"
                                    to="/RecursosHumanos"
                                  >
                                    <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                      Formulario RRHH
                                    </button>
                                  </Link>
                               
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item ">
                  <div className="dropdown">
                    <button
                      className="btn boton-notificacion "
                      data-bs-toggle="dropdown"
                      data-bs-trigger="hover"
                      aria-expanded="false"
                    >
                      <img
                        className="border border-secondary bg-light p-1 foto-perfil rounded-circle"
                        src={perfiRandom}
                        alt=""
                      />
                    </button>
                    <div
                      className="dropdown-menu mt-3 dropdown-menu-end borde-none pad shadow"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <div className="card card-notificacion borde-none pad">
                        <div className="p-2">
                          <div className="row border-bottom pb-3">
                            <div className="col-2">
                              <img
                                className="border-secondary padding-foto-perfil foto-perfil-notificacion rounded-circle"
                                src={perfiRandom}
                                alt=""
                              />
                            </div>
                            <div className="col-10">
                              {contacto.map((item) => (
                                <h5 className="perfil-nombre m-0 fw-bolder">
                                  {item.fullname}
                                </h5>
                              ))}

                              {contacto.map((item) => (
                                <p className="perfil-email m-0 ">
                                  {item.emailaddress1}
                                </p>
                              ))}
                            </div>
                          </div>
                          {/* <div className="row border-bottom pb-1">
                            <div className="col-12 mt-2">
                              <Link
                                className=" mr-5 text-decoration-none"
                                to="/cuenta"
                              >
                                <button className="dropdown-item mb-2 p-3 rounded-3 perfil-link fw-bolder">
                                  Perfil y Cuenta
                                </button>
                              </Link>
                            </div>
                          </div> */}
                          <div className="col-12 mt-1">
                            <div className="mt-1">
                              <button
                                className="dropdown-item mb-1 p-3 rounded-3 perfil-link fw-bolder"
                                to="/login"
                                onClick={CerrarSesion}
                              >
                                Cerrar Sesión
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start col-sm-12 col-md-6"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Mi Perfil
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row w-100 justify-content-center">
            <div className="w-auto">
              <img
                className="border border-secondary bg-light p-1 foto-mi-perfil rounded-circle"
                src={perfiRandom}
                alt=""
              />
            </div>
            <div className="w-100 mt-4">
              <div className="w-auto text-center p-2">
                {cuenta != undefined ? cuenta.Name : ""}
              </div>
            </div>

            <div className="w-100 text-center p-2">
              {(cuenta != undefined) != 0 ? cuenta.new_nmerodedocumento : ""}
            </div>
            <div className="w-100 text-center p-2">
              {(cuenta != undefined) != 0
                ? cuenta.address1_line1 + cuenta.new_direccion1numero
                : ""}
            </div>
            <div className="w-100 text-center p-2">
              {(cuenta != undefined) != 0 ? cuenta.new_localidad : ""}
            </div>
            <div className="w-100 text-center p-2">
              {(cuenta != undefined) != 0 ? cuenta.address1_postalcode : ""}
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  ) : (
    <div></div>
  );
};

export default withRouter(Navbar);
