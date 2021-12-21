import React from "react";
import Select from "react-select";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import {obtenerAutor} from "../Redux/AutorLegales"

const Legales = () => {
  const dispatch = useDispatch();

  //hooks
  const [autor, setAutor] = React.useState([]);
  const [llamadaAutor, setlLlmadaAutor] = React.useState(false);
  const [selectAutor, setSelectAutor] = React.useState([]);
  const [autorSeleccionar, SetAutorSeleccionar] = React.useState("");


  //reducers
  const autorSelector = useSelector((store) => store.autor.autor)


  //



 
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  React.useEffect(() => {
    //debugger;
    if (autor.length === 0) {
      if (autorSelector.length > 0 && llamadaAutor === true) {
        setAutor(autorSelector);
        completarOpcionAutor(autorSelector);
      } else if (llamadaAutor === false) {
        obteneraut();
        setlLlmadaAutor(true);
      }
    }
  }, [autorSelector]);


  const obteneraut = () => {
    dispatch(obtenerAutor());
  };
 

  const completarOpcionAutor = (autor) => {
    const aut = [];
    autor.forEach((item) => {
      var a = { value: item._createdby_value, label: item._createdby_value };
      aut.push(a);
    });
    setSelectAutor(aut);
  };


  const autorHandle = (valor) => {
    SetAutorSeleccionar(valor.value);
  };
   

  console.log(autorSeleccionar);

  return (
    <animated.div>


    
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
                      <Select
                      type="text"
                      id="autor"
                      onChange={(e) => autorHandle(e)}
                      options={selectAutor}
                      name="autor"
                      className="basic multi-select"
                      required
                      disabled
                      ></Select>
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
                      <Select
                        type="select"
                        id="select"
                        name="personarep"
                        className="basic multi-select requerido"
                        classNamePrefix="select"
                        required
                      ></Select>
                    </div>
                    <div className="col-sm-4 col-md-12">
                      <div className="mb-2 p-2">
                        <label className="form-label fw-bolder lbl-precalificacion required">
                          Sede
                        </label>
                        <input
                        type="text"
                        id="autor"
                        // onChange={(e) => autorHandle(e)}
                        // options={selectAutor}
                        name="autor"
                        className="form-control requerido"
                        placeholder="---"
                        required
                        disabled
                      />
                      </div>
                      <div className="mb-2 p-2">
                        <label className="form-label fw-bolder lbl-precalificacion ">
                          Razón para el estado
                        </label>
                        <input
                          type="text"
                          id="razon"
                          name="razon"
                          className="form-control desabilitado"
                          placeholder="Sin recepcionar"
                          disabled
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
    </animated.div>
  );
};

export default Legales;
