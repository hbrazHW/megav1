import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const Legales = () => {
  return (
    <div>
      <div className="modal-dialog modal-dialog-centered modal-xl shadow-lg p-3 mb-5 bg-body rounded">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-8 card shadow p-3 mb-5 bg-body rounded w-100 mb-4">
                <h6 className="fw-bolder">Crear Documento Legal</h6>
                <hr className="hr-width hr-principal" />
              </div>
            </div>
            <form>
              <div className="row w-auto d-flex justify-content-center">
                <h6 className="fw-bolder">Ficha</h6>
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
                        placeholder="Nombre del autor..."
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-4 col-md-12">
                    <div className="mb-2 p-2">
                      <label className="form-label fw-bolder lbl-precalificacion required">
                        Fecha de Recepción
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="form-control requerido"
                        placeholder="Elegir fecha..."
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-12">
                    <div className="mb-2 p-2">
                      <label className="form-label fw-bolder lbl-precalificacion">
                        Fecha de modificación
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control desabilitado"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-12">
                    <div className="mb-2 p-2">
                      <label className="form-label fw-bolder lbl-precalificacion">
                        Fecha de Creación
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control desabilitado"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-12">
                    <div className="mb-2 p-2">
                      <label className="form-label fw-bolder lbl-precalificacion required">
                        Descripción del Documeto
                      </label>
                      <Select
                        type="select"
                        id="select"
                        name="descripcion"
                        className="basic multi-select requerido"
                        classNamePrefix="select"
                        required
                      ></Select>
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
                    <div className="col-sm-4 col-md-12">
                      <div className="mb-2 p-2">
                        <label className="form-label fw-bolder lbl-precalificacion required">
                          Sede
                        </label>
                        <input
                          type="search"
                          id="search"
                          name="sede"
                          className="form-control requerido"
                          required
                        />
                      </div>
                      <div className="mb-2 p-2">
                        <label className="form-label fw-bolder lbl-precalificacion ">
                          Razón para el estado
                        </label>
                        <input
                          type="hidden"
                          id="razon"
                          name="razon"
                          className="form"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row  d-flex ">
                  <h6 className="form-label fw-bolder lbl-precalificacion ">
                    Observaciones
                  </h6>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <textarea
                        className="form-control mt-2"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        // onChange={e => setDescripcion(e.target.value)}
                        // value={descripcion}
                        placeholder="comentanos un poco más..."
                      ></textarea>
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="custom-input-file drag-area col-12 mt-4">
                    <div class="drag-area">
                      <input
                        type="file"
                        className="fw-bolder input-file "
                        name="file"
                        id="adjunto"
                        // onChange={changeHandler}
                        multiple
                      />
                    </div>
                    <div className="col-5 text-end text-dark fw-bolder">
                      <button
                        className="btn border-0"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <FontAwesomeIcon
                          icon={faCloudUploadAlt}
                          className="fs-2 text-dark upload-file"
                        />
                      </button>
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
        </div>
      </div>
    </div>
  );
};

export default Legales;
