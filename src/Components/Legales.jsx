import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import { obtenerLegales } from "../Redux/DocumentosLegales";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHcuentas } from "../Redux/RecursosHumanos";
import { consultaFETCHcontacts } from "../Redux/Contact";
import { obtenerContacto } from "../Redux/Contacto";


const Legales = () => {
  const dispatch = useDispatch();

  //const legales
  const [autor, setAutor] = React.useState([])
  const legalesSelector = useSelector((store) => store.legales.legales);
  const legalesIdSelector = useSelector (store => store.legales.legalesId)
  const [legales, setLegales] = React.useState([]);
  const [llamadaLegales, setlLlmadaLegales] = React.useState(false);

  const [sucursal, setSucursal] = React.useState([])
  const [llamadaSucu, setLlamadaSucu] = React.useState(false)
  const sucursalSelector = useSelector(store => store.recursosHumanos.cuentas)
  const [selectSucu, setSelectSucu] = React.useState([]);
  const [sucursalSeleccionar, SetSucursalSeleccionar] = React.useState("");

  const [contacts, setContacts] = React.useState([])
  const [llamada, setLlamada] = React.useState(false)
  const [selectCliente, setSelectCliente] = React.useState([]);
  const contactSelector = useSelector(store => store.contacts.contacts)
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");
  const [Docdescripcion, setDocDescripcion] = React.useState('')

  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const contactid = useSelector((store) => store.usuarios.contactid);

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
    if (legales.length === 0) {
      if (legalesSelector.length > 0 && llamadaLegales === true) {
        setLegales(legalesSelector);
      } else if (llamadaLegales === false) {
        obtenerlegal()
        setlLlmadaLegales(true);
      }
    }

    if(legalesIdSelector !== undefined) {
      if(legalesIdSelector !== '') {
        completarLegales(legalesIdSelector)
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

    if (contacts.length === 0) {
      if (contactSelector.length > 0 && llamada === true) {
        setContacts(contactSelector);
        completarOpcionCliente(contactSelector);
      } else if (llamada === false) {
        obtenerContactos();
        setLlamada(true);
      }
    }

  }, [legalesIdSelector, legalesSelector, sucursalSelector, contactSelector, contactoSelector]);

  const obtenerlegal = () => {
    dispatch(obtenerLegales());
  };

  const obtenerCuentas = () => {
    dispatch(consultaFETCHcuentas())
  }

  const obtenerContactos = () => {
    dispatch(consultaFETCHcontacts())
  }


  const obtenerMiContacto = async () => {
    dispatch(obtenerContacto(contactid));
  }

  const completarOpcionCliente = (cliente) => {
    const client = [];
    cliente.forEach((item) => {
      var c = { value: item.contactid, label: item.fullname };
      client.push(c);
    });
    setSelectCliente(client);
  };


  const completarLegales = (id) => {
    legales.filter(item => item.new_documentoslegalesid == id).map(item => {
        setAutor(item._new_personaquerecepcion_value) 
         
    })
}

const completarOpcionSede = (sede) => {
  const sucursal = [];
  sede.forEach((item) => {
    var a = { value: item.accountid, label: item.name };
    sucursal.push(a)

  });
  setSelectSucu(sucursal);
};


const clienteHandle = (valor) => {
  SetClienteSeleccionar(valor.value);
};

const sucuHandle = (valor) => {
  SetSucursalSeleccionar(valor.value);
};

const docDescripcionHandle = (valor) => {
  setDocDescripcion(valor.value)
}


const docDescripcion = [
  {value: '100000000', label: 'CARTA DOCUMENTO'},
  {value: '100000001', label: 'TELEGRAMA'},
  {value: '100000002', label: 'CONTRATO'},
  {value: '100000003', label: 'DENUNCIA'},
  {value: '100000004', label: 'ACTA'},
  {value: '100000005', label: 'NOTA'},
  {value: '100000006', label: 'OTROS'},
  {value: '100000007', label: 'CÉDULA'},
  {value: '100000009', label: 'OFICIO'},
  {value: '100000010', label: 'DEMANDA'},  
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

                    //  {contacto.map((item) => (
                    //   <h5 className="perfil-nombre m-0 fw-bolder">
                    //      {item.fullname}
                    //        </h5>
                    //            ))}
                             type="text"
                             id="autor"
                             value={contacto}
                             name="autor"
                             className="form-control requerido"
                             required
                             placeholder=" --- "
                             disabled
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
                      onChange={e => docDescripcionHandle(e)}
                      options={docDescripcion}
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
                      className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                      id="cliente"
                      onChange={(e) => clienteHandle(e)}
                      options={selectCliente}
                      name="colors"
                      name="cliente"
                      name="colors"
                      className="basic multi-select"
                      ClassNamePrefix="select"
                      placeholder="Elegir persona..."
                      required
                    ></Select>
                  </div>
                  <div className="col-sm-4 col-md-12">
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
                      placeholder="Elegir Sede..."
                      required
                    ></Select>
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
