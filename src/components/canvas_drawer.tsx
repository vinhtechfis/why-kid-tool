
import { Alert, Button, Checkbox, FormControlLabel, Input, Snackbar, TextField } from "@mui/material";
import { Layer, Circle, Stage, Image } from "react-konva";
import UploadFileButton from "./upload_file_button";
import { info } from "console";
import { useEffect, useState } from "react";
import ImageItem from "./background_layer";
import CanvasItem from "../models/canvas_item";
import { useCopyToClipboard } from "usehooks-ts";
import { getFitContainSize } from "../handler/utils";
import RightSide from "./right_side";

function CanvasDrawer() {
  const [itemSelectedIndex, setItemSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<CanvasItem | undefined>();
  const [backgroundItem, setBackgroundItem] = useState<CanvasItem | undefined>();
  const [items, setItems] = useState<CanvasItem[]>([]);

  

  const updateItemAtIndex = (index: number, newValue: CanvasItem) => {
    const updatedItems = items.map((item, i) =>
      i === index ? newValue : item
    );
    setItems(updatedItems);
  }

  
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
  // useEffect(()=>{
  //   if(itemSelectedIndex>=0){
  //     console.log("Update selected item");
  //     console.log(items[itemSelectedIndex]);
  //     setSelectedItem({
  //       ...items[itemSelectedIndex],
  //     })
  //   }
  // },[itemSelectedIndex]);

  console.log("Selected item: "+JSON.stringify(items[itemSelectedIndex]));

  return (
    <div className="w-full h-full flex justify-start">
      {/* Left side */}
      <div className="flex flex-col flex-grow  items-center">
        <div className="flex flex-wrap justify-start items-center gap-x-1">
          <UploadFileButton title={'Set Background'} onImageSelected={(info) => {
            const preferedSize = getFitContainSize(info.width ?? 0, info.height ?? 0, 800, 600);
           
            setBackgroundItem({
              width: preferedSize.width,
              height: preferedSize.height,
              url: info.blob_url ?? '',
              x: 0,
              y: 0,
            });
          }} />
          <UploadFileButton title={'Add Item'} onImageSelected={(info) => {
            
            const newItem: CanvasItem = {
              url: info.blob_url ?? '',
              width: 30,
              height: 30,
              x: 0,
              y: 0,
            }
            console.log(newItem);
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
                  console.log('Update item: '+item.url);
                  updateItemAtIndex(index, {
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
      {itemSelectedIndex >= 0 &&( <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {items[itemSelectedIndex].x??0/(backgroundItem?.width??1)} , {(items[itemSelectedIndex].y??0)/(backgroundItem?.height??1)}
        </Alert>
      </Snackbar>)}
      {/* Right side */}
      <div className=" w-[200px] h-auto  bg-white">
        {itemSelectedIndex>=0 &&
        <RightSide
         data={items[itemSelectedIndex]}
         bgItem={backgroundItem}
          index={itemSelectedIndex}
           updateDataFn={(newData)=>{
          updateItemAtIndex(itemSelectedIndex,newData);
        }}/>
        }
        {
          itemSelectedIndex < 0 &&
        (  <div className=" flex flex-wrap">
            <span className="text-black"> Default setting</span>
          </div>)
        }

      </div>
    </div>
  )
}




export default CanvasDrawer;