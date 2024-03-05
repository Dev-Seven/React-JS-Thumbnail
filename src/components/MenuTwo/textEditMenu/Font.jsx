import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useCanvas } from "contexts/EditorContext";
import styles from "./Menu.module.css";
import { Multiselect } from "multiselect-react-dropdown";
import Select, { components } from "react-select";
import axios from "axios";
import FontPicker from "font-picker-react";
import { useEffect, useState } from "react";

const Font = ({}) => {
  const { objects, updateObjects, selectedObject } = useCanvas();
  // const [activeHeaderFontFamily, setActiveHeaderFontFamily] = useState(
  //   "Select Font"
  // );

  // const [count, setCount] = useState(0);

  // const groupBadgeStyles = {
  //   backgroundColor: "transperent",
  //   borderRadius: "2em",
  //   color: "transperent",
  //   display: "inline-block",
  //   fontSize: 12,
  //   fontWeight: "normal",
  //   lineHeight: "1",
  //   minWidth: 1,
  //   padding: "0.16666666666667em 0.5em",
  //   textAlign: "center",
  // };

  const colourStyles = {
    option: (styles, { data, isDisabled, isSelected, isFocused }) => {
      return {
        ...styles,
        fontFamily: data.fontFamily,
        backgroundColor: isDisabled
          ? "transperant"
          : isSelected
          ? "transperant"
          : isFocused
          ? "transperant"
          : "transperant",
        color: isDisabled
          ? "#000"
          : isSelected
          ? "#000"
          : isFocused
          ? "#000"
          : "#000",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled && (isSelected ? "#DCDCDC" : "#DCDCDC"),
        },
      };
    },
    groupHeading: (base) => ({
      ...base,
      color: "#48B3B8",
      fontSize: 16,
      fontWeight: "Bold",
      textDecoration: "underline",
    }),
    // placeholder: (styles, { data }) => ({
    //   ...styles,
    //   fontFamily: data.fontFamily,
    // }),
    singleValue: (styles, { data }) => ({
      ...styles,
      fontFamily: data.fontFamily,
    }),
  };

  // const formatGroupLabel = (data) => (
  //   <div>
  //     <span>{data.label}</span>
  //     <span style={groupBadgeStyles}></span>
  //   </div>
  // );

  const Group = (props) => (
    <div>
      <components.Group {...props} />
    </div>
  );

  // let googleFontList = [];
  const popularOptions = [
    { name: "Anton", label: "Anton", fontFamily: "Anton" },
    { name: "Bangers", label: "Bangers", fontFamily: "Bangers" },
    {
      name: "Fira Sans Condensed",
      label: "Fira Sans Condensed",
      fontFamily: "Fira Sans Condensed",
    },
    { name: "Lilita One", label: "Lilita One", fontFamily: "Lilita One" },
    { name: "Ultra", label: "Ultra", fontFamily: "Ultra" },
    {
      name: "BurbankBigCondensed-Black",
      label: "BurbankBigCondensed-Black",
      fontFamily: "BurbankBigCondensed-Black",
    },
    {
      name: "LeagueGothic-Regular",
      label: "LeagueGothic-Regular",
      fontFamily: "LeagueGothic-Regular",
    },
    {
      name: "LeagueSpartan-Bold",
      label: "LeagueSpartan-Bold",
      fontFamily: "LeagueSpartan-Bold",
    },
  ];

  const otherOptions = [
    {
      name: "Source Sans Pro",
      label: "Source Sans Pro",
      fontFamily: "Source Sans Pro",
    },
    { name: "Karantina", label: "Karantina", fontFamily: "Karantina" },
    { name: "Pacifico", label: "Pacifico", fontFamily: "Pacifico" },
    { name: "Indie Flower", label: "Indie Flower", fontFamily: "Indie Flower" },
    {
      name: "Shadows Into Light",
      label: "Shadows Into Light",
      fontFamily: "Shadows Into Light",
    },
    { name: "Work Sans", label: "Work Sans", fontFamily: "Work Sans" },
  ];

  const groupedOptions = [
    {
      label: "Popular",
      options: popularOptions,
    },
    {
      label: "Other",
      options: otherOptions,
    },
  ];
  //Needs to be checked
  const Font_API = process.env.REACT_APP_GOOGLE_FONTS_API;

  // async function getFontList() {
  //   debugger;
  //   let res = await axios.get(
  //     "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCOpaXi7JT_H9uOL3nkNVZ8h5DqgZ-GkOQ"
  //   );
  //   for (var i = 0; i < res.data.items.length; i++) {
  //     if (res.data.items[i].family) {
  //       googleFontList.push({
  //         name: res.data.items[i].family,
  //         label: res.data.items[i].family,
  //       });
  //     }
  //   }
  //   console.log(res);
  //   debugger;
  //   setCount(count + 1);
  //   return googleFontList;
  // }

  const handleOnChange = (selectedItem) => {
    // debugger;
    if (selectedItem) {
      const newObjects = objects.map((object) => {
        if (object.id !== selectedObject.id) return object;

        let payload = {
          ...selectedObject,
          settings: {
            ...selectedObject.settings,
            fontFamily: selectedItem.name,
          },
        };

        return payload;
      });

      console.log(newObjects);

      updateObjects(newObjects);
    }
  };

  useEffect(() => {
    // debugger;
    // getFontList();
    // debugger;
  }, []);

  return (
    <div className={styles.container}>
      <Select
        options={groupedOptions}
        components={{ Group }}
        onChange={handleOnChange}
        isSearchable={true}
        // formatGroupLabel={formatGroupLabel}
        styles={colourStyles}
      />
    </div>
  );
};

