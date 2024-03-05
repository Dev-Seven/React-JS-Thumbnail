import React, { useContext, useState } from "react";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif"],
  },
});

// =============================================================================
// CONTEXT
// =============================================================================
const CanvasContext = React.createContext();

// =============================================================================
// HOOKS
// =============================================================================
export function useCanvas() {
  return useContext(CanvasContext);
}

// =============================================================================
// PROVIDER
// =============================================================================
export function CanvasProvider({ children }) {
  const [objects, updateObjects] = useState(
    defaultObjects || JSON.parse(localStorage.getItem("current-canvas")) || []
  );
  const [dragURL, setDragURL] = useState(null);
  const [selectedObject, setSelectedObject] = useState("");
  const [doubleClickedObject, setDoubleClicked] = useState("");
  const [canvasSize, setCanvasSize] = useState({ x: 1280, y: 720 });
  const [canvasBackground, setCanvasBackground] = useState("#ffffff");
  const [copyObject, setCopyObject] = useState(null);
  const [userUploads, setUserUploads] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(0);

  // =========================================================================
  // SHAPES
  // =========================================================================
  const shapeMap = {
    cross: "M2 50 h50 v50 h50 v50 h-50 v50 h-50 v-50 h-50 v-50 h50 z",
    triangle: "M 70 0 L 0 0 L 35 -40",
    square: "M 0 0 L 55 0 L 55 -55 L 0 -55 L 0 0",
    arrow: "M 0 0 L 55 0 L 55 -10 L 68 2 L 55 14 L 55 4 L 0 4 L 0 0",
    circle: "M 0 0 A 1 1 0 0 0 200 0 A 1 1 0 0 0 0 0",
  };

  // =========================================================================
  // RETURN
  // =========================================================================
  const value = {
    objects,
    updateObjects,
    dragURL,
    setDragURL,
    selectedObject,
    setSelectedObject,
    doubleClickedObject,
    setDoubleClicked,
    canvasSize,
    setCanvasSize,
    canvasBackground,
    setCanvasBackground,
    copyObject,
    setCopyObject,
    shapeMap,
    userUploads,
    setUserUploads,
    history,
    setHistory,
    historyStep,
    setHistoryStep,
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

const defaultObjects = [
  // { type: 'guide', id: 'horizontal', points: [0, 0, 0, 0] },
  // { type: 'guide', id: 'vertical', points: [0, 0, 0, 0] },
];
