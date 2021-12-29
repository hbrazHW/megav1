import React, { useRef, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";
import { obtenerLegales, cargarForm } from "../Redux/DocumentosLegales";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHcuentas } from "../Redux/RecursosHumanos";
import { consultaFETCHcontacts } from "../Redux/Contact";
import { obtenerContacto } from "../Redux/Contacto";
import { useDropzone } from "react-dropzone";
import useFileUpload from "react-use-file-upload";
import styled from "styled-components";
import axios from "axios";
import Uploady, {
  useItemStartListener,
  useItemFinalizeListener,
} from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import whithPasteUpload from "@rpldy/upload-paste";
import UploadPreview from "@rpldy/upload-preview";
import { obtenerDocumentosPorCuenta, cargarDocumentacionPorCuenta } from '../Redux/CarpetaDigital'
import {
  copyImageToClipboard,
  getBlobFromImageElement,
  copyBlobToClipboard,
} from "copy-image-clipboard";

const Legales = () => {
  const dispatch = useDispatch();

  //const legales
  const legalesSelector = useSelector((store) => store.legales.legales);
  const legalesIdSelector = useSelector((store) => store.legales.legalesId);
  const [legales, setLegales] = React.useState([]);
  const [llamadaLegales, setlLlmadaLegales] = React.useState(false);

  const [sucursal, setSucursal] = React.useState([]);
  const [llamadaSucu, setLlamadaSucu] = React.useState(false);
  const sucursalSelector = useSelector(
    (store) => store.recursosHumanos.cuentas
  );
  const [selectSucu, setSelectSucu] = React.useState([]);
  const [sucursalSeleccionar, SetSucursalSeleccionar] = React.useState("");

  const [contacts, setContacts] = React.useState([]);
  const [llamada, setLlamada] = React.useState(false);
  const [selectCliente, setSelectCliente] = React.useState([]);
  const contactSelector = useSelector((store) => store.contacts.contacts);
  const [clienteSeleccionar, SetClienteSeleccionar] = React.useState("");
  const [Docdescripcion, setDocDescripcion] = React.useState("");

  const [contacto, setContacto] = React.useState([]);
  const [llamadaContactos, setLlamadaContactos] = React.useState(false);
  const contactoSelector = useSelector((store) => store.contactos.contacto);
  const contactid = useSelector((store) => store.usuarios.contactid);
  const [fecha, setFecha] = React.useState("");

  // autor, fechaRecepcion, descripcionDoc, sede, persona, observaciones
  const [autor, setAutor] = React.useState("");
  const [fechaRecepcion, setFechaRecepcion] = React.useState("");
  const [descripcionDoc, setDescripcionDoc] = React.useState("");
  const [sede, setSede] = React.useState("");
  const [persona, setPersona] = React.useState("");
  const [observaciones, setObservaciones] = React.useState("");

  ///mensajes
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState(false);
//upload archivo

const [selectedFiles, setSelectedFiles] = React.useState([])
const [isFilePicked, setIsFilePicked] = React.useState(false);
const [documentoId, setDocumentoId] = React.useState('')
const [documento, setDocumento] = React.useState('')

  const mockSenderEnhancer = getMockSenderEnhancer();
const PreviewContainer = styled.div`
margin-top: 20px;

img {
  max-width: 400px;
}
`;
const StyledInput = styled.input`
 width: 300px;
 height:34px;
 font-size: 18px;
 margin: 20px 0;
 padding: 80px;

`;
// const PasteUploadDropZone = whithPasteUpload(StyleDropZone);

const PasteInput = whithPasteUpload(StyledInput);

const UploadStatus = () => {
    const [status, setStatus] = useState(null);
    useItemStartListener(() => setStatus("cargando..."));
    useItemFinalizeListener(() => setStatus ("Archivo copiado!..."));
  return status;
}

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
        obtenerlegal();
        setlLlmadaLegales(true);
      }
    }

    if (legalesIdSelector !== undefined) {
      if (legalesIdSelector !== "") {
        completarLegales(legalesIdSelector);
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

    if (Object.keys(contactoSelector).length > 0 && llamadaContactos === true) {
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
      var autor = contacto.map((item) => item.contactid);
      console.log("autor:", autor);
      setAutor(autor[0]);
    }
  }, [
    legalesIdSelector,
    legalesSelector,
    sucursalSelector,
    contactSelector,
    contactoSelector,
  ]);

  const enviarFormulario = (e) => {
    e.preventDefault();
    dispatch(
      cargarForm(
        autor,
        fechaRecepcion,
        descripcionDoc,
        sede,
        persona,
        observaciones
      )
    );
  };

  const obtenerlegal = () => {
    dispatch(obtenerLegales());
  };

  const obtenerCuentas = () => {
    dispatch(consultaFETCHcuentas());
  };

  const obtenerContactos = () => {
    dispatch(consultaFETCHcontacts());
  };

  const obtenerMiContacto = async () => {
    dispatch(obtenerContacto(contactid));
  };

  const completarOpcionCliente = (cliente) => {
    const client = [];
    cliente.forEach((item) => {
      var c = { value: item.contactid, label: item.fullname };
      client.push(c);
    });
    setSelectCliente(client);
  };

  const completarLegales = (id) => {
    legales
      .filter((item) => item.new_documentoslegalesid == id)
      .map((item) => {
        setAutor(item._new_personaquerecepcion_value);
      });
  };

  const completarOpcionSede = (sede) => {
    const sucursal = [];
    sede.forEach((item) => {
      var a = { value: item.accountid, label: item.name };
      sucursal.push(a);
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
    setDescripcionDoc(valor.value);
  };

  const sedeHandle = (valor) => {
    setSede(valor.value);
  };

  const personaHandle = (valor) => {
    setPersona(valor.value);
  };

  const changeHandler = (event) => {
    setSelectedFiles(event.target.files)
    setIsFilePicked(true);
};

const handleSubmission = (e) => {
  e.preventDefault()

  if (documentoId === '') {
      document.getElementById("documento").classList.add('is-invalid')
      setMensaje("El documento es requerido!")
      setError(true)
      setShow(true)
      return
  } else {
      document.getElementById("documento").classList.remove('is-invalid')
      document.getElementById("documento").classList.add("is-valid")
  }
  if (selectedFiles.length === 0) {
      document.getElementById("adjunto").classList.add('is-invalid')
      setMensaje("El archivo adjunto es requerido!")
      setError(true)
      setShow(true)
      return
  } else {
      document.getElementById("adjunto").classList.remove('is-invalid')
      document.getElementById("adjunto").classList.add("is-valid")
  }

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

  

  dispatch(cargarDocumentacionPorCuenta(formData, config, documentoId, documento))
  setMensaje("La subida del archivo fue exitosa!")
  setError(false)
  setShow(true)
 
};


  const docDescripcion = [
    { value: "100000000", label: "CARTA DOCUMENTO" },
    { value: "100000001", label: "TELEGRAMA" },
    { value: "100000002", label: "CONTRATO" },
    { value: "100000003", label: "DENUNCIA" },
    { value: "100000004", label: "ACTA" },
    { value: "100000005", label: "NOTA" },
    { value: "100000006", label: "OTROS" },
    { value: "100000007", label: "CÉDULA" },
    { value: "100000009", label: "OFICIO" },
    { value: "100000010", label: "DEMANDA" },
  ];

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
                      value={contacto.map((item) => item.fullname)}
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
                      onChange={(e) => setDescripcionDocHandle(e)}
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
                      onChange={(e) => setObservaciones(e.target.value)}
                      value={observaciones}
                      placeholder="comentanos un poco más..."
                    ></textarea>
                    <br />
                  </div>
                </div>
              </div>
              <br />
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

              <div className="row">
                <div className="custom-input-file col-12 mt-4">
                  <div class="form-group borde_discontinuo">
                  <input
                      type="file"
                      className="fw-bolder input-file "
                      name="file"
                      id="adjunto"
                      onChange={changeHandler}
                      multiple
                    />
                    <Uploady debug enhancer={mockSenderEnhancer}>
                      <div className="card-header fw-bolder d-grid gap-5 d-md-flex justify-content-center">
                        <h3></h3>
                        <div className="card-header fw-bolder d-grid gap-5 d-md-flex justify-content">

                        <PasteInput
                          extraProps={{
                            placeholder:
                              " Ctrl+C y Ctrl+V",
                          }}
                        />
                        </div>
                        <div className="card-header fw-bolder d-grid gap-5 d-md-flex ">
                        <PreviewContainer>
                          <div className="container">
                          <UploadStatus />
                          <UploadPreview />
                          </div>
                         
                        </PreviewContainer>
                        </div>
                      </div>
                    </Uploady>
                   
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              name="btnSubmitAlyc"
              className="btn btn-dark btn-md mt-4 text-center block"
            >
              Crear Legal
            </button>
          </form>
        </div>
      </div>
    </animated.div>
  );
};

export default Legales;
