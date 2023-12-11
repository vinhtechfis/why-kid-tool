
import { Button, Input } from "@mui/material";
import { Layer, Circle, Stage } from "react-konva";

function CanvasDrawer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="flex flex-wrap justify-center">
        <Button component="label" variant="contained" >
          Upload file
          <input type="file" onChange={(e) => {
            console.log("Seleted file: ", e.target.value);
            if (e.target.files && e.target.files.length > 0) {
              console.log(URL.createObjectURL(e.target.files[0]));
            }
          }} />
        </Button>
      </div>
      <Stage className="bg-white" width={500} height={600}>
        <Layer>
          <Circle x={200} y={100} radius={50} fill="green" />
        </Layer>
      </Stage>
    </div>
  )
}

export default CanvasDrawer;