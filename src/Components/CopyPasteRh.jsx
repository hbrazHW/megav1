import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Uploady, { useUploady, useBatchAddListener } from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import { cargarArchivos } from '../Redux/RecursosHumanos';


const CopyPasteRh = ({props, tipo}) => {
    const containerRef = React.useRef(null);
    const [archivos, setArchivos] = React.useState([])
    const uploady = useUploady();
    const dispatch = useDispatch();
    const busquedaIdSelector = useSelector((store) => store.recursosHumanos.ticket);
    const onPasteUpload = React.useCallback(({ count }) => {
        console.log("ELEMENT PASTE-TO-UPLOAD files: ", count);
    }, []);

    useBatchAddListener((batch) => {
        const archivosAux = []
        batch.items.forEach(item => {
            archivosAux.push(item.file)
        })
        setArchivos(archivosAux)
    });

    const { toggle, getIsEnabled } = usePasteUpload(props, containerRef, onPasteUpload)

    React.useEffect(() => {
        if (busquedaIdSelector != undefined && busquedaIdSelector != "") {
            if (archivos.length > 0) {
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                };
                const formData = new FormData();
                for (let index = 0; index < archivos.length; index++) {
                    let element = archivos[index];
                    formData.append(`body${index}`, element);
                }
                dispatch(cargarArchivos(busquedaIdSelector, formData, config, tipo))
                setArchivos([])
            }
        }
    }, [busquedaIdSelector])

    return (
        <div ref={containerRef}>
            Click aquí y pega tu imagen o captura de pantalla ||
            Paste is: {getIsEnabled() ? "enabled" : "disabled"}
        </div>
    )
}

export default CopyPasteRh
