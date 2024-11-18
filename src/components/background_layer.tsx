import { Image } from "react-konva";
import useImage from "use-image";
import ItemData from "../models/item_data";

type ImageItemProps = {
    src: string,
    onDragEnd?: (data: ItemData) => void,
    onClick?: () => void,
    draggable?: boolean
} & ItemData

function ImageItem(props: ImageItemProps) {
    const { src, width, height, onDragEnd, onClick, x, y, opacity, } = props;
    const [image] = useImage(src);
    if ((opacity ?? 0) < 1.0) {
        console.log(props);
    }

    return (
        <Image

            x={x ?? 0}
            y={y ?? 0}
            draggable={props.draggable}
            height={height ?? 100}
            width={width ?? 100}
            image={image}
            onClick={onClick}
            opacity={opacity}
            onDragEnd={(e) => {
                const { attrs } = e.target;
                const data: ItemData = {
                    x: attrs.x,
                    y: attrs.y,
                    width: attrs.width,
                    height: attrs.height,
                    opacity: attrs.opacity,
                }
                if (onDragEnd) {
                    onDragEnd(data);
                }
            }} />


    )
}

export default ImageItem;