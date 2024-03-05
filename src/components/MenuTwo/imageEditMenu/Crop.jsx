import useImage from "use-image";
import { useCanvas } from "contexts/EditorContext";
import {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
  createContext,
} from "react";
import { Button } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./Menu.module.css";

const Crop = ({ stageRef }) => {
  // =========================================================================
  // HOOKS AND STATE
  // =========================================================================
  const { objects, updateObjects, selectedObject } = useCanvas();
  const [image] = useImage(selectedObject.url, "Anonymous");

  var layer = stageRef.current.getChildren(function (node) {
    return node.getClassName() === "Layer";
  });

  var imageRef = layer[0].getChildren(function (node) {
    return node.getClassName() === "Image";
  });

  // =========================================================================
  // FUNCTIONS
  // =========================================================================

  // Crop image
  const handleCrop = (e) => {
    layer.draw();
  };

  useEffect(() => {}, []);

  const handleCancel = () => {
    var image1 = imageRef[0];
    const crop = {
      cropX: 0,
      cropY: 0,
      cropWidth: 0,
      cropHeight: 0,
    };
    imageRef[0].setAttrs(crop);
    layer.draw();
  };
  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crop</h2>
      {/*  ===================== CROP IMAGE =====================*/}
      <div>
        <Button
          leftIcon={<FaCheck />}
          className={styles.cropButtons}
          onClick={(e) => {
            handleCrop(e);
          }}
        >
          Done
        </Button>
        <Button
          leftIcon={<FaTimes />}
          className={styles.cropButtons}
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Crop;
