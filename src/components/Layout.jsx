// Imports
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Layout.module.css";
import Editor from "components/Editor/Editor";

// Context
import { CanvasProvider } from "contexts/EditorContext";
import { useFirebase, useAuth } from "contexts/FirebaseContext";

// Menus
import TopBarMenu from "components/TopBar/TopBarMenu";
import MenuOne from "components/MenuOne/MenuOne";
import MenuTwo from "components/MenuTwo/MenuTwo";
import MenuThree from "components/MenuThree/MenuThree";

// =============================================================================
// RENDER
// =============================================================================
const Layout = () => {
  // =========================================================================
  // HOOKS AND STATE
  // =========================================================================
  const { currentUser } = useAuth();
  const { firebase } = useFirebase();
  const [menuTwoState, setMenuTwoState] = useState("text_menu");
  const [menuTwoVisible, setMenuTwoVisible] = useState(true);

  // REF TO THE CANVAS STAGE
  const stageRef = useRef();

  // Animation Variants
  const menuTwoVariants = {
    hidden: { width: "0vw" },
    visible: { width: "15vw" },
  };

  // Main Render
  return (
    <CanvasProvider>
      <main className={styles.main}>
        <section className={styles.topBar}>
          <TopBarMenu stageRef={stageRef} />
        </section>

        <section className={styles.lowerContent}>
          <aside className={styles.menuOne}>
            <MenuOne
              setMenuTwoState={setMenuTwoState}
              setMenuTwoVisible={setMenuTwoVisible}
            />
          </aside>

          <motion.aside
            className={styles.menuTwo}
            initial="hidden"
            animate={menuTwoVisible ? "visible" : "hidden"}
            variants={menuTwoVariants}
            transition={{ duration: 0.25, type: "tween", ease: "easeInOut" }}
          >
            <MenuTwo menu={menuTwoState} stageRef={stageRef} />
            <MenuCloser
              menuTwoVisible={menuTwoVisible}
              setMenuTwoVisible={setMenuTwoVisible}
              setMenuTwoState={setMenuTwoState}
            />
          </motion.aside>

          <section className={styles.editorContainer}>
            <section className={styles.editorMenu}>
              <MenuThree
                setMenuTwoState={setMenuTwoState}
                setMenuTwoVisible={setMenuTwoVisible}
                stageRef={stageRef}
              />
            </section>

            <section className={styles.editorContent} id="canvas">
              <Editor
                setMenuTwoVisible={setMenuTwoVisible}
                stageRef={stageRef}
              />
            </section>
          </section>
        </section>
      </main>
    </CanvasProvider>
  );
};

const MenuCloser = ({ menuTwoVisible, setMenuTwoVisible, setMenuTwoState }) => {
  const handleClick = () => {
    setMenuTwoVisible(!menuTwoVisible);
    setMenuTwoState("");
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        background: "#808080",
        width: "100%",
        padding: ".5em 1em",
        textAlign: "right",
      }}
    >
      <button onClick={handleClick}>Close</button>
    </div>
  );
};

export default Layout;
