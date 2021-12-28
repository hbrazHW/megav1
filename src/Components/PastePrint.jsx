import React,{ useState } from "react";
import styled from "styled-components";
import Uploady, {
    useItemStartListener,
    useItemFinalizeListener
} from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import whithPasteUpload from "@rpldy/upload-paste";
import UploadPreview from "@rpldy/upload-preview";

const mockSenderEnhancer = getMockSenderEnhancer();
const PreviewContainer = styled.div`
margin-top: 20px;

img {
  max-width: 400px;
}
`;

// const StyleDropZone = styled(UploadDropZone)`
// width: 400px;
// height: 200px;
// border: 1px solid #f1f1f1;
// display: flex;
// align-items: center;
// margin-bottom: 10px

// `;

const StyledInput = styled.input`
 width: 600px;
 height:64px;
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

const PastePrint = () => {


    return (
        <Uploady debug enhancer={mockSenderEnhancer}>
        <div className="">
            <h2>Subi tus archivos</h2>
            {/* <PasteUploadDropZone params={{test: "paste"}}>
                Podes arrastrar aca tus archivos!
                <br />
                o
                <br />
                copia y pega tu archivo para cargarlo
            </PasteUploadDropZone> */}
            <PasteInput extraProps={{placeholder:"pega acá tu printScreen con el comando Ctrl+V"}} />
            <UploadStatus />
            <PreviewContainer>
                <UploadPreview/>
            </PreviewContainer>
        </div>
        </Uploady>
    )
}

export default PastePrint
