import React, { useEffect, useRef } from "react";
import { uid } from "uid";
import styles from "./Editor.module.css";
import { useCanvas } from "contexts/EditorContext";
import Mousetrap from "mousetrap";

import Canvas from "components/Editor/Canvas/Canvas";
import { Button } from "@chakra-ui/react";

// =============================================================================
// MAIN
// =============================================================================
const EditorLayout = ({ setMenuTwoVisible, stageRef }) => {
  const {
    objects,
    dragURL,
    selectedObject,
    setSelectedObject,
    doubleClickedObject,
    setDoubleClicked,
  } = useCanvas();

  // Update Local storage of objects for caching and saving
  useEffect(() => {
    localStorage.setItem("current-canvas", JSON.stringify(objects));
  });

  // Check if we clicked off the canvas. We need one on the canvas itself,
  // and one outside.
  const handleClick = (e) => {
    if (e.target.localName.toLowerCase() != "canvas") {
      setSelectedObject({});
      setMenuTwoVisible(false);
    }
  };

  // Main Render
  return (
    <div onClick={handleClick} style={{ height: "100%" }}>
      <Editor
        objects={objects}
        dragURL={dragURL}
        selectedObject={selectedObject}
        stageRef={stageRef}
      />
    </div>
  );
};

// =============================================================================
// MEMO EDITOR
// =============================================================================
const Editor = React.memo(({ objects, dragURL, stageRef }) => {
  const {
    updateObjects,
    selectedObject,
    setSelectedObject,
    doubleClickedObject,
    setDoubleClicked,
    canvasBackground,
    history,
    setHistory,
    historyStep,
    setHistoryStep,
  } = useCanvas();

  // =========================================================================
  // MOUSE
  // =========================================================================
  Mousetrap.bind(["command+z", "ctrl+z"], () => {
    handleUndo();
  });

  Mousetrap.bind(["command+y", "ctrl+y"], () => {
    handleRedo();
  });

  // =========================================================================
  // FUNCTIONS
  // =========================================================================
  const handleImageDrop = (e) => {
    // Get Drop Coordinates
    stageRef.current.setPointersPositions(e);
    let coords = stageRef.current.getPointerPosition();

    let payload = {
      type: "image",
      url: dragURL,
      id: uid(32),
      settings: { x: coords.x, y: coords.y },
      filters: {},
    };

    updateObjects([...objects, payload]);
  };

  // Delete Image
  const deleteImage = () => {
    if (selectedObject) {
      let update = objects.filter((entry) => {
        if (entry.id !== selectedObject) return true;
        else return false;
      });
      setSelectedObject({});
      setDoubleClicked(null);
      updateObjects(update);
    }
  };

  // Key Event
  const handleKeyPress = (e) => {
    let key = e.keyCode;

    // Delete Selected Image
    if (key === 46) deleteImage();
    if (key === 27) setSelectedObject({});
  };

  // Check if we clicked off the image.
  const checkSelection = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedObject({});
      setDoubleClicked(null);
    }
  };

  const handleUndo = () => {
    if (history.length < 1) return;
    const previous = history[historyStep - 2];

    updateObjects(previous);
    setHistoryStep(historyStep - 1);
  };

  const handleRedo = () => {
    if (history.length === historyStep - 2) return;
    const previous = history[historyStep];

    updateObjects(previous);
    setHistoryStep(historyStep + 1);
  };

  // Update History
  React.useEffect(() => {
    if (objects.length === 0) return;

    let newHistory = [...history];

    newHistory = newHistory.slice(0, historyStep + 1);
    newHistory = newHistory.concat([objects]);

    setHistory(newHistory);
    setHistoryStep(historyStep + 1);
  }, [objects]);

  // =========================================================================
  // EFFECTS
  // =========================================================================
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedObject]);

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div
      className={styles.canvasContainer}
      id="canvas-content"
      style={{
        ...canvasSettings,
        background: canvasBackground,
        position: "relative",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleImageDrop}
    >
      <Canvas
        objects={objects}
        stageRef={stageRef}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        doubleClickedObject={doubleClickedObject}
        setDoubleClicked={setDoubleClicked}
        updateObjects={updateObjects}
        canvasSettings={canvasSettings}
      />
    </div>
  );
});

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const canvasSettings = {
  width: 1280,
  height: 720,
  top: `50%`,
  left: `50%`,
  transform: `scale(1) translate(-50%, -50%)`,
};
export default EditorLayout;
