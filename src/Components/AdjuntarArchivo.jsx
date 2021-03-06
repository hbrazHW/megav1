import React, { useRef, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  copyImageToClipboard,
  getBlobFromImageElement,
  copyBlobToClipboard,
} from "copy-image-clipboard";

const AdjuntarArchivo = () => {
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
  const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  `;

  const PasteInput = whithPasteUpload(StyledInput);

  const UploadStatus = () => {
    const [status, setStatus] = useState(null);
    useItemStartListener(() => setStatus("cargando..."));
    useItemFinalizeListener(() => setStatus("Archivo copiado!..."));

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
      console.error("Error archivo incompatible");
    }
  };
  // Pass the image src attribute here
  copyImageToClipboard("assets/image*")
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e) => {
      console.log("Error: ", e.message);
    });

  // Can be an URL too, but be careful because this may cause CORS errors
  copyImageToClipboard("../")
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e) => {
      console.log("Error: ", e.message);
    });
  getBlobFromImageElement(imageElement)
    .then((blob) => {
      return copyBlobToClipboard(blob);
    })
    .then(() => {
      console.log("Blob Copied");
    })
    .catch((e) => {
      console.log("Error: ", e.message);
    });

  return (
    <div ClassName="container">
      <form>
        <h1>Subir Archivos</h1>
        <div className="container">
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
                <li>Tipos de archivos: {fileTypes.join(", ")}</li>
                <li>Tama??o total: {totalSize}</li>
                <li>Total Bytes: {totalSizeInBytes}</li>

                <li className="clear-all">
                  <button onClick={() => clearAllFiles()}>Limpiar todo</button>
                </li>
              </ul>
            )}
          </div>

          {/* Provide a drop zone and an alternative button inside it to upload files. */}
          <Uploady debug enhancer={mockSenderEnhancer}>
            <div className="container">
              <PasteInput
                extraProps={{
                  placeholder: "cop??a con (PrtSc) y pega con (Ctrl+V) ac??",
                }}
              />
              <UploadStatus />
              <PreviewContainer className="container">
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
            <p>Arrastre y suelte aca tus archivos</p>
            {/* <PasteInput
              extraProps={{
                placeholder: "Arrastre y suelte aca tus archivo",
              }}
            /> */}

            <button
              type="button"
              class="btn btn-outline-dark"
              onClick={() => inputRef.current.click()}
            >
              O seleccione tus archivos para subirlos
            </button>

            {/* Hide the crappy looking default HTML input */}
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => setFiles(e, "a")}
            />
          </div>
          <br />
        </div>
        <div className="submit">
          <button
            type="button"
            class="d-flex align-items-end justify-content-end"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdjuntarArchivo;
