import { motion } from "framer-motion"
import { useState } from "react";
import { useCanvas } from 'contexts/EditorContext'
import { SketchPicker, ChromePicker } from 'react-color';
import styles from '../MenuTwo.module.css'


const BGMenu = () => {
    const { canvasBackground, setCanvasBackground } = useCanvas()

    // Animation Variant
    const variants = {
        hidden: { opacity: 0, marginTop: 25 },
        visible: { opacity: 1, marginTop: 0 },
    }

    // Render
    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            className="flex h-full w-full"
        >
            <div className="flex flex-1 py-8 items-start justify-center">
                <ChromePicker
                    color={canvasBackground}
                    onChange={color => setCanvasBackground(color.hex)}
                />
            </div>
        </motion.div>
    )
}

export default BGMenu