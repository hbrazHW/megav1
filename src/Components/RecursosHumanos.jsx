import React, { useRef, useState } from "react";
import Select from "react-select";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { consultaFETCHpuesto, consultaFETCHareas, consultaFETCHsedesRH, consultaFETCHautorizadoPor, cargarForm, consultaFETCHbusquedaPersonal, cargarForm2, consultaFETCHevaluaciones } from "../Redux/RecursosHumanos";
import { Toast, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle, faTimesCircle, faEnvelope, faClipboardList, faCircle, faFile } from '@fortawesome/free-solid-svg-icons'
import { withRouter, NavLink } from 'react-router-dom'
//---------------------------------------------------
import { useDropzone } from "react-dropzone";
import UploadDropZone from "@rpldy/upload-drop-zone";
import useFileUpload from "react-use-file-upload";
import styled from "styled-components";
import axios from "axios";
import Uploady, {
  useItemStartListener,
  useItemFinalizeListener,
  useBatchAddListener
} from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import withPasteUpload from "@rpldy/upload-paste"
import { onPasteUpload } from "@rpldy/upload-paste";
import UploadPreview from "@rpldy/upload-preview";
import {
  copyImageToClipboard,
  getBlobFromImageElement,
  copyBlobToClipboard,
} from "copy-image-clipboard";
import CopyPasteRh from "./CopyPasteRh";

