import React, { useRef, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSpring, animated } from "react-spring";
import { obtenerLegales, cargarForm } from "../Redux/DocumentosLegales";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHcuentas, } from "../Redux/RecursosHumanos";
import { consultaFETCHcontacts } from "../Redux/Contact";
import { obtenerContacto } from "../Redux/Contacto";
import { Toast, Spinner } from 'react-bootstrap'
import { faCloudUploadAlt, faFile,faCheckCircle, faTimesCircle, faEnvelope, faClipboardList, faCircle } from '@fortawesome/free-solid-svg-icons'
import { withRouter, NavLink } from 'react-router-dom'
import { useDropzone } from "react-dropzone";
import useFileUpload from "react-use-file-upload";
import styled from "styled-components";
import axios from "axios";
import Uploady, {
  useItemStartListener,
  useItemFinalizeListener,
  useBatchAddListener
} from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import whithPasteUpload from "@rpldy/upload-paste";
import { onPasteUpload } from "@rpldy/upload-paste";
import UploadPreview from "@rpldy/upload-preview";
import {
  copyImageToClipboard,
  getBlobFromImageElement,
  copyBlobToClipboard,
} from "copy-image-clipboard";
import CopyPasteDoc from "./CopyPasteDoc";



const Legales = (props) => {
  const dispatch = useDispatch();

  //const legales
  const legalesSelector = useSelector((store) => store.legales.legales);
  const legalesIdSelector = useSelector(store => store.legales.legalesId)
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
  const [fecha, setFecha] = React.useState("");


  // autor, fechaRecepcion, descripcionDoc, sede, persona, observaciones
  const [autor, setAutor] = React.useState('')
  const [fechaRecepcion, setFechaRecepcion] = React.useState('')
  const [descripcionDoc, setDescripcionDoc] = React.useState('')
  const [sede, setSede] = React.useState('')
  const [persona, setPersona] = React.useState('')
  const [observaciones, setObservaciones] = React.useState('')
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const [mensaje, setMensaje] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(false)
  const resultado = useSelector(store => store.legales.resultadoCaso)
 
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
    margin-top: 20px;

    img {
      max-width: 400px;
    }
  `;
  const StyledInput = styled.input`
    width: 408px;
    height: 34px;
    font-size: 18px;
    margin: 20px 0;
    padding: 33px;
  `;

  const PasteInput = whithPasteUpload(StyledInput);

  const UploadStatus = () => {
    const [status, setStatus] = useState(null);
    useItemStartListener(() => setStatus("cargando..."));
    useItemFinalizeListener(() => setStatus("Archivo copiado!..."));
    console.log("status:", status)

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

    if (legalesIdSelector !== undefined) {
      if (legalesIdSelector !== '') {
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

    if (contacto.length > 0) {
      var autor = contacto.map(item => item.contactid)
      setAutor(autor[0])
    }

    if (resultado !== undefined) {
      if (resultado !== '') {
        cargaExito()
      }
    }

  }, [legalesIdSelector, legalesSelector, sucursalSelector, contactSelector, contactoSelector, resultado]);

  const enviarFormulario = (e) => {
    e.preventDefault()
    const formData = new FormData();
    for (let index = 0; index < selectedFiles.length; index++) {
      let element = selectedFiles[index];
      formData.append(`body${index}`, element);
    }
    // formData.append('body', selectedFiles);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(cargarForm(autor, fechaRecepcion, descripcionDoc, sede, persona, observaciones, formData, config))
    setLoading(true)
    setMensaje("Cargando...")
    setShow(true)
    limpiarForm()
  }

 
  const cargaExito = () => {
    if (resultado === "EXITO") {
      setMensaje("El documento fue creado con éxito!")
      setError(false)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        obtenerlegal()
        props.history.push('/')
      }, 500);
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
    else if (resultado === "ERROR") {
      setMensaje("Error al crear documento!")
      setError(true)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }
  }

  const limpiarForm = () => {
    setAutor('')
    setFechaRecepcion('')
    setDescripcionDoc('')
    setSede('')
    setPersona('')
    setObservaciones('')
    setSelectedFiles('')
  }

  const obtenerlegal = () => {
    dispatch(obtenerLegales());
  };

  const changeHandler = (event) => {
    debugger
    setSelectedFiles(event.target.files)
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

  const setDescripcionDocHandle = (valor) => {
    setDescripcionDoc(valor.value)
  }


  const sedeHandle = (valor) => {
    setSede(valor.value)
  }


  const personaHandle = (valor) => {
    setPersona(valor.value)
  }


  const docDescripcion = [
    { value: '100000000', label: 'CARTA DOCUMENTO' },
    { value: '100000001', label: 'TELEGRAMA' },
    { value: '100000002', label: 'CONTRATO' },
    { value: '100000003', label: 'DENUNCIA' },
    { value: '100000004', label: 'ACTA' },
    { value: '100000005', label: 'NOTA' },
    { value: '100000006', label: 'OTROS' },
    { value: '100000007', label: 'CÉDULA' },
    { value: '100000009', label: 'OFICIO' },
    { value: '100000010', label: 'DEMANDA' },
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
          <form onSubmit={enviarFormulario}>
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
                      value={contacto.map(item => item.fullname)}
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
                      onChange={(e) => setFechaRecepcion(e.target.value)}
                      type="datetime-local"
                      id="fechaRecepcion"
                      name="fechaRecepcion"
                      className="form-control"
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
                      type="datetime-local"
                      id="date"
                      name="altar"
                      className="form-control desabilitado"
                      required
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
                      type="datetime-local"
                      id="date"
                      name="altar"
                      className="form-control"
                      required
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
                      id="descripcionDoc"
                      onChange={e => setDescripcionDocHandle(e)}
                      options={docDescripcion}
                      name="descripcionDoc"
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
                      id="persona"
                      onChange={(e) => personaHandle(e)}
                      options={selectCliente}
                      name="persona"
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
                        id="sede"
                        onChange={(e) => sedeHandle(e)}
                        options={selectSucu}
                        name="sede"
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
                        type="text"
                        id="razon"
                        name="razon"
                        className="form-control desabilitado"
                        placeholder="Sin Recepcionar"
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
                      id="observaciones"
                      name="observaciones"
                      rows="3"
                      onChange={e => setObservaciones(e.target.value)}
                      value={observaciones}
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

            <div class="card">
              <div class="card-header fw-bolder d-grid gap-5 d-md-flex justify-content-center">
                Adjuntar Archivos{" "}
                <FontAwesomeIcon
                  icon={faFile}
                  className="fs-4 justify-content-center"
                  color="rgb(245,130,32)"
                />
              </div>

              <div class="card-body">
                <h5 class="card-title">Detalles de sus archivos</h5>
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
                <Uploady debug enhancer={mockSenderEnhancer}  > 
                   <CopyPasteDoc autoUpload={false} params={{ test: "paste" }} tipo="documentolegal"/>
                  <div className="d-grid gap-5 d-md-flex justify-content-center">
                    <PasteInput
                      extraProps={{
                        placeholder:
                          "copía con (Ctrl+C) y pega con (Ctrl+V) acá",
                      }}
                    />
                    <UploadStatus />
                    <PreviewContainer>
                      <UploadPreview />
                    </PreviewContainer>
                  </div>
                </Uploady>
                <div
                  onDragEnter={handleDragDropEvent}
                  onDragOver={handleDragDropEvent}
                  onDrop={(e) => {
                    handleDragDropEvent(e);
                    setFiles(e, "a");
                  }}
                >
                  <br />
                  <p>Arrastre y suelte aquí sus archivos</p>

                  <br />

                  <button
                    type="button"
                    className="btn btn-outline-dark justify-content-center"
                    onClick={() => inputRef.current.click()}
                  >
                    O seleccione tus archivos para subirlos
                  </button>

                  {/* Hide the crappy looking default HTML input */}
                  {/* <input
                    type="file"
                    className="fw-bolder"
                    name="file"
                    id="adjunto"
                    onChange={changeHandler}
                    multiple
                  /> */}
                </div>
                <br />
              </div>
              <div className="d-grid gap-5 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-outline-dark me-md-5"
                >
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
                    {
                      loading ?
                        <Spinner animation="border" role="status" variant="primary">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <div className="col-1 mx-2">
                          {error ? <FontAwesomeIcon icon={faTimesCircle} className="fs-3 upload-file atras" color="#dc3545" /> : <FontAwesomeIcon icon={faCheckCircle} className="fs-3 upload-file atras" color="#198754" />}
                        </div>
                    }

                    <div className="col-10 mt-1 ml-5">
                      {mensaje}
                    </div>
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

export default withRouter(Legales);