export default Font;

//Client Code-- Not to delete

// import {
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
// } from "@chakra-ui/react";
// import { useCanvas } from "contexts/EditorContext";
// import styles from "./Menu.module.css";

// import FontPicker from "font-picker-react";
// import { useEffect, useState } from "react";

// const Font = ({}) => {
//   const { objects, updateObjects, selectedObject } = useCanvas();
//   const [activeHeaderFontFamily, setActiveHeaderFontFamily] = useState("");
//   const families = [
//     "Anton",
//     "Bangers",
//     "Fira Sans Condensed",
//     "Lilita One",
//     "Ultra",
//     "BurbankBigCondensed-Black",
//     "LeagueGothic-Regular",
//     "LeagueSpartan-Bold",
//     "Source Sans Pro",
//     "Karantina",
//     "Pacifico",
//     "Indie Flower",
//     "Shadows Into Light",
//     "Work Sans",
//   ];

//   useEffect(() => {
//     if (activeHeaderFontFamily) {
//       const newObjects = objects.map((object) => {
//         if (object.id !== selectedObject.id) return object;

//         let payload = {
//           ...selectedObject,
//           settings: {
//             ...selectedObject.settings,
//             fontFamily: activeHeaderFontFamily,
//           },
//         };

//         return payload;
//       });

//       console.log(newObjects);

//       updateObjects(newObjects);
//     }
//   }, [activeHeaderFontFamily]);

//   return (
//     <div className={styles.container}>
//       <FontPicker
//         apiKey="AIzaSyCOpaXi7JT_H9uOL3nkNVZ8h5DqgZ-GkOQ"
//         activeFontFamily={activeHeaderFontFamily}
//         onChange={(nextFont) => setActiveHeaderFontFamily(nextFont.family)}
//         families={families}
//       />
//     </div>
//   );
// };

// export default Font;

//Important Code

{
  /* <Multiselect
        options={fontFamilies} // Options to display in the dropdown
        selectedValues={selectedValue} // Preselected value to persist in dropdown
        onSelect={(e) => handleOnChange(e)} // Function will trigger on select event
        // onRemove={this.onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        groupBy="category"
        avoidHighlightFirstOption={true}
        placeholder="Select Font"
      /> */
}
