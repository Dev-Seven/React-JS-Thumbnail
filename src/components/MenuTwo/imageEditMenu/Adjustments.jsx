import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCanvas } from "contexts/EditorContext";
import { useEffect, useState } from "react";
import { IoRefreshCircleOutline } from "react-icons/io5";
import styles from "./Menu.module.css";

const Adjustment = ({}) => {
  // =========================================================================
  // HOOKS AND STATE
  // =========================================================================
  const { objects, updateObjects, selectedObject } = useCanvas();

  // =========================================================================
  // FUNCTIONS
  // =========================================================================
  const updateFilters = (filter, val) => {
    // Switch for specific filters incase there needs to be any processing
    // of the value before the object array update
    switch (filter) {
      case "brightness":
        break;
      default:
        break;
    }

    // Filter through object and update the selected Object
    let update = objects.map((object) => {
      if (object.id != selectedObject.id) return object;

      return {
        ...object,
        filters: {
          ...object.filters,
          [filter]: val,
        },
      };
    });

    // Make the update
    updateObjects(update);
  };

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Adjustments</h2>

      {/*  ===================== BRIGHTNESS FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Brightness</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.brightness}
            onChange={(val) => updateFilters("brightness", val)}
            aria-label="image-brightness-slider"
            max={100}
            min={-100}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline
            onClick={() => updateFilters("brightness", 0)}
          />
        </div>
      </div>

      {/*  ===================== CONTRAST FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Contrast</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.contrast}
            onChange={(val) => updateFilters("contrast", val)}
            aria-label="image-contrast-slider"
            max={100}
            min={-100}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline
            onClick={() => updateFilters("contrast", 0)}
          />
        </div>
      </div>

      {/*  ===================== SATURATION FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Saturation</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.saturation}
            onChange={(val) => updateFilters("saturation", val)}
            aria-label="image-saturation-slider"
            max={100}
            min={-100}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline
            onClick={() => updateFilters("saturation", 0)}
          />
        </div>
      </div>

      {/*  ===================== SHARPEN FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Sharpen</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.sharpen}
            onChange={(val) => updateFilters("sharpen", val)}
            aria-label="image-sharpen-slider"
            max={100}
            min={-100}
            defaultValue={0}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline onClick={() => updateFilters("sharpen", 0)} />
        </div>
      </div>

      {/*  ===================== HUE FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Hue</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.hue}
            onChange={(val) => updateFilters("hue", val)}
            aria-label="image-hue-slider"
            max={259}
            min={0}
            defaultValue={selectedObject?.filters?.hue}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline onClick={() => updateFilters("hue", 0)} />
        </div>
      </div>

      {/*  ===================== SATURATION FILTER =====================*/}
      <div className={styles.sliderContainer}>
        <p>Blur</p>
        <div className={styles.slider}>
          <Slider
            value={selectedObject?.filters?.blur}
            onChange={(val) => updateFilters("blur", val)}
            aria-label="image-saturation-slider"
            max={100}
            min={0}
          >
            <SliderTrack>
              <SliderFilledTrack bg="#666" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IoRefreshCircleOutline onClick={() => updateFilters("blur", 0)} />
        </div>
      </div>
    </div>
  );
};

export default Adjustment;
