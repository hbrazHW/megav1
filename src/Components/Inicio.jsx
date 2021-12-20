import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { consultaFETCHcasosResueltos, consultaFETCHmisCasosActivos } from "../Redux/Casos";
import {obtenerLegales} from "../Redux/DocumentosLegales"
import Tabla from '../Components/Tabla'
import { COLUMNASMCA } from '../Tables/ColumnasMCA'
import { COLUMNASCR } from '../Tables/ColumnasCR'
import { COLUMNASLEGALES } from "../Tables/ColumnasLegales"


const Inicio = () => {
  //Constantes
  const dispatch = useDispatch();

  //Hooks
  const [misCasosActivos, setMisCasosActivos] = React.useState([])
  const [llamadaMisCasosActivos, setLlamadaMisCasosActivos] = React.useState(false)
  const [casosResueltos, setCasosResueltos] = React.useState([])
  const [llamadaCasosResueltos, setLlamadaCasosResueltos] = React.useState(false)
  const [legales, setLegales] = React.useState([]);
  const [llamadaLegales, setlLlmadaLegales] = React.useState(false);
  
  //Selectores
  const misCasosActivosSelector = useSelector(store => store.casos.misCasosActivos)
  const casosResueltosSelector = useSelector(store => store.casos.casosResueltos)
  const legalesSelector = useSelector((store) => store.legales.legales)

  //Columnas
  const [columnasMisCasosActivos, setColumnasMisCasosActivos] = React.useState([])
  const [columnasCasosResueltos, setColumnasCasosResueltos] = React.useState([])
  const [columnasLegales, setColumnasLegales] = React.useState([])

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

    //legales 
    if (legales.length === 0) {
      if (legalesSelector.length > 0 && llamadaLegales === true) {
        setLegales(legalesSelector);
        setColumnasLegales(COLUMNASLEGALES)
      } else if (llamadaLegales === false) {
        obtenerlegal();
        setColumnasLegales(COLUMNASLEGALES)
        setlLlmadaLegales(true);
      }
    }



  }, [misCasosActivosSelector, casosResueltosSelector, legalesSelector ]);


  const obtenerCasosResueltos = () => {
    dispatch(consultaFETCHcasosResueltos())
  }

  const obtenerMisCasosA = () => {
    dispatch(consultaFETCHmisCasosActivos())
  }

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
                {misCasosActivos.length > 0 ? (<Tabla lineas={misCasosActivos} columnas={columnasMisCasosActivos} titulo={'Mis-Casos-Activos'} header={false} />) : null}
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
                {casosResueltos.length > 0 ? (<Tabla lineas={casosResueltos} columnas={columnasCasosResueltos} titulo={'Casos-Resueltos'} header={false} />) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="col-sm-12">
        <div className="card shadow borde-none pad  mb-4 pt-3 pb-3">
          <div className="col-sm-12 m-0">
            <span className="separador-titulo float-start m-0"></span>
            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 ">
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
                {legales.length > 0 ? (<Tabla lineas={legales} columnas={columnasLegales} titulo={'legales'} header={false} />) : null}
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
          <div className="card shadow borde-none pad  mb-4 pt-3 pb-3">
            <div className="col-sm-12 m-0">
              <span className="separador-titulo float-start m-0"></span>
              <p className="pt-2 mx-2 pb-2 fw-bolder m-0 ">
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
      </div>
    </animated.div>
  );
};

export default withRouter(Inicio);
