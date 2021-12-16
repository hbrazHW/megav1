import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { obtenerCliente } from "../Redux/ClienteCaso";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { obtenerAsunto } from "../Redux/AsuntoCaso";

const Casos = () => {
  const dispatch = useDispatch();

  //const
  const [cliente, setCliente] = React.useState([]);
  const [llamadaCliente, setlLlmadaCliente] = React.useState(false);
  const [selectCliente, setSelectCliente] = React.useState([]);
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");

  const [asunto, setAsunto] = React.useState([]);
  const [llamadaAsunto, SetLlamadaAsunto] = React.useState(false);
  const [selectAsunto, setSelectAsunto] = React.useState([]);
  const [asutoSeleccionar, setAsuntoSeleccionar] = React.useState("");
  //reducers

  const clienteSelector = useSelector((store) => store.cliente.cliente);
  const asuntoSelector = useSelector((store) => store.asunto.asunto);
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
    if (cliente.length === 0) {
      if (clienteSelector.length > 0 && llamadaCliente === true) {
        setCliente(clienteSelector);
        completarOpcionCliente(clienteSelector);
      } else if (llamadaCliente === false) {
        obtenerclient();
        setlLlmadaCliente(true);
      }
    }
    //campo lookup asunto
    if (asunto.length === 0) {
      if (asuntoSelector.length > 0 && llamadaAsunto === true) {
        setAsunto(asuntoSelector);
        completarOpcionAsunto(asuntoSelector);
      } else if (llamadaAsunto === false) {
        obtenerasunt();
        SetLlamadaAsunto(true);
      }
    }
  }, [clienteSelector, asuntoSelector]);

  const obtenerclient = () => {
    dispatch(obtenerCliente());
  };

  const obtenerasunt = () => {
    dispatch(obtenerAsunto());
  };

  const completarOpcionCliente = (cliente) => {
    const client = [];
    cliente.forEach((item) => {
      var c = { value: item.contact, label: item._new_cliente_value };
      client.push(c);
    });
    setSelectCliente(client);
  };

  const completarOpcionAsunto = (asunto) => {
    const asunt = [];
    asunto.forEach((item) => {
      var a = { value: item.title, label: item.title};
      asunt.push(a)

    });
    setSelectAsunto(asunto);
  };



  console.log(clienteSeleccionar);

  const clienteHandle = (valor) => {
    SetClienteSeleccionar(valor.value);
  };


  const asuntoHandle = (valor) => {
    setAsuntoSeleccionar(valor.value);
  };

  return (
    <animated.div>
      <div>
        <div>
          <div className="modal-dialog modal-dialog-centered modal-xl shadow-lg p-3 mb-5 bg-body rounded">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row">
                  <div className="col-8 card shadow p-3 mb-5 bg-body rounded w-100 mb-4">
                    <h6 className="fw-bolder">General</h6>
                    <hr className="hr-width hr-principal" />
                  </div>
                </div>
                <form>
                  <div className="row w-auto d-flex justify-content-center">
                    <h6 className="fw-bolder">Información general</h6>
                    <div className="row">
                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Fecha Alta
                          </label>
                          <input
                            type="datetime-local"
                            id="date"
                            name="altar"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-sm-4 col-md-12">
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Cliente
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="cliente"
                            onChange={(e) => clienteHandle(e)}
                            options={selectCliente}
                            name="colors"
                            name="cliente"
                            name="colors"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir cliente..."
                            required
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Sede
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="Sucursal"
                            name="sucursal"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir sucursal..."
                            required
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Asunto Primario
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="asuntoprima"
                            name="asunto-prima"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir asunto primario..."
                            required
                          ></Select>
                        </div>

                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion required">
                            Asunto
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="asunto"
                            name="asunto"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir asunto..."
                            required
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Estado
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="estado"
                            name="estado"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir estado..."
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Tipo de caso
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="tcaso"
                            name="tcaso"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="..."
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Solicitante
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="solicitante"
                            name="solicitante"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir solicitante..."
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion">
                            Puesto del solicitante
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="psol"
                            name="psol"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir puesto..."
                          ></Select>
                        </div>
                        <div className="mb-2 p-2">
                          <label className="form-label fw-bolder lbl-precalificacion ">
                            Area a escalar
                          </label>
                          <Select
                            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                            id="aescala"
                            name="aescala"
                            className="basic multi-select"
                            ClassNamePrefix="select"
                            placeholder="Elegir area a escalar..."
                          ></Select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <h6 className="form-label fw-bolder lbl-precalificacion ">
                        Comentarios
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-12 w-100">
                        <div class="form-group">
                          <textarea
                            className="form-control mt-2"
                            id="exampleFormControlTextarea1"
                            rows="3"
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
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Casos;
