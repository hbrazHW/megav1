import React from 'react'
import Uploady, { useUploady, useBatchAddListener } from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import { cargarArchivos } from '../Redux/DocumentosLegales'
import { useDispatch, useSelector } from "react-redux";

export const ElementPasteLegales = ({props, tipo}) => {
    const containerRef = React.useRef(null);
    const [archivos, setArchivos] = React.useState([])
    const uploady = useUploady();
    const dispatch = useDispatch();
    const legalesIdSelector = useSelector((store) => store.legales.ticket);
    const onPasteUpload = React.useCallback(({ count }) => {
        console.log("ELEMENT PASTE-TO-UPLOAD files: ", count);
    }, []);

    useBatchAddListener((batch) => {
        // console.log(`batch ${batch.id} was just added with ${batch.items.length} items`);  
        // console.log(batch.items[0].file)
        const archivosAux = []
        batch.items.forEach(item => {
            archivosAux.push(item.file)
        })
        setArchivos(archivosAux)
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // };
        // const formData = new FormData();
        // for (let index = 0; index < archivosAux.length; index++) {
        //     let element = archivosAux[index];
        //     formData.append(`body${index}`, element);
        // }
        // dispatch(cargarArchivos("1", formData, config))
        // dispatch(cargarArchivos(archivosAux))
    });

    const { toggle, getIsEnabled } = usePasteUpload(props, containerRef, onPasteUpload)

    React.useEffect(() => {
        if (legalesIdSelector != undefined && legalesIdSelector != "") {
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
                dispatch(cargarArchivos(legalesIdSelector, formData, config, tipo))
                setArchivos([])


                
            }
        }
    }, [legalesIdSelector])

    return (
        <div ref={containerRef}>
         Click here & Paste a file
            Paste is:   {getIsEnabled() ? "enabled" : "disabled"}
        </div>
    )
}

export default ElementPasteLegales