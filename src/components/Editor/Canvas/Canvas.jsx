import React, { useState } from "react";
import { Stage, Layer, Line, Circle, Shape, Path } from "react-konva";
import { uid } from "uid";
import ImageWrapper from "components/Editor/CanvasObjects/ImageWrapper";
import TextWrapper from "components/Editor/CanvasObjects/TextWrapper";
import ShapeWrapper from "components/Editor/CanvasObjects/ShapeWrapper";
import { useCanvas } from "contexts/EditorContext";
import Mousetrap from "mousetrap";

// =============================================================================
// MAIN
// =============================================================================
const Canvas = React.memo(
  ({
    objects,
    stageRef,
    selectedObject,
    setSelectedObject,
    updateObjects,
    doubleClickedObject,
    setDoubleClicked,
    canvasSettings,
  }) => {
    // =========================================================================
    // STATES AND HOOKS
    // =========================================================================
    const { copyObject, setCopyObject } = useCanvas();

    // Performance Debugging
    // React.useEffect(() => { console.log("re-render") })

    // Check if we clicked off the image.
    const checkSelection = (e) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        setSelectedObject({});
        setDoubleClicked(null);
      }
    };
    // =========================================================================
    // KEY BINDS
    // =========================================================================
    Mousetrap.bind(["command+v", "ctrl+v"], () => {
      if (!copyObject) return;

      // If Image
      if (copyObject.type === "image") {
        let payload = {
          type: "image",
          url: copyObject.url,
          id: uid(32),
          settings: { x: 50, y: 50 },
          filters: {},
        };
        updateObjects([...objects, payload]);
      }

      if (copyObject.type === "text") {
        let payload = {
          ...copyObject,
          id: uid(32),
          settings: {
            ...copyObject.settings,
            x: 400,
            y: 50,
          },
        };
        updateObjects([...objects, payload]);
      }
    });

    // ========================================================================
    // Main Render
    // ========================================================================
    return (
      <Stage
        id="canvas1"
        ref={stageRef}
        width={canvasSettings.width}
        height={canvasSettings.height}
        onMouseDown={checkSelection}
        onTouchStart={checkSelection}
      >
        <Layer>
          {objects.map((object, index) => {
            let isSelected = selectedObject?.id === object?.id ? true : false;
            let isDoubleClicked =
              doubleClickedObject === object?.id ? true : false;

            // =====================================================
            // IMAGE OBJECT
            // =====================================================
            if (object?.type === "image") {
              return (
                <ImageWrapper
                  object={object}
                  objects={objects}
                  isSelected={isSelected}
                  selectedObject={selectedObject}
                  setSelectedObject={setSelectedObject}
                  updateObjects={updateObjects}
                  canvasSettings={canvasSettings}
                  key={object.id}
                  index={index}
                  copyObject={copyObject}
                  setCopyObject={setCopyObject}
                />
              );
            }

            // =====================================================
            // TEXT OBJECT
            // =====================================================
            if (object?.type === "text") {
              return (
                <TextWrapper
                  object={object}
                  objects={objects}
                  isSelected={isSelected}
                  setSelectedObject={setSelectedObject}
                  isDoubleClicked={isDoubleClicked}
                  setDoubleClicked={setDoubleClicked}
                  updateObjects={updateObjects}
                  key={object.id}
                  index={index}
                  copyObject={copyObject}
                  setCopyObject={setCopyObject}
                  index={index}
                />
              );
            }

            if (object?.type === "shape") {
              return (
                <ShapeWrapper
                  object={object}
                  objects={objects}
                  isSelected={isSelected}
                  setSelectedObject={setSelectedObject}
                  updateObjects={updateObjects}
                  canvasSettings={canvasSettings}
                  key={object.id}
                  index={index}
                  copyObject={copyObject}
                  setCopyObject={setCopyObject}
                />
              );
            }
          })}
        </Layer>
      </Stage>
    );
  }
);

export default Canvas;
