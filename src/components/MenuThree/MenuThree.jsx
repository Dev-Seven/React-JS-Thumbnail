import React, { useCallback, useEffect } from "react";
import { useCanvas } from "contexts/EditorContext";
import styles from "./MenuThree.module.css";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

// =============================================================================
// MAIN
// =============================================================================
const MenuThree = ({ setMenuTwoState, setMenuTwoVisible, stageRef }) => {
  const {
    objects,
    selectedObject,
    setSelectedObject,
    updateObjects,
  } = useCanvas();
  useEffect(function () {}, [updateObjects]);

  return (
    <div className={styles.menuThreeContainer}>
      {selectedObject?.type === "image" && selectedObject?.crop !== true && (
        <ImageMenu
          setMenuTwoVisible={setMenuTwoVisible}
          setMenuTwoState={setMenuTwoState}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        />
      )}

      {selectedObject?.crop === true && (
        <CropMenu
          setMenuTwoVisible={setMenuTwoVisible}
          setMenuTwoState={setMenuTwoState}
          selectedObject={selectedObject}
          stageRef={stageRef}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
        />
      )}

      {selectedObject?.type === "text" && (
        <TextMenu
          setMenuTwoVisible={setMenuTwoVisible}
          setMenuTwoState={setMenuTwoState}
          object={selectedObject}
          objects={objects}
          updateObjects={updateObjects}
        />
      )}

      {selectedObject?.type === "shape" && (
        <ShapeMenu
          setMenuTwoVisible={setMenuTwoVisible}
          setMenuTwoState={setMenuTwoState}
          object={selectedObject}
          objects={objects}
          updateObjects={updateObjects}
        />
      )}
    </div>
  );
};

// =============================================================================
// IMAGE MENU
// =============================================================================
const ImageMenu = ({
  setMenuTwoVisible,
  setMenuTwoState,
  selectedObject,
  setSelectedObject,
}) => {
  const handleClick = (page) => {
    if (page == "image_crop") {
      setSelectedObject({ ...selectedObject, crop: true });
      setMenuTwoVisible(false);
    } else {
      setMenuTwoVisible(true);
      setMenuTwoState(page);
    }
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("image_filter")}
      >
        Filters
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("image_adjustment")}
      >
        Adjust
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("image_crop")}
      >
        Crop
      </Button>
    </React.Fragment>
  );
};

// =============================================================================
// CROP MENU
// =============================================================================
const CropMenu = ({
  setMenuTwoVisible,
  setMenuTwoState,
  stageRef,
  selectedObject,
  setSelectedObject,
}) => {
  const handleClick = (page) => {
    if (page == "image_crop") {
      setMenuTwoVisible(false);
    } else {
      setMenuTwoVisible(true);
      setMenuTwoState(page);
    }
  };
  const handleCancel = () => {
    setSelectedObject({ ...selectedObject, crop: false });

    var layer = stageRef.current.getChildren(function (node) {
      return node.getClassName() === "Layer";
    });

    var imageRef = layer[0].getChildren(function (node) {
      return node.getClassName() === "Image";
    });

    const crop = {
      cropX: 0,
      cropY: 0,
      cropWidth: 0,
      cropHeight: 0,
    };

    if (imageRef) {
      for (let i = 0; i < imageRef.length; i++) {
        imageRef[i].setAttrs(crop);
      }
    }
    layer.draw();
  };

  return (
    <React.Fragment>
      <Button
        leftIcon={<FaCheck />}
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("image_crop")}
      >
        Done
      </Button>

      <Button
        leftIcon={<FaTimes />}
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </React.Fragment>
  );
};

