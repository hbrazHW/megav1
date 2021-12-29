import React from "react";
import Select from "react-select";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHpuesto, consultaFETCHareas, consultaFETCHsedesRH, consultaFETCHautorizadoPor, cargarForm, consultaFETCHbusquedaPersonal } from "../Redux/RecursosHumanos";
import { Toast, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle, faTimesCircle, faEnvelope, faClipboardList, faCircle } from '@fortawesome/free-solid-svg-icons'
import { withRouter, NavLink } from 'react-router-dom'

const RecursosHumanos = (props) => {
  const dispatch = useDispatch();

  const [puesto, setPuesto] = React.useState([])
  const [llamadaPuesto, setLlamadaPuesto] = React.useState(false)
  const puestoSelector = useSelector(store => store.recursosHumanos.puesto)
  const [selecPuesto, setSelectPuesto] = React.useState([])

  const [areas, setAreas] = React.useState([])
  const [llamadaAreas, setLlamadaAreas] = React.useState(false)
  const areasSelector = useSelector(store => store.recursosHumanos.areas)
  const [selectArea, setSelectArea] = React.useState([])

  const [sucursales, setSucursales] = React.useState([])
  const [llamadaSucursales, setLlamadasSucursales] = React.useState(false)
  const sucursalesSelector = useSelector(store => store.recursosHumanos.sucursales)
  const [selectSucursal, setSelectSucursal] = React.useState([])

  const [autorizado, setAutorizado] = React.useState([])
  const [llamadaAutorizado, setLlamadaAutorizado] = React.useState(false)
  const autorizadoSelector = useSelector(store => store.recursosHumanos.autorizadoPor)
  const [selectAutorizado, setSelectAutorizado] = React.useState([])

  const [puestoSeleccionar, setPuestoSeleccionar] = React.useState('')
  const [mBusqueda, setMbusquedaSeleccionar] = React.useState('')
  const [tipBusqueda, setTipBusqueda] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [personaAcargo, setPersonaAcargo] = React.useState('')
  const [jornada, setJornada] = React.useState('')
  const [observaciones, setObservaciones] = React.useState('')
  const [areaSeleccionar, setAreaSeleccionar] = React.useState('')
  const [sucursalSeleccionar, setSucursalSeleccionar] = React.useState('')
  const [autorizadoSeleccionar, setAutorizadoSeleccionar] = React.useState('')
  const [reporta, setReportaSeleccionar] = React.useState('')

  const [mensaje, setMensaje] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(false)
  const resultado = useSelector(store => store.recursosHumanos.resultadoCaso)

  React.useEffect(() => {
    if (puesto.length === 0) {
      if (puestoSelector.length > 0 && llamadaPuesto === true) {
        setPuesto(puestoSelector)
        completarOpcionPuesto(puestoSelector)
      } else if (llamadaPuesto === false) {
        setLlamadaPuesto(true)
        obtenerPuesto()
      }
    }

    if (areas.length === 0) {
      if (areasSelector.length > 0 && llamadaAreas === true) {
        setAreas(areasSelector)
        completarOpcionAreas(areasSelector)
      } else if (llamadaAreas === false) {
        setLlamadaAreas(true)
        obtenerArea()
      }
    }

    if (sucursales.length === 0) {
      if (sucursalesSelector.length > 0 && llamadaSucursales === true) {
        setSucursales(sucursalesSelector)
        completarOpcionSedes(sucursalesSelector)
      } else if (llamadaSucursales === false) {
        setLlamadasSucursales(true)
        obtenerSucursales()
      }
    }

    if (autorizado.length === 0) {
      if (autorizadoSelector.length > 0 && llamadaAutorizado === true) {
        setAutorizado(autorizadoSelector)
        completarOpcionAutorizado(autorizadoSelector)
      } else if (llamadaAutorizado === false) {
        setLlamadaAutorizado(true)
        obtenerAutorizado()
      }
    }

    if (resultado !== undefined) {
      if (resultado !== '') {
        cargaExito()
        
      }
    }

  }, [puestoSelector, areasSelector, sucursalesSelector, autorizadoSelector, resultado])


  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  const enviarFormulario = (e) => {
    e.preventDefault()
    dispatch(cargarForm(puestoSeleccionar, mBusqueda, descripcion, sucursalSeleccionar, areaSeleccionar, reporta, jornada, observaciones, tipBusqueda, autorizadoSeleccionar))
    setLoading(true)
    setMensaje("Cargando...")
    setShow(true)
    limpiarForm()
  }

  const limpiarForm = () => {
    setPuestoSeleccionar('')
    setMbusquedaSeleccionar('')
    setTipBusqueda('')
    setDescripcion('')
    setPersonaAcargo('')
    setJornada('')
    setObservaciones('')
    setAreaSeleccionar('')
    setSucursalSeleccionar('')
    setAutorizadoSeleccionar('')
    setReportaSeleccionar('')
  }

  const cargaExito = () => {
    if (resultado === "EXITO") {
      setMensaje("La búsqueda fue creada con éxito!")
      setError(false)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        obtenerBusquedaPersonal()
        props.history.push('/')
      }, 500);
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
    else if (resultado === "ERROR") {
      setMensaje("Error al crear búsqueda!")
      setError(true)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }
  }

  const obtenerBusquedaPersonal = () => {
    dispatch(consultaFETCHbusquedaPersonal())
  }

  const obtenerAutorizado = () => {
    dispatch(consultaFETCHautorizadoPor())
  }
  const obtenerSucursales = () => {
    dispatch(consultaFETCHsedesRH())
  }
  const obtenerArea = () => {
    dispatch(consultaFETCHareas())
  }
  const obtenerPuesto = () => {
    dispatch(consultaFETCHpuesto())
  }

  const completarOpcionPuesto = (puesto) => {
    const puest = [];
    puesto.forEach((item) => {
      var p = { value: item.new_cargoid, label: item.new_name };
      puest.push(p);
    });
    setSelectPuesto(puest);
  };
  const completarOpcionAreas = (areas) => {
    const area = [];
    areas.forEach((item) => {
      var a = { value: item.new_areaid, label: item.new_name };
      area.push(a);
    });
    setSelectArea(area);
  };
  const completarOpcionSedes = (sedes) => {
    const sucu = [];
    sedes.forEach((item) => {
      var s = { value: item.accountid, label: item.name };
      sucu.push(s);
    });
    setSelectSucursal(sucu);
  };
  const completarOpcionAutorizado = (aut) => {
    const autorizado = [];
    aut.forEach((item) => {
      var a = { value: item.contactid, label: item.fullname };
      autorizado.push(a);
    });
    setSelectAutorizado(autorizado);
  };

  const reportaHandle = (valor) => {
    setReportaSeleccionar(valor.value)
  }
  const autorizadoHandle = (valor) => {
    setAutorizadoSeleccionar(valor.value)
  }
  const puestoHandle = (valor) => {
    setPuestoSeleccionar(valor.value)
  }
  const motivoBusquedaHandle = (valor) => {
    setMbusquedaSeleccionar(valor.value)
  }
  const tipoBusquedaHandle = (valor) => {
    setTipBusqueda(valor.value)
  }
  const areaHandle = (valor) => {
    setAreaSeleccionar(valor.value)
  }
  const sedeHandle = (valor) => {
    setSucursalSeleccionar(valor.value)
  }

  const motivoBusqueda = [
    { value: '100000000', label: 'Nuevo Puesto' },
    { value: '100000001', label: 'Reemplazo' },
  ]

  const tipoBusqueda = [
    { value: '100000000', label: 'Interna' },
    { value: '100000001', label: 'Externa' },
    { value: '100000002', label: 'Interna/Externa' },
  ]

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link fw-bolder text-dark active" id="busqueda-tab" data-bs-toggle="tab" data-bs-target="#busqueda" type="button" role="tab" aria-controls="busqueda" aria-selected="true">
                Crear Busqueda de personal
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link fw-bolder text-dark" id="evaluacion-tab" data-bs-toggle="tab" data-bs-target="#evaluacion" type="button" role="tab" aria-controls="evaluacion" aria-selected="false">
                Evaluación periodo de prueba
              </button>
            </li> */}
          </ul>

          <div className="tab-content">


            <div className="tab-pane fade show active p-3" id="busqueda" role="tabpanel" aria-labelledby="busqueda-tab">
              <form onSubmit={enviarFormulario}>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Puesto a cubrir
                    </label>
                    <Select
                      onChange={e => puestoHandle(e)}
                      options={selecPuesto}
                      type="select"
                      id="select"
                      name="puestoAC"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir puesto"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Motivo de búsqueda
                    </label>
                    <Select
                      onChange={e => motivoBusquedaHandle(e)}
                      options={motivoBusqueda}
                      type="select"
                      id="select"
                      name="motbusq"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir motivo de búsqueda"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Tipo de búsqueda
                    </label>
                    <Select
                      onChange={e => tipoBusquedaHandle(e)}
                      options={tipoBusqueda}
                      type="select"
                      id="select"
                      name="tipobusq"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir Tipo de búsqueda"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Autorizado por
                    </label>
                    <Select
                      onChange={e => autorizadoHandle(e)}
                      options={selectAutorizado}
                      type="select"
                      id="select"
                      name="autpor"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir responsable..."
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Motivo del reemplazo
                    </label>
                    <textarea
                      onChange={e => setDescripcion(e.target.value)}
                      value={descripcion}
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="comentanos un poco más..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Sucursal
                    </label>
                    <Select
                      onChange={e => sedeHandle(e)}
                      options={selectSucursal}
                      type="select"
                      id="select"
                      name="sucursal"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir sucursal..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Area
                    </label>
                    <Select
                      onChange={e => areaHandle(e)}
                      options={selectArea}
                      type="select"
                      id="select"
                      name="area"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir Area..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Reporta a
                    </label>
                    <Select
                      onChange={e => reportaHandle(e)}
                      options={selectAutorizado}
                      type="select"
                      id="select"
                      name="reporA"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir responsable..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Personas a cargo
                    </label>
                    <label className="radio">
                      {" "}
                      <label label="radio" className="me-2">
                        {" "}
                        <input
                          type="radio"
                          name="personacargo"
                          value="No"
                          onClick={() => setPersonaAcargo('no')}
                        />
                        No
                      </label>
                      <input
                        type="radio"
                        name="personacargo"
                        value="Si"
                        onClick={() => setPersonaAcargo('si')}
                      />
                      Si
                    </label>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Jornada de Trabajo
                    </label>
                    <input
                      onChange={e => setJornada(e.target.value)}
                      value={jornada}
                      type="text"
                      id="text"
                      name="jtrabajo"
                      className="form-control"
                      placeholder="Cuáles son los dias y horarios de trabajo?"
                      required
                    />
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Observaciones/ requisitos del puesto
                    </label>
                    <textarea
                      onChange={e => setObservaciones(e.target.value)}
                      value={observaciones}
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      placeholder="comentanos un poco más..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="d-flex align-items-end justify-content-end">
                  <button
                    type="submit"
                    name="btnSubmitAlyc"
                    className="btn btn-secondary"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
                <Toast className="half-black" show={show} autohide color="lime">
                  <Toast.Body className="text-white">
                    <div className="row p-2">
                      {
                        loading ?
                          <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                          :
                          <div className="col-1 mx-2">
                            {error ? <FontAwesomeIcon icon={faTimesCircle} className="fs-3 upload-file atras" color="#dc3545" /> : <FontAwesomeIcon icon={faCheckCircle} className="fs-3 upload-file atras" color="#198754" />}
                          </div>
                      }

                      <div className="col-10 mt-1 ml-5">
                        {mensaje}
                      </div>
                    </div>
                  </Toast.Body>
                </Toast>
              </div>
            </div>
            {/* <div className="tab-pane fade show p-3" id="evaluacion" role="tabpanel" aria-labelledby="evaluacion-tab">
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    Empleado
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="empleado"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir empleado"
                    required
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    Puesto
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="puesto"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir puesto"
                    required
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Fecha de ingreso
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="fingre"
                    className="form-control"
                    classNamePrefix="select"
                  />
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Sucursal
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="sucursal"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir sucursal..."
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Area
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="area"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir area..."
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Referente
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="referente"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir referente..."
                    required
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Puesto del evaluador
                  </label>
                  <Select
                    type="select"
                    id="select"
                    name="peva"
                    className="basic multi-select"
                    classNamePrefix="select"
                    placeholder="Elegir puesto del evaluador..."
                  ></Select>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion">
                    Fecha de creación
                  </label>
                  <input
                    type="datetime-local"
                    id="dtlocal"
                    name="fechahora"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    Es referido?
                  </label>
                  <label className="radio">
                    {" "}
                    <input
                      type="radio"
                      name="personacargo"
                      value="Si"
                    />
                    Si
                  </label>
                  <label label="radio">
                    {" "}
                    <input
                      type="radio"
                      name="personacargo"
                      value="No"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    El Empleado participo del curso de Induccion?
                  </label>
                  <label className="radio">
                    {" "}
                    <input
                      type="radio"
                      name="personacargo"
                      value="Si"
                    />
                    Si
                  </label>
                  <label label="radio">
                    {" "}
                    <input
                      type="radio"
                      name="personacargo"
                      value="No"
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="text"
                    name="jtrabajo"
                    className="form-control"
                    placeholder="Evaluación de periodo de prueba"
                    required
                  />
                </div>
              </div>
              <hr />
              <h6 className="fw-bolder">
                Completar segun la Performance alcanzada
              </h6>
              <div className="row">
                <h6 className="mt-3 ms-3 fw-bolder text-secondary">Comentarios</h6>
              </div>
              <div className="row">
                <div className="col-sm-2 p-5">
                  <h6 className="fw-bolder">30 dias:</h6>
                </div>
                <div className="col-sm-10">
                  <div class="form-group">
                    <textarea
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="comentanos un poco más los resultado del 1er. Mes (30 dias).."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 p-5">
                  <h6 className="fw-bolder">60 dias:</h6>
                </div>
                <div className="col-sm-10">
                  <div class="form-group">
                    <textarea
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="comentanos un poco más los resultado del 2do. Mes (60 dias).."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 p-5">
                  <h6 className="fw-bolder">80 dias:</h6>
                </div>
                <div className="col-sm-10">
                  <div class="form-group">
                    <textarea
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="comentanos un poco más los resultado del 3er. Mes (80 dias).."
                    ></textarea>
                  </div>
                </div>
              </div>
              <br />
              <h6 className="mt-3 ms-3 fw-bolder text-secondary">
                Definicion de Continuidad
              </h6>
              <div className="row">
                <div className="col-sm-2 p-3">
                  <h6 className="ms-3 fw-bolder">
                    Pasa Periodo de Prueba?
                  </h6>
                </div>
                <div className="col-sm-10 p-3">
                  <div class="form-group">
                    <Select
                      type="select"
                      id="select"
                      name="peva"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Seleccionar..."
                    ></Select>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default withRouter(RecursosHumanos);