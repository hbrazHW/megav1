import React, { useRef, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { obtenerCliente } from "../Redux/ClienteCaso";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { obtenerAsunto } from "../Redux/AsuntoCaso";
import { consultaFETCHcontacts } from "../Redux/Contact";
import { consultaFETCHcuentas } from "../Redux/RecursosHumanos";
import { useDropzone } from "react-dropzone";
import useFileUpload from "react-use-file-upload";
import styled from "styled-components";
import axios from "axios";
import Uploady, {
  useItemStartListener,
  useItemFinalizeListener,
  useBatchAddListener,
} from "@rpldy/uploady";
import withPasteUpload from "@rpldy/upload-paste"
import UploadDropZone from "@rpldy/upload-drop-zone";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import whithPasteUpload from "@rpldy/upload-paste";
import { onPasteUpload } from "@rpldy/upload-paste";
import UploadPreview from "@rpldy/upload-preview";
import {
  copyImageToClipboard,
  getBlobFromImageElement,
  copyBlobToClipboard,
} from "copy-image-clipboard";
import {
  cargarForm,
  consultaFETCHmisCasosActivos,
  consultaFETCHnombresAsuntos,
  consultaFETCHcasosFm,
  consultaFETCHinstalacionSede,
} from "../Redux/Casos";
import { obtenerContacto } from "../Redux/Contacto";

import ElementPaste from "./ElementPaste";
import { Toast, Spinner } from "react-bootstrap";
import {
  faFile,
  faCloudUploadAlt,
  faCheckCircle,
  faTimesCircle,
  faEnvelope,
  faClipboardList,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter, NavLink } from "react-router-dom";

const Casos = (props) => {
  const dispatch = useDispatch();

  //hooks
  const [contacts, setContacts] = React.useState([]);
  const [llamada, setLlamada] = React.useState(false);
  const [selectCliente, setSelectCliente] = React.useState([]);
  const contactSelector = useSelector((store) => store.contacts.contacts);

  const [sucursal, setSucursal] = React.useState([]);
  const [llamadaSucu, setLlamadaSucu] = React.useState(false);
  const sucursalSelector = useSelector(
    (store) => store.recursosHumanos.cuentas
  );
  const [selectSucu, setSelectSucu] = React.useState([]);

  const [asuntos, setAsuntos] = React.useState([]);
  const [llamadaAsuntos, setLlamadaAsuntos] = React.useState(false);
  const asuntosSelector = useSelector((store) => store.casos.asuntos);
  const [selectAsunto, setSelectAsunto] = React.useState([]);

  const [instalaSede, setInstalaSede] = React.useState([])
  const [llamadaInstaSede, SetLlamdaInstaSede] = React.useState(false)
  const instalacionSedeSelector = useSelector(store => store.casos.instalacionSede)
  const [selectInstaSede, setSelectInstaSede] = React.useState([]);

  
  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const contactid = useSelector((store) => store.usuarios.contactid);
  //----------------------
  //datos para el post
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const mockSenderEnhancer = getMockSenderEnhancer();
  const PreviewContainer = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    img {
      max-width: 400px;
      width: 100%;
      height: auto;
    }
  `;
  const StyledDropZone = styled(UploadDropZone)`
  border: 4px dashed rgb(245,130,32);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

  const PasteUploadDropZone = withPasteUpload(StyledDropZone);

  const UploadStatus = () => {
    const [status, setStatus] = useState(null);
    useItemStartListener(() => setStatus("cargando..."));
    useItemFinalizeListener(() => setStatus(texto));
    console.log("status:", status)
    var texto = <p className="fw-bolder text-success">Archivo guardado exitosamente!</p>
    return status;
  };

  const inputRef = useRef();
  const imageElement = document.getElementById("image");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = createFormData();
    try {
      axios.post("https://some-api.com", formData, {
        "content-type": "multipart/form-data",
      });
    } catch (error) {
      // console.error("Error archivo incompatible");
    }
  };
  // Pass the image src attribute here
  copyImageToClipboard("assets/image*")
    .then(() => {
      // console.log("Image Copied");
    })
    .catch((e) => {
      // console.log("Error: ", e.message);
    });

  //idintranet

  // Can be an URL too, but be careful because this may cause CORS errors
  copyImageToClipboard("../")
    .then(() => {
      // console.log("Image Copied");
    })
    .catch((e) => {
      // console.log("Error: ", e.message);
    });
  getBlobFromImageElement(imageElement)
    .then((blob) => {
      return copyBlobToClipboard(blob);
    })
    .then(() => {
      // console.log("Blob Copied");
    })
    .catch((e) => {
      // console.log("Error: ", e.message);
    });

  // onPasteUpload((e) => {

  // })

  const [fecha, setFecha] = React.useState("");
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");
  const [sede, setSede] = React.useState("");
  //selected es referencia a asunto primario
  const [selected, setSelected] = React.useState("");
  const [solicitante, setSolicitante] = React.useState("");
  const [puestoSolicitante, setPuestoSolicitante] = React.useState("");
  const [instalacionSede, setInstalacionSede] = React.useState("");
  const [serieActivo, setSerieActivo] = React.useState("");
  const [equipoDetenido, setEquipoDetenido] = React.useState("");
  const [prioridad, setPrioridad] = React.useState("");
  const [asuntoSeleccionar, setAsuntoSeleccionar] = React.useState("");
  const [tipoC, setTipoC] = React.useState("");
  const [comentarios, setComentarios] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const [mensaje, setMensaje] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const resultado = useSelector((store) => store.casos.resultadoCaso);

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
        let contactomatch = [];
        contactSelector
          .filter((cntc) => cntc.contactid === contactid)
          .map((item) => contactomatch.push(item));
        // console.log("resultado:", contactomatch)
        setSede(contactomatch[0]._parentcustomerid_value);
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

      if (instalaSede.length === 0) {
        if(instalacionSedeSelector.length > 0 && llamadaInstaSede === true){
            setInstalaSede(instalacionSedeSelector)
            completarOpcionInstalacionporSede(instalacionSedeSelector);
        }else if (llamadaInstaSede === false) {
            obtenerInstalacionporSede()
            SetLlamdaInstaSede(true)
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
        var cliente = contacto.map((item) => item.contactid);
        SetClienteSeleccionar(cliente[0]);
      }

      if (resultado !== undefined) {
        if (resultado !== "") {
          cargaExito();
        }
      }
    }
  }, [contactSelector, sucursalSelector, contactoSelector, resultado, instalacionSedeSelector]);


  const enviarFormulario = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let index = 0; index < selectedFiles.length; index++) {
      let element = selectedFiles[index];
      formData.append(`body${index}`, element);
    }
    // formData.append('body', selectedFiles);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    dispatch(
      cargarForm(
        clienteSeleccionar,
        asuntoSeleccionar,
        fecha,
        selected,
        solicitante,
        puestoSolicitante,
        tipoC,
        comentarios,
        sede,
        formData,
        config
      )
    );
    setLoading(true);
    setMensaje("Cargando...");
    setShow(true);
    limpiarForm();
  };

  const cargaExito = () => {
    if (resultado === "EXITO") {
      setMensaje("El caso fue creado con éxito!");
      setError(false);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        obtenerCasos();
        props.history.push("/");
      }, 500);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    } else if (resultado === "ERROR") {
      setMensaje("Error al crear caso!");
      setError(true);
      setLoading(false);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  const limpiarForm = () => {
    setFecha("");
    SetClienteSeleccionar("");
    setSede("");
    setSelected("");
    setSolicitante("");
    setPuestoSolicitante("");
    setAsuntoSeleccionar("");
    setTipoC("");
    setComentarios("");
    setSelectedFiles("");
  };

  const obtenerCasos = () => {
    dispatch(consultaFETCHmisCasosActivos());
  };

  const changeHandler = (event) => {
    debugger;
    setSelectedFiles(event.target.files);
  };

  const obtenerMiContacto = async () => {
    dispatch(obtenerContacto(contactid));
  };

  const obtenerAsuntos = () => {
    dispatch(consultaFETCHnombresAsuntos());
  };

  const obtenerCuentas = () => {
    dispatch(consultaFETCHcuentas());
  };

  const obtenerInstalacionporSede = () => {
    dispatch(consultaFETCHinstalacionSede())
 };

  const obtenerContactos = () => {
    dispatch(consultaFETCHcontacts());
  };

  //------handle del select de asuntosPrimarios

  const selectOnChange = (valor) => {
    setSelected(valor.value);
  };
  //VALOR POR DEFECTO
  const valueInput = "seleccionado correctamente"; //completar con las opciones
  let opcionesAsunto = "";
  let input = "";
  //HANDLE DE LA SELECCION PAYROLL
  if (selected === "5") {
    opcionesAsunto = valueInput;
  }
  //MOSTRAR INPUTS
  if (opcionesAsunto) {
    input = (
      <div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion">
            Solicitante
          </label>
          <input
            onChange={(e) => setSolicitante(e.target.value)}
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
          <input
            onChange={(e) => setPuestoSolicitante(e.target.value)}
            id="psol"
            name="psol"
            className="form-control"
            placeholder=""
          />
        </div>
      </div>
    );
  }
  //----------------------------

  const opcionSiNo = [
    { value: "0", label: "No" },
    { value: "1", label: "Sí" },
  ];

  const opcionPrioridad = [
    { value: "3", label: "Urgente" },
    { value: "2", label: "Alta" },
    { value: "1", label: "Media" },
    { value: "0", label: "Baja" },
  ];
  //VALOR POR DEFECTO
  const valueInputfm = "seleccionado correctamente"; //completar con las opciones
  let opcionesAsuntofm = "";
  let inputfm = "";
  //HANDLE DE LA SELECCION FM
  if (selected === "4") {
    opcionesAsuntofm = valueInputfm;
  }
  //MOSTRAR INPUTS FM
  if (opcionesAsuntofm) {
    inputfm = (
      <div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion required">
            Instalación por Sede
          </label>
          <Select
            // onChange={(e) => selectOnChange(e)}
            options={selectInstaSede}
            className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
            id="instaSede"
            name="instaSede"
            className="basic multi-select"
            ClassNamePrefix="select"
            placeholder="Elegir instalación..."
            required
          ></Select>
        </div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion">
            N° De serie del activo
          </label>
          <input
            onChange={(e) => setSerieActivo(e.target.value)}
            id="nserie"
            name="nserie"
            className="form-control"
            placeholder="Número de serie..."
          />
        </div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion">
            Equipo Detenido ?
          </label>
          <Select
            onChange={(e) => equipoDetenidoHandle(e)}
            options={opcionSiNo}
            type="select"
            id="select"
            name="equipoDet"
            className="basic multi-select"
            classNamePrefix="select"
            placeholder="Seleccionar..."
          ></Select>
        </div>
        <div className="mb-2 p-2">
          <label className="form-label fw-bolder lbl-precalificacion required">
            Prioridad
          </label>
          <Select
            onChange={(e) => prioridadHandle(e)}
            options={opcionPrioridad}
            type="select"
            id="select"
            name="priority"
            className="basic multi-select"
            classNamePrefix="select"
            placeholder="Seleccionar Prioridad..."
            required
          ></Select>
        </div>
      </div>
    );
  }
  //----------------------------

  const obtenerNombreSede = (sede) => {
    let sedeMatch = "";
    sucursal
      .filter((s) => s.accountid === sede)
      .map((item) => (sedeMatch = item.name));
    return sedeMatch;
  };

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
      sucursal.push(a);
    });
    setSelectSucu(sucursal);
  };

  const completarOpcionAsunto = (asunto) => {
    const asunt = [];
    asunto.forEach((item) => {
      var a = { value: item.subjectid, label: item.title };
      asunt.push(a);
    });
    setSelectAsunto(asunt);
  };


  const completarOpcionInstalacionporSede = (instaPorSede) => {
    const instased = [];
    instaPorSede.forEach((item) => {
      var s = { value: item.new_instalacionesporsedeid, label: item.new_name };
      instased.push(s);
    });
    setSelectInstaSede(instased);
  };

  const asuntoHandle = (valor) => {
    setAsuntoSeleccionar(valor.value);
  };

  const tipoCasoHandle = (valor) => {
    setTipoC(valor.value);
  };

  const equipoDetenidoHandle = (valor) => {
    setEquipoDetenido(valor.value);
  };

  const prioridadHandle = (valor) => {
    setPrioridad(valor.value);
  };

  const tipoAsuntoPrimario = [
    { value: "1", label: "SISTEMAS" },
    { value: "2", label: "ADMINISTRACION" },
    { value: "3", label: "COMUNICACIONES" },
    { value: "4", label: "FM" },
    { value: "5", label: "PAYROLL" },
    { value: "6", label: "COMERCIAL" },
    { value: "7", label: "CORPORATIVO" },
    { value: "8", label: "DISEÑO" },
    { value: "9", label: "SEGURIDAD" },
    { value: "10", label: "FITER - MESA DE AYUDA" },
    { value: "100000000", label: "GESTION MEDICA" },
  ];

  const tipoCaso = [
    { value: "1", label: "Consulta" },
    { value: "2", label: "Reclamo" },
    { value: "3", label: "Pedido" },
  ];

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">
          <div className="row">
            <div className="m-2">
              <h4 className="fw-bolder text-center">Crear Nuevo Caso</h4>
            </div>
          </div>
          <form onSubmit={enviarFormulario}>
            <div className="row w-auto d-flex justify-content-center">
              <h6 className="fw-bolder">Información general</h6>
              <div className="row">
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Fecha Alta
                    </label>
                    <input
                      onChange={(e) => setFecha(e.target.value)}
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
                      value={contacto.map((item) => item.fullname)}
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
                    <input
                      id="Sucursal"
                      value={obtenerNombreSede(sede)}
                      name="sucursal"
                      className="form-control"
                      required
                    />
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

                    {input}

                    {inputfm}
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
                      onChange={(e) => setComentarios(e.target.value)}
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
                <div className="custom-input-file drag-area mt-4">
                  <div class="drag-area">
                    {/* <button
                      type="button"
                      class="btn btn-outline-dark"
                      // onClick={() => inputRef.current.click()}
                    >
                      O seleccione tus archivos para subirlos
                    </button> */}
                    {/* <input
                      type="file"
                      className="fw-bolder input-file "
                      name="file"
                      id="adjunto"
                      // onChange={changeHandler}
                      multiple
                    /> */}
                  </div>
                  <div className="col-5 text-end text-dark fw-bolder"></div>
                </div>
              </div>
            </div>

            <div class="card text-center">
              <div class="card-header col-sm-12">
                <h5 className="fw-bolder">Adjuntar Archivos</h5>
              </div>

              <div class="card-body">

                <div>
                  <ul>
                    {fileNames.map((name) => (
                      <li key={name}>
                        <span>{name}</span>
                        <span onClick={() => removeFile(name)}>
                          <i className="fa fa-times" />
                        </span>
                      </li>
                    ))}
                  </ul>
                  {files.length > 0 && (
                    <ul>
                      <li>
                        Tipos de archivos:
                        {fileTypes.join(", ")}
                      </li>
                      <li>
                        Tamaño total:
                        {totalSize}
                      </li>
                      <li>
                        Total Bytes:
                        {totalSizeInBytes}
                      </li>

                      <li className="clear-all">
                        <button onClick={() => clearAllFiles()}>
                          Limpiar todo
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Provide a drop zone and an alternative button inside it to upload files. */}
                <Uploady debug enhancer={mockSenderEnhancer}>
                  <ElementPaste
                    autoUpload={false}
                    params={{ test: "paste" }}
                    tipo="caso"
                  />
                  <div className="col-sm-12">
                    <UploadStatus />
                    <PreviewContainer>
                      <UploadPreview />
                    </PreviewContainer>
                  </div>
                  <PasteUploadDropZone params={{ test: "paste" }}>
                    <p className="fw-bolder text-secondary">Arrastra un archivo aquí</p>
                  </PasteUploadDropZone>
                </Uploady>

                <br />
              </div>
              <div className="d-grid gap-5 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-outline-dark me-md-5">
                  Enviar
                </button>
                <br />
              </div>
              <br />
            </div>
          </form>
          <div className="row">
            <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
              <Toast className="half-black" show={show} autohide color="lime">
                <Toast.Body className="text-white">
                  <div className="row p-2">
                    {loading ? (
                      <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <div className="col-1 mx-2">
                        {error ? (
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="fs-3 upload-file atras"
                            color="#dc3545"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="fs-3 upload-file atras"
                            color="#198754"
                          />
                        )}
                      </div>
                    )}

                    <div className="col-10 mt-1 ml-5">{mensaje}</div>
                  </div>
                </Toast.Body>
              </Toast>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default withRouter(Casos);
