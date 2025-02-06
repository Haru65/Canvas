import React, { useEffect, useRef, useState } from 'react';
import { Canvas,Rect ,Circle, PencilBrush} from 'fabric';
import "./Home.css"

const Home = () => {
const canvasref = useRef(null)
const [canva,setcanva] = useState(null)

useEffect(()=>{
    if (canvasref.current) {

        const initcanva = new Canvas(canvasref.current,{
        
            width:1200,
            height:700,
            
        })
        
        initcanva.isDrawingMode = false
        initcanva.backgroundColor="#fff",
        initcanva.renderAll()
        
        setcanva(initcanva);
    
        return ()=>(
            initcanva.dispose()
        )
    }
},[])
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
       
            <button onClick={addcircle}  >
                click me
            </button>
            <button onClick={Drawing}>
                rect
            </button>
      </div>
</>
        
    
    );
}

export default Home;


