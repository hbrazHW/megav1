import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import useFileUpload from "react-use-file-upload";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { copyImageToClipboard, getBlobFromImageElement,
  copyBlobToClipboard } from "copy-image-clipboard";

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

  // const [isPaste, setIsPaste] = useState (false);
 
  // const handlePaste = () =>{
  //   setIsPaste(true);

  // };
        
// const target = document.querySelector("div.target");

// target.addEventListener("paste" (e))=>{
//   const item = 
//   e.clipboardData.items[0];
  
//   if(item.type.indexOf("image") === 0{
//     const blob = item.getAsfile();
//     const reader =new FileReader ();
//     reader.onload = (e) =>{
//       document.getElementById("image").src = e.target.result;
//     };
//     reader.reasAsDataURL(blob);
//   }
//    e.preventDefault();
// });
 

  const inputRef = useRef();
  const imageElement = document.getElementById('image')
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
      return copyBlobToClipboard(blob)
    })
    .then(() => {
      console.log('Blob Copied')
    })
    .catch((e) => {
      console.log('Error: ', e.message)
    })
   
    // useEffect(() => {
     
    //   setTimeout( ()=>{
    //     if(isPaste) setIsPaste(false);
    //   }, 2000 )
       
     
    // }, [isPaste])

  return (
    <div ClassName="upload">
      <h1>Subir Archivos</h1>

      <p>
        Por favor, Arrastre o seleccione tus archivos en el box a la derecha
      </p>

      <div className="form-container">
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
              <li>Tamaño total: {totalSize}</li>
              <li>Total Bytes: {totalSizeInBytes}</li>

              <li className="clear-all">
                <button onClick={() => clearAllFiles()}>Limpiar todo</button>
              </li>
            </ul>
          )}
        </div>

        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <copyImageToClipboard  >

          <div
            style={{
              marginTop: 5,
              padding: 10,
              fontStyle: "italic",
              color: "red",
              border: "1px solid red",
              height: 500,
            }}

          >
            Paste Area 
          </div>

        </copyImageToClipboard>
       
        <div
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, "a");
          }}
        >
          <p>Arrastre y suelte aca tus archivos</p>

          <button onClick={() => inputRef.current.click()}>
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
      </div>
    
      <div className="submit">
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default AdjuntarArchivo;
