import React from "react";

// =============================================================================
// MENU CONTENTS
// =============================================================================
import UploadMenu from "./menus/UploadMenu";
import TextMenu from "./menus/TextMenu";
import BGMenu from "./menus/BGMenu";
import ElementMenu from "./menus/ElementMenu";
import FortniteMenu from "./menus/FortniteMenu";
import CODMenu from "./menus/CODMenu";
import ShapeMenu from "./menus/ShapeMenu";

// =============================================================================
// EDITING MENUS CONTENTS
// =============================================================================
import ImageFilterMenu from "./imageEditMenu/Filter";
import ImageAdjustmentMenu from "./imageEditMenu/Adjustments";
// import ImageCropMenu from "./imageEditMenu/Crop";
import TextFontMenu from "./textEditMenu/Font";
import TextEffectMenu from "./textEditMenu/Effects";
import TextColorMenu from "./textEditMenu/Colors";

// =============================================================================
// MAIN WRAPPER
// =============================================================================
const MenuTwo = ({ menu, stageRef }) => {
  return (
    <>
      {/* ============ CONTENT MENUS ============*/}
      {menu === "upload_menu" && <UploadMenu />}
      {menu === "text_menu" && <TextMenu />}
      {menu === "bg_menu" && <BGMenu />}
      {menu === "element_menu" && <ElementMenu />}
      {menu === "fortnite_menu" && <FortniteMenu />}
      {menu === "cod_menu" && <CODMenu />}
      {menu === "shape_menu" && <ShapeMenu />}

      {/* ============ EDITING MENUS ============*/}
      {menu === "image_filter" && <ImageFilterMenu />}
      {menu === "image_adjustment" && <ImageAdjustmentMenu />}
      {/* {menu === "image_crop" && <ImageCropMenu stageRef={stageRef} />} */}
      {menu === "text_font" && <TextFontMenu />}
      {menu === "text_effects" && <TextEffectMenu />}
      {menu === "text_fill" && <TextColorMenu />}
    </>
  );
};

export default MenuTwo;
