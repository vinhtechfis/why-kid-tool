import { Button, TextField } from "@mui/material";
import CanvasItem from "../models/canvas_item";

type RightSideProps = {
  index: number,
  data: CanvasItem,
  updateDataFn?: (newData: CanvasItem) => void,
  bgItem?: CanvasItem,
}

function RightSide(props: RightSideProps) {
  const { index, data, updateDataFn } = props;
  return (<div className="flex flex-col justify-start w-full h-full">
    <span className="text-xl text-black font-semibold w-full border-gray-400 border-[1px]">Info Item</span>
    <div className="flex flex-col justify-between p-2">
      <h4 className="text-black text-lg">Item {props.index}</h4>
      <RowData title="Width" value={data.width} onChange={(newWidth) => {
        if (updateDataFn) {
          updateDataFn({
            ...data,
            width: parseFloat(newWidth),
          })
        }


      }} />
      <RowData title="Height" value={data.height} onChange={(newHeight) => {
        if (updateDataFn) {
          updateDataFn({
            ...data,
            height: parseFloat(newHeight),
          })
        }
      }} />
      <RowData title="X" value={data?.x} onChange={(newX) => {
        if (updateDataFn) {
          updateDataFn({
            ...data,
            x: parseFloat(newX),
          })
        }
      }} />
      <RowData title="Y" value={data?.y} onChange={(newY) => {
        if (updateDataFn) {
          updateDataFn({
            ...data,
            y: parseFloat(newY),
          })
        }
      }} />
      <RowData title="R_X" value={(data?.x ?? 0) / (props.bgItem?.width ?? 1)} disabled />
      <RowData title="R_Y" value={(data?.y ?? 0) / (props.bgItem?.height ?? 1)} disabled />
      <RowData title="R_W" value={(data?.width ?? 0) / (props.bgItem?.width ?? 1)} disabled />
      <RowData title="R_H" value={(data?.height ?? 0) / (props.bgItem?.height ?? 1)} disabled />
      <RowData title="Opacity" value={(data?.opacity ?? 1.0)} onChange={(newOpacity) => {
        if (updateDataFn) {
          updateDataFn({
            ...data,
            opacity: parseFloat(newOpacity),
          })
        }
      }} />

      {/* <Button onClick={handleClick}>Get Relative Offset</Button> */}
    </div>
  </div>)

}

type RowDataProp = {
  title: string,
  value?: number,
  disabled?: boolean,
  onChange?: (newValue: string) => void
}
function RowData(props: RowDataProp) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-base text-black p">{props.title}:</span>
      <TextField disabled={props.disabled}
        size={'small'}
        type="number"
        inputProps={{
          "step": props.title.toLocaleLowerCase().includes("opacity") ? 0.1 : 1
        }}
        defaultValue={props.value}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value);
          }

        }} />
    </div>
  )
}
export default RightSide;