import React from 'react'
import Uploady, { useUploady, useBatchAddListener } from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import { cargarArchivos } from '../Redux/DocumentosLegales'; 
import { useDispatch, useSelector } from "react-redux";

const CopyPasteDoc = ({props, tipo}) => {
    const containerRef = React.useRef(null);
    const [archivos, setArchivos] = React.useState([])
    const uploady = useUploady();
    const dispatch = useDispatch();
    const legalesidSelector = useSelector((store) => store.legales.ticket);
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
        if (legalesidSelector != undefined && legalesidSelector != "") {
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
                dispatch(cargarArchivos(legalesidSelector, formData, config, tipo))
                setArchivos([])
            }
        }
    }, [legalesidSelector])

    return (
        <div ref={containerRef}>
            <p className='text-secondary'>Click aquí y pega tu captura de pantalla</p>
            <p>( Ctrl+C | Ctrl+V )</p>
        </div>
    )
}

export default CopyPasteDoc
