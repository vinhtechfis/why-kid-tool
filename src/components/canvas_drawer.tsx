
import { Alert, Button, Checkbox, FormControlLabel, Input, Snackbar, TextField } from "@mui/material";
import { Layer, Circle, Stage, Image } from "react-konva";
import UploadFileButton from "./upload_file_button";
import { info } from "console";
import { useEffect, useState } from "react";
import ImageItem from "./background_layer";
import CanvasItem from "../models/canvas_item";
import { useCopyToClipboard } from "usehooks-ts";
import { getFitContainSize } from "../handler/utils";

function CanvasDrawer() {
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<CanvasItem | undefined>();
  const [backgroundItem, setBackgroundItem] = useState<CanvasItem | undefined>();
  const [items, setItems] = useState<CanvasItem[]>([]);

  useCopyToClipboard()

  const updateItemAtIndex = (index: number, newValue: CanvasItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? newValue : item
    );
    setItems(updatedItems);
  }

  console.log(items);
  const [showToast, setShowToast] = useState(false);
  const handleClick = () => {
    setShowToast(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };


  return (
    <div className="w-full h-full flex justify-start">
      {/* Left side */}
      <div className="flex flex-col flex-grow  items-center">
        <div className="flex flex-wrap justify-start items-center gap-x-1">
          <UploadFileButton title={'Set Background'} onImageSelected={(info) => {
            console.log("Info get: " + JSON.stringify(info));

            const preferedSize = getFitContainSize(info.width ?? 0, info.height ?? 0, 800, 600);
            console.log(preferedSize);
            setBackgroundItem({
              width: preferedSize.width,
              height: preferedSize.height,
              url: info.blob_url ?? '',
              x: 0,
              y: 0,
            });
          }} />
          <UploadFileButton title={'Add Item'} onImageSelected={(info) => {
            console.log("Item data: " + JSON.stringify(info));
            const newItem: CanvasItem = {
              url: info.blob_url ?? '',
              width: 30,
              height: 30,
              x: 0,
              y: 0,
            }
            setItems((prev) => [...prev, newItem]);
          }} />
          {/* <FormControlLabel
            label='Use custom size'
            control={
              <Checkbox
                onChange={(e) => {
                  console.log("data change" + e.target.value)
                }}
              />}
            labelPlacement="end"
          /> */}
          {/* <div className="flex flex-col items-start gap-y-1">
            <span className="text-base">Width: <TextField size={'small'} defaultValue={500} type="number" disabled={!isCustom} /></span>
            <span className="text-base">Height: <TextField size={'small'} defaultValue={500} type="number" disabled={!isCustom} /></span>
          </div> */}

        </div>
        <div className="bg-slate-200">
          <Stage className="bg-white" height={backgroundItem?.height ?? 600} width={backgroundItem?.width ?? 800} >
            <Layer>
              {backgroundItem && <ImageItem
                src={backgroundItem.url} x={backgroundItem.x} y={backgroundItem.y}
                width={backgroundItem.width} height={backgroundItem.height}
                onClick={() => { setItemSelectedIndex(-1) }}
              />}
              {items.map((item, index) => <ImageItem key={index}
                src={item.url} x={item.x} y={item.y}
                width={item.width} height={item.height}
                onClick={() => {
                  console.log('Click at ' + index)
                  setItemSelectedIndex(index);
                }}
                draggable
                onDragEnd={(newData) => {
                  updateItemAtIndex(itemSelectedIndex, {
                    ...item,
                    x: newData.x,
                    y: newData.y,
                    width: newData.width,
                    height: newData.height,
                  });

                  // console.log("New data: " + JSON.stringify(newData));

                  // setItems(items.map((item, index) => item));
                }}
              />)}
              {/* <Circle draggable onDragEnd={(e) => {
                console.log(e.currentTarget.attrs);
              }} x={200} y={100} radius={50} fill="green" /> */}
            </Layer>
          </Stage>
        </div>
      </div>
      {itemSelectedIndex >= 0 && <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {items[itemSelectedIndex].x} - {items[itemSelectedIndex].y}
        </Alert>
      </Snackbar>}
      {/* Right side */}
      <div className=" w-[200px] h-auto  bg-white">
        {itemSelectedIndex >= 0 &&
          <div className="flex flex-col justify-start w-full h-full">
            <span className="text-xl text-black font-semibold w-full border-gray-400 border-[1px]">Info Item</span>
            <div className="flex flex-col justify-between p-2">
              <h4 className="text-black text-lg">Item {itemSelectedIndex}</h4>
              <RowData title="Width" value={items[itemSelectedIndex].width} onChange={(newValue) => {
                // items[itemSelectedIndex].width = parseFloat(newValue);
                updateItemAtIndex(itemSelectedIndex, {
                  ...items[itemSelectedIndex],
                  width: parseFloat(newValue),
                })

              }} />
              <RowData title="Height" value={items[itemSelectedIndex].height} onChange={(newValue) => {
                updateItemAtIndex(itemSelectedIndex, {
                  ...items[itemSelectedIndex],
                  height: parseFloat(newValue),
                })
              }} />
              {/* <RowData title="X" value={items[itemSelectedIndex].x} onChange={(newValue) => {
                items[itemSelectedIndex].x = parseFloat(newValue);
                updateItemAtIndex(itemSelectedIndex, {
                  ...items[itemSelectedIndex],
                  x: parseFloat(newValue),
                })
              }} />
              <RowData title="Y" value={items[itemSelectedIndex].y} onChange={(newValue) => {
                updateItemAtIndex(itemSelectedIndex, {
                  ...items[itemSelectedIndex],
                  y: parseFloat(newValue),
                })
              }} />
              <RowData title="R_X" value={(items[itemSelectedIndex].x ?? 0) / (backgroundItem?.width ?? 1)} disabled />
              <RowData title="R_Y" value={(items[itemSelectedIndex].y ?? 0) / (backgroundItem?.height ?? 1)} disabled /> */}
              <Button onClick={handleClick}>Get Relative Offset</Button>
            </div>
          </div>
        }
        {
          itemSelectedIndex < 0 &&
          <div className=" flex flex-wrap">
            <span className="text-black"> Default setting</span>
          </div>
        }

      </div>
    </div>
  )
}


type RowDataProp = {
  title: string,
  value: any,
  disabled?: boolean,
  onChange?: (newValue: string) => void
}
function RowData(props: RowDataProp) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-base text-black p">{props.title}:</span>
      <TextField disabled={props.disabled} size={'small'} type="number" defaultValue={props.value} onChange={(e) => {
        if (props.onChange) {
          props.onChange(e.target.value);
        }
      }} />
    </div>
  )
}

export default CanvasDrawer;