// =============================================================================
// TEXT MENU
// =============================================================================
const TextMenu = ({
  setMenuTwoVisible,
  setMenuTwoState,
  object,
  objects,
  updateObjects,
}) => {
  const handleClick = (page) => {
    setMenuTwoVisible(true);
    setMenuTwoState(page);
  };

  const handleStyle = (clicked) => {
    let currentStyle = object.settings.style;
    let currentDecoration = object.settings.decoration;
    let styleString = "";
    let decorationString = "";

    // Logic
    switch (currentStyle) {
      case "bold":
        styleString = clicked === "italic" ? "bold italic" : "normal";
        break;
      case "bold":
        styleString = clicked === "bold" ? "bold italic" : "normal";
        break;
      case "bold":
        styleString = clicked === "bold" ? "italic" : "bold";
        break;
      default:
        styleString = clicked;
    }

    if (clicked === "underline" && currentDecoration === "underline")
      decorationString = "";
    else if (clicked === "underline") decorationString = "underline";

    // Update
    let update = objects.map((entry) => {
      if (entry?.id != object?.id) return;
      else {
        return {
          ...object,
          settings: {
            ...object.settings,
            style: clicked == "underline" ? currentStyle : styleString,
            decoration:
              clicked == "underline" ? decorationString : currentDecoration,
          },
        };
      }
    });
    updateObjects(update);
  };

  const handleAlignment = (alignment) => {
    let update = objects.map((entry) => {
      if (entry?.id != object?.id) return;
      else {
        return {
          ...object,
          settings: {
            ...object.settings,
            align: alignment,
          },
        };
      }
    });
    updateObjects(update);
  };

  const handleUpdateSize = (e) => {
    let size = e.target.value;
    let update = objects.map((entry) => {
      if (entry.id !== object.id) return;
      return {
        ...entry,
        settings: {
          ...entry.settings,
          size: size,
        },
      };
    });
    updateObjects(update);
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("text_font")}
      >
        Font
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("text_effects")}
      >
        Effects
      </Button>

      <div style={{ marginRight: ".5em" }}>
        <Select value={object.settings.size} onChange={handleUpdateSize}>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>

      <Button
        size="sm"
        className={styles.btn}
        style={{ background: object.settings.fill }}
        onClick={() => handleClick("text_fill")}
      ></Button>

      <Button
        className={styles.btn}
        variant={object.settings.style.includes("bold") ? "solid" : "ghost"}
        onClick={() => handleStyle("bold")}
        leftIcon={<FaBold />}
        iconSpacing={0}
      ></Button>
      <Button
        className={styles.btn}
        variant={object.settings.style.includes("italic") ? "solid" : "ghost"}
        onClick={() => handleStyle("italic")}
        leftIcon={<FaItalic />}
        iconSpacing={0}
      ></Button>
      <Button
        className={styles.btn}
        variant={
          object.settings.decoration.includes("underline") ? "solid" : "ghost"
        }
        onClick={() => handleStyle("underline")}
        leftIcon={<FaUnderline />}
        iconSpacing={0}
      ></Button>

      <Menu>
        <MenuButton
          variant="ghost"
          as={Button}
          leftIcon={<FaAlignCenter />}
          iconSpacing={0}
        ></MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAlignment("left")}>
            <span className={styles.menuItem}>
              <FaAlignLeft /> Left
            </span>
          </MenuItem>
          <MenuItem onClick={() => handleAlignment("center")}>
            <span className={styles.menuItem}>
              <FaAlignCenter /> Center
            </span>
          </MenuItem>
          <MenuItem onClick={() => handleAlignment("right")}>
            <span className={styles.menuItem}>
              <FaAlignRight /> Right
            </span>
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
};

const sizes = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  22,
  24,
  26,
  28,
  32,
  36,
  48,
  54,
  66,
  72,
];

// =============================================================================
// SHAPE MENU
// =============================================================================
const ShapeMenu = ({
  setMenuTwoVisible,
  setMenuTwoState,
  object,
  objects,
  updateObjects,
}) => {
  const handleClick = (page) => {
    setMenuTwoVisible(true);
    setMenuTwoState(page);
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        variant="ghost"
        className={styles.btn}
        onClick={() => handleClick("image_filter")}
      >
        Filters
      </Button>

      <Button
        size="sm"
        className={styles.btn}
        style={{ background: object.settings.fill }}
        onClick={() => handleClick("text_fill")}
      ></Button>
    </React.Fragment>
  );
};

export default MenuThree;
