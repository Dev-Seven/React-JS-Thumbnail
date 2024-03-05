import Konva from "konva";
import useImage from "use-image";
import React, { useEffect } from "react";
import { Image, Shape, Transformer, Rect } from "react-konva";
import { ContextMenu } from "primereact/contextmenu";
import { GiVerticalFlip, GiHorizontalFlip } from "react-icons/gi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdFlipToFront, MdFlipToBack } from "react-icons/md";
import DOMWrapper from "./DOMWrapper";
import Mousetrap from "mousetrap";
import ReactCrop from "react-image-crop";

// =============================================================================
// WRAPPER
// =============================================================================
const ImageWrapper = ({
  object,
  objects,
  isSelected,
  selectedObject,
  setSelectedObject,
  updateObjects,
  canvasSettings,
  index,
  copyObject,
  setCopyObject,
  stageRef,
}) => {
  // =========================================================================
  // STATES
  // =========================================================================

  const [hover, setHover] = React.useState(false);
  const [contextMenuCoord, setContextMenuCoord] = React.useState({
    x: 0,
    y: 0,
  });
  const [crop, setCrop] = React.useState({ aspect: 16 / 9 });
  const [image] = useImage(object.url, "Anonymous");

  // REFS
  const contextRef = React.useRef();
  const imageRef = React.useRef();
  const hoverRef = React.useRef();
  const transformRef = React.useRef();
  var layer;

  // Resize Image keeping aspect ratio but within a 50% of the max heigh or width
  const initialWidth = image?.width;
  const initialHeight = image?.height;
  const initialRatio = Math.min(
    (canvasSettings.width * 0.5) / initialWidth,
    (canvasSettings.height * 0.5) / initialHeight
  );
  const newRatio = {
    width: initialWidth * initialRatio,
    height: initialHeight * initialRatio,
  };

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

  // =========================================================================
  // EFFECTS
  // =========================================================================

  useEffect(() => {
    if (hover) {
      hoverRef.current?.nodes([imageRef.current]);
      hoverRef.current?.getLayer().batchDraw();
    }

    if (isSelected) {
      transformRef.current?.nodes([imageRef.current]);
      transformRef.current?.getLayer().batchDraw();
    }
  });

  useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      imageRef.current.cache();
      imageRef.current.getLayer().batchDraw();
    }
  }, [updateObjects]);

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

  const handleTransform = (e) => {
    if (selectedObject.crop == true) {
      debugger;
      layer = imageRef.current.getLayer();
      setHover(false);
      var img = e.target;
      transformRef.current.setAttrs({
        borderDash: [5, 5],
        anchorSize: 21,
        anchorCornerRadius: 11,
      });
      img.setAttrs({
        scaleX: 1,
        scaleY: 1,
        width: img.width() * img.scaleX(),
        height: img.height() * img.scaleY(),
      });

      const crop = getCrop(img.image(), {
        width: img.width(),
        height: img.height(),
      });
      setHover(false);
      imageRef.current.setAttrs(crop);
      layer.draw();
    }
  };

  // function to calculate crop values from source image.
  function getCrop(image, size) {
    const width = size.width;
    const height = size.height;
    const aspectRatio = width / height;

    let newWidth;
    let newHeight;
    let x = 0;
    let y = 0;

    const imageRatio = image.width / image.height;

    if (aspectRatio >= imageRatio) {
      newWidth = image.width;
      newHeight = image.width / aspectRatio;
    } else {
      newWidth = image.height * aspectRatio;
      newHeight = image.height;
    }

    // x = (image.width - newWidth) / 2;
    // y = (image.height - newHeight) / 2;
    // newWidth = width;
    // newHeight = height;

    return {
      cropX: x,
      cropY: y,
      cropWidth: newWidth,
      cropHeight: newHeight,
    };
  }

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
            x: e.target.attrs.x,
            y: e.target.attrs.y,
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
  // EFFECT FILTER
  // =========================================================================
  const Sharpen = (imageData) => {
    let mix = object.filters?.sharpen / 100 || 0;
    let weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    let katet = Math.round(Math.sqrt(weights.length));
    let half = (katet * 0.5) | 0;
    let height = imageData.height;
    let width = imageData.width;

    let buffer = [];

    let nPixels = imageData.data.length;
    let y = height;

    // Iterate through and add data to buffer
    while (y--) {
      let x = width;
      while (x--) {
        let sy = y;
        let sx = x;
        let dstOff = (y * width + x) * 4;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;

        for (let cy = 0; cy < katet; cy++) {
          for (let cx = 0; cx < katet; cx++) {
            let scy = sy + cy - half;
            let scx = sx + cx - half;

            if (scy >= 0 && scy < height && scx >= 0 && scx < width) {
              let srcOff = (scy * width + scx) * 4;
              let wt = weights[cy * katet + cx];

              r += imageData.data[srcOff] * wt;
              g += imageData.data[srcOff + 1] * wt;
              b += imageData.data[srcOff + 2] * wt;
              a += imageData.data[srcOff + 3] * wt;
            }
          }
        }

        buffer[dstOff] = r * mix + imageData.data[dstOff] * (1 - mix);
        buffer[dstOff + 1] = g * mix + imageData.data[dstOff + 1] * (1 - mix);
        buffer[dstOff + 2] = b * mix + imageData.data[dstOff + 2] * (1 - mix);
        buffer[dstOff + 3] = imageData.data[dstOff + 3];
      }
    }

    // Update Image with Buffer
    for (let i = 0; i < nPixels; i++) {
      imageData.data[i] = buffer[i];
    }
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
      {/* =========================== IMAGE =========================== */}
      <Image
        // General
        image={image}
        ref={imageRef}
        // Positioning
        x={object.settings.x}
        y={object.settings.y}
        // Transforms
        width={newRatio?.width}
        height={newRatio?.height}
        rotation={object.settings?.rotation}
        offsetX={object.settings.offsetX}
        offsetY={object.settings.offsetY}
        skewX={object.settings.skewX}
        skewY={object.settings.skewY}
        scaleX={1 * (object.filters?.flipH ? -1 : 1)}
        scaleY={1 * (object.fitlers?.flipV ? -1 : 1)}
        draggable
        // Events
        onClick={handleClick}
        onTap={handleClick}
        onDragEnd={updatePosition}
        onMouseEnter={() => !isSelected && setHover(true)}
        onMouseLeave={() => setHover(false)}
        onContextMenu={handleContext}
        onTransform={handleTransform}
        // Filters
        filters={[
          Konva.Filters.Brighten,
          Konva.Filters.Contrast,
          Konva.Filters.HSL,
          Konva.Filters.Blur,
          Konva.Filters.Pixelate,
          Sharpen,
        ]}
        // Filter Settings
        brightness={object.filters?.brightness / 100 || 0}
        contrast={object.filters?.contrast / 2 || 0}
        saturation={object.filters?.saturation / 10 || 0}
        hue={object.filters?.hue || 0}
        blurRadius={object.filters?.blur || 0}
        pixelSize={object.filters?.pixelate || 1}
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
          keepRatio={false}
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

export default ImageWrapper;
