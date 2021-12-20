import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { consultaFETCHcasosResueltos, consultaFETCHmisCasosActivos } from "../Redux/Casos";
import Tabla from '../Components/Tabla'
import { COLUMNASMCA } from '../Tables/ColumnasMCA'
import { COLUMNASCR } from '../Tables/ColumnasCR'
import { consultaFETCHbusquedaPersonal } from "../Redux/RecursosHumanos";
import { COLUMNASBPA } from "../Tables/ColumnasBPA";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faFile } from '@fortawesome/free-solid-svg-icons'

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

  //Selectores
  const misCasosActivosSelector = useSelector(store => store.casos.misCasosActivos)
  const casosResueltosSelector = useSelector(store => store.casos.casosResueltos)
  const recursosHumanosSelector = useSelector(store => store.recursosHumanos.busquedaPersonal)

  //Columnas
  const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState([])
  const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState([])
  const [columnasRrhh, setColumnasRrhh] = React.useState([])

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
      if (misCasosActivosSelector.length > 0 && llamadaMisCasosActivos === true) {
        setMisCasosActivos(misCasosActivosSelector)
        setColumnasMisCasosActivos(COLUMNASMCA)
      } else if (llamadaMisCasosActivos === false) {
        setColumnasMisCasosActivos(COLUMNASMCA)
        obtenerMisCasosA()
        setLlamadaMisCasosActivos(true)
      }
    }

    if (casosResueltos.length === 0) {
      if (casosResueltosSelector.length > 0 && llamadaCasosResueltos === true) {
        setCasosResueltos(casosResueltosSelector)
        setColumnasCasosResueltos(COLUMNASCR)
      } else if (llamadaCasosResueltos === false) {
        obtenerCasosResueltos()
        setColumnasCasosResueltos(COLUMNASCR)
        setLlamadaCasosResueltos(true)
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

  }, [misCasosActivosSelector, casosResueltosSelector, recursosHumanosSelector]);

  console.log("state: ", casosResueltos)

  const obtenerPersonal = () => {
    dispatch(consultaFETCHbusquedaPersonal())
  }

  const obtenerCasosResueltos = () => {
    dispatch(consultaFETCHcasosResueltos())
  }

  const obtenerMisCasosA = () => {
    dispatch(consultaFETCHmisCasosActivos())
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

      </div>

      {/* <div className="bg-green d-flex justify-content-center pad-icon">
        <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
      </div> */}

      <div className="row pb-5">
        <div className="col-sm-7 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Mis Casos Activos</h6>
              <hr className="hr-width hr-principal" />
            </div>
            <div className="card pad borde-none">
              <div className="">
                {misCasosActivos.length > 0 ? (<Tabla lineas={misCasosActivos} columnas={columnasMisCasosActivos} titulo={'Mis-Casos-Activos'} header={false} />) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-5 p-2 mt-3">
          <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
            <div>
              <h6 className="fw-bolder">Casos Resueltos</h6>
              <hr className="hr-width hr-principal" />
            </div>
            <div className="card pad borde-none">
              <div className="lista-header color-header pad">
                {casosResueltos.length > 0 ? (<Tabla lineas={casosResueltos} columnas={columnasCasosResueltos} titulo={'Casos-Resueltos'} header={false} />) : null}
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
      </div>
    </animated.div>
  );
};

export default withRouter(Inicio);
