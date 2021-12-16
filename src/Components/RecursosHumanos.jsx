import React from "react";
import Select from "react-select";

const RecursosHumanos = () => {
  return (
    <div>
      <div className="modal-dialog modal-dialog-centered modal-xl shadow-lg p-3 mb-5 bg-body rounded">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link fw-bolder text-dark active"
                    id="bp-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bp"
                    type="button"
                    role="tab"
                    aria-controls="bp"
                    aria-selected="true"
                  >
                    Búsqueda de personal
                  </button>
                </li>
                {/* <li class="nav-item">
                  <button
                    className="nav-link fw-bolder text-dark"
                    id="ep-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ep"
                    type="button"
                    role="tab"
                    aria-controls="ep"
                    aria-selected="false"
                  >
                    Evaluación de período de prueba
                  </button>
                </li> */}
                {/* <li class="nav-item">
                  <button
                    className="nav-link fw-bolder text-dark"
                    id="pa-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pa"
                    type="button"
                    role="tab"
                    aria-controls="pa"
                    aria-selected="false"
                  >
                    Performance Alcanzada
                  </button>
                </li> */}
                {/* <li class="nav-item">
                  <button
                    className="nav-link fw-bolder text-dark"
                    id="df-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#df"
                    type="button"
                    role="tab"
                    aria-controls="df"
                    aria-selected="false"
                  >
                    Definición de continuidad
                  </button>
                </li> */}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="bp"
                  role="tabpanel"
                  aria-labelledby="bp-tab"
                >
                  <form>
                    <br />
                    <div className="row w-auto d-flex justify-content-center">
                      <h6 className="fw-bolder">Crear</h6>
                      <hr className="hr-width hr-principal w-100" />
                      <div className="row">
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
                        
                      </div>
                    </div>
                    <button
                          type="submit"
                          name="btnSubmitAlyc"
                          className="btn btn-secondary btn-md mt-4 text-center block"
                        >
                          Crear
                        </button>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="ep"
                  role="tabpanel"
                  aria-labelledby="ep-tab"
                >
                  <form>
                    <br />
                    <div className="row w-auto d-flex justify-content-center">
                      <h6 className="fw-bolder">Detalle</h6>
                      <hr className="hr-width hr-principal w-100" />
                      <div className="row">
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
                              placeholder="Evaluación de ...?"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="pa"
                  role="tabpanel"
                  aria-labelledby="pa-tab"
                >
                  <br />
                  <div className="row w-auto d-flex justify-content-">
                    <h6 className="fw-bolder">
                      Completar segun la Performance alcanzada
                    </h6>
                    <hr className="hr-width hr-principal w-100" />
                    <div className="row">
                      <div className="col-sm-6">
                        <h6 className="item fw-bolder">Item a Evaluar</h6>
                      </div>
                      <div class="col-sm-2">
                        <h6 className="item fw-bolder">
                          Resultado 1er. Mes (30 dias)
                        </h6>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <h6 className="item fw-bolder">
                          Resultado 2do. Mes (60 dias)
                        </h6>
                      </div>
                      <div class="col-sm-2">
                        <h6 className="item fw-bolder">
                          Resultado 3er. Mes (80 dias)
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <a href="">
                          ¿Aplica el coaching de su líder para mejorar?
                        </a>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-sm-6">
                        <label></label>
                        <a href="" className="evaluacion-perfo">
                          ¿Cómo evaluaría su desempeño general?
                        </a>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <a href="">
                          ¿Como se desempeña en las tareas administrativas y
                          cumplimiento de procesos?
                        </a>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <a href="">
                          ¿Cumple con las tareas asignadas y sigue las pautas de
                          trabajo?
                        </a>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <a href="">
                          ¿Cumple con las tareas asignadas y sigue las pautas de
                          trabajo?
                        </a>
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                        <br />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-sm-2">
                        <input type="text" class="form-control" />
                      </div>
                    </div>

                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                          <a
                            class="page-link"
                            href="#"
                            tabindex="-1"
                            aria-disabled="true"
                          >
                            Anterior
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link" href="#">
                            Siguiente
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="df"
                  role="tabpanel"
                  aria-labelledby="df-tab"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-8 card shadow p-3 mb-5 bg-body rounded w-100 mb-4">
                            <h6 className="fw-bolder">Comentarios</h6>
                            <hr className="hr-width hr-principal" />
                          </div>
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
                        <div className="col-8 card shadow p-3 mb-5 bg-body rounded w-100 mb-4">
                          <h6 className="fw-bolder">
                            Definicion de Continuidad
                          </h6>
                          <hr className="hr-width hr-principal" />
                        </div>
                        <div className="row">
                          <div className="col-sm-2 p-3">
                            <h6 className="fw-bolder">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursosHumanos;
