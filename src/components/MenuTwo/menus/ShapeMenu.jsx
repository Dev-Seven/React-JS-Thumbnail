import { Button } from "@chakra-ui/react"
import { useCanvas } from 'contexts/EditorContext'
import { uid } from "uid"
import styles from '../MenuTwo.module.css'

const ShapeMenu = () => {
    const { shapeMap, objects, updateObjects } = useCanvas()

    const addShape = (shape) => {
        let payload = {
            type: 'shape',
            path: shapeMap[shape],
            id: uid(32),
            settings: {
                x: 400,
                y: 50,
                fill: "rgba(128,128,128,1)",
                strokeWidth: 0
            },
            filters: {}
        }

        // Push Update Out
        updateObjects([...objects, payload])
    }

    return (
        <div className={styles.shapeMenu}>
            <h1 className={styles.title}>Add Shape</h1>
            <Button onClick={() => addShape('cross')}>Cross</Button>
            <Button onClick={() => addShape('triangle')}>Triangle</Button>
            <Button onClick={() => addShape('square')}>Square</Button>
            <Button onClick={() => addShape('arrow')}>Arrow</Button>
            <Button onClick={() => addShape('circle')}>Circle</Button>
        </div>
    )
}

export default ShapeMenu