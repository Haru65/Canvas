import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Rect, Circle, PencilBrush } from 'fabric';
import "./Home.css";

const Home = () => {
  const canvasref = useRef(null);
  const [canva, setcanva] = useState(null);
  const [selectedobject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [diameter, setDiameter] = useState(50);
  const [colour, setColor] = useState("#2F4DC6");
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const size = window.innerHeight;

  useEffect(() => {
    if (canvasref.current) {
      const initcanva = new Canvas(canvasref.current, {
        width: 1200,
        height: size,
        backgroundColor: "#f0f0f0",
      });
      setcanva(initcanva);

      initcanva.on("selection:created", (event) => handleObjectSelection(event.selected[0]));
      initcanva.on("selection:updated", (event) => handleObjectSelection(event.selected[0]));
      initcanva.on("selection:cleared", () => setSelectedObject(null));

      return () => initcanva.dispose();
    }
  }, []);

  const handleObjectSelection = (object) => {
    if (!object) return;
    setSelectedObject(object);
    if (object.type === "rect") {
      setWidth(object.width * object.scaleX);
      setHeight(object.height * object.scaleY);
    } else if (object.type === "circle") {
      setDiameter(object.radius * 2 * object.scaleX);
    }
    setColor(object.fill);
  };

  useEffect(() => {
    if (!selectedobject) return;
    selectedobject.set({
      width: width,
      height: height,
      radius: diameter / 2,
      fill: colour,
    });
    canva.renderAll();
  }, [width, height, diameter, colour]);

  const addCircle = () => {
    if (canva) {
      const circle = new Circle({
        top: 150,
        left: 150,
        radius: diameter / 2,
        fill: colour,
      });
      canva.add(circle);
    }
  };

  const addRectangle = () => {
    if (canva) {
      const rect = new Rect({
        width: width,
        height: height,
        fill: colour,
      });
      canva.add(rect);
    }
  };

  const toggleDrawing = () => {
    if (canva) {
      canva.isDrawingMode = !canva.isDrawingMode;
      if (canva.isDrawingMode) {
        const brush = new PencilBrush(canva);
        brush.color = brushColor;
        brush.width = brushSize;
        canva.freeDrawingBrush = brush;
      }
      setIsDrawing(canva.isDrawingMode);
    }
  };

  useEffect(() => {
    if (canva && canva.isDrawingMode) {
      canva.freeDrawingBrush.color = brushColor;
      canva.freeDrawingBrush.width = brushSize;
    }
  }, [brushColor, brushSize]);

  const exportCanvas = () => {
    if (canva) {
      const link = document.createElement("a");
      link.href = canva.toDataURL({ format: "png" });
      link.download = "canvas_image.png";
      link.click();
    }
  };

  const clearCanvas = () => {
    if (canva) {
      canva.clear();
      canva.backgroundColor = "#f0f0f0";
      canva.renderAll();
    }
  };

  return (
    <>
      <div className='app'>
        <canvas className='canvas' id='canvas' ref={canvasref} />
        <div className='features'>
          <button className='btn primary' onClick={addRectangle}>Add Rectangle</button>
          <button className='btn primary' onClick={addCircle}>Add Circle</button>
          <button className='btn secondary' onClick={toggleDrawing}>{isDrawing ? "Disable Drawing" : "Enable Drawing"}</button>
          <button className='btn export-btn' onClick={exportCanvas}>Export</button>
          <button className='btn danger' onClick={clearCanvas}>Clear</button>
          <div className='controls'>
            <div className='control-group'>
              <label>Width:</label>
              <input className='input-field' type='number' value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className='control-group'>
              <label>Height:</label>
              <input className='input-field' type='number' value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
            <div className='control-group'>
              <label>Diameter:</label>
              <input className='input-field' type='number' value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} />
            </div>
            <div className='control-group'>
              <label>Shape Color:</label>
              <input className='color-picker' type='color' value={colour} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className='control-group'>
              <label>Brush Color:</label>
              <input className='color-picker' type='color' value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
            </div>
            <div className='control-group'>
              <label>Brush Size:</label>
              <input className='input-field' type='number' value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
