
import { Button, Checkbox, FormControlLabel, Input, TextField } from "@mui/material";
import { Layer, Circle, Stage, Image } from "react-konva";
import UploadFileButton from "./upload_file_button";
import { info } from "console";
import { useState } from "react";
import ImageItem from "./background_layer";
import CanvasItem from "../models/canvas_item";

function CanvasDrawer() {
  const [isCustom, setIsCustom] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>();
  const [items, setItems] = useState<CanvasItem[]>([]);
  return (
    <div className="w-full h-full flex justify-start">
      {/* Left side */}
      <div className="flex flex-col flex-grow  items-center">
        <div className="flex flex-wrap justify-start items-center gap-x-1">
          <UploadFileButton title={'Set Background'} onImageSelected={(info) => {
            console.log("Info get: " + JSON.stringify(info));
            setBackgroundUrl(info.blob_url);
          }} />
          <UploadFileButton title={'Add Item'} onImageSelected={(info) => {
            console.log("Item data: " + JSON.stringify(info));
            const newItem: CanvasItem = {
              url: info.blob_url ?? '',
            }
            setItems((prev) => [...prev, newItem]);
          }} />
          <FormControlLabel
            label='Use custom size'
            control={
              <Checkbox
                onChange={(e) => {
                  console.log("data change" + e.target.value)
                }}
              />}
            labelPlacement="end"
          />
          {/* <div className="flex flex-col items-start gap-y-1">
            <span className="text-base">Width: <TextField size={'small'} defaultValue={500} type="number" disabled={!isCustom} /></span>
            <span className="text-base">Height: <TextField size={'small'} defaultValue={500} type="number" disabled={!isCustom} /></span>
          </div> */}

        </div>
        <div className="bg-slate-200">
          <Stage className="bg-white w-full min-h-[600px]" >
            <Layer>
              {backgroundUrl && <ImageItem src={backgroundUrl} />}
              {items.map((item, index) => <ImageItem key={index} src={item.url} />)}
              {/* <Circle draggable onDragEnd={(e) => {
                console.log(e.currentTarget.attrs);
              }} x={200} y={100} radius={50} fill="green" /> */}
            </Layer>
          </Stage>
        </div>
      </div>
      {/* Right side */}
      <div className="flex w-[200px] h-auto flex-col justify-start bg-white">
        <span className="text-xl text-black font-semibold w-full border-gray-400 border-[1px]">Info Item</span>
      </div>
    </div>
  )
}

export default CanvasDrawer;