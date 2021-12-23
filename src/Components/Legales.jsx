import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import { obtenerLegales } from "../Redux/DocumentosLegales";
import { useDispatch, useSelector } from "react-redux";


const Legales = () => {
  const dispatch = useDispatch();

  //const legales
  const [autor, setAutor] = React.useState([])
  const [llamadaAutor, setLlamadaAutor] = React.useState(false)
  const [selectAutor, setSelectAutor] = React.useState([]);
  const autorSelector = useSelector(store => store.autor.autor)
  const [autorSeleccionar, SetAutorSeleccionar] = React.useState("");

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

    if (autor.length === 0) {
      if (autorSelector.length > 0 && llamadaAutor === true) {
        setAutor(autorSelector);
        completarOpcionAutor(autorSelector);
      } else if (llamadaAutor === false) {
        obtenerAutores();
        setLlamadaAutor(true);
      }
    }

 

  }, [autorSelector]);


  const obtenerAutores = () => {
    dispatch(obtenerLegales())
  }


  const completarOpcionAutor = (autor) => {
    const aut = [];
    autor.forEach((item) => {
      var a = { value: item.createdby, label: item.createdby};
      autor.push(a);
    });
    setSelectAutor(aut);
  };

 console.log("autor", autor)

  const autorHandle = (valor) => {
    SetAutorSeleccionar(valor.value);
  };

  return (

    
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">

          <div className="row">
            <div className="m-2">
              <h4 className="fw-bolder text-center">Crear Documento Legal</h4>

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
                         type="select"
                         id="select"
                         name="autor"
                         onChange={(e) => autorHandle(e)}
                         options={selectAutor}
                         name="colors"
                         className="basic multi-select requerido"
                         classNamePrefix="select"
                         placeholder="Elegir autor..."
                         required

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
      </div>
    </animated.div>

  );
};

export default Legales;
