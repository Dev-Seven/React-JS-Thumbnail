import React, { useEffect, useState } from "react";
import { Path, Transformer } from "react-konva";
import { ContextMenu } from "primereact/contextmenu";
import DOMWrapper from "./DOMWrapper";
import Mousetrap from "mousetrap";

import { GiVerticalFlip, GiHorizontalFlip } from "react-icons/gi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdFlipToFront, MdFlipToBack } from "react-icons/md";

const ShapeWrapper = ({
  object,
  objects,
  isSelected,
  setSelectedObject,
  updateObjects,
  canvasSettings,
  index,
  copyObject,
  setCopyObject,
}) => {
  // =========================================================================
  // STATES
  // =========================================================================
  const [hover, setHover] = useState(false);
  const [contextMenuCoord, setContextMenuCoord] = React.useState({
    x: 0,
    y: 0,
  });

  const contextRef = React.useRef();
  const pathRef = React.useRef();
  const hoverRef = React.useRef();
  const transformRef = React.useRef();

  // =========================================================================
  // EFFECTS
  // =========================================================================
  useEffect(() => {
    if (hover) {
      hoverRef.current?.nodes([pathRef.current]);
      hoverRef.current?.getLayer().batchDraw();
    }

    if (isSelected) {
      transformRef.current?.nodes([pathRef.current]);
      transformRef.current?.getLayer().batchDraw();
    }
  });

  // =========================================================================
  // KEYBOARD SHORTCUT BINDINGS
  // =========================================================================
  Mousetrap.bind(["command+c", "ctrl+c"], () => {
    if (!isSelected) return;
    setCopyObject(object);
  });

  Mousetrap.bind(["del", "command+backspace"], () => {
    if (!isSelected) return;
    handleImageDelete();
  });

  console.log(object);

  // =========================================================================
  // EVENT FUNCTIONS
  // =========================================================================
  const handleTransformEnd = (e) => {
    let update = objects.map((entry) => {
      // return a copy of every element that is not the
      // selected element
      if (entry.id !== object.id) return entry;
      // return modified copy of entry
      else
        return {
          ...entry,
          settings: {
            ...entry.settings,
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          },
        };
    });

    updateObjects(update);
    setHover(false);
  };

  // Handle the Click
  const handleClick = (e) => {
    if (isSelected && !e.evt.button) {
      setSelectedObject({});
      setHover(false);
    } else {
      setSelectedObject(object);
    }
  };

  // Update position on transform / update end
  const updatePosition = (e) => {
    // let snapCoords = {
    //     x: Math.round(e.target.attrs.x / BLOCK_SIZE) * BLOCK_SIZE,
    //     y: Math.round(e.target.attrs.y / BLOCK_SIZE) * BLOCK_SIZE
    // }
    let update = objects.map((entry) => {
      // return a copy of every element that is not the
      // selected element
      if (entry.id !== object.id) return entry;
      // return modified copy of entry
      else
        return {
          ...entry,
          settings: {
            ...entry.settings,
            x: 50,
            y: 100,
          },
        };
    });

    updateObjects(update);
  };

  // =========================================================================
  // CONTEXT FUNCTIONS
  // =========================================================================
  const handleContext = (e) => {
    setContextMenuCoord({
      x: e.evt.clientX,
      y: e.evt.clientY,
    });
    contextRef.current.show(e.evt);
  };

  // Delete Image From Objects Array
  const handleImageDelete = () => {
    let update = objects.filter((entry) => {
      if (entry.id !== object.id) return true;
      else return false;
    });
    setSelectedObject({});
    setHover(false);
    updateObjects(update);
  };

  const handleFlipHorizontal = () => {
    let flip = object.filters?.flipH ? false : true;
    let update = objects.map((entry) => {
      if (entry.id !== object.id) return entry;
      else
        return {
          ...entry,
          filters: {
            ...entry.filters,
            flipH: flip,
          },
        };
    });
    updateObjects(update);
  };

  const handleFlipVertical = () => {
    let flip = object.filters?.flipV ? false : true;
    let update = objects.map((entry) => {
      if (entry.id !== object.id) return entry;
      else
        return {
          ...entry,
          filters: {
            ...entry.filters,
            flipV: flip,
          },
        };
    });

    updateObjects(update);
  };

  const handleMoveBackwards = () => {
    if (index === 0) return;
    let update = [...objects];

    let temp = update[index];
    update[index] = update[index - 1];
    update[index - 1] = temp;

    updateObjects(update);
  };

  const handleMoveForwards = () => {
    if (index === objects.length - 1) return;

    let update = [...objects];

    let temp = update[index];
    update[index] = update[index + 1];
    update[index + 1] = temp;

    updateObjects(update);
  };

  // =========================================================================
  // CONTEXT MENU
  // =========================================================================
  const items = [
    {
      label: (
        <div className="entry">
          <MdFlipToBack />
          Move Back
        </div>
      ),
      className: "rotate-90-icon",
      command: handleMoveBackwards,
    },
    {
      label: (
        <div className="entry">
          <MdFlipToFront />
          Move Forward
        </div>
      ),
      className: "rotate-90-icon",
      command: handleMoveForwards,
    },
    {
      label: (
        <div className="entry">
          <GiHorizontalFlip />
          Flip Horizontal
        </div>
      ),
      className: "rotate-90-icon",
      command: handleFlipHorizontal,
    },
    {
      label: (
        <div className="entry">
          <GiVerticalFlip />
          Flip Vertical
        </div>
      ),
      command: handleFlipVertical,
    },
    {
      label: (
        <div className="entry">
          <FaRegTrashAlt />
          Delete
        </div>
      ),
      className: "warning-icon",
      command: handleImageDelete,
    },
  ];

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <React.Fragment>
      {/* =========================== CONTEXT =========================== */}
      <DOMWrapper>
        <ContextMenu
          className="custom-context-menu"
          model={items}
          ref={contextRef}
          appendTo={document.body}
          style={{
            position: "absolute",
            top: contextMenuCoord.y,
            left: contextMenuCoord.x,
          }}
        />
      </DOMWrapper>

      {/* =========================== PATH =========================== */}
      <Path
        x={200}
        y={200}
        ref={pathRef}
        data={object.path}
        // Settings
        fill={object?.settings?.fill || "rgba(0,0,0,0)"}
        stroke={object?.settings?.stroke || "rgba(0,0,0,1)"}
        strokeWidth={object?.settings?.strokeWidth || 0}
        strokeScaleEnabled={false}
        draggable
        // Events
        onClick={handleClick}
        onTap={handleClick}
        onDragEnd={updatePosition}
        onMouseEnter={() => !isSelected && setHover(true)}
        onMouseLeave={() => setHover(false)}
        onContextMenu={handleContext}
      />
      {/* ======================= TRANSFORMER ======================= */}
      {hover && (
        <Transformer
          ref={hoverRef}
          resizeEnabled={false}
          rotateEnabled={false}
          onTransformEnd={handleTransformEnd}
          anchorStroke={"#869ee3"}
          anchorCornerRadius={15}
          anchorStrokeWidth={1}
          anchorSize={10}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}

      {isSelected && (
        <Transformer
          ref={transformRef}
          resizeEnabled={true}
          rotateEnabled={true}
          onTransformEnd={handleTransformEnd}
          anchorStroke={"#869ee3"}
          anchorCornerRadius={15}
          anchorStrokeWidth={1}
          anchorSize={10}
          ignoreStroke={true}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ShapeWrapper;