const RecursosHumanos = (props) => {
  const dispatch = useDispatch();

  const [puesto, setPuesto] = React.useState([])
  const [llamadaPuesto, setLlamadaPuesto] = React.useState(false)
  const puestoSelector = useSelector(store => store.recursosHumanos.puesto)
  const [selecPuesto, setSelectPuesto] = React.useState([])

  const [areas, setAreas] = React.useState([])
  const [llamadaAreas, setLlamadaAreas] = React.useState(false)
  const areasSelector = useSelector(store => store.recursosHumanos.areas)
  const [selectArea, setSelectArea] = React.useState([])

  const [sucursales, setSucursales] = React.useState([])
  const [llamadaSucursales, setLlamadasSucursales] = React.useState(false)
  const sucursalesSelector = useSelector(store => store.recursosHumanos.sucursales)
  const [selectSucursal, setSelectSucursal] = React.useState([])

  const [autorizado, setAutorizado] = React.useState([])
  const [llamadaAutorizado, setLlamadaAutorizado] = React.useState(false)
  const autorizadoSelector = useSelector(store => store.recursosHumanos.autorizadoPor)
  const [selectAutorizado, setSelectAutorizado] = React.useState([])
  const [selectReferente, setSelectReferente] = React.useState([])

  //hooks form busqueda personal
  const [puestoSeleccionar, setPuestoSeleccionar] = React.useState('')
  const [mBusqueda, setMbusquedaSeleccionar] = React.useState('')
  const [tipBusqueda, setTipBusqueda] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [personaAcargo, setPersonaAcargo] = React.useState('')
  const [jornada, setJornada] = React.useState('')
  const [observaciones, setObservaciones] = React.useState('')
  const [areaSeleccionar, setAreaSeleccionar] = React.useState('')
  const [sucursalSeleccionar, setSucursalSeleccionar] = React.useState('')
  const [autorizadoSeleccionar, setAutorizadoSeleccionar] = React.useState('')
  const [reporta, setReportaSeleccionar] = React.useState('')
  //----------------------------

  //hooks form evaluacion periodo prueba
  const [empleado, setEmpleado] = React.useState('')
  const [puestoForm, setPuestoForm] = React.useState('')
  const [fechaIngreso, setFechaIngreso] = React.useState('')
  const [sucursal, setSucursal] = React.useState('')
  const [area, setArea] = React.useState('')
  const [evaluador, setEvaluador] = React.useState('')
  const [referente, setReferente] = React.useState('')
  const [puestoEvaluador, setPuestoEvaluador] = React.useState('')
  const [fechaCreacion, setFechaCreacion] = React.useState('')
  const [referido, setReferido] = React.useState('')
  const [empleadoParticipe, setEmpleadoParticipe] = React.useState('')
  const [nombreEvaluacion, setNombreEvaluacion] = React.useState('')
  const [comentario30, setComentario30] = React.useState('')
  const [comentario60, setComentario60] = React.useState('')
  const [comentario80, setComentario80] = React.useState('')
  const [pasaPeriodo, setPasaPeriodo] = React.useState('')
  //--------------------------------------

  const [selectedFiles, setSelectedFiles] = React.useState([])

  const [mensaje, setMensaje] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState(false)
  const resultado = useSelector(store => store.recursosHumanos.resultadoCaso)
  const resultadoDos = useSelector(store => store.recursosHumanos.resultadoCaso2)

  React.useEffect(() => {
    if (puesto.length === 0) {
      if (puestoSelector.length > 0 && llamadaPuesto === true) {
        setPuesto(puestoSelector)
        completarOpcionPuesto(puestoSelector)
      } else if (llamadaPuesto === false) {
        setLlamadaPuesto(true)
        obtenerPuesto()
      }
    }

    if (areas.length === 0) {
      if (areasSelector.length > 0 && llamadaAreas === true) {
        setAreas(areasSelector)
        completarOpcionAreas(areasSelector)
      } else if (llamadaAreas === false) {
        setLlamadaAreas(true)
        obtenerArea()
      }
    }

    if (sucursales.length === 0) {
      if (sucursalesSelector.length > 0 && llamadaSucursales === true) {
        setSucursales(sucursalesSelector)
        completarOpcionSedes(sucursalesSelector)
      } else if (llamadaSucursales === false) {
        setLlamadasSucursales(true)
        obtenerSucursales()
      }
    }

    if (autorizado.length === 0) {
      if (autorizadoSelector.length > 0 && llamadaAutorizado === true) {
        setAutorizado(autorizadoSelector)
        completarOpcionAutorizado(autorizadoSelector)
      } else if (llamadaAutorizado === false) {
        setLlamadaAutorizado(true)
        obtenerAutorizado()
      }
    }

    if (resultadoDos !== undefined) {
      if (resultadoDos !== '') {
        cargaExitoDos()
      }
    }

    if (resultado !== undefined) {
      if (resultado !== '') {
        cargaExito()
      }
    } 

    

  }, [puestoSelector, areasSelector, sucursalesSelector, autorizadoSelector, resultado, resultadoDos])

  console.log("este es el resultado:",resultadoDos)
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

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      delay: 1500,
    },
  });

  const enviarFormulario = (e) => {
    e.preventDefault()

    if (puestoSeleccionar === '') {
      setMensaje("El puesto es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (mBusqueda === '') {
      setMensaje("El motivo de búsqueda es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (tipBusqueda === '') {
      console.log(tipBusqueda)
      setMensaje("El tipo de búsqueda es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (descripcion === '') {
      setMensaje("El motivo del reemplazo es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (sucursalSeleccionar === '') {
      setMensaje("La sucursal es requerida!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (areaSeleccionar === '') {
      setMensaje("El area es requerida!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (reporta === '') {
      setMensaje("El campo 'Reporta a' es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (jornada === '') {
      setMensaje("La jornada es requerida!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }

    if (observaciones === '') {
      setMensaje("Observaciones es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
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
    dispatch(cargarForm(puestoSeleccionar, mBusqueda, descripcion, sucursalSeleccionar, areaSeleccionar, reporta, jornada, observaciones, tipBusqueda, autorizadoSeleccionar, formData, config))
    setLoading(true)
    setMensaje("Cargando...")
    setShow(true)
    limpiarForm()
  }

  const limpiarForm = () => {
    setPuestoSeleccionar('')
    setMbusquedaSeleccionar('')
    setTipBusqueda('')
    setDescripcion('')
    setPersonaAcargo('')
    setJornada('')
    setObservaciones('')
    setAreaSeleccionar('')
    setSucursalSeleccionar('')
    setAutorizadoSeleccionar('')
    setReportaSeleccionar('')
    setSelectedFiles('')
  }

  const changeHandler = (event) => {
    debugger
    setSelectedFiles(event.target.files)
  };

  const cargaExito = () => {
    if (resultado === "EXITO") {
      debugger
      setMensaje("La búsqueda fue creada con éxito!")
      setError(false)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        obtenerBusquedaPersonal()
        props.history.push('/')
      }, 500);
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
    else if (resultado === "ERROR") {
      setMensaje("Error al crear búsqueda!")
      setError(true)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }
  }

  //funciones del formulario de evaluaciones

  const enviarFormulario2 = (e) => {
    e.preventDefault()
    // debugger

    if (empleado === '') {
      setMensaje("El empleado es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }
    if (puestoForm === '') {
      setMensaje("El puesto es requerido!")
      setError(true)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
      return
    } else {
    }


    const formData = new FormData();
    for (let index = 0; index < selectedFiles.length; index++) {
      let element = selectedFiles[index];
      formData.append(`body${index}`, element);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    dispatch(cargarForm2(empleado, puestoForm, sucursal, evaluador, nombreEvaluacion, fechaIngreso, area, referido, referente, comentario30, comentario60, comentario80, puestoEvaluador, pasaPeriodo, empleadoParticipe, formData, config))
    setLoading(true)
    setMensaje("Cargando...")
    setShow(true)
    limpiarForm()
  }

  const cargaExitoDos = () => {
    if (resultadoDos === "EXITO") {
      setMensaje("La evaluación fue creada con éxito!")
      setError(false)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        obtenerEvaluaciones()
        props.history.push('/')
      }, 500);
      setTimeout(() => {
        setShow(false)
      }, 1500)
    }
    else if (resultadoDos === "ERROR") {
      setMensaje("Error al crear evaluación!")
      setError(true)
      setLoading(false)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }
  }

  const obtenerEvaluaciones = () => {
    dispatch(consultaFETCHevaluaciones())
  }

  const obtenerBusquedaPersonal = () => {
    dispatch(consultaFETCHbusquedaPersonal())
  }

  const obtenerAutorizado = () => {
    dispatch(consultaFETCHautorizadoPor())
  }
  const obtenerSucursales = () => {
    dispatch(consultaFETCHsedesRH())
  }
  const obtenerArea = () => {
    dispatch(consultaFETCHareas())
  }
  const obtenerPuesto = () => {
    dispatch(consultaFETCHpuesto())
  }

  const completarOpcionPuesto = (puesto) => {
    const puest = [];
    puesto.forEach((item) => {
      var p = { value: item.new_cargoid, label: item.new_name };
      puest.push(p);
    });
    setSelectPuesto(puest);
  };
  const completarOpcionAreas = (areas) => {
    const area = [];
    areas.forEach((item) => {
      var a = { value: item.new_areaid, label: item.new_name };
      area.push(a);
    });
    setSelectArea(area);
  };
  const completarOpcionSedes = (sedes) => {
    const sucu = [];
    sedes.forEach((item) => {
      var s = { value: item.accountid, label: item.name };
      sucu.push(s);
    });
    setSelectSucursal(sucu);
  };
  const completarOpcionAutorizado = (aut) => {
    const autorizado = [];
    aut.forEach((item) => {
      var a = { value: item.contactid, label: item.fullname };
      autorizado.push(a);
    });
    setSelectAutorizado(autorizado);
    setSelectReferente(autorizado)
  };

  const reportaHandle = (valor) => {
    setReportaSeleccionar(valor.value)
  }
  const autorizadoHandle = (valor) => {
    setAutorizadoSeleccionar(valor.value)
  }
  const puestoHandle = (valor) => {
    setPuestoSeleccionar(valor.value)
  }
  const motivoBusquedaHandle = (valor) => {
    setMbusquedaSeleccionar(valor.value)
  }
  const tipoBusquedaHandle = (valor) => {
    setTipBusqueda(valor.value)
  }
  const areaHandle = (valor) => {
    setAreaSeleccionar(valor.value)
  }
  const sedeHandle = (valor) => {
    setSucursalSeleccionar(valor.value)
  }
  const evaluadorHandle = (valor) => {
    setEvaluador(valor.value)
  }
  //constantes evaluacion
  const empleadoHandle = (valor) => {
    setEmpleado(valor.value)
  }
  const puestoEvHandle = (valor) => {
    setPuestoForm(valor.value)
  }
  const sucursalHandle = (valor) => {
    setSucursal(valor.value)
  }
  const areaEvHandle = (valor) => {
    setArea(valor.value)
  }
  const referenteHandle = (valor) => {
    setReferente(valor.value)
  }
  const puestoEvaluadorHandle = (valor) => {
    setPuestoEvaluador(valor.value)
  }
  const esReferidoHandle = (valor) => {
    setReferido(valor.value)
  }
  const empleadoParticipeHandle = (valor) => {
    setEmpleadoParticipe(valor.value)
  }
  const pasaPeriodoHandle = (valor) => {
    setPasaPeriodo(valor.value)
  }


  const motivoBusqueda = [
    { value: '100000000', label: 'Nuevo Puesto' },
    { value: '100000001', label: 'Reemplazo' },
  ]

  const tipoBusqueda = [
    { value: '100000000', label: 'Interna' },
    { value: '100000001', label: 'Externa' },
    { value: '100000002', label: 'Interna/Externa' },
  ]

  const opcionSiNo = [
    { value: false, label: 'No' },
    { value: true, label: 'Sí' }
  ]

  return (
    <animated.div className="container" style={fade}>
      <div className="col-sm-12 mt-4">
        <div className="card p-2 shadow pad borde-none sgr mb-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link fw-bolder text-dark active" id="busqueda-tab" data-bs-toggle="tab" data-bs-target="#busqueda" type="button" role="tab" aria-controls="busqueda" aria-selected="true">
                Crear Busqueda de personal
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link fw-bolder text-dark" id="evaluacion-tab" data-bs-toggle="tab" data-bs-target="#evaluacion" type="button" role="tab" aria-controls="evaluacion" aria-selected="false">
                Evaluación periodo de prueba
              </button>
            </li>
          </ul>

          <div className="tab-content">


            <div className="tab-pane fade show active p-3" id="busqueda" role="tabpanel" aria-labelledby="busqueda-tab">
              <form onSubmit={enviarFormulario}>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Puesto a cubrir
                    </label>
                    <Select
                      onChange={e => puestoHandle(e)}
                      options={selecPuesto}
                      type="select"
                      id="select"
                      name="puestoAC"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir puesto"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Motivo de búsqueda
                    </label>
                    <Select
                      onChange={e => motivoBusquedaHandle(e)}
                      options={motivoBusqueda}
                      type="select"
                      id="select"
                      name="motbusq"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir motivo de búsqueda"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Tipo de búsqueda
                    </label>
                    <Select
                      onChange={e => tipoBusquedaHandle(e)}
                      options={tipoBusqueda}
                      type="select"
                      id="select"
                      name="tipobusq"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir Tipo de búsqueda"
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Autorizado por
                    </label>
                    <Select
                      onChange={e => autorizadoHandle(e)}
                      options={selectAutorizado}
                      type="select"
                      id="select"
                      name="autpor"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir responsable..."
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Motivo del reemplazo
                    </label>
                    <textarea
                      onChange={e => setDescripcion(e.target.value)}
                      value={descripcion}
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="comentanos un poco más..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Sucursal
                    </label>
                    <Select
                      onChange={e => sedeHandle(e)}
                      options={selectSucursal}
                      type="select"
                      id="select"
                      name="sucursal"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir sucursal..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Area
                    </label>
                    <Select
                      onChange={e => areaHandle(e)}
                      options={selectArea}
                      type="select"
                      id="select"
                      name="area"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir Area..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Reporta a
                    </label>
                    <Select
                      onChange={e => reportaHandle(e)}
                      options={selectAutorizado}
                      type="select"
                      id="select"
                      name="reporA"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir responsable..."
                      required
                    ></Select>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Personas a cargo
                    </label>
                    <label className="radio">
                      {" "}
                      <label label="radio" className="me-2">
                        {" "}
                        <input
                          type="radio"
                          name="personacargo"
                          value="No"
                          onClick={() => setPersonaAcargo('no')}
                        />
                        No
                      </label>
                      <input
                        type="radio"
                        name="personacargo"
                        value="Si"
                        onClick={() => setPersonaAcargo('si')}
                      />
                      Si
                    </label>
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Jornada de Trabajo
                    </label>
                    <input
                      onChange={e => setJornada(e.target.value)}
                      value={jornada}
                      type="text"
                      id="text"
                      name="jtrabajo"
                      className="form-control"
                      placeholder="Cuáles son los dias y horarios de trabajo?"
                      required
                    />
                  </div>
                </div>

                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Observaciones/ requisitos del puesto
                    </label>
                    <textarea
                      onChange={e => setObservaciones(e.target.value)}
                      value={observaciones}
                      className="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      placeholder="comentanos un poco más..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="card text-center">
                  <div class="card-header col-sm-12">
                    <h5 className="fw-bolder">Adjuntar Archivo</h5>
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
                    <Uploady debug enhancer={mockSenderEnhancer}  >
                      <CopyPasteRh autoUpload={false} params={{ test: "paste" }} tipo="busquedapersonal" />
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
            </div>
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


            <div className="tab-pane fade show p-3" id="evaluacion" role="tabpanel" aria-labelledby="evaluacion-tab">
              <form onSubmit={enviarFormulario2}>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Empleado
                    </label>
                    <Select
                      options={selectReferente}
                      onChange={e => empleadoHandle(e)}
                      type="select"
                      id="select"
                      name="empleado"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir empleado"
                      required
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Puesto
                    </label>
                    <Select
                      options={selecPuesto}
                      onChange={e => puestoEvHandle(e)}
                      type="select"
                      id="select"
                      name="puesto"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir puesto"
                      required
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Fecha de ingreso
                    </label>
                    <input
                      onChange={e => setFechaIngreso(e.target.value)}
                      type="date"
                      id="date"
                      name="fingre"
                      className="form-control"
                      classNamePrefix="select"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Sucursal
                    </label>
                    <Select
                      options={selectSucursal}
                      onChange={e => sucursalHandle(e)}
                      type="select"
                      id="select"
                      name="sucursal"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir sucursal..."
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Area
                    </label>
                    <Select
                      options={selectArea}
                      onChange={e => areaEvHandle(e)}
                      type="select"
                      id="select"
                      name="area"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir area..."
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Evaluador
                    </label>
                    <Select
                      options={selectReferente}
                      onChange={e => evaluadorHandle(e)}
                      type="select"
                      id="select"
                      name="referente"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir evaluador..."
                      required
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Referente
                    </label>
                    <Select
                      options={selectReferente}
                      onChange={e => referenteHandle(e)}
                      type="select"
                      id="select"
                      name="referente"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir referente..."
                      required
                    ></Select>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Puesto del evaluador
                    </label>
                    <Select
                      options={selecPuesto}
                      onChange={e => puestoEvaluadorHandle(e)}
                      type="select"
                      id="select"
                      name="peva"
                      className="basic multi-select"
                      classNamePrefix="select"
                      placeholder="Elegir puesto del evaluador..."
                    ></Select>
                  </div>
                </div>
                {/* <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion">
                      Fecha de creación
                    </label>
                    <input
                      onChange={e => setFechaCreacion(e.target.value)}
                      type="datetime-local"
                      id="dtlocal"
                      name="fechahora"
                      className="form-control"
                    />
                  </div>
                </div> */}
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Es referido?
                    </label>
                    <div class="form-group">
                      <Select
                        onChange={e => esReferidoHandle(e)}
                        options={opcionSiNo}
                        type="select"
                        id="select"
                        name="peva"
                        className="basic multi-select"
                        classNamePrefix="select"
                        placeholder="Seleccionar..."
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      El Empleado participo del curso de Induccion?
                    </label>
                    <div class="form-group">
                      <Select
                        options={opcionSiNo}
                        onChange={e => empleadoParticipeHandle(e)}
                        type="select"
                        id="select"
                        name="peva"
                        className="basic multi-select"
                        classNamePrefix="select"
                        placeholder="Seleccionar..."
                      ></Select>
                    </div>

                  </div>
                </div>
                <div className="col-sm-4 col-md-12">
                  <div className="mb-2 p-2">
                    <label className="form-label fw-bolder lbl-precalificacion required">
                      Nombre
                    </label>
                    <input
                      onChange={e => setNombreEvaluacion(e.target.value)}
                      type="text"
                      id="text"
                      name="jtrabajo"
                      className="form-control"
                      placeholder="Evaluación de periodo de prueba"
                      required
                    />
                  </div>
                </div>
                <hr />
                <h6 className="fw-bolder">
                  Completar segun la Performance alcanzada
                </h6>
                <div className="row">
                  <h6 className="mt-3 ms-3 fw-bolder text-secondary">Comentarios</h6>
                </div>
                <div className="row">
                  <div className="col-sm-2 p-5">
                    <h6 className="fw-bolder">30 dias:</h6>
                  </div>
                  <div className="col-sm-10">
                    <div class="form-group">
                      <textarea
                        onChange={e => setComentario30(e.target.value)}
                        className="form-control mt-2"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Comentanos un poco más los resultados del 1er. Mes (30 dias).."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 p-5">
                    <h6 className="fw-bolder">60 dias:</h6>
                  </div>
                  <div className="col-sm-10">
                    <div class="form-group">
                      <textarea
                        onChange={e => setComentario60(e.target.value)}
                        className="form-control mt-2"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Comentanos un poco más los resultados del 2do. Mes (60 dias).."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 p-5">
                    <h6 className="fw-bolder">80 dias:</h6>
                  </div>
                  <div className="col-sm-10">
                    <div class="form-group">
                      <textarea
                        onChange={e => setComentario80(e.target.value)}
                        className="form-control mt-2"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Comentanos un poco más los resultados del 3er. Mes (80 dias).."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
                <h6 className="mt-3 ms-3 fw-bolder text-secondary">
                  Definicion de Continuidad
                </h6>
                <div className="row">
                  <div className="col-sm-2 p-3">
                    <h6 className="ms-3 fw-bolder">
                      Pasa Periodo de Prueba?
                    </h6>
                  </div>
                  <div className="col-sm-10 p-3">
                    <div class="form-group">
                      <Select
                        onChange={e => pasaPeriodoHandle(e)}
                        options={opcionSiNo}
                        type="select"
                        id="select"
                        name="peva"
                        className="basic multi-select"
                        classNamePrefix="select"
                        placeholder="Seleccionar..."
                      ></Select>
                    </div>
                  </div>
                  <div class="d-flex align-items-end justify-content-end">
                    <button
                      type="submit"
                      name="btnSubmitAlyc"
                      className="btn btn-dark"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </animated.div >
  );
};

export default withRouter(RecursosHumanos);