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
import { obtenerContacto } from "../Redux/Contacto";

const Casos = () => {
  const dispatch = useDispatch();

  //hooks
  const [contacts, setContacts] = React.useState([])
  const [llamada, setLlamada] = React.useState(false)
  const [selectCliente, setSelectCliente] = React.useState([]);
  const contactSelector = useSelector(store => store.contacts.contacts)


  const [sucursal, setSucursal] = React.useState([])
  const [llamadaSucu, setLlamadaSucu] = React.useState(false)
  const sucursalSelector = useSelector(store => store.recursosHumanos.cuentas)
  const [selectSucu, setSelectSucu] = React.useState([]);

  const [asuntos, setAsuntos] = React.useState([])
  const [llamadaAsuntos, setLlamadaAsuntos] = React.useState(false)
  const asuntosSelector = useSelector(store => store.casos.asuntos)
  const [selectAsunto, setSelectAsunto] = React.useState([]);

  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const contactid = useSelector((store) => store.usuarios.contactid);
  //----------------------
  //datos para el post
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");
  const [sucursalSeleccionar, SetSucursalSeleccionar] = React.useState("");
  //hook del asuntoPrimario
  const [selected, setSelected] = React.useState("")
  //-----------------------
  const [asuntoSeleccionar, setAsuntoSeleccionar] = React.useState("");
  const [tipoC, setTipoC] = React.useState("")
  const [fecha, setFecha] = React.useState("")
  const [comentarios, setComentarios] = React.useState("")
  const [solicitante, setSolicitante] = React.useState("")

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

    if (contacts.length === 0) {
      if (contactSelector.length > 0 && llamada === true) {
        setContacts(contactSelector);
        completarOpcionCliente(contactSelector);
      } else if (llamada === false) {
        obtenerContactos();
        setLlamada(true);
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

      if (
        Object.keys(contactoSelector).length > 0 &&
        llamadaContactos === true
      ) {
        setContacto(contactoSelector);


      } else if (
        Object.keys(contactoSelector).length === 0 &&
        llamadaContactos === false
      ) {
        obtenerMiContacto();
        setLlamadaContactos(true);
      }

      if (contacto.length > 0) {
        var cliente = contacto.map(item => item.contactid)
        SetClienteSeleccionar(cliente[0])
      }
    }
  }, [contactSelector, sucursalSelector, contactoSelector]);



  const obtenerMiContacto = async () => {
    dispatch(obtenerContacto(contactid));
  }

  const obtenerAsuntos = () => {
    dispatch(consultaFETCHnombresAsuntos())
  }

  const obtenerCuentas = () => {
    dispatch(consultaFETCHcuentas())
  }

  const obtenerContactos = () => {
    dispatch(consultaFETCHcontacts())
  }

  //------handle del select de asuntosPrimarios

  const selectOnChange = (valor) => {
    setSelected(valor.value)
  }
  //VALOR POR DEFECTO
  const valueInput = 'seleccionado correctamente' //completar con las opciones
  let opcionesAsunto = ''
  let input = ''
  //HANDLE DE LA SELECCION PAYROLL
  if (selected === '5') {
    opcionesAsunto = valueInput
  }
  //MOSTRAR INPUTS
  if (opcionesAsunto) {
    input =
      <div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion">
            Solicitante
          </label>
          <input
            onChange={e => setSolicitante(e.target.value)}
            className="form-control"
            id="solicitante"
            name="solicitante"
            placeholder=""
          />
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
            placeholder="..."
          ></Select>
        </div>
      </div>
  }
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

  const tipoCasoHandle = (valor) => {
    setTipoC(valor.value)
  }

  const tipoCaso = [
    { value: '1', label: 'Consulta' },
    { value: '2', label: 'Reclamo' },
    { value: '3', label: 'Pedido' },
  ]

  const tipoAsuntoPrimario = [
    { value: '1', label: 'SISTEMAS' },
    { value: '2', label: 'ADMINISTRACION' },
    { value: '3', label: 'COMUNICACIONES' },
    { value: '4', label: 'FM' },
    { value: '5', label: 'PAYROLL' },
    { value: '6', label: 'COMERCIAL' },
    { value: '7', label: 'CORPORATIVO' },
    { value: '8', label: 'DISEÑO' },
    { value: '9', label: 'SEGURIDAD' },
    { value: '10', label: 'FITER - MESA DE AYUDA' },
    { value: '100000000', label: 'GESTION MEDICA' },
  ]

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
                      onChange={e => setFecha(e.target.value)}
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
                    <input
                      id="disabledInput"
                      value={contacto.map(item => item.fullname)}
                      type="text"
                      id="text"
                      name="usuario"
                      className="form-control"

                    />
                  </div>
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Sucursal
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
                      onChange={(e) => selectOnChange(e)}
                      options={tipoAsuntoPrimario}
                      className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                      id="asuntoprima"
                      name="asunto-prima"
                      className="basic multi-select"
                      ClassNamePrefix="select"
                      placeholder="Elegir asunto primario..."
                      required
                    ></Select>
                    {
                      input
                    }
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
                      onChange={(e) => tipoCasoHandle(e)}
                      options={tipoCaso}
                      className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                      id="tcaso"
                      name="tcaso"
                      className="basic multi-select"
                      ClassNamePrefix="select"
                      placeholder="Elegir tipo de caso..."
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
                      onChange={e => setComentarios(e.target.value)}
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
