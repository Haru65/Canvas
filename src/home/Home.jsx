import React, { useEffect, useRef, useState } from 'react';
import { Canvas,Rect ,Circle, PencilBrush} from 'fabric';
import "./Home.css"

const Home = () => {
const canvasref = useRef(null)
const [canva,setcanva] = useState(null)
const [selectedobject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [colour, setColor] = useState("");
  const size = window.innerHeight 
  useEffect(()=>{
      if (canvasref.current) {
  
          const initcanva = new Canvas(canvasref.current,{
          
              width:1200,
              height:size
              
              
          })
          
          initcanva.isDrawingMode = false
          initcanva.backgroundColor="#d1d1d1",
          initcanva.renderAll()
          
          setcanva(initcanva);
      
          return ()=>(
              initcanva.dispose()
          )
      }
  },[])

  useEffect(() => {
    if (!canva) return;

    // Selection Updated
    canva.on("selection:updated", (event) => {
      handleObjectSelection(event.selected[0]);
    });

    // Selection Cleared
    canva.on("selection:cleared", () => {
      setSelectedObject(null);
      clearSettings();
    });

    // Object Modified
    canva.on("object:modified", (event) => {
      handleObjectSelection(event.target);
    });

    // Object Scaling
    canva.on("object:scaling", (event) => {
      handleObjectSelection(event.target);
    });
  }, [canva]);

  const handleObjectSelection = (object) => {
    if (!object) return;

    setSelectedObject(object);

    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill);
      setDiameter("");
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.diameter * 2 * object.scaleX));
      setColor(object.fill);
      setHeight("");
      setWidth("");
    }
  };
  const clear = () => {
    setHeight("");
    setWidth("");
    setDiameter("");
    setColor("");
  };
 const addcircle=()=>{
    if(canva){
        console.log("canva is loaded")
        const circle = new Circle({
            top:150,
            left:150,
            radius:50,
            fill:"#2F4DC6"
        })
        canva.add(circle)
    }


 }
const addrect=() =>{
    if(canva){
        console.log("canvas is loaded")
        const rectangle = new Rect({
            width:70,
            height:120
        }); canva.add(rectangle)
    }

}
const Drawing =() =>{
    
    if(canva){
        canva.isDrawingMode = !canva.isDrawingMode;
        if(canva.isDrawingMode){
            canva.freeDrawingBrush = new PencilBrush(canva);
            canva.freeDrawingBrush.color = "red"; // Brush color
    canva.freeDrawingBrush.width = 5; 
        } 
        setIsDrawing(canva.isDrawingMode);
    }
}


    return (
<>
      <div className='app'>

           <canvas className='canvas' id='canvas' ref={canvasref}/>
           <div className='features'>
            <button onClick={addrect} > rect </button>
           <button onClick={addcircle}> circle </button>
            <input value={width } label="width" onChange={(e) => setWidth(e.target.value)} />
            <input value={height} label="height" />
            <input value={diameter} label="diameter" />
            <input value={colour} label="colour" />
            <input value={selectedobject} label="selectedobject" />
            </div>
           
      </div>
</>
        
    
    );
}

export default Home;


