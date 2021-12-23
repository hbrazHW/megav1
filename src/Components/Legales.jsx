import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";


const Legales = () => {

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  const opcionesDescripcionDocu = [
    { value: '100000000', label: 'CARTA DOCUMENTO' },
    { value: '100000001', label: 'TELEGRAMA' },
    { value: '100000002', label: 'CONTRATO' },
    { value: '100000003', label: 'DENUNCIA' },
    { value: '100000004', label: 'MANDAMIENTO DE INTIMACIÓN' },
    { value: '100000005', label: 'ACTA' },
    { value: '100000006', label: 'NOTA' },
    { value: '100000007', label: 'OTROS' },
    { value: '100000008', label: 'CÉDULA' },
    { value: '100000009', label: 'OFICIO' },
    { value: '100000010', label: 'DEMANDA ' },
]


  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">

          <div className="row">
            <div className="m-2">
              <h4 className="fw-bolder text-center">Crear Documento Legal</h4>

            </div>
          </div>

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
                    placeholder="---"
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
                    options={opcionesDescripcionDocu}
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
          </div>
          <div className="col-sm-6">

            <div class="input-group ms-3 mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" />
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
      </div>
    </animated.div>

  );
};

export default Legales;
