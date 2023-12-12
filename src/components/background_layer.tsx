import { Image } from "react-konva";
import useImage from "use-image";
import ItemData from "../models/item_data";

type ImageItemProps = {
    src: string,
    onDragEnd?: (data: ItemData) => void
} & ItemData

function ImageItem(props: ImageItemProps) {
    const { src, width, height, onDragEnd } = props;
    const [image] = useImage(src);
    return (
        <Image draggable height={height ?? 100} width={width ?? 100} image={image} onDragEnd={(e) => {
            const { attrs } = e.target;
            const data: ItemData = {
                x: attrs.x,
                y: attrs.y,
                width: attrs.width,
                height: attrs.height,
            }
            if (onDragEnd) {
                onDragEnd(data);
            }
        }} />


    )
}

export default ImageItem;