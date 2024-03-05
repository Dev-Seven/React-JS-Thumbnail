import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from "@chakra-ui/react"
import { useCanvas } from 'contexts/EditorContext'
import { useEffect, useState } from "react";
import { SketchPicker, ChromePicker } from 'react-color';
import styles from './Menu.module.css'

const colors = [
    { code: "teal", hex: "#000000" },
    { code: "teal", hex: "#545454" },
    { code: "teal", hex: "#737373" },
    { code: "teal", hex: "#A6A6A6" },
    { code: "teal", hex: "#FF1616" },
    { code: "teal", hex: "#FF5757" },
    { code: "teal", hex: "#03989E" },
    { code: "teal", hex: "#5CE1E6" },
    { code: "teal", hex: "#008037" },
    { code: "teal", hex: "#FF914D" },
]

const Colors = () => {
    const { objects, selectedObject, updateObjects } = useCanvas()
    const [color, setColor] = useState(selectedObject?.settings?.fill || '#000000')

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const updateColor = (color) => {
        let update = objects.map(entry => {
            if (entry?.id != selectedObject.id) return
            else {
                return {
                    ...entry,
                    settings: {
                        ...entry.settings,
                        fill: color
                    }
                }
            }
        })

        updateObjects(update)
    }

    useEffect(() => {
        updateColor(color)
    }, [color])
    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className={styles.container}>
            <h2>Colors</h2>

            <div style={{ margin: '1em 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ChromePicker
                    color={color}
                    onChange={color => setColor(color.hex)}
                />
            </div>


            <h3>Presets</h3>
            <div className={styles.colorSelectorContainer}>
                {
                    colors.map(color => <ColorEntry color={color} updateColor={updateColor} key={color.hex} />)
                }
            </div>
        </div>
    )
}

const ColorEntry = ({ color, updateColor }) => {
    return (
        <div style={{ background: color.hex }} className={styles.colorEntry} onClick={() => updateColor(color.hex)}></div>
    )
}

export default Colors


