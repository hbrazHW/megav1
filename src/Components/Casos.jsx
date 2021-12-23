import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { obtenerCliente } from "../Redux/ClienteCaso";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { obtenerAsunto } from "../Redux/AsuntoCaso";
import { consultaFETCHcontacts } from "../Redux/Contact";
import { consultaFETCHcuentas } from "../Redux/RecursosHumanos";
import { consultaFETCHnombresAsuntos } from "../Redux/Casos";

const Casos = () => {
  const dispatch = useDispatch();

  //hooks
  const [contacts, setContacts] = React.useState([])
  const [llamada, setLlamada] = React.useState(false)
  const [selectCliente, setSelectCliente] = React.useState([]);
  const contactSelector = useSelector(store => store.contacts.contacts)
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");

  const [sucursal, setSucursal] = React.useState([])
  const [llamadaSucu, setLlamadaSucu] = React.useState(false)
  const sucursalSelector = useSelector(store => store.recursosHumanos.cuentas)
  const [selectSucu, setSelectSucu] = React.useState([]);
  const [sucursalSeleccionar, SetSucursalSeleccionar] = React.useState("");

  const [asuntos, setAsuntos] = React.useState([])
  const [llamadaAsuntos, setLlamadaAsuntos] = React.useState(false)
  const asuntosSelector = useSelector(store => store.casos.asuntos)
  const [selectAsunto, setSelectAsunto] = React.useState([]);
  const [asuntoSeleccionar, setAsuntoSeleccionar] = React.useState("");
  //----------------------
  const [selected, setSelected] = React.useState("")

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  // const handlePaste = (e) => {
  //   const value = e.clipboardData.files[0];
  // }

  React.useEffect(() => {

    if (contacts.length === 0) {
      if (contactSelector.length > 0 && llamada === true) {
        setContacts(contactSelector);
        completarOpcionCliente(contactSelector);
      } else if (llamada === false) {
        obtenerContactos();
        setLlamada(true);
      }
    }

    if (sucursal.length === 0) {
      if (sucursalSelector.length > 0 && llamadaSucu === true) {
        setSucursal(sucursalSelector);
        completarOpcionSede(sucursalSelector);
      } else if (llamadaSucu === false) {
        obtenerCuentas();
        setLlamadaSucu(true);
      }
    }

    if (asuntos.length === 0) {
      if (asuntosSelector.length > 0 && llamadaAsuntos === true) {
        setAsuntos(asuntosSelector);
        completarOpcionAsunto(asuntosSelector);
      } else if (llamadaAsuntos === false) {
        obtenerAsuntos();
        setLlamadaAsuntos(true);
      }
    }

  }, [contactSelector, sucursalSelector]);

  

  const obtenerAsuntos = () => {
    dispatch(consultaFETCHnombresAsuntos())
  }

  const obtenerCuentas = () => {
    dispatch(consultaFETCHcuentas())
  }

  const obtenerContactos = () => {
    dispatch(consultaFETCHcontacts())
  }

  //handle del select de asuntos


  // const selectOnChange = (event) => {
  //   setSelected(event.target.value)
  // }

  // const valueInput = '' //completar con las opciones

  // let opcionesAsunto = null
  // let input = null

  // if(selected === 'opcion1'){
  //   opcionesAsunto = ''
  // } else if (selected === 'opcion2'){
  //   opcionesAsunto = valueInput
  // } else if (selected === 'opcion3'){
  //   opcionesAsunto = ''
  // }

  // if(opcionesAsunto){
  //   input = <input className="form-control" value={valueInput} />
  // }

  //----------------------------

  const completarOpcionCliente = (cliente) => {
    const client = [];
    cliente.forEach((item) => {
      var c = { value: item.contactid, label: item.fullname };
      client.push(c);
    });
    setSelectCliente(client);
  };

  const completarOpcionSede = (sede) => {
    const sucursal = [];
    sede.forEach((item) => {
      var a = { value: item.accountid, label: item.name };
      sucursal.push(a)

    });
    setSelectSucu(sucursal);
  };

  const completarOpcionAsunto = (asunto) => {
    const asunt = [];
    asunto.forEach((item) => {
      var a = { value: item.subjectid, label: item.title };
      asunt.push(a)

    });
    setSelectAsunto(asunt);
  };

  const asuntoHandle = (valor) => {
    setAsuntoSeleccionar(valor.value)
  }

  const clienteHandle = (valor) => {
    SetClienteSeleccionar(valor.value);
  };

  const sucuHandle = (valor) => {
    SetSucursalSeleccionar(valor.value);
  };

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">

          <div className="row">
            <div className="m-2">
              <h4 className="fw-bolder text-center">Crear Nuevo Caso</h4>

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
                      onChange={(e) => sucuHandle(e)}
                      options={selectSucu}
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
                      onChange={(e) => asuntoHandle(e)}
                      options={selectAsunto}
                      name="asunto"
                      className="basic multi-select"
                      ClassNamePrefix="select"
                      placeholder="Elegir asunto..."
                      required
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
              {/* <div className="row">
                <div className="custom-input-file drag-area mt-4">
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
              </div> */}
            </div>
            <div className="col-sm-6">

              <div class="input-group ms-3 mb-3">
                <input type="file" className="form-control" id="inputGroupFile02"  />
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
      </div>
    </animated.div>
  );
};

export default Casos;
