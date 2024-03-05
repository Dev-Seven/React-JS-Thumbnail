import { Button } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useCanvas } from 'contexts/EditorContext'
import styles from '../MenuTwo.module.css'
import { uid } from "uid"


const TextMenu = () => {

    const { objects, updateObjects } = useCanvas()

    // Animation Variant
    const variants = {
        hidden: { opacity: 0, marginTop: 25 },
        visible: { opacity: 1, marginTop: 0 },
    }

    const addText = (type) => {
        if (type === 'heading') {
            var weight = "bold"
            var text = "New Heading"
            var size = 54
        }
        else if (type === 'subheading') {
            weight = "bold"
            text = "New Subheading"
            size = 36
        }
        else {
            weight = "normal"
            text = "New Paragraph"
            size = 24
        }


        updateObjects([...objects, {
            type: "text",
            id: uid(32),
            settings: {
                x: 400,
                y: 50,
                fill: "#000000",
                text: text,
                size: size,
                style: weight,
                decoration: 'none',
                scaleY: 1,
                scaleX: 1,
                width: 'auto',
                height: 'auto',
                align: 'center'
            },
            filters: {}
        }])
    }

    // Render
    return (
        <motion.div initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            className={styles.textMenu}
        >
            <h2 className={styles.title}>Text</h2>
            <Button variant="outline" onClick={() => addText('heading')}>Add Heading</Button>
            <Button variant="outline" onClick={() => addText('subheading')}>Add Subheading</Button>
            <Button variant="outline" onClick={() => addText('paragraph')}>Add Paragraph</Button>
        </motion.div>
    )
}

export default TextMenu 