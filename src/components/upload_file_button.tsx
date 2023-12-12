import { Button } from "@mui/material";
import ImageInfo from "../models/image_info";

type UploadFileButtonProps = {
    title: string,
    onImageSelected?: (info: ImageInfo) => void,
}

function UploadFileButton(props: UploadFileButtonProps) {
    const { title, onImageSelected } = props;
    return (<Button component="label" variant="contained" onClick={() => {
        // const inputEle = document.getElementById(id);
        // inputEle?.click();
    }} >
        {title}
        <input className="hidden" type="file" onChange={async (e) => {
            console.log("Seleted file: ", e.target.value);
            if (e.target.files && e.target.files.length > 0) {
                const sFile = e.target.files[0];
                console.log(sFile.type);
                if (sFile.type.indexOf('image') >= 0) {
                    const imageBitMap = await createImageBitmap(sFile);
                    if (onImageSelected) {
                        console.log("not null");
                        const info = {
                            width: imageBitMap.width,
                            height: imageBitMap.height,
                            file_name: sFile.name,
                            blob_url: URL.createObjectURL(sFile)

                        };
                        console.log(info);
                        onImageSelected.call(null, info);
                    } else {
                        console.log("No function passing");
                    }
                }

            }
        }} />
    </Button>)
}

export default UploadFileButton