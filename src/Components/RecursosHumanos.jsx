import React from "react";
import Select from "react-select";
import { useSpring, animated } from "react-spring";

const RecursosHumanos = () => {

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link fw-bolder text-dark active" id="busqueda-tab" data-bs-toggle="tab" data-bs-target="#busqueda" type="button" role="tab" aria-controls="busqueda" aria-selected="true">
                Busqueda de personal
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
              <div className="col-sm-4 col-md-12">
                <div className="mb-2 p-2">
                  <label className="form-label fw-bolder lbl-precalificacion required">
                    Puesto a cubrir
                  </label>
                  <Select
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

                      />
                      No
                    </label>
                    <input
                      type="radio"
                      name="personacargo"
                      value="Si"
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

            </div>

            <div className="tab-pane fade show p-3" id="evaluacion" role="tabpanel" aria-labelledby="evaluacion-tab">
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

              {/* <div className="col-sm-4 col-md-12">
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
              {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

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
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default RecursosHumanos